# ADUGBO: Street Kings

A browser street-football game built with TypeScript, React, Vite, three.js and Rapier.
Work is delivered in stages. **See `docs/RELEASE_REPORT.md` for the release-readiness audit: test results, performance,
licences, limitations and deployment.** Computers play with the keyboard; phones and tablets get an eFootball-style touch
pad (hidden on desktop) and are landscape-only. Touch has been tested in emulated Chromium only, not on a real device.

## Commands

```bash
npm ci                 # install the locked dependency versions
npm run dev            # dev server at http://localhost:5173
npm run build          # typecheck + production build to dist/
npm run preview        # serve dist/ at http://localhost:4173
npm run typecheck
npm run lint
npm test               # unit tests (vitest)
npm run test:e2e       # browser tests (Playwright + Chromium; builds first)
npm run inspect:assets # writes docs/asset-inspection.json
```

Playable build for GitHub Pages: `npm run build:pages` writes `play/`; after merging to `main` the game is at
https://hholaitan01.github.io/adugbo/play/. (A from-scratch `npm install` without the lockfile needs `--legacy-peer-deps`.)

## Stage 1: what works
- `public/assets/characters/footballer.glb`: one realistic footballer (Microsoft Rocketbox, MIT) with 8 swappable
  heads and 38 retargeted clips.
- `PlayerPrefab` (`src/game/PlayerPrefab.ts`): kit colours via shader (shirt, trim, shorts, socks, boots, 8 patterns,
  long sleeves), name and number printed on the back and number on the chest, head and hair variants, skin tone,
  animation state machine (idle / walk / jog / sprint / dribble / turn) with one-shot actions (pass, shoot, kick,
  header, cheer) and a `contact` event on the ball-strike frame.
- Player test scene (the page that opens now): every control drives the real prefab.

## Stage 2: what works
- Rapier ball physics (`src/physics/PhysicsWorld.ts`): 0.43 kg ball, bounce (e≈0.68), rolling resistance per surface,
  quadratic air drag, Magnus curl from spin, posts / crossbar / net / boards as colliders, kinematic player bodies
  that block aerial balls, whole-ball-over-the-line goal check.
- Gameplay core (`src/game/sim/GameSim.ts`, rendering-free): acceleration and turn-rate-limited movement, close-control
  dribbling with real touches, first touch that depends on ball speed and control rating (clean / heavy / ricochet),
  interceptions, ground passes solved to arrive at a set pace, lofted passes, headers, shots with power-vs-accuracy
  error, air kicks when the ball has gone before the contact frame. Kicks fire on the animation's contact frame.
- Practice (`#/practice`): free play, target shooting (60 s), passing circuit with two partners who receive and
  return passes (60 s); pause, restart, drill switch, menu.

## Stage 3: what works
- "Adugbo court" (`src/render/venue/`): fenced concrete cage pitch in a Lagos-inspired street — plastered 1–3 storey
  blocks with barred windows and zinc roofs, ground-floor shops with invented painted signs, yellow minibuses,
  market umbrellas, plastic chairs, power poles and cables, street lamps, floodlight masts, an original mural, and
  animated spectators (sitting, chatting, cheering on goals).
- Day and evening lighting (evening: low sun, floodlights, sodium street lamps, lit windows and signs).
- The chain-link fence is a physics collider, so balls skied over the boards stay in the cage.
- Graphics quality low / medium / high (pixel ratio, antialiasing, shadows, normal maps, environment lighting,
  spectator and prop counts; blob shadows on low). Saved in localStorage; switchable in practice.
- Browser test renders day and evening at each quality on desktop and phone-landscape viewports and checks that the
  player and ball stand out from the ground (luminance contrast or CIE ΔE) and that the goal stays in shot.

## Stage 4: what works
- Main menu → Play match → mode, teams, side, CPU difficulty, length, time of day → rules for this match → kick-off.
- Modes: **Street 5s** (cage, monkey posts: 1.5 m × 0.75 m goals, no keepers), **7-a-side** (open turf, kick-ins, corners, goal kicks), **Four posts**
  (no keepers, bollard goals, configurable players a side, goal width, first-to score, cage or open street), and
  **Practice**. The rules screen text is generated from the same config the engine uses.
- Fourteen street sides named after Lagos neighbourhoods (Onipanu, Mushin, Ojuelegba, Idumota and more) with home/away kits (automatic clash switch), keeper kits, ratings that feed the simulation.
- Match engine (`src/game/match/MatchSim.ts`): kick-offs (opponents held out of the circle), restarts with 4 m
  distance, goals, half-time, full-time, first-to-N, stats (possession, shots, on target, passes, tackles, saves).
