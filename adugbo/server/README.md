# ADUGBO online server

Cloudflare Worker + Durable Objects for online play: guest passes, rankings (Elo), quick/ranked matchmaking, friendly
rooms with codes, spectating and the live-match list. The football runs in the players' browsers (the home player hosts);
this server relays and keeps score. See `src/index.ts` and `docs/ONLINE.md` in the game folder.

## Run locally

```bash
cd adugbo/server
npm ci
npm run dev            # http://127.0.0.1:8787 (local Durable Objects, data under .wrangler/)
node test/server.e2e.mjs   # 27 checks against it (about 40 s with the forfeit check; SKIP_FORFEIT=1 for 5 s)
```

Point a local game at it: open `http://localhost:5173/?server=http://127.0.0.1:8787` (the address is remembered).
`npm run test:e2e:online` in the game folder runs the browser test against it.

## Deploy

Needs a Cloudflare account (the Workers free plan is enough: SQLite-backed Durable Objects are included).

```bash
cd adugbo/server
npx wrangler login     # or set CLOUDFLARE_API_TOKEN (template "Edit Cloudflare Workers") and CLOUDFLARE_ACCOUNT_ID
npm run deploy         # prints the URL, e.g. https://adugbo-server.<your-subdomain>.workers.dev
```

Then build the game with that address and publish it:

```bash
cd adugbo
VITE_ADUGBO_SERVER=https://adugbo-server.<your-subdomain>.workers.dev npm run build:pages
```

Until a server address is built in (or given with `?server=`), the game's online screens say online play isn't
connected; nothing pretends to be live.

## Free-plan budget

Durable Object requests on the free plan are limited per day. Incoming WebSocket messages count (20 messages = 1
request): a match sends about 20 snapshots + up to 30 inputs a second, about 2.5 requests a second, so roughly
9,000 per hour of play. Outgoing messages to the guest and spectators are free.
