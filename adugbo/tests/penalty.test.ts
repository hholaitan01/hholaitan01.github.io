import { beforeAll, describe, expect, it } from "vitest";
import { initPhysics } from "../src/physics/PhysicsWorld";
import { PenaltySim } from "../src/game/sim/PenaltySim";
import { SIM_DT } from "../src/physics/constants";

beforeAll(() => initPhysics());

/** Takes the user's kick with an aim and power; returns the result. */
function userKick(sim: PenaltySim, z: number, y: number, power: number) {
  sim.aim = { z, y };
  sim.applyInput({ stick: { x: 0, y: 0 }, shoot: power }, SIM_DT);
  for (let i = 0; i < 6 / SIM_DT && sim.phase !== "result" && sim.phase !== "over"; i++) sim.fixedStep(SIM_DT);
  return sim.kicks[sim.kicks.length - 1]?.result;
}

describe("penalties", () => {
  it("placed shots into the corners mostly score; blasting at full power flies over or wide more often", () => {
    let placed = 0, blasted = 0;
    for (let seed = 1; seed <= 20; seed++) {
      const a = new PenaltySim("practice", "normal", "onipanu", "mushin", 0, undefined, seed);
      if (userKick(a, seed % 2 ? 0.85 : -0.85, 0.2, 0.55) === "goal") placed++;
      a.dispose();
      const b = new PenaltySim("practice", "normal", "onipanu", "mushin", 0, undefined, seed);
      if (userKick(b, seed % 2 ? 0.85 : -0.85, 0.9, 1) === "goal") blasted++;
      b.dispose();
    }
    expect(placed).toBeGreaterThanOrEqual(11);
    expect(blasted).toBeLessThan(placed);
  });

  it("the kick happens on the animation's contact frame from a run-up", () => {
    const sim = new PenaltySim("practice");
    sim.applyInput({ stick: { x: 0, y: 0 }, shoot: 0.5 }, SIM_DT);
    let shootAt = -1, kickAt = -1;
    for (let i = 0; i < 4 / SIM_DT && kickAt < 0; i++) {
      sim.fixedStep(SIM_DT);
      for (const e of sim.takeEvents()) {
        if (e.type === "action" && e.action === "shoot") shootAt = sim.time;
        if (e.type === "kick") kickAt = sim.time;
      }
    }
    expect(shootAt).toBeGreaterThan(0);
    expect(kickAt - shootAt).toBeCloseTo(sim.contacts.shoot, 1);
    // the kicker walked up to the ball: it is where his foot is at contact
    const cp = sim.contactPoint(sim.kicker, "shoot"), s = sim.spot;
    expect(Math.hypot(cp.x - s.x, cp.z - s.z)).toBeLessThan(0.25);
    sim.dispose();
  });

  it("in goal: diving the right way saves more than diving the wrong way", () => {
    const run = (right: boolean) => {
      let saves = 0;
      for (let seed = 1; seed <= 16; seed++) {
        const sim = new PenaltySim("shootout", "normal", "onipanu", "mushin", 1, undefined, seed); // the CPU (team 0) kicks first
        let dived = false;
        for (let i = 0; i < 8 / SIM_DT && sim.phase !== "result"; i++) {
          // peek at the CPU's plan once it runs up, then dive
          const plan = (sim as unknown as { cpuPlan: { z: number } | null }).cpuPlan;
          if (!dived && plan && sim.phase === "runup" && sim.phaseT > 0.3) {
            const side = Math.abs(plan.z) < 0.25 ? 0 : Math.sign(plan.z);
            sim.applyInput({ stick: { x: right ? side : side === 0 ? 1 : -side, y: 0 }, dive: true }, SIM_DT);
            dived = true;
          }
          sim.fixedStep(SIM_DT);
        }
        if (sim.kicks[0]?.result === "saved") saves++;
        sim.dispose();
      }
      return saves;
    };
    const good = run(true), bad = run(false);
    expect(good).toBeGreaterThan(bad + 3);
  });

  it("shootout: five each, decided early when one side can't catch up, then sudden death", () => {
    const sim = new PenaltySim("shootout");
    const set = (r: ("goal" | "miss")[]) => {
      sim.kicks.length = 0;
      r.forEach((res, i) => sim.kicks.push({ team: (i % 2) as 0 | 1, result: res }));
      return sim.decided();
    };
    expect(set(["goal", "miss", "goal", "miss", "goal", "miss"])).toBe(0); // 3–0 with two left for each: can't be caught
    expect(set(["goal", "miss", "goal", "miss"])).toBe(null); // 2–0, they still have three
    expect(set(["goal", "goal", "goal", "goal", "goal", "goal", "goal", "goal", "goal", "goal"])).toBe(null); // 5–5: sudden death
    expect(set([...Array(10).fill("goal"), "goal", "miss"] as ("goal" | "miss")[])).toBe(0);
    expect(set([...Array(10).fill("goal"), "goal"] as ("goal" | "miss")[])).toBe(null); // the other side still to kick
    sim.dispose();
  });

  it("a whole shootout against the CPU finishes with a winner", () => {
    const sim = new PenaltySim("shootout", "normal", "onipanu", "mushin", 0, undefined, 5);
    for (let k = 0; k < 400 && sim.phase !== "over"; k++) {
      if (sim.userKicking && sim.phase === "aim") userKick(sim, k % 2 ? 0.8 : -0.8, 0.25, 0.6);
      else sim.runFor(0.5);
    }
    expect(sim.phase).toBe("over");
    expect(sim.winner).not.toBeNull();
    expect(Math.abs(sim.taken(0) - sim.taken(1))).toBeLessThanOrEqual(1);
    sim.dispose();
  });
});