- Keepers: narrow the angle, react to shots with a skill/difficulty-based chance, step-save or dive, catch or parry,
  claim loose balls and smother in their area, then throw or kick out.
- Pause menu (resume, restart, quit), full-time screen (stats, rematch, quit), How to play, Settings.
- Not implemented (stated in the rules screen): fouls, cards, penalties, offside, substitutions, multiplayer.

## Stage 5: what works
- State-based team AI (carry / receive / support / press / cover / mark / chase / keeper / restarts) — see `docs/AI.md`.
- Easy / normal / hard change reaction time, decision noise, skill and pace scaling, pressing distance, tackle rate
  and timing, shooting range and keeper ability. Verified ordering: hard > normal > easy over seeded CPU-vs-CPU series.
- AI debug overlay in matches (button or F3): each CPU player's state, target and reasoning, plus match state.

## Stage 6: what works
- Stride speeds and foot-plant phases are measured from every locomotion clip at load (no guessed values).
- Locomotion is a phase-synced blend space: idle → walk → jog → sprint by speed, eight-way direction blending
  (backpedal, strafe, diagonals), keeper shuffles, turn-on-the-spot side steps. Defenders and keepers face the ball
  while moving slowly, so the directional clips are used in matches.
- Kick contact: the kicker adjusts his steps during the wind-up so the animation's foot meets the ball on the contact
  frame (the ball is never pulled toward the foot). Verified in the sim: gap ≤ 0.03 m standing, jogging and sprinting.
- Dribbling is a series of real touches timed to the gait: the sim owns the gait phase and the animation follows it,
  so each push lands when a foot reaches forward (phases measured from the dribble and sprint clips). Between touches
  the ball rolls freely and slows on the surface; sharp turns get a cut or drag-back, stopping gets a sole trap.
- Variety: random celebration (cheer, dance, hop, jump) and fall (trip, two slides) clips; desynchronised idles.
- Profiling: animation cost per frame shown in the HUD; spectators animate every other frame on low/medium.
- Animation viewer in the Player lab: every clip with source, scrubbing, slow motion, jump-to-contact, measured
  stride, direction control and foot trails for spotting foot sliding.

## Stage 7: what works
- Sound: ball kicks scaled by strike speed, shots, post/crossbar, boards, fence, net and tackle impacts (Kenney CC0),
  stereo-panned by screen position; synthesised referee whistle on kick-offs, goals, half-time and full-time;
  synthesised crowd murmur that swells near the goals, "ooh" on saves and woodwork, roar on goals; street rumble.
- Master / effects / crowd volume and mute in Settings, mute button in practice and matches, M key. Saved.
- Graphics quality low / medium / high in Settings and in practice (see stage 3), day/evening per match.

## Touch controls (phones and tablets)
- Shown only where the main pointer is a touch screen and there is no hover (`(hover: none) and (pointer: coarse)`),
  so desktops, including touch-screen laptops, keep the keyboard and never see it.
- Left half: floating stick that appears under the thumb. Right: four eFootball-style buttons that change with
  possession. Attacking: PASS (flick up: lofted), THROUGH (into the runner's path; flick up: lofted), SHOOT (hold for
  power) and DASH. Defending: SWITCH, SLIDE, TACKLE and DASH. Practice adds a BALL button. Multi-touch works, for
  example stick plus DASH plus a pass.
- The pad feeds the same input object as the keyboard, so every button does exactly what its key does.
- `tests/e2e/touch.e2e.mjs` drives it with real touch events (Chrome DevTools protocol) on an emulated phone and checks
  that it is absent on desktop. It has not been tried on a physical phone or tablet.

## Venue look
- Court floor: sun-bleached concrete with cracks, faded green-white-green and yellow paint splashes, a hand-painted
  centre roundel and sand blown onto the edges. Around it: red laterite earth, a strip of broken tarmac with
  black-and-yellow kerbs, boards painted with slogans (ADUGBO, BALL NA LIFE, EKO O NI BAJE…), and brightly painted
  houses. All drawn in code. Stalls, umbrellas, chairs and minibuses are unchanged.

## Docs
- `docs/RELEASE_REPORT.md` — release-readiness audit
- `docs/AI.md` — AI states and difficulty tuning evidence
- `docs/ASSET_MANIFEST.md` — sources, licences, decisions, face limitation and workflow
- `docs/THIRD_PARTY_NOTICES.md` — notices that must ship with the game
- `tools/pipeline/README.md` — how the character GLB was built
