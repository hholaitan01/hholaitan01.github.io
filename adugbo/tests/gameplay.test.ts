import { beforeAll, describe, expect, it } from "vitest";
import { initPhysics } from "../src/physics/PhysicsWorld";
import { PracticeSim } from "../src/game/sim/PracticeSim";
import { GameSim, type SimEvent } from "../src/game/sim/GameSim";
import { SimPlayer, len, sub, v2 } from "../src/game/sim/SimPlayer";
import { PRACTICE_PITCH } from "../src/game/pitch";
import { BALL_R, SIM_DT } from "../src/physics/constants";

beforeAll(() => initPhysics());

/** Runs fixed steps, collecting events; `each` may return true to stop early. */
function run(sim: GameSim, seconds: number, each?: (t: number) => boolean | void): SimEvent[] {
  const all: SimEvent[] = [];
  for (let i = 0; i < Math.round(seconds / SIM_DT); i++) {
    sim.fixedStep(SIM_DT);
    const stop = each?.(i * SIM_DT);
    all.push(...sim.takeEvents());
    if (stop) break;
  }
  return all;
}

describe("dribbling and movement", () => {
  it("keeps the ball while jogging and sprinting 14 m", () => {
    const sim = new PracticeSim("free");
    run(sim, 0.5);
    expect(sim.owner).toBe(sim.user);
    sim.user.intent = { move: v2(1, 0), sprint: false };
    let maxGap = 0;
    run(sim, 1.5, () => void (maxGap = Math.max(maxGap, len(sub(sim.ball2(), sim.user.pos)))));
    sim.user.intent = { move: v2(1, 0), sprint: true };
    run(sim, 1.4, () => void (maxGap = Math.max(maxGap, len(sub(sim.ball2(), sim.user.pos)))));
    expect(sim.owner).toBe(sim.user);
    expect(sim.user.pos.x).toBeGreaterThan(10);
    expect(maxGap).toBeLessThan(1.6);
    sim.dispose();
  });

  it("turns back with the ball within a second", () => {
    const sim = new PracticeSim("free");
    run(sim, 0.4);
    sim.user.intent = { move: v2(1, 0), sprint: false };
    run(sim, 1.2);
    sim.user.intent = { move: v2(-1, 0), sprint: false };
    run(sim, 1.0);
    expect(sim.owner).toBe(sim.user);
    expect(sim.user.vel.x).toBeLessThan(-1);
    expect(sim.ball2().x).toBeLessThan(sim.user.pos.x + 0.2);
    sim.dispose();
  });

  it("can walk the ball into an empty goal without shooting", () => {
    const sim = new PracticeSim("free");
    sim.user.pos = v2(14, 0);
    sim.ballToUser();
    run(sim, 0.3);
    sim.user.intent = { move: v2(1, 0), sprint: false };
    const ev = run(sim, 4, () => sim.user.pos.x > 19.5);
    run(sim, 1.2);
    expect([...ev, ...sim.takeEvents()].some((e) => e.type === "goal") || sim.state.goals > 0).toBe(true);
    sim.dispose();
  });
});

