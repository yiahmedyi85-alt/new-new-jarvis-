export interface Env {
  DB: D1Database;
  JARVIS_BRIDGE_TOKEN: string;
  GEMINI_API_KEY: string;
  GEMINI_MODEL?: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_FROM_NUMBER?: string;
  JARVIS_NOTIFY_NUMBER?: string;
}

type TaskMode = "cloud" | "pc";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function constantTimeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) {
    diff |= (a.charCodeAt(i % (a.length || 1)) || 0) ^ (b.charCodeAt(i % (b.length || 1)) || 0);
  }
  return diff === 0;
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}

function randomToken(bytes = 32): string {
  const data = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(data, b => b.toString(16).padStart(2, "0")).join("");
}

function bridgeAuthorized(request: Request, expected: string): boolean {
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  return Boolean(expected && supplied && supplied.length === expected.length && constantTimeEqual(supplied, expected));
}

async function userAuthorized(request: Request, env: Env): Promise<boolean> {
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  if (!supplied || supplied.length > 256) return false;
  const hash = await sha256(supplied);
  const row = await env.DB.prepare(
    "SELECT token_hash FROM sessions WHERE token_hash = ? AND expires_at > ?"
  ).bind(hash, Date.now()).first<{ token_hash: string }>();
  return Boolean(row);
}

async function gemini(prompt: string, env: Env): Promise<string> {
  if (!env.GEMINI_API_KEY) throw new Error("Gemini API key is not configured in Cloudflare.");
  const model = env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    }),
  });
  if (!response.ok) throw new Error("Gemini request failed (" + response.status + "): " + (await response.text()).slice(0, 1200));
  const data = await response.json() as any;
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const answer = parts.map((part: any) => typeof part.text === "string" ? part.text : "").filter(Boolean).join("\n").trim();
  if (!answer) throw new Error("Gemini returned an empty response.");
  return answer.slice(0, 30000);
}


