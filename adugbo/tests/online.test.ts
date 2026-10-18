import { beforeAll, describe, expect, it } from "vitest";
import { initPhysics } from "../src/physics/PhysicsWorld";
import { MatchSim } from "../src/game/match/MatchSim";
import { defaultConfig } from "../src/game/match/rules";
import { SIM_DT } from "../src/physics/constants";
import { decodeInput, encodeInput, encodeSnap, SnapPlayer } from "../src/net/snapshot";
import { bandFor, elo } from "../src/net/protocol";

beforeAll(() => initPhysics());

const cfg = { ...defaultConfig("fives", "mushin", "agege"), userTeam: 0 as const, halfMinutes: 1 };

describe("online play", () => {
  it("a human on each side: the guest's input drives the guest's player on the host", () => {
    const host = new MatchSim(cfg, undefined, 9, { humans: [true, true] });
    expect(host.ctrl[0]?.team).toBe(0);
    expect(host.ctrl[1]?.team).toBe(1);
    host.phase = "play";
    host.restart = null;
    const g = host.ctrl[1]!, x0 = g.pos.x;
    // input travels as JSON, like over the wire
    for (let i = 0; i < 120; i++) {
      const { inp } = decodeInput(encodeInput({ move: { x: 1, z: 0 }, sprint: false }, i));
      host.applyUser(inp, 1);
      host.fixedStep(SIM_DT);
    }
    expect(g.pos.x).toBeGreaterThan(x0 + 2);
    // the CPU does not steer either human's player
    expect(host.ai[1].debug.get(g.id)?.note).toBe("human");
    host.dispose();
  });

  it("a guest's copy of the match follows the host's snapshots", () => {
    const host = new MatchSim(cfg, undefined, 4, { humans: [true, true] });
    const guest = new MatchSim({ ...cfg, userTeam: 1 }, undefined, 4, { humans: [true, true] });
    const player = new SnapPlayer();
    let t = 0;
    for (let i = 0; i < 600; i++) {
      host.applyUser({ move: { x: 0.6, z: 0.3 }, sprint: true }, 0);
      host.fixedStep(SIM_DT);
      if (i % 6 === 0) player.push(encodeSnap(host, host.takeEvents()));
      t += SIM_DT;
    }
    // play back well past the newest snapshot: the guest shows the newest state
    for (let i = 0; i < 30; i++) player.apply(guest, 1 / 60);
    const last = player.latest!;
    host.players.forEach((_p, j) => {
      expect(guest.players[j].pos.x).toBeCloseTo(last.p[j * 7], 2);
      expect(guest.players[j].pos.z).toBeCloseTo(last.p[j * 7 + 1], 2);
    });
    expect(guest.score).toEqual(last.sc);
    expect(guest.phase).toBe(last.ph);
    expect(guest.ctrl[1]?.id).toBe(last.ctrl[1]);
    expect(guest.physics.ballPos.x).toBeCloseTo(last.b[0], 2);
    host.dispose();
    guest.dispose();
    void t;
  });

  it("snapshot playback interpolates between updates instead of jumping", () => {
    const sim = new MatchSim(cfg, undefined, 1, { humans: [true, true] });
    const pl = new SnapPlayer();
    const snap = (x: number, t: number) => {
      sim.players[0].pos = { x, z: 0 };
      sim.time = t;
      return encodeSnap(sim, []);
    };
    const view = new MatchSim(cfg, undefined, 1, { humans: [true, true] });
    pl.push(snap(0, 1));
    pl.push(snap(1, 1.05));
    pl.push(snap(2, 1.1));
    pl.push(snap(3, 1.15));
    pl.push(snap(4, 1.2));
    pl.apply(view, 0); // starts 0.12 s behind the newest (t = 1.08)
    expect(view.players[0].pos.x).toBeCloseTo(1.6, 1);
    pl.apply(view, 0.025);
    expect(view.players[0].pos.x).toBeCloseTo(2.1, 1);
    sim.dispose();
    view.dispose();
  });

  it("input decoding clamps what a modified client could send", () => {
    const { inp } = decodeInput(JSON.stringify({ q: 1, move: [30, 40], shoot: 99, pass: "x" }));
    expect(Math.hypot(inp.move.x, inp.move.z)).toBeCloseTo(1);
    expect(inp.shoot).toBe(1);
    expect(inp.pass).toBeUndefined();
  });

  it("Elo and matchmaking bands", () => {
    expect(elo(1000, 1000, 1)).toEqual([16, -16]);
    expect(elo(1200, 1000, 1)[0]).toBeLessThan(16);
    expect(elo(1000, 1200, 1)[0]).toBeGreaterThan(16);
    expect(bandFor("ranked", 0).range).toBe(100);
    expect(bandFor("ranked", 12_000).range).toBe(250);
    expect(bandFor("ranked", 30_000).range).toBe(Infinity);
    expect(bandFor("quick", 0).range).toBe(Infinity);
  });
});