describe("passing and receiving", () => {
  it("passes to a partner, who controls it and returns it to the user", () => {
    const sim = new PracticeSim("passing");
    run(sim, 0.4);
    const recv = sim.pass(sim.user, sub(sim.partners[1].pos, sim.user.pos), 0.5);
    expect(recv).toBe(sim.partners[1]);
    let got = -1, back = -1;
    run(sim, 6, (t) => {
      if (got < 0 && sim.owner === sim.partners[1]) got = t;
      if (got > 0 && sim.owner === sim.user) {
        back = t;
        return true;
      }
    });
    sim.consume();
    expect(got).toBeGreaterThan(0);
    expect(back).toBeGreaterThan(got);
    sim.dispose();
  });

  it("the kick happens on the animation contact frame", () => {
    const sim = new PracticeSim("free", { pass: 0.2, shoot: 0.5, kick: 0.3, header: 0.3 });
    run(sim, 0.4);
    sim.pass(sim.user, sub(sim.partners[0].pos, sim.user.pos), 0.5);
    const actionAt = sim.time;
    expect(sim.events.some((e) => e.type === "action" && e.action === "pass")).toBe(true);
    let kickAt = -1;
    run(sim, 1, () => {
      if (sim.events.some((e) => e.type === "kick")) kickAt = sim.time;
      return kickAt > 0;
    });
    expect(kickAt - actionAt).toBeGreaterThan(0.19);
    expect(kickAt - actionAt).toBeLessThan(0.22);
    sim.dispose();
  });

  it("a ball that is gone before contact is an air kick", () => {
    const sim = new PracticeSim("free");
    run(sim, 0.4);
    sim.shoot(sim.user, 1, 0, 0.5);
    sim.physics.setBall({ x: sim.user.pos.x - 5, y: BALL_R, z: 3 });
    const ev = run(sim, 0.8);
    expect(ev.some((e) => e.type === "miss")).toBe(true);
    expect(ev.some((e) => e.type === "kick")).toBe(false);
    sim.dispose();
  });

  it("an opponent standing in the lane intercepts a pass", () => {
    const sim = new GameSim(PRACTICE_PITCH);
    const a = sim.addPlayer(new SimPlayer(0, 0, v2(-10, 0), { pace: 0.7, control: 0.8, passing: 0.9, shooting: 0.6 }, "A"));
    const b = sim.addPlayer(new SimPlayer(1, 0, v2(6, 0), { pace: 0.7, control: 0.8, passing: 0.8, shooting: 0.6 }, "B"));
    const c = sim.addPlayer(new SimPlayer(2, 1, v2(-2, 0.2), { pace: 0.7, control: 0.8, passing: 0.8, shooting: 0.6 }, "C"));
    a.yaw = Math.PI / 2;
    sim.physics.setBall({ x: -9.6, y: BALL_R, z: 0 });
    run(sim, 0.3);
    sim.pass(a, v2(1, 0), 0.5);
    run(sim, 2.5, () => sim.owner !== null && sim.owner !== a);
    expect(sim.owner).toBe(c);
    void b;
    sim.dispose();
  });

  it("first touch: a hard-driven ball ricochets, a firm pass is controlled", () => {
    const outcome = (speed: number) => {
      const sim = new GameSim(PRACTICE_PITCH);
      const p = sim.addPlayer(new SimPlayer(0, 0, v2(0, 0), { pace: 0.7, control: 0.6, passing: 0.7, shooting: 0.6 }, "P"));
      p.yaw = -Math.PI / 2;
      sim.physics.setBall({ x: 6, y: BALL_R, z: 0 }, { x: -speed, y: 0, z: 0 });
      const ev = run(sim, 2, () => sim.events.some((e) => e.type === "touch"));
      const t = ev.find((e) => e.type === "touch");
      sim.dispose();
      return t && t.type === "touch" ? t.quality : "none";
    };
    expect(outcome(9)).toBe("clean");
    expect(outcome(35)).toBe("deflect");
  });
});

describe("shooting", () => {
  const shots = (x: number, power: number, n = 12) => {
    let goals = 0;
    for (let s = 1; s <= n; s++) {
      const sim = new PracticeSim("free", undefined, s * 97);
      sim.user.pos = v2(x, 0);
      sim.ballToUser();
      run(sim, 0.3);
      sim.shoot(sim.user, 1, (s % 2 ? 1 : -1) * (power > 0.8 ? 0.85 : 0.6), power);
      run(sim, 3, () => {
        if (sim.physics.goalCheck()) goals++;
        return !!sim.physics.goalCheck();
      });
      sim.dispose();
    }
    return goals / n;
  };

  it("a placed shot from 10 m usually scores; a full-power shot from 25 m is far less reliable", () => {
    const close = shots(10, 0.4);
    const far = shots(-5, 1.0);
    expect(close).toBeGreaterThanOrEqual(0.75);
    expect(far).toBeLessThan(close);
  });

  it("target drill scores a target hit", () => {
    const sim = new PracticeSim("targets", undefined, 3);
    sim.user.pos = v2(12, 0);
    sim.ballToUser();
    run(sim, 0.3);
    let hit = false;
    // aim at the lit target and keep trying until one lands (error is random)
    for (let i = 0; i < 12 && !hit; i++) {
      const t = [-1, 1, -1, 1][sim.state.litTarget];
      sim.shoot(sim.user, 1, t, sim.state.litTarget < 2 ? 0.9 : 0.15);
      run(sim, 3);
      hit = sim.state.score > 0;
      sim.ballToUser();
      sim.user.pos = v2(12, 0);
      run(sim, 0.3);
    }
    expect(hit).toBe(true);
    sim.dispose();
  });
});

describe("kick contact alignment", () => {
  it("the ball is where the kicking foot meets it on the contact frame (standing, jogging, sprinting)", () => {
    const gaps: number[] = [];
    for (const [speed, sprint] of [[0, false], [1, false], [1, true]] as [number, boolean][])
      for (const kind of ["pass", "shot"] as const) {
        const sim = new PracticeSim("free");
        run(sim, 0.4);
        sim.user.intent = { move: v2(speed, 0), sprint };
        run(sim, 1.2);
        if (kind === "pass") sim.pass(sim.user, v2(1, 0.2), 0.5);
        else sim.shoot(sim.user, 1, 0.5, 0.6);
        const ev = run(sim, 1);
        const k = ev.find((e) => e.type === "kick");
        if (k && k.type === "kick" && k.gap !== undefined) gaps.push(k.gap);
        sim.dispose();
      }
    expect(gaps.length).toBe(6);
    expect(Math.max(...gaps)).toBeLessThan(0.2);
  });
});
