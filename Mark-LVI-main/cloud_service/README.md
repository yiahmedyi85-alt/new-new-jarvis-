# JARVIS Cloud Service

This service is the always-online task layer. It is separate from the original PyQt desktop application, so cloud-only tasks can run while the laptop is off. PC-mode tasks stay queued until the desktop bridge is online.

## Run locally

```bash
cd cloud_service
python -m venv .venv
# Activate the environment, then:
pip install -r requirements.txt
export JARVIS_CLOUD_TOKEN='use-a-long-random-secret'
export JARVIS_BRIDGE_TOKEN='use-a-different-long-random-secret'
export GEMINI_API_KEY='your-Gemini-key'
uvicorn app:app --host 0.0.0.0 --port 8000
```

Use the equivalent environment-variable syntax in Windows PowerShell. Keep real keys in the host's secret/environment settings, never in Git.

## API

- `GET /health` checks service availability.
- `POST /api/tasks` accepts `{"prompt":"...","mode":"cloud"}` or `{"prompt":"...","mode":"pc"}`. Send `Authorization: Bearer JARVIS_CLOUD_TOKEN`.
- `GET /api/tasks` and `GET /api/tasks/{task_id}` read task status using the same token.
- The desktop bridge uses `GET /bridge/next` and `POST /bridge/complete` with `JARVIS_BRIDGE_TOKEN`.

Cloud tasks call Gemini directly using `GEMINI_API_KEY`. PC tasks remain queued until a desktop bridge is connected. The bridge integration with the original JARVIS runtime is a separate step and must be installed on the user's computer before PC tasks can execute.

## Persistent storage

Mount a persistent volume at `JARVIS_DATA_DIR`. The service uses SQLite for its task queue. Without persistent storage, tasks can be lost when the host replaces the container.

## Phone calls

Outbound calls are optional. Configure `PUBLIC_BASE_URL`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, and `OWNER_PHONE_NUMBER` in the hosting provider's secret settings. Calls are attempted after a task completes. The service does not buy or provision a phone number. Telephony provider accounts, number availability, identity checks, and charges depend on the provider and country. Have a parent or guardian handle any account that requires an adult account holder.

## Current scope

This is the cloud task API foundation, not the completed phone dashboard or PC bridge client. The existing desktop UI and local dashboard are left unchanged. Do not expose this API publicly until strong secrets and HTTPS are configured.
