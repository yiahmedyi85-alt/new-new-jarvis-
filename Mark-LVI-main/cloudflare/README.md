# JARVIS Cloudflare backend

Cloudflare Worker + D1 backend for the online JARVIS service. The original desktop UI and dashboard source are kept in their existing folders.

## Current backend capabilities

- Cloud task queue processed by Gemini on the scheduled Worker.
- PC task queue for a desktop bridge.
- One-time 8-character phone pairing PINs, valid for 10 minutes.
- Phone sessions stored as SHA-256 token hashes in D1. Raw session tokens are returned once and are not stored.
- Authenticated task submission and status retrieval.
- Separate bridge authentication. The bridge secret must stay on the desktop and must never appear in browser code.

The existing phone HTML has not yet been adapted to these endpoints, and the desktop bridge client is not yet integrated. Do not treat this backend as a finished deployment.

## Create the D1 database

From this directory:

```bash
npm install
npx wrangler login
npx wrangler d1 create jarvis-cloud-db
```

Copy the returned database ID into `wrangler.toml`, replacing `REPLACE_WITH_D1_DATABASE_ID`.

Apply the current schema:

```bash
npx wrangler d1 execute jarvis-cloud-db --remote --file=./schema.sql
```

## Configure secrets

Generate a long random bridge token and set it as a Cloudflare secret:

```bash
npx wrangler secret put JARVIS_BRIDGE_TOKEN
npx wrangler secret put GEMINI_API_KEY
```

Do not commit secrets or paste them into GitHub. The phone browser receives a short-lived session token after pairing, never the bridge token or Gemini key.

## Deploy and check

```bash
npx wrangler deploy
```

Test `GET /health` on the deployed Worker URL.

## API outline

Desktop bridge, authenticated with `JARVIS_BRIDGE_TOKEN`:

- `POST /bridge/pairing` creates a one-time phone PIN.
- `GET /bridge/next` claims the next queued PC task.
- `POST /bridge/complete` returns a task result.

Phone:

- `POST /login` exchanges an 8-character PIN for a 12-hour session.
- Authenticated `POST /api/command` queues a PC task.
- Authenticated `POST /api/tasks` queues a cloud or PC task.
- Authenticated `GET /api/tasks` lists recent tasks.
- Authenticated `GET /api/tasks/<task_id>` reads one task.

## Limits

The scheduled Worker checks cloud tasks once per minute and processes at most one task per invocation. Cloudflare quotas apply. Gemini API usage may have separate limits or charges. Telephony providers generally charge for phone numbers and calls, so a free unlimited virtual number cannot be promised.
