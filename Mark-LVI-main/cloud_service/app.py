"""Always-online JARVIS task service.

This service runs independently of the desktop application. Cloud-only tasks
run here. PC tasks wait until the desktop bridge connects and claims them.
Secrets are supplied through environment variables, never committed to Git.
"""
from __future__ import annotations

import asyncio
import os
import secrets
import sqlite3
import time
import uuid
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

import httpx
from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field

DATA_DIR = Path(os.getenv("JARVIS_DATA_DIR", "./data"))
DATA_DIR.mkdir(parents=True, exist_ok=True)
DB_PATH = DATA_DIR / "cloud_tasks.sqlite3"
API_TOKEN = os.getenv("JARVIS_CLOUD_TOKEN", "").strip()
BRIDGE_TOKEN = os.getenv("JARVIS_BRIDGE_TOKEN", "").strip()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
PUBLIC_BASE_URL = os.getenv("PUBLIC_BASE_URL", "").rstrip("/")
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "").strip()
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "").strip()
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "").strip()
OWNER_PHONE_NUMBER = os.getenv("OWNER_PHONE_NUMBER", "").strip()

def db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=20)
    conn.row_factory = sqlite3.Row
    return conn

def init_db() -> None:
    with db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                prompt TEXT NOT NULL,
                mode TEXT NOT NULL,
                status TEXT NOT NULL,
                result TEXT NOT NULL DEFAULT '',
                error TEXT NOT NULL DEFAULT '',
                created_at REAL NOT NULL,
                updated_at REAL NOT NULL
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status, created_at)")

def require_token(value: str | None, expected: str, label: str) -> None:
    if not expected:
        raise HTTPException(503, f"{label} is not configured on the server")
    supplied = (value or "").removeprefix("Bearer ").strip()
    if not secrets.compare_digest(supplied, expected):
        raise HTTPException(401, "Invalid token")

class TaskInput(BaseModel):
    prompt: str = Field(min_length=1, max_length=12000)
    mode: str = Field(default="cloud", pattern="^(cloud|pc)$")

class TaskOutput(BaseModel):
    id: str
    prompt: str
    mode: str
    status: str
    result: str
    error: str
    created_at: float
    updated_at: float

def row_task(row: sqlite3.Row) -> dict[str, Any]:
    return {k: row[k] for k in ("id", "prompt", "mode", "status", "result", "error", "created_at", "updated_at")}

async def run_gemini(prompt: str) -> str:
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is not configured")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 4096},
    }
    async with httpx.AsyncClient(timeout=120) as client:
        response = await client.post(url, params={"key": GEMINI_API_KEY}, json=payload)
        response.raise_for_status()
        data = response.json()
    parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
    answer = "\n".join(str(p.get("text", "")) for p in parts if p.get("text"))
    if not answer.strip():
        raise RuntimeError("Gemini returned an empty response")
    return answer.strip()

async def notify_by_phone(message: str) -> None:
    """Place an outbound voice call when Twilio credentials are configured."""
    if not all((TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, OWNER_PHONE_NUMBER, PUBLIC_BASE_URL)):
        return
    # TwiML is served from this service. Keep the spoken result short.
    twiml_url = f"{PUBLIC_BASE_URL}/voice/complete?message={httpx.QueryParams({'message': message[:900]})}"
    url = f"https://api.twilio.com/2010-04-01/Accounts/{TWILIO_ACCOUNT_SID}/Calls.json"
    async with httpx.AsyncClient(timeout=20, auth=(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)) as client:
        response = await client.post(url, data={
            "To": OWNER_PHONE_NUMBER,
            "From": TWILIO_FROM_NUMBER,
            "Url": twiml_url,
            "Method": "GET",
        })
        response.raise_for_status()

async def complete_task(task_id: str, status: str, result: str = "", error: str = "") -> None:
    now = time.time()
    with db() as conn:
        conn.execute(
            "UPDATE tasks SET status=?, result=?, error=?, updated_at=? WHERE id=?",
            (status, result[:30000], error[:3000], now, task_id),
        )
    if status == "completed":
        try:
            await notify_by_phone("Your JARVIS task is complete. " + (result[:500] or "Open your JARVIS dashboard to see the result."))
        except Exception as exc:
            # Task completion remains successful even if the phone provider fails.
            print(f"[JARVIS Cloud] Phone notification failed: {exc}")

