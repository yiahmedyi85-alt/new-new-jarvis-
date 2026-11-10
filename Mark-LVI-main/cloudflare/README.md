# JARVIS Cloudflare backend

Cloudflare Worker + D1 backend for the online JARVIS service. The original desktop UI and dashboard source are kept in their existing folders.

## Current backend capabilities

- Cloud task queue processed by Gemini on the scheduled Worker.
- PC task queue for a desktop bridge.
- One-time 8-character phone pairing PINs, valid for 10 minutes.
- Phone sessions stored as SHA-256 token hashes in D1. Raw session tokens are returned once and are not stored.
- Authenticated task submission and status retrieval.
- Separate bridge authentication. The bridge secret must stay on the desktop and must never appear in browser code.

The cloud phone page now uses the original dashboard layout with cloud login, task submission, and task-result polling. The desktop app has an optional bridge client. On startup it reads `cloud_worker_url` and `cloud_bridge_token` from `config/api_keys.json`, creates a 10-minute pairing PIN, and prints it in the desktop activity log. The original desktop audio pipeline remains intact, including Gemini Live audio output through the selected computer speaker. The phone dashboard now has an optional spoken-reply toggle using the phone browser's speech synthesis. Phone microphone input currently uses browser speech-to-text. The original full-duplex PCM phone audio relay and cloud file transfer are not yet implemented.

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

## Configure the desktop bridge

After deployment, add these two fields to the existing `Mark-LVI-main/config/api_keys.json` file on the desktop. Keep the bridge token private.

```json
{
  "cloud_worker_url": "https://YOUR-WORKER.workers.dev",
  "cloud_bridge_token": "YOUR_LONG_RANDOM_BRIDGE_TOKEN"
}
```

Merge these fields into the existing JSON object. Do not replace your current Gemini settings. Restart JARVIS. It will print a one-time phone pairing PIN in the activity log. Enter that PIN on the cloud dashboard login page.

## Configure secrets

Generate a long random bridge token and set it as a Cloudflare secret:

```bash
npx wrangler secret put JARVIS_BRIDGE_TOKEN
npx wrangler secret put GEMINI_API_KEY
```

Do not commit secrets or paste them into GitHub. The phone browser receives a short-lived session token after pairing, never the bridge token or Gemini key.

Optional phone-call alerts use a Twilio account and a purchased/authorized Twilio number. The account owner must be an adult or have the provider's required guardian authorization. Calls are not free. Add the credentials as Cloudflare secrets:

```bash
npx wrangler secret put TWILIO_ACCOUNT_SID
npx wrangler secret put TWILIO_AUTH_TOKEN
npx wrangler secret put TWILIO_FROM_NUMBER
npx wrangler secret put JARVIS_NOTIFY_NUMBER
```

Use phone numbers in international E.164 format, for example `+201XXXXXXXXX`. If these four secrets are absent, JARVIS skips phone calls and tasks still complete normally.

## Deploy and check

```bash
npx wrangler deploy
```

Test `GET /health` on the deployed Worker URL. It checks the Worker and D1 connection and reports whether the Gemini key is configured.

After pairing your phone, you can test the real Gemini API connection with the authenticated endpoint:

```bash
curl -X POST https://YOUR-WORKER.workers.dev/api/test-gemini \\
  -H "Authorization: Bearer YOUR_PHONE_SESSION_TOKEN"
```

A successful response confirms that Cloudflare can reach Gemini using the configured secret. This test makes a small Gemini API request.

## Cloud file sharing

Create the R2 bucket once before deployment:

```bash
npx wrangler r2 bucket create jarvis-cloud-files
```

The phone dashboard supports authenticated uploads and downloads through this bucket. Each file is limited to 10 MB. R2 has a free monthly allowance, but usage beyond the current allowance can incur charges. Check Cloudflare's current R2 pricing before enabling it. The desktop bridge does not yet automatically sync these R2 files into the PC's local upload folder.

## Use the phone dashboard

- Send a normal message to queue a PC task. The computer must be powered on and JARVIS must be running.
- Start a message with `!cloud ` to run a Gemini cloud task. This works while the computer is off.
- The dashboard checks task status every four seconds and displays the result when ready.
- Browser microphone input uses speech-to-text where supported.
- Turn on the speaker button in the phone dashboard to hear completed replies using your phone's built-in speech voice. This is browser text-to-speech, not the original Gemini Live voice.

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
