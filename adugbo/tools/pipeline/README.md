# Character pipeline (reference scripts)

These are the exact scripts that produced `public/assets/characters/footballer.glb`. They ran in the
development workspace with the raw downloads beside them, so their relative paths (`../rb`, `../mocap`,
`../kerbside/assets`) refer to that layout. **The raw inputs are deliberately not in this repository**:
Mixamo's terms forbid redistributing raw FBX files, and the Rocketbox/CMU originals are large.

To rebuild, download the sources yourself into `raw-sources/` (git-ignored) and adjust the paths:

| Step | Script | Input | Output |
|---|---|---|---|
| 1 | `rbtex.py` | Rocketbox `Sports_Male_03` TGA textures | body texture with kit areas desaturated (`body_k5.png`) and per-region masks |
| 2 | `heads.py` | 7 other Rocketbox avatars | head textures + skin tint measurements |
| 3 | `packrb.mjs` | `Sports_Male_03` converted to glTF (`sm03raw.glb`) + heads | packed body GLB with 8 heads on one 80-joint skin |
| 4 | `mocap.mjs` | CMU BVH files 10_03, 49_02, 79_69 (+ others) | in-place clips retargeted to the Rocketbox rig |
| 5 | `mixamo.mjs` | Your own Mixamo FBX downloads ("without skin") | in-place, trimmed clips retargeted to the Rocketbox rig |
| 6 | `export-footballer.mjs` | the above loaded in a browser page | `footballer.glb` (float attributes, kit region in `COLOR_0.r = region/8`) |

After rebuilding, run `npm run inspect:assets` and update `public/assets/manifest.json`.
