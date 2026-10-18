import { beforeAll, describe, expect, it } from "vitest";
import { initPhysics } from "../src/physics/PhysicsWorld";
import { MatchSim } from "../src/game/match/MatchSim";
import { defaultConfig, type Difficulty } from "../src/game/match/rules";
import { SIM_DT } from "../src/physics/constants";

beforeAll(() => initPhysics());

/** Plays n 2×2-minute CPU-vs-CPU 5s matches between difficulty a and b, swapping sides every match. */
function series(a: Difficulty, b: Difficulty, n: number, seed0: number) {
  let gf = 0, ga = 0, wins = 0, losses = 0;
  const tackles = { a: 0, aWon: 0, b: 0, bWon: 0 };
  for (let i = 0; i < n; i++) {
    const side = i % 2;
    // identical team ratings, so only behaviour differs
    const sim = new MatchSim({ ...defaultConfig("fives", "yab", "sur"), halfMinutes: 2 }, undefined, seed0 + i, {
      userControlled: false,
      teamDifficulty: side === 0 ? [a, b] : [b, a],
    });
    for (let j = 0; j < 300 / SIM_DT && sim.phase !== "fulltime"; j++) {
      sim.fixedStep(SIM_DT);
      for (const e of sim.consume())
        if (e.type === "tackle") {
          const mine = sim.players[e.player].team === side;
          tackles[mine ? "a" : "b"]++;
          if (e.success) tackles[mine ? "aWon" : "bWon"]++;
        }
    }
    gf += sim.score[side];
    ga += sim.score[1 - side];
    if (sim.score[side] > sim.score[1 - side]) wins++;
    if (sim.score[side] < sim.score[1 - side]) losses++;
    sim.dispose();
  }
  console.log(`${a} v ${b}: goals ${gf}-${ga}, W${wins} L${losses}, tackles ${tackles.aWon}/${tackles.a} v ${tackles.bWon}/${tackles.b}`);
  return { gf, ga, wins, losses, tackles };
}

describe("CPU difficulty ordering (10 seeded matches per pairing)", () => {
  it("hard beats easy", () => {
    const r = series("hard", "easy", 10, 700);
    expect(r.gf).toBeGreaterThan(r.ga);
    expect(r.wins).toBeGreaterThan(r.losses);
    // easy dives in more often and wins a smaller share of its tackles
    expect(r.tackles.b).toBeGreaterThan(r.tackles.a);
    expect(r.tackles.aWon / Math.max(1, r.tackles.a)).toBeGreaterThan(r.tackles.bWon / Math.max(1, r.tackles.b));
  }, 600000);

  it("hard beats normal", () => {
    const r = series("hard", "normal", 10, 700);
    expect(r.gf).toBeGreaterThan(r.ga);
    expect(r.wins).toBeGreaterThan(r.losses);
  }, 600000);

  it("normal beats easy", () => {
    const r = series("normal", "easy", 10, 700);
    expect(r.gf).toBeGreaterThan(r.ga);
    expect(r.wins).toBeGreaterThan(r.losses);
  }, 600000);
});
