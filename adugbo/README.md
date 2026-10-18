# ADUGBO: Street Kings

A browser street-football game built with TypeScript, React, Vite, three.js and Rapier.
Work is delivered in stages. **Current stage: 4 — match modes and menus.** Animation and audio polish come in later stages and are not in the build yet. Touch controls are not built; practice needs a keyboard.

## Commands

```bash
npm install --legacy-peer-deps   # see note below
npm run dev            # dev server at http://localhost:5173
npm run build          # typecheck + production build to dist/
npm run preview        # serve dist/ at http://localhost:4173
npm run typecheck
npm run lint
npm test               # unit tests (vitest)
npm run test:e2e       # browser tests (Playwright + Chromium; builds first)
npm run inspect:assets # writes docs/asset-inspection.json
```

`--legacy-peer-deps`: the installed npm crashed resolving the React 19 / eslint peer ranges; the flag
works around it and does not change versions.

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
- Modes: **Street 5s** (cage, keepers), **7-a-side** (open turf, kick-ins, corners, goal kicks), **Four posts**
  (no keepers, bollard goals, configurable players a side, goal width, first-to score, cage or open street), and
  **Practice**. The rules screen text is generated from the same config the engine uses.
- Six fictional teams with home/away kits (automatic clash switch), keeper kits, ratings that feed the simulation.
- Match engine (`src/game/match/MatchSim.ts`): kick-offs (opponents held out of the circle), restarts with 4 m
  distance, goals, half-time, full-time, first-to-N, stats (possession, shots, on target, passes, tackles, saves).
- Keepers: narrow the angle, react to shots with a skill/difficulty-based chance, step-save or dive, catch or parry,
  claim loose balls and smother in their area, then throw or kick out.
- Pause menu (resume, restart, quit), full-time screen (stats, rematch, quit), How to play, Settings.
- Not implemented (stated in the rules screen): fouls, cards, penalties, offside, substitutions, multiplayer.

## Docs
- `docs/ASSET_MANIFEST.md` — sources, licences, decisions, face limitation and workflow
- `docs/THIRD_PARTY_NOTICES.md` — notices that must ship with the game
- `tools/pipeline/README.md` — how the character GLB was built
