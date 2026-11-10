"""HTTPS client for the Cloudflare JARVIS desktop task bridge."""
from __future__ import annotations
import asyncio
import json
import urllib.error
import urllib.request
import urllib.parse
from pathlib import Path
from typing import Any

class CloudBridge:
    def __init__(self, base_url: str, token: str, timeout: float = 20.0):
        self.base_url = base_url.rstrip("/")
        self.token = token
        self.timeout = timeout

    def _request(self, path: str, method: str = "GET", payload: dict | None = None) -> dict[str, Any]:
        data = None if payload is None else json.dumps(payload).encode("utf-8")
        request = urllib.request.Request(
            self.base_url + path, data=data, method=method,
            headers={"Authorization": f"Bearer {self.token}", "Accept": "application/json",
                     "Content-Type": "application/json", "User-Agent": "JARVIS-Desktop-Bridge/1.0"},
        )
        try:
            with urllib.request.urlopen(request, timeout=self.timeout) as response:
                raw = response.read(1_000_000)
        except urllib.error.HTTPError as exc:
            detail = exc.read(2000).decode("utf-8", errors="replace")
            raise RuntimeError(f"Cloud bridge HTTP {exc.code}: {detail}") from exc
        except (urllib.error.URLError, TimeoutError) as exc:
            raise RuntimeError(f"Cloud bridge connection failed: {exc}") from exc
        try:
            result = json.loads(raw.decode("utf-8"))
        except Exception as exc:
            raise RuntimeError("Cloud bridge returned invalid JSON") from exc
        if not isinstance(result, dict):
            raise RuntimeError("Cloud bridge returned an invalid response")
        return result


    async def sync_files(self) -> list[Path]:
        """Download all new phone uploads into the user's Downloads/JARVIS Cloud Files folder."""
        def _sync() -> list[Path]:
            destination = Path.home() / "Downloads" / "JARVIS Cloud Files"
            destination.mkdir(parents=True, exist_ok=True)
            saved: list[Path] = []
            cursor: str | None = None
            while True:
                query = "" if not cursor else "?cursor=" + urllib.parse.quote(cursor, safe="")
                request = urllib.request.Request(
                    self.base_url + "/bridge/files" + query,
                    headers={"Authorization": f"Bearer {self.token}", "Accept": "application/json"},
                )
                try:
                    with urllib.request.urlopen(request, timeout=self.timeout) as response:
                        payload = json.loads(response.read(1_000_000).decode("utf-8"))
                except Exception as exc:
                    raise RuntimeError(f"Cloud file listing failed: {exc}") from exc
                for item in payload.get("files", []):
                    key = str(item.get("key", ""))
                    name = str(item.get("name", "download"))
                    if not key.startswith("uploads/") or not name or Path(name).name != name:
                        continue
                    target = destination / name
                    if target.exists():
                        stem, suffix = target.stem, target.suffix
                        index = 2
                        while target.exists():
                            target = destination / f"{stem} ({index}){suffix}"
                            index += 1
                    url = self.base_url + "/bridge/file?key=" + urllib.parse.quote(key, safe="")
                    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {self.token}"})
                    try:
                        with urllib.request.urlopen(req, timeout=self.timeout) as response:
                            data = response.read(10 * 1024 * 1024 + 1)
                        if len(data) > 10 * 1024 * 1024:
                            continue
                        target.write_bytes(data)
                        saved.append(target)
                    except Exception:
                        continue
                cursor = payload.get("cursor")
                if not cursor:
                    break
            return saved
        return await asyncio.to_thread(_sync)

    async def create_pairing(self) -> dict[str, Any]:
        return await asyncio.to_thread(self._request, "/bridge/pairing", "POST", {})

    async def next_task(self) -> dict[str, Any] | None:
        result = await asyncio.to_thread(self._request, "/bridge/next")
        task = result.get("task")
        return task if isinstance(task, dict) else None

    async def complete(self, task_id: str, status: str, result: str = "", error: str = "") -> None:
        await asyncio.to_thread(self._request, "/bridge/complete", "POST", {
            "task_id": task_id, "status": status,
            "result": result[:30000], "error": error[:3000],
        })
