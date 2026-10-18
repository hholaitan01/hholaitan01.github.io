# Online play, rankings, watching, penalties, ball designer and today's job

These features follow what Monkey Post (monkeypost.xyz) offers, built our own way. This page records what was
observed on their site (by using it in a browser and reading the network requests and the JavaScript it ships, on
2026-10-18) and what ADUGBO does. No code, art, text or names were copied from it.

## What Monkey Post has (observed)

| Area | Observed |
|---|---|
| Menu | Play match (exhibition v CPU), Penalty shootout, Training (free play, penalty practice), Online multiplayer, Rankings, Watch matches, Settings, "Today's job" with a Monday–Sunday strip, a "Cred" currency |
| Identity | A guest id in localStorage and a session id; optional email/password or Google sign-in; signing in is needed for quick and ranked play |
| Backend | A REST API (guest session, presence, match start/events/finish, leaderboard, ranked status, analytics) and a separate realtime server |
| Realtime | Colyseus (an open-source room server) over WebSockets. Clients send input batches; the server sends state snapshots and deltas, clock sync, lobby state, seats, ready checks, reactions and spectator counts. The match runs on their server |
| Matchmaking | Queue keys built from region, rating band and ping band; the band widens from ±100 to ±250 to "open" while waiting. Quick matches have 90-second halves. Bots ("house" opponents) can fill an empty queue |
| Watching | A live list (`/live`) with players, teams, score, half, clock, spectator count and mode; spectators join the same match room with a "spectate" flag; players can turn watching off |
| Rankings | A ranked leaderboard (wins, draws, losses, rating) |
| Ball designer | Not found in their game. This is an ADUGBO addition |

## What ADUGBO does

| Area | ADUGBO |
|---|---|
| Menu | Home with Today's job and the week strip, a Rankings card, and tiles for Play match (our Street 5s monkey post, 7-a-side, Four posts), Penalty shootout, Training (our practice court and drills, plus penalty practice), Online multiplayer, Ball designer, Watch matches, Settings. How to play, Player lab and Credits stay |
| Identity | A guest pass (id + secret token) made on first use and kept in localStorage; the server stores only a hash of the token. Name editable. No email accounts (none needed for any mode) |
| Server | One Cloudflare Worker (`server/`): a Lobby Durable Object (SQLite: players, ranked results, live list; matchmaking sockets) and one Room Durable Object per match |
| Realtime | Host-relayed, not server-simulated: the home player's browser runs the real MatchSim with both players' inputs and sends 20 snapshots a second; the other player sends input (presses at once, the stick at up to 30 Hz) and draws snapshots 120 ms behind with interpolation; spectators draw the same snapshots. The Room only relays and keeps the score for the live list |
| Matchmaking | Quick (anyone, two 90-second halves, unrated) and Ranked (band ±100 for 10 s, ±250 until 25 s, then anyone). No bots: after 45 s the queue screen says nobody else is searching and offers the CPU instead |
| Friendly | Create a room, share the 5-character code or link; guests can play. Team pick and ready-up in the lobby |
| Rankings | Elo, K = 32, start 1000. A ranked result counts once, and only when both players report the same final score. Leaving a match for 30 s forfeits it (and the rating) |
| Watching | Live list of watchable matches (search by player), spectator count shown to players, emoji reactions. Turning off "Let others watch my online matches" in Settings hides your matches |
| Penalties | Shootout v CPU (five each, decided early when one side can't catch up, then sudden death) and unlimited penalty practice with a streak. Aim with the stick, hold shoot for power; dive with the stick and an action button |
| Ball designer | Eight patterns × three colours, six presets, a 3D preview you can spin. The saved ball is used in all your matches; online, the home player's ball is the match ball |
| Today's job | One of ten challenges a day (same for everyone on a date), checked from real results on this device |

## Limits (stated plainly)

- The host's browser is trusted with the match. A modified client could lie about a ranked score; requiring both
  players to report the same score stops one-sided claims but not a host who fakes what the guest sees. A
  server-simulated match (as Monkey Post does) would close that gap.
- The guest sees the match about 0.1–0.2 s late (half the round trip plus the 120 ms buffer) and their own moves take
  a round trip to show. There is no client-side prediction.
- If the host's tab is hidden, browsers stop its animation loop, so the match stalls for both. Keep the game on screen.
- If the host leaves, the match ends (forfeit after 30 s); there is no host migration.
- Online play has been tested between browsers on one machine against the local server (`wrangler dev`), not across
  real networks or phones, and the server has not been deployed from this environment.
