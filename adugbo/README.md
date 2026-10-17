# ADUGBO: Street Kings

A browser street-football game built with TypeScript, React, Vite, three.js and Rapier.
Work is delivered in stages. **Current stage: 1 — character pipeline, player prefab and test scene.**
Later stages (gameplay, venue, modes, AI, polish) are not in the build yet.

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

## Docs
- `docs/ASSET_MANIFEST.md` — sources, licences, decisions, face limitation and workflow
- `docs/THIRD_PARTY_NOTICES.md` — notices that must ship with the game
- `tools/pipeline/README.md` — how the character GLB was built
