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

Street 5s now plays to monkey posts with no keepers, and dribbling became real touches that can be nicked. That
reshuffled the order (easy briefly beat normal: they won loose touches by tackling everything), so it was retuned:

- a tackle is likelier to win a ball pushed away from the carrier than one at his feet, so timing matters;
- `skill` now also scales defending;
- with no keepers, normal and hard CPUs leave a last man back once the opponents have the ball in their third (easy
  CPUs don't). Dropping a man back as soon as the ball was lost was tried for hard: over 30 seeded matches it cost
  them more than it saved, so it was dropped.

Checked over 30 seeded 2×2-minute matches per pairing (three seed sets, the same side at both ends, sides swapped):
hard v easy 113–34 on goals (W25 L3), normal v easy 114–66 (W18 L8), hard v normal 45–26 (W19 L8).

`tests/difficulty.test.ts` runs 10 of them per pairing:

| Pairing | Goals | W–L |
|---|---|---|
| hard v easy | 32–12 | 8–2 |
| hard v normal | 15–8 | 6–2 |
| normal v easy | 35–27 | 5–3 |

Hard v normal is the closest pairing. With a different seed set, 10 matches can go the other way (one set gave 8–14),
which is why the 30-match check above is the evidence. Easy CPUs still attempt several times as many tackles.