async function notifyPhone(env: Env, status: "completed" | "failed", mode: "cloud" | "pc"): Promise<void> {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  const from = env.TWILIO_FROM_NUMBER;
  const to = env.JARVIS_NOTIFY_NUMBER;
  if (!sid || !token || !from || !to) return;
  const message = status === "completed"
    ? "JARVIS has completed your " + mode + " task."
    : "JARVIS encountered an error while processing your " + mode + " task.";
  const twiml = "<Response><Say voice=\"alice\">" + message + "</Say></Response>";
  const credentials = btoa(sid + ":" + token);
  const body = new URLSearchParams({ To: to, From: from, Twiml: twiml });
  try {
    const response = await fetch("https://api.twilio.com/2010-04-01/Accounts/" + sid + "/Calls.json", {
      method: "POST",
      headers: {
        "authorization": "Basic " + credentials,
        "content-type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 1000);
      console.error("JARVIS phone notification failed:", response.status, detail);
    }
  } catch (error) {
    console.error("JARVIS phone notification request failed:", error);
  }
}

async function runCloudTasks(env: Env): Promise<void> {
  const now = Date.now();
  await env.DB.prepare(
    "UPDATE tasks SET status = 'queued', updated_at = ? WHERE mode = 'cloud' AND status = 'running' AND updated_at < ?"
  ).bind(now, now - 10 * 60 * 1000).run();
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
    await notifyPhone(env, "completed", "cloud");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown task error";
    await env.DB.prepare(
      "UPDATE tasks SET status = 'failed', error = ?, updated_at = ? WHERE id = ?"
    ).bind(message.slice(0, 3000), Date.now(), row.id).run();
    await notifyPhone(env, "failed", "cloud");
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
      if (!bridgeAuthorized(request, env.JARVIS_BRIDGE_TOKEN)) return json({ error: "Unauthorized" }, 401);

      if (request.method === "POST" && path === "/bridge/pairing") {
        const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        const bytes = crypto.getRandomValues(new Uint8Array(8));
        const pin = Array.from(bytes, b => alphabet[b % alphabet.length]).join("");
        const pinHash = await sha256(pin);
        const now = Date.now();
        await env.DB.prepare("DELETE FROM pairing_codes WHERE expires_at <= ?").bind(now).run();
        await env.DB.prepare("INSERT INTO pairing_codes (pin_hash, expires_at) VALUES (?, ?)")
          .bind(pinHash, now + 10 * 60 * 1000).run();
        return json({ ok: true, pin, expires_in: 600 });
      }

      if (request.method === "GET" && path === "/bridge/next") {
        const now = Date.now();
        await env.DB.prepare(
          "UPDATE tasks SET status = 'queued', updated_at = ? WHERE mode = 'pc' AND status = 'running' AND updated_at < ?"
        ).bind(now, now - 30 * 60 * 1000).run();
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
        const updated = await env.DB.prepare(
          "UPDATE tasks SET status = ?, result = ?, error = ?, updated_at = ? WHERE id = ? AND mode = 'pc' AND status = 'running'"
        ).bind(body.status, String(body.result ?? "").slice(0, 30000), String(body.error ?? "").slice(0, 3000), Date.now(), body.task_id).run();
        if (!updated.meta.changes) return json({ error: "PC task not found or no longer running" }, 404);
        await notifyPhone(env, body.status, "pc");
        return json({ ok: true });
      }
      return json({ error: "Not found" }, 404);
    }

    if (request.method === "POST" && path === "/login") {
      let body: any;
      try { body = await request.json(); } catch { return json({ ok: false, error: "Invalid JSON" }, 400); }
      const pin = typeof body?.pin === "string" ? body.pin.trim().toUpperCase() : "";
      if (!/^[A-HJ-NP-Z2-9]{8}$/.test(pin)) return json({ ok: false, error: "Invalid or expired key" }, 401);
      const pinHash = await sha256(pin);
      const now = Date.now();
      await env.DB.prepare("DELETE FROM sessions WHERE expires_at <= ?").bind(now).run();
      const pairing = await env.DB.prepare(
        "SELECT pin_hash FROM pairing_codes WHERE pin_hash = ? AND expires_at > ?"
      ).bind(pinHash, now).first<{ pin_hash: string }>();
      if (!pairing) return json({ ok: false, error: "Invalid or expired key" }, 401);
      await env.DB.prepare("DELETE FROM pairing_codes WHERE pin_hash = ?").bind(pinHash).run();
      const token = randomToken();
      const tokenHash = await sha256(token);
      await env.DB.prepare("INSERT INTO sessions (token_hash, created_at, expires_at) VALUES (?, ?, ?)")
        .bind(tokenHash, now, now + 12 * 60 * 60 * 1000).run();
      return json({ ok: true, token, expires_in: 43200 });
    }

    if (path.startsWith("/api/")) {
      if (!await userAuthorized(request, env)) return json({ error: "Unauthorized" }, 401);

      if (request.method === "POST" && path === "/api/command") {
        let body: any;
        try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
        const prompt = typeof body?.text === "string" ? body.text.trim() : "";
        if (!prompt || prompt.length > 12000) return json({ error: "Command must contain 1 to 12000 characters." }, 400);
        const id = crypto.randomUUID().replace(/-/g, "");
        const now = Date.now();
        await env.DB.prepare(
          "INSERT INTO tasks (id, prompt, mode, status, result, error, created_at, updated_at) VALUES (?, ?, 'pc', 'queued', '', '', ?, ?)"
        ).bind(id, prompt, now, now).run();
        return json({ ok: true, task_id: id, status: "queued" }, 201);
      }

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

      if (request.method === "POST" && path === "/api/wake") {
        const id = crypto.randomUUID().replace(/-/g, "");
        const now = Date.now();
        await env.DB.prepare(
          "INSERT INTO tasks (id, prompt, mode, status, result, error, created_at, updated_at) VALUES (?, ?, 'pc', 'queued', '', '', ?, ?)"
        ).bind(id, "Wake up and report that you are ready for remote commands.", now, now).run();
        return json({ ok: true, task_id: id, message: "Wake request queued. Your computer must be on and JARVIS must be running." }, 201);
      }
    }

    if (request.method === "GET" && !path.startsWith("/api/") && !path.startsWith("/bridge/")) {
      const assetUrl = new URL(request.url);
      if (path === "/login") assetUrl.pathname = "/login.html";
      else if (path === "/") assetUrl.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }
    return json({ error: "Not found" }, 404);
  },

  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(runCloudTasks(env));
  },
};
