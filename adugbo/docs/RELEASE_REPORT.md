# ADUGBO: Street Kings — release-readiness report

Date: 2026-10-18 · Stack: TypeScript, React 19, Vite 8, three.js r186, Rapier 0.21.

This report states only what was built and actually run. Where something was not tested, it says so.

## 1. Verdict

A browser football game with three match modes against the CPU, penalty shootouts and penalty practice, practice
drills, a ball designer, daily jobs, CPU opponents at three difficulty levels, a Lagos-inspired venue in day and evening
lighting, audio and settings, plus online play (friendly rooms, quick and ranked matchmaking, an Elo rankings table and
watching live matches) through a small Cloudflare server in `server/`. Computers play with the keyboard; phones and
tablets get an eFootball-style touch pad (never shown on desktop). It builds and passes its automated checks.

It has **not been run on any real device**. Every browser test used Chromium with software (SwiftShader) WebGL on a
server; the touch pad was tested with real touch events on an emulated phone. **The online server has not been
deployed**: online play was tested between browsers on one machine against the server running locally under
Cloudflare's own runtime (`wrangler dev`). Until it is deployed and its address built in, the live game's online
screens say online play isn't connected.

## 2. Commands

```bash
cd adugbo
npm ci                 # install exactly the locked versions (Node 22, npm 10 tested)
npm run dev            # http://localhost:5173
npm run typecheck
npm run lint
npm test               # 60 unit/simulation tests (Vitest, Node)
npm run test:e2e       # builds, then 7 Playwright browser suites (needs Chromium; see tests/e2e/browser.mjs)
cd server && npm ci && npm run dev    # the online server on 127.0.0.1:8787 (another terminal)
node server/test/server.e2e.mjs       # 27 server checks over real HTTP/WebSocket
npm run test:e2e:online               # online play in real browsers against that server
npm run build          # production build → dist/
npm run build:pages    # production build → play/ (what GitHub Pages serves)
npm run inspect:assets # regenerates docs/asset-inspection.json
```

