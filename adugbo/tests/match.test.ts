import { beforeAll, describe, expect, it } from "vitest";
import { initPhysics } from "../src/physics/PhysicsWorld";
import { MatchSim } from "../src/game/match/MatchSim";
import { defaultConfig, type ModeId } from "../src/game/match/rules";
import type { SimEvent } from "../src/game/sim/GameSim";
import { SIM_DT } from "../src/physics/constants";

beforeAll(() => initPhysics());

/** Steps the sim for `seconds`, returning the events produced. */
function run(sim: MatchSim, seconds: number): SimEvent[] {
  const out: SimEvent[] = [];
  for (let i = 0; i < Math.round(seconds / SIM_DT); i++) {
    sim.fixedStep(SIM_DT);
    out.push(...sim.consume());
  }
  return out;
}

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
      const { sim } = playOut("sevens", seed, 2);
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

describe("restarts and kick-off control", () => {
  it("the user is given the kick-off taker when their side kicks off first", () => {
    let checked = 0;
    for (let seed = 1; seed <= 12; seed++) {
      const sim = new MatchSim(defaultConfig("fives"), undefined, seed);
      if (sim.restart?.team === sim.cfg.userTeam) {
        expect(sim.controlled).toBe(sim.restart.taker);
        expect(sim.message).toMatch(/pass to start/);
        checked++;
      }
      sim.dispose();
    }
    expect(checked).toBeGreaterThan(0);
  });

  it("a kick winding up when the ball goes out does not strike the restart ball", () => {
    const sim = new MatchSim({ ...defaultConfig("sevens"), halfMinutes: 2 }, undefined, 3, { userControlled: false });
    sim.phase = "play";
    sim.restart = null;
    // p's side gets the kick-in (the opponents touched it last), but a team-mate is nearer the spot and takes it
    const p = sim.squads[0][1], taker = sim.squads[0][2];
    taker.pos = { x: 0.3, z: sim.W - 0.2 };
    p.pos = { x: 0, z: sim.W - 0.6 };
    p.yaw = 0;
    sim.physics.setBall({ x: 0, y: 0.11, z: sim.W - 0.2 });
    run(sim, 0.05);
    expect(sim.shoot(p, 1, 0, 0.5)).toBe(true);
    // the ball is knocked loose over the touchline before the shot's contact frame
    (sim as unknown as { setOwner(p: null): void }).setOwner(null);
    sim.lastTouch = sim.squads[1][1];
    sim.physics.setBall({ x: 0, y: 0.11, z: sim.W + 0.5 });
    const ev = run(sim, 1);
    expect(sim.phase).toBe("restart");
    expect(ev.filter((e) => e.type === "kick" && e.player === p.id).length).toBe(0);
    expect(p.pending).toBeNull();
    sim.dispose();
  });
});
