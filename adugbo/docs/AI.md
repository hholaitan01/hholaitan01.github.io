# AI

`src/ai/TeamAI.ts` runs one brain per team; `src/game/match/MatchSim.ts` runs goalkeeper saves and the rules.

## States (shown by the in-match AI debug overlay: button or F3, or start with `?debug`)

| State | Who | Behaviour |
|---|---|---|
| `carry` | ball carrier | every decision interval scores shoot / pass / dribble (plus difficulty noise) and acts; dribbling bends away from the nearest opponent |
| `receive` | intended receiver | runs to the closest point on the ball's path |
| `support` | team in possession | formation slot shifted with the ball, then drifts away from the nearest marker to open a lane |
| `press` | nearest defender | closes down goal-side of the carrier; tackles when the ball is exposed (timing set by difficulty) |
| `cover` | second defender | sits 4 m goal-side of the carrier |
| `mark` | other defenders | goal-side of the nearest unmarked opponent |
| `chase` | quickest player | runs onto a loose ball's predicted position |
| `hold` | everyone else | formation slot |
| `keeper` / `keeper-hold` | goalkeeper | narrows the angle, claims loose balls, smothers at an attacker's feet, holds then distributes |
| `take` / `wait` | restarts | the taker plays it after a reaction delay; others take position |

Off-ball players re-plan at the difficulty's reaction interval, so an easy CPU is visibly slow to respond.

## Difficulty

`src/ai/difficulty.ts`. The difficulty applies to the CPU side only; the user's AI team-mates play at normal.

The first version made "hard" more aggressive (pressed further, tackled more, shot from further out) and it **lost**
to easy over 8 matches (10–20 on goals). Single-parameter ablations against normal (10 matches each) showed:
low decision noise (17–4) and shooting only from good range (10–3) win matches; frequent tackling (4–12) and long
shooting (5–6) lose them; faster reactions alone were neutral. The table was retuned from that evidence.

Current results (`tests/difficulty.test.ts`, 10 seeded 2×2-minute 5s matches per pairing, identical team ratings,
sides swapped every match):

| Pairing | Goals | W–L |
|---|---|---|
| hard v easy | 20–3 | 8–0 |
| hard v normal | 13–3 | 6–1 |
| normal v easy | 17–4 | 8–0 |

(After the stage 6 animation work defenders face the ball while jockeying, which widened the margins; the first
tuning pass had hard v normal at 8–7.) Easy CPUs attempt about three times as many tackles as hard ones; success
rates per attempt are similar (~24–26%).