`npm install` from scratch (no lockfile) crashed in this environment's npm (`Cannot read properties of null
(reading 'edgesOut')`); `npm install --legacy-peer-deps` works around it. `npm ci` with the committed lockfile needs no flag.

## 3. Features

| Area | What works |
|---|---|
| Modes | Street 5s (cage, monkey posts: 1.5 m × 0.75 m framed goals, no keepers) · 7-a-side (open turf; kick-ins, corners, goal kicks) · Four posts (no keepers, bollard goals; players a side, goal width, first-to score and walls configurable) · Practice (free play, 60 s target shooting, 60 s passing circuit) |
| More modes | Penalty shootout v CPU (five each, early finish, sudden death; you kick and keep) · Training: practice court and penalty practice with a streak · Ball designer (8 patterns × 3 colours, presets, 3D preview; your ball is used in your matches) · Today's job (one of ten daily challenges, week strip) |
| Online | Friendly rooms with a 5-letter code or link · Quick match (anyone, 90-second halves) · Ranked (rating bands widening ±100 → ±250 → anyone; Elo K = 32) · Rankings table · Watch live matches (search, watcher count, reactions) · 30-second forfeit · online name and "let others watch" in Settings. See `docs/ONLINE.md` |
| Flow | Main menu → setup (mode, teams, side, difficulty, length, day/evening) → rules screen generated from the same config the engine uses → kick-off → pause (resume, restart, quit) → full-time stats (possession, shots, on target, passes, tackles, saves) → rematch |
| Teams | Fourteen street sides named after Lagos neighbourhoods (Onipanu, Mushin, Ojuelegba, Idumota and more) with home/away kits, automatic kit-clash switch, distinct keeper kits, ratings that feed the simulation |
| Physics (Rapier) | Ball mass, bounce, rolling resistance per surface, air drag, Magnus curl; posts, crossbar, nets, boards and chain-link fence as colliders; whole-ball-over-the-line goals |
| Gameplay | Acceleration and turn-rate-limited movement; dribbling by real touches timed to the gait (the animation's foot meets each push; the ball rolls freely between touches); first touch that depends on ball pace and control (clean / heavy / ricochet); interceptions; ground, lofted and headed passes solved to arrive at pace; shots with a power-versus-accuracy trade-off; standing and sliding tackles; air kicks if the ball has gone before the contact frame |
| Keepers | Narrow the angle, react to shots (step or dive, catch or parry), body blocks, claim loose balls and smother in the area, then throw or kick out |
| AI | Per-team state machine (carry, receive, support, press, cover, mark, chase, keeper, restarts); easy/normal/hard; in-match debug overlay (F3 / button) |
| Animation | 38 clips. Stride speeds and foot-plant phases measured from the clips at load; phase-synced 8-way locomotion blend; kicks fire on measured contact frames, the kicker adjusting his steps to meet the ball (it is never pulled to the foot); random celebration and fall variants |
| Venue | Procedural Lagos-inspired cage court: sun-bleached cracked concrete with faded green-white-green paint and a painted centre roundel, red laterite earth, broken tarmac with black-and-yellow kerbs, slogan boards, brightly painted buildings with barred windows and zinc roofs, invented shop signs, yellow minibuses, stalls, poles and cables, floodlights, mural, animated spectators. Day and evening |
| Audio | CC0 impact samples (kicks, shots, woodwork, boards, fence, net, tackles), synthesised whistle, crowd and street ambience; master/effects/crowd volume and mute, saved |
| Touch | eFootball-style pad on phones and tablets only (`(hover: none) and (pointer: coarse)`): floating stick; PASS (flick: lofted), THROUGH (flick: lofted), SHOOT (hold), DASH when attacking; SWITCH, SLIDE, TACKLE, DASH when defending; BALL in practice. Multi-touch |
| Orientation | Landscape only on phones and tablets: held upright, a rotate screen covers the app and any match or drill pauses; where the browser allows it (Android Chrome) the first tap goes fullscreen and locks landscape. iOS Safari has no orientation lock, so the rotate screen is what enforces it there. Desktop windows are never blocked |
| Settings | Graphics low/medium/high (resolution, antialiasing, shadows, normal maps, environment lighting, crowd size), time of day, sound; saved in localStorage |
| Tools | Player lab with kit/face/number editor and an animation viewer (every clip, scrub, slow motion, jump-to-contact, foot trails) |

## 4. Controls

Touch (phones and tablets): see the README's touch section or How to play in the game.

Keyboard:

| Key | With the ball | Without the ball |
|---|---|---|
| W A S D / arrows | move | move |
| Shift | sprint | sprint |
| Space or J | pass (tap firm to a team-mate, hold to play into space) | switch to the player nearest the ball |
| I | through ball into a runner's path | — |
| K (hold) | shoot; hold longer for power (less accurate, rises) | standing tackle |
| L | lofted pass | slide tackle |
| Q | — | switch player |
| P / Esc | pause | pause |
| M | mute / unmute | mute / unmute |

Aim shots across the goal by holding up/down on release. Practice adds R (ball back to your feet).

## 5. Test results (all run on 2026-10-18)

| Suite | Result |
|---|---|
| Typecheck (`tsc -b`) | pass |
| Lint (ESLint + typescript-eslint + react-hooks) | pass, 0 warnings |
| Unit/simulation (Vitest) | **60/60** in 9 files (adds online: two humans in one match, snapshot playback and interpolation, input clamping, Elo and bands; penalties: scoring rates, contact frame, keeper dives, shootout rules, a whole shootout; daily jobs). The original 6 files: asset manifest, locomotion blend space, Rapier physics (bounce, rolling distance vs analytic value, net, post, bar, Magnus curl, boards, fence), gameplay (dribbling by touches, turning, walk-in goal, pass-and-return, contact timing and alignment, air kick, interception, first touch, shot accuracy, target drill), full CPU-vs-CPU matches in all three modes, shoot-near-an-opponent tackles, difficulty ordering |
| Browser — Player lab (`lab.e2e.mjs`) | **26/26**: model, contact frames, every button drives the state machine, directional clips, rendered foot on its contact point (≤ 3 mm), viewer, head swap, desktop + phone-landscape viewports |
| Browser — Practice (`practice.e2e.mjs`) | **12/12**: real key events for dribble, shot and goal, pass and return, audio unlock and sounds, mute persistence, drills, pause/resume, menu |
| Browser — Venue (`venue.e2e.mjs`) | **21/21**: day/evening × quality × desktop/phone; player and ball contrast against the ground; goal kept in shot |
| Browser — Match (`match.e2e.mjs`) | **14/14**: setup, four-post house rules on the rules screen, kick-off by keyboard, whistle, AI debug overlay, pause, full-time stats, rematch, quit, how-to-play, settings |
| Browser — Orientation (`orientation.e2e.mjs`) | **8/8**: rotate screen on upright phones, pause while upright, desktop never blocked |
| Browser — Touch (`touch.e2e.mjs`) | **16/16**: pad on an emulated phone and never on desktop; real touch events for stick, PASS, flick-up lofted pass, THROUGH, SHOOT with power bar, DASH with two fingers, defending layout, SWITCH and TACKLE |
| Browser — Modes (`modes.e2e.mjs`) | **12/12**: home tiles and today's job, a real penalty (aim, power, kick) and a real dive, the end screen, penalty practice, training, ball designer save, and the saved ball used in play |
| Server (`server/test/server.e2e.mjs`) | **27/27** against `wrangler dev`: guest passes and bad tokens, friendly room seats and a full room, start with teams and the host's ball, snapshots to guest and spectator, input only to the host, live list, reactions, results, ranked pairing and Elo +16/−16, rankings and position, quick pairing, watching turned off, a 30-second forfeit |
| Browser — Online (`online.e2e.mjs`) | **15/15**, three browsers against the local server: create and join a friendly room, ready, the guest's keys move the guest's player in the host's match, the guest's screen follows (within 1.5 m), the match on the Watch list, a spectator, watcher count, reactions, full time on both screens; two fresh players through ranked matchmaking to a ±16 rating change and the rankings table; the "not connected" screen without a server |
| Fresh clone | `npm ci`, typecheck, lint, test, build all pass from a clean clone |

Difficulty, monkey-post 5s (10 seeded 2×2-minute matches per pairing, identical ratings, sides swapped): hard v easy
32–12 (W8 L2), hard v normal 15–8 (W6 L2), normal v easy 35–27 (W5 L3). Over 30 matches per pairing: 113–34, 45–26
and 114–66. Hard v normal is the closest; see `docs/AI.md` for the retuning and its evidence.

Two checks were reworked during this audit because they were testing the environment, not the game: the browser
tests now wait for rendered frames rather than fixed times (software WebGL ran at 1–20 fps), and an earlier test of
"hard CPUs win more of their tackles" was dropped because the data did not support it.

## 6. Performance notes

Measured in headless Chromium with **software** WebGL, so frame rates say nothing about real GPUs. The CPU-side and
scene-size numbers are representative.

| Case | Draw calls | Triangles | Sim CPU / frame | Anim CPU / frame | JS heap |
|---|---|---|---|---|---|
| Desktop, high, day | 389 | 164 k | 0.7 ms | 0.4 ms | 37 MB |
| Desktop, high, evening | 681 | 223 k | 0.7 ms | ≤ 0.4 ms | 37 MB |
| Phone viewport, medium, day | 377 | 121 k | 0.7 ms | 0.3 ms | 35 MB |
| Phone viewport, low, evening | 189 | 59 k | 0.3 ms | 0.1 ms | 35 MB |

Before this audit, high/day was 1,221 draw calls and 777 k triangles. Three changes brought it down:
- static venue meshes merged by material (202 → 143 meshes);
- spectators no longer cast shadows;
- floodlight shadow maps are only rendered in the evening, from two masts instead of four.

Download: the menu loads 241 KB of JavaScript (76 KB gzipped). The game code loads when a 3D screen opens: 4.4 MB
(1.7 MB gzipped), most of it Rapier's WebAssembly embedded as base64. On top of that come the footballer (3.7 MB),
textures (0.9 MB) and audio (63 KB).

Not done: no measurement on real phones, tablets or GPUs; no thermal or battery testing; no texture compression
(KTX2); no LODs for players; Rapier is not loaded as a separate `.wasm` (that would save about 30% of that chunk).

## 7. Asset and licence audit

- `public/assets/manifest.json` lists every shipped asset file with its source, author, licence, commercial use,
  modification, attribution and redistribution terms. `tests/manifest.test.ts` fails the build if a file is missing
  from it, cites an unknown source, or is a raw FBX.
- Sources: Microsoft Rocketbox (MIT), Mixamo (Adobe terms; baked into the game, no raw files), Quaternius UAL (CC0),
  CMU mocap (free incl. commercial, credited), ambientCG textures (CC0), Kenney Impact Sounds (CC0), Barlow Condensed
  (SIL OFL, bundled). Licence texts ship in `licences/`; an in-game Credits screen shows the notices.
- `git ls-files` contains 0 FBX files. The production build makes no third-party network requests.
- Everything else is generated in code and original: teams, kits, badges, shop names, minibuses, mural, ball,
  whistle and crowd sounds. There is no music, no commentary, no real club or brand.
- **Faces:** the heads are generic Rocketbox stock avatars. They are not Nigerian likenesses and have no custom facial
  features. `docs/ASSET_MANIFEST.md` gives a legal workflow for original variations.
- **Open item:** Adobe's Mixamo FAQ returned HTTP 403 to this environment, so its terms were confirmed from Adobe
  community answers quoting it. Re-read it yourself before a public release.

## 8. Known limitations

- **Not tested on real devices** or browsers other than Chromium; Safari/iOS is untested. The touch pad has only
  been driven in emulation.
- No fouls, cards, penalties in matches (the shootout is its own mode), offside, substitutions or stamina. The rules
  screen states this.
- **Online play is not deployed** (see Deployment) and has only been tested on one machine. The home player's browser
  runs the match and is trusted with it; the guest sees it about 0.1–0.2 s late with no prediction; a hidden host tab
  stalls the match; there is no host migration. Details in `docs/ONLINE.md`.
- Online penalty shootouts (Monkey Post has them) are not built; penalties are against the CPU.
- No local (same-device) two-player mode.
- Teams keep the same ends for the whole match.
- The touch pad's defending layout has no eFootball "match-up" (auto-press) button, because the game has no such
  action. Its buttons are mapped to what the game does have (switch, slide, tackle, dash).
- The match setup lives in memory, so reloading the match page returns to setup.
- Headers have a fixed contact time of 0.3 s (not measured from the clip). There are no dedicated turn clips; turning
  uses side-steps.
- Keeper animations are Mixamo clips. They do not reach exactly to the ball the way the kicks are aligned.

## 9. Deployment

The build is static: any static host works, and paths are relative (`base: "./"`), so it can live in a sub-folder.

**GitHub Pages (this repository):** the site is served from the `main` branch with no build step. The production
build is committed in `adugbo/play/`.
1. Merge this branch into `main`.
2. The game is then at `https://hholaitan01.github.io/adugbo/play/`.

To update it later:
1. `cd adugbo && npm ci && npm run build:pages`
2. Commit `adugbo/play/` and push to `main`.

Opening `https://hholaitan01.github.io/adugbo/` (without `/play/`) shows the unbuilt source page, which does not run.
Use the `/play/` URL.

**Other hosts:** `npm run build`, then upload `dist/` (Netlify, Cloudflare Pages, Vercel or any static server).

**Online server:** see `server/README.md`. `cd server && npx wrangler login && npm run deploy` on a Cloudflare account
(the Workers free plan is enough), then rebuild the game with `VITE_ADUGBO_SERVER=<the printed URL> npm run build:pages`.
Without that, everything except online play works; the online screens say so.