async def cloud_worker() -> None:
    while True:
        task = None
        with db() as conn:
            row = conn.execute(
                "SELECT * FROM tasks WHERE mode='cloud' AND status='queued' ORDER BY created_at LIMIT 1"
            ).fetchone()
            if row:
                conn.execute("UPDATE tasks SET status='running', updated_at=? WHERE id=?", (time.time(), row["id"]))
                task = row_task(row)
        if not task:
            await asyncio.sleep(1.5)
            continue
        try:
            result = await run_gemini(task["prompt"])
            await complete_task(task["id"], "completed", result=result)
        except Exception as exc:
            await complete_task(task["id"], "failed", error=str(exc))

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    worker = asyncio.create_task(cloud_worker())
    yield
    worker.cancel()
    try:
        await worker
    except asyncio.CancelledError:
        pass

app = FastAPI(title="JARVIS Cloud", version="1.0.0", lifespan=lifespan)

@app.get("/health")
async def health():
    return {"ok": True, "service": "jarvis-cloud"}

@app.post("/api/tasks")
async def create_task(body: TaskInput, authorization: str | None = Header(default=None)):
    require_token(authorization, API_TOKEN, "JARVIS_CLOUD_TOKEN")
    task_id = uuid.uuid4().hex
    now = time.time()
    with db() as conn:
        conn.execute(
            "INSERT INTO tasks(id,prompt,mode,status,created_at,updated_at) VALUES(?,?,?,?,?,?)",
            (task_id, body.prompt.strip(), body.mode, "queued", now, now),
        )
    return {"ok": True, "task_id": task_id, "status": "queued", "mode": body.mode}

@app.get("/api/tasks")
async def list_tasks(authorization: str | None = Header(default=None)):
    require_token(authorization, API_TOKEN, "JARVIS_CLOUD_TOKEN")
    with db() as conn:
        rows = conn.execute("SELECT * FROM tasks ORDER BY created_at DESC LIMIT 100").fetchall()
    return {"tasks": [row_task(r) for r in rows]}

@app.get("/api/tasks/{task_id}")
async def get_task(task_id: str, authorization: str | None = Header(default=None)):
    require_token(authorization, API_TOKEN, "JARVIS_CLOUD_TOKEN")
    with db() as conn:
        row = conn.execute("SELECT * FROM tasks WHERE id=?", (task_id,)).fetchone()
    if not row:
        raise HTTPException(404, "Task not found")
    return row_task(row)

@app.get("/bridge/next")
async def bridge_next(authorization: str | None = Header(default=None)):
    require_token(authorization, BRIDGE_TOKEN, "JARVIS_BRIDGE_TOKEN")
    with db() as conn:
        row = conn.execute(
            "SELECT * FROM tasks WHERE mode='pc' AND status='queued' ORDER BY created_at LIMIT 1"
        ).fetchone()
        if not row:
            return {"task": None}
        conn.execute("UPDATE tasks SET status='running', updated_at=? WHERE id=?", (time.time(), row["id"]))
    return {"task": row_task(row)}

class BridgeResult(BaseModel):
    task_id: str
    status: str = Field(pattern="^(completed|failed)$")
    result: str = ""
    error: str = ""

@app.post("/bridge/complete")
async def bridge_complete(body: BridgeResult, authorization: str | None = Header(default=None)):
    require_token(authorization, BRIDGE_TOKEN, "JARVIS_BRIDGE_TOKEN")
    with db() as conn:
        exists = conn.execute("SELECT id FROM tasks WHERE id=? AND mode='pc'", (body.task_id,)).fetchone()
    if not exists:
        raise HTTPException(404, "PC task not found")
    await complete_task(body.task_id, body.status, body.result, body.error)
    return {"ok": True}

@app.get("/voice/complete", response_class=HTMLResponse)
async def voice_complete(message: str = "Your JARVIS task is complete."):
    # Twilio requests TwiML. Escape XML special characters before returning it.
    from xml.sax.saxutils import escape
    spoken = escape(message[:900])
    return HTMLResponse(
        f'<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice">{spoken}</Say></Response>',
        media_type="application/xml",
    )
