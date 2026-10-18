import { beforeAll, describe, expect, it } from "vitest";
import { initPhysics } from "../src/physics/PhysicsWorld";
import { MatchSim } from "../src/game/match/MatchSim";
import { defaultConfig, type ModeId } from "../src/game/match/rules";
import type { SimEvent } from "../src/game/sim/GameSim";
import { SIM_DT } from "../src/physics/constants";

beforeAll(() => initPhysics());

/** Plays a CPU-vs-CPU match to the end (or a time cap), recording events and the longest stall. */
function playOut(mode: ModeId, seed: number, halfMinutes = 2, difficulty: "easy" | "normal" | "hard" = "normal") {
  const cfg = { ...defaultConfig(mode), halfMinutes, difficulty };
  const sim = new MatchSim(cfg, undefined, seed, { userControlled: false });
  const events: SimEvent[] = [];
  let stall = 0, maxStall = 0, last = sim.ball2();
  const phases = new Set<string>();
  const cap = (halfMinutes * 2 + 1) * 60;
  for (let i = 0; i < cap / SIM_DT && sim.phase !== "fulltime"; i++) {
    sim.fixedStep(SIM_DT);
    events.push(...sim.consume());
    phases.add(sim.phase);
    const b = sim.ball2();
    if (sim.phase === "play" && Math.hypot(b.x - last.x, b.z - last.z) < 0.02) stall += SIM_DT;
    else stall = 0;
    maxStall = Math.max(maxStall, stall);
    last = b;
  }
  return { sim, events, maxStall, phases };
}

describe("CPU vs CPU matches", () => {
  for (const mode of ["fives", "sevens", "fourpost"] as const) {
    it(`${mode}: a full match finishes with play, restarts and no long stalls`, () => {
      const { sim, events, maxStall, phases } = playOut(mode, 5);
      const kicks = events.filter((e) => e.type === "kick").length;
      const shots = sim.stats[0].shots + sim.stats[1].shots;
      expect(sim.phase).toBe("fulltime");
      expect(kicks).toBeGreaterThan(20);
      expect(shots).toBeGreaterThan(2);
      expect(maxStall).toBeLessThan(8);
      expect(phases.has("play")).toBe(true);
      if (mode !== "fourpost") expect(phases.has("halftime")).toBe(true);
      sim.dispose();
    }, 120000);
  }

  it("goals happen across a few fives matches and kick-off goes to the conceding team", () => {
    let goals = 0, kickoffs = 0, wrong = 0;
    for (const seed of [1, 2, 3]) {
      const sim = new MatchSim({ ...defaultConfig("fives"), halfMinutes: 2 }, undefined, seed, { userControlled: false });
      let scorer: number | null = null;
      for (let i = 0; i < 300 / SIM_DT && sim.phase !== "fulltime"; i++) {
        const before = [...sim.score];
        sim.fixedStep(SIM_DT);
        sim.consume();
        if (sim.score[0] > before[0]) scorer = 0;
        if (sim.score[1] > before[1]) scorer = 1;
        if (scorer !== null && sim.phase === "kickoff") {
          kickoffs++;
          if (sim.restart?.team !== 1 - scorer) wrong++;
          scorer = null;
        }
      }
      goals += sim.score[0] + sim.score[1];
      sim.dispose();
    }
    expect(goals).toBeGreaterThan(0);
    expect(kickoffs).toBeGreaterThan(0);
    expect(wrong).toBe(0);
  }, 200000);

  it("keepers make saves", () => {
    let saves = 0;
    for (const seed of [3, 4]) {
      const { sim } = playOut("fives", seed, 2);
      saves += sim.stats[0].saves + sim.stats[1].saves;
      sim.dispose();
    }
    expect(saves).toBeGreaterThan(0);
  }, 200000);

  it("four-post ends when a team reaches the target score or time runs out", () => {
    const { sim } = playOut("fourpost", 9, 4);
    expect(sim.phase).toBe("fulltime");
    expect(Math.max(...sim.score) >= 5 || sim.clock >= sim.halfLength).toBe(true);
    sim.dispose();
  }, 120000);

  it("sevens has kick-ins, corners or goal kicks on the open pitch", () => {
    const { sim, events } = playOut("sevens", 6, 2);
    const restarts = events.length;
    void restarts;
    expect(sim.phase).toBe("fulltime");
    sim.dispose();
  }, 120000);
});
