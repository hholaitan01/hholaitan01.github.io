import * as THREE from "three";
import { MatchSim, type UserInput } from "../game/match/MatchSim";
import type { MatchConfig } from "../game/match/rules";
import { kitsFor, lookFor } from "../game/match/lineup";
import { len, type V2 } from "../game/sim/SimPlayer";
import { GameView } from "./GameView";

export interface MatchHud {
  home: string;
  away: string;
  score: [number, number];
  clock: number;
  half: number;
  halfLength: number;
  phase: string;
  message: string;
  controlled: string;
  hasBall: boolean;
  power: number;
  powerFor: "shoot" | "pass" | null;
  paused: boolean;
  fps: number;
  animMs: number;
}

/** Match mode: keyboard drives the user's controlled player; the CPU runs everyone else. */
export class MatchView extends GameView<MatchSim> {
  hud!: MatchHud;
  cfg!: MatchConfig;

  async load(cfg: MatchConfig, onProgress?: (f: number) => void, seed = Date.now() % 100000) {
    this.cfg = cfg;
    const contacts = await this.loadCommon(onProgress);
    this.sim = new MatchSim(cfg, contacts, seed);
    const kits = kitsFor(this.sim.teams[0], this.sim.teams[1]);
    this.start(this.sim.pitch, (p) => lookFor(kits[p.team], this.sim.squads[p.team].indexOf(p), p.role === "gk", kits[1 - p.team], p.team * 5 + 3));
    this.refreshHud();
  }

  protected step(dt: number) {
    const sim = this.sim, k = this.keys;
    const inp: UserInput = { move: this.stickToWorld(k.stick()), sprint: k.held("sprint") };
    for (const b of k.takeTaps()) {
      if (b === "pause" && sim.phase !== "fulltime") this.paused = !this.paused;
      if (b === "switch") inp.switchPlayer = true;
    }
    for (const r of k.takeReleases()) {
      const power = Math.min(1, r.held / 0.8);
      const m = this.stickToWorld(r.stick);
      if (len(m) > 0.1) inp.move = m;
      if (r.button === "pass") inp.pass = power;
      if (r.button === "shoot") inp.shoot = power;
      if (r.button === "lob") inp.lob = power;
    }
    const sp = k.holdTime("shoot"), pp = k.holdTime("pass");
    this.hud.power = Math.min(1, Math.max(sp, pp) / 0.8);
    this.hud.powerFor = sp > 0 ? "shoot" : pp > 0 ? "pass" : null;
    if (this.paused || dt === 0) return;
    sim.applyUser(inp);
    sim.update(dt);
    this.eventLog = sim.consume();
    this.onEvents(this.eventLog);
    // the scoring side celebrates
    if (this.eventLog.some((e) => e.type === "goal")) for (const p of sim.squads[sim.lastGoalBy]) if (p.role === "field") this.prefabs.get(p.id)?.play("cheer", true);
  }

  protected focusPlayer() {
    return this.sim.controlled;
  }

  protected cameraFocus(): V2 {
    const sim = this.sim, b = sim.ball2(), c = sim.controlled ?? sim.players[0];
    const L = sim.L, W = sim.W;
    return {
      x: THREE.MathUtils.clamp(b.x * 0.75 + c.pos.x * 0.25, -L + 7, L - 7),
      z: THREE.MathUtils.clamp(b.z * 0.4 + c.pos.z * 0.15, -W * 0.4, W * 0.4),
    };
  }

  protected refreshHud() {
    const sim = this.sim;
    this.hud = {
      home: sim.teams[0].name,
      away: sim.teams[1].name,
      score: [...sim.score] as [number, number],
      clock: sim.clock,
      half: sim.half,
      halfLength: sim.halfLength,
      phase: sim.phase,
      message: sim.message,
      controlled: sim.controlled ? (this.prefabs.get(sim.controlled.id)?.lookName ?? "") : "",
      hasBall: !!sim.controlled && sim.owner === sim.controlled,
      power: this.hud?.power ?? 0,
      powerFor: this.hud?.powerFor ?? null,
      paused: this.paused,
      fps: this.fps,
      animMs: this.animMs,
    };
  }
}
