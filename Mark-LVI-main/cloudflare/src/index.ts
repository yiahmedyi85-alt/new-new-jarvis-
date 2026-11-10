export interface Env {
  DB: D1Database;
  JARVIS_CLOUD_TOKEN: string;
  JARVIS_BRIDGE_TOKEN: string;
  GEMINI_API_KEY: string;
  GEMINI_MODEL?: string;
}

type TaskMode = "cloud" | "pc";
type TaskStatus = "queued" | "running" | "completed" | "failed";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function authorized(request: Request, expected: string): boolean {
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  return Boolean(expected && supplied && supplied.length === expected.length &&
    crypto.subtle && constantTimeEqual(supplied, expected));
}

function constantTimeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) diff |= (a.charCodeAt(i % (a.length || 1)) || 0) ^ (b.charCodeAt(i % (b.length || 1)) || 0);
  return diff === 0;
}

async function gemini(prompt: string, env: Env): Promise<string> {
  if (!env.GEMINI_API_KEY) throw new Error("Gemini API key is not configured in Cloudflare.");
  const model = env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });
  if (!response.ok) throw new Error(`Gemini request failed (${response.status}): ${(await response.text()).slice(0, 1200)}`);
  const data = await response.json() as any;
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const answer = parts.map((part: any) => typeof part.text === "string" ? part.text : "").filter(Boolean).join("\n").trim();
  if (!answer) throw new Error("Gemini returned an empty response.");
  return answer.slice(0, 30000);
}

async function runCloudTasks(env: Env): Promise<void> {
  // Process one task per scheduled invocation to stay within free-tier CPU limits.
  const row = await env.DB.prepare(
    "SELECT id, prompt FROM tasks WHERE mode = 'cloud' AND status = 'queued' ORDER BY created_at LIMIT 1"
  ).first<{ id: string; prompt: string }>();
  if (!row) return;

  const claim = await env.DB.prepare(
    "UPDATE tasks SET status = 'running', updated_at = ? WHERE id = ? AND status = 'queued'"
  ).bind(Date.now(), row.id).run();
  if (!claim.meta.changes) return;

  try {
    const result = await gemini(row.prompt, env);
    await env.DB.prepare(
      "UPDATE tasks SET status = 'completed', result = ?, error = '', updated_at = ? WHERE id = ?"
    ).bind(result, Date.now(), row.id).run();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown task error";
    await env.DB.prepare(
      "UPDATE tasks SET status = 'failed', error = ?, updated_at = ? WHERE id = ?"
    ).bind(message.slice(0, 3000), Date.now(), row.id).run();
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "GET" && path === "/health") {
      return json({ ok: true, service: "jarvis-cloudflare", status: "online" });
    }

    if (path.startsWith("/bridge/")) {
      if (!authorized(request, env.JARVIS_BRIDGE_TOKEN)) return json({ error: "Unauthorized" }, 401);
      if (request.method === "GET" && path === "/bridge/next") {
        const row = await env.DB.prepare(
          "SELECT id, prompt, mode, status, created_at FROM tasks WHERE mode = 'pc' AND status = 'queued' ORDER BY created_at LIMIT 1"
        ).first<any>();
        if (!row) return json({ task: null });
        const claim = await env.DB.prepare(
          "UPDATE tasks SET status = 'running', updated_at = ? WHERE id = ? AND status = 'queued'"
        ).bind(Date.now(), row.id).run();
        if (!claim.meta.changes) return json({ task: null });
        return json({ task: { ...row, status: "running" } });
      }
      if (request.method === "POST" && path === "/bridge/complete") {
        let body: any;
        try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
        if (typeof body?.task_id !== "string" || !["completed", "failed"].includes(body?.status)) {
          return json({ error: "task_id and a valid status are required" }, 400);
        }
        const result = String(body.result ?? "").slice(0, 30000);
        const error = String(body.error ?? "").slice(0, 3000);
        const updated = await env.DB.prepare(
          "UPDATE tasks SET status = ?, result = ?, error = ?, updated_at = ? WHERE id = ? AND mode = 'pc' AND status = 'running'"
        ).bind(body.status, result, error, Date.now(), body.task_id).run();
        if (!updated.meta.changes) return json({ error: "PC task not found or no longer running" }, 404);
        return json({ ok: true });
      }
      return json({ error: "Not found" }, 404);
    }

    if (path.startsWith("/api/")) {
      if (!authorized(request, env.JARVIS_CLOUD_TOKEN)) return json({ error: "Unauthorized" }, 401);
      if (request.method === "POST" && path === "/api/tasks") {
        let body: any;
        try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
        const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
        const mode: TaskMode = body?.mode === "pc" ? "pc" : "cloud";
        if (!prompt || prompt.length > 12000) return json({ error: "Prompt must contain 1 to 12000 characters." }, 400);
        const id = crypto.randomUUID().replace(/-/g, "");
        const now = Date.now();
        await env.DB.prepare(
          "INSERT INTO tasks (id, prompt, mode, status, result, error, created_at, updated_at) VALUES (?, ?, ?, 'queued', '', '', ?, ?)"
        ).bind(id, prompt, mode, now, now).run();
        return json({ ok: true, task_id: id, mode, status: "queued" }, 201);
      }
      if (request.method === "GET" && path === "/api/tasks") {
        const { results } = await env.DB.prepare(
          "SELECT id, prompt, mode, status, result, error, created_at, updated_at FROM tasks ORDER BY created_at DESC LIMIT 100"
        ).all();
        return json({ tasks: results });
      }
      const match = path.match(/^\/api\/tasks\/([a-f0-9]{32})$/i);
      if (request.method === "GET" && match) {
        const task = await env.DB.prepare(
          "SELECT id, prompt, mode, status, result, error, created_at, updated_at FROM tasks WHERE id = ?"
        ).bind(match[1]).first();
        return task ? json(task) : json({ error: "Task not found" }, 404);
      }
    }

    return json({ error: "Not found" }, 404);
  },

  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(runCloudTasks(env));
  },
};
