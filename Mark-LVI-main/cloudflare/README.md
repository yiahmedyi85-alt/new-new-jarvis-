# JARVIS Cloudflare backend

This is the first Cloudflare-native backend step. It uses a Worker and D1 instead of the Python/SQLite service in `cloud_service/`. The original desktop application and its UI are not changed.

## What this version does

- Accepts authenticated cloud and PC tasks.
- Stores task state in Cloudflare D1.
- Runs one queued cloud task per scheduled invocation through the Gemini REST API.
- Holds PC tasks until the desktop bridge claims them.
- Provides authenticated task status and bridge endpoints.

## What is not connected yet

- The existing phone dashboard still uses the local FastAPI/WebSocket routes. It is not yet compatible with this Worker API.
- The desktop app does not yet poll the cloud bridge or send task results back.
- Phone calls and push notifications are not configured.
- No live deployment has been performed.

## Create the D1 database

From this directory, install dependencies and authenticate with Wrangler:

```bash
npm install
npx wrangler login
npx wrangler d1 create jarvis-cloud-db
```

Copy the returned database ID into `wrangler.toml`, replacing `REPLACE_WITH_D1_DATABASE_ID`.

Apply the schema:

```bash
npx wrangler d1 execute jarvis-cloud-db --remote --file=./schema.sql
```

## Configure secrets

Generate two different long random tokens. Then set secrets:

```bash
npx wrangler secret put JARVIS_CLOUD_TOKEN
npx wrangler secret put JARVIS_BRIDGE_TOKEN
npx wrangler secret put GEMINI_API_KEY
```

Keep these values private. Never commit them to GitHub or put them in frontend JavaScript.

## Deploy

```bash
npx wrangler deploy
```

The API URL will be printed by Wrangler. Test `GET /health` first.

## API

All API calls require `Authorization: Bearer <JARVIS_CLOUD_TOKEN>` unless stated otherwise.

- `GET /health`
- `POST /api/tasks` with JSON `{"prompt":"Summarize this topic","mode":"cloud"}` or `{"prompt":"Open my editor","mode":"pc"}`
- `GET /api/tasks`
- `GET /api/tasks/<task_id>`

The desktop bridge uses the separate `JARVIS_BRIDGE_TOKEN`:

- `GET /bridge/next`
- `POST /bridge/complete` with `{"task_id":"...","status":"completed","result":"..." }`

## Free-plan expectations

Cloudflare free quotas apply. This is not unlimited hosting, and Gemini API usage may have separate limits or charges. The scheduled worker checks for cloud tasks on a one-minute schedule, so cloud execution is not instantaneous.
