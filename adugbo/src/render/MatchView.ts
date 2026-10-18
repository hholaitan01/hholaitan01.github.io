import * as THREE from "three";
import { MatchSim, type UserInput } from "../game/match/MatchSim";
import type { MatchConfig } from "../game/match/rules";
import { kitsFor, lookFor } from "../game/match/lineup";
import { len, type V2 } from "../game/sim/SimPlayer";
import { GameView } from "./GameView";
import type { SimEvent } from "../game/sim/GameSim";

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
  /** The user's side has the ball (the touch pad shows its attacking buttons); kept through loose balls. */
  attacking: boolean;
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

  /** Online matches can't be paused (the other player keeps playing). */
  protected canPause = true;

  async load(cfg: MatchConfig, onProgress?: (f: number) => void, seed = Date.now() % 100000, humans?: [boolean, boolean]) {
    this.cfg = cfg;
    const contacts = await this.loadCommon(onProgress);
    this.sim = new MatchSim(cfg, contacts, seed, { humans });
    const kits = kitsFor(this.sim.teams[0], this.sim.teams[1]);
    this.start(this.sim.pitch, (p) => lookFor(kits[p.team], this.sim.squads[p.team].indexOf(p), p.role === "gk", kits[1 - p.team], p.team * 5 + 3));
    this.refreshHud();
  }

  /** This frame's input from the keyboard and touch pad (also drives the power bar and the pause/mute keys). */
  protected readInput(): UserInput {
    const sim = this.sim, k = this.keys;
    const inp: UserInput = { move: this.stickToWorld(k.stick()), sprint: k.held("sprint") };
    for (const b of k.takeTaps()) {
      if (b === "mute") this.toggleMute();
      if (b === "pause" && sim.phase !== "fulltime" && this.canPause) this.paused = !this.paused;
      if (b === "switch") inp.switchPlayer = true;
    }
    for (const r of k.takeReleases()) {
      const power = Math.min(1, r.held / 0.8);
      const m = this.stickToWorld(r.stick);
      if (len(m) > 0.1) inp.move = m;
      if (r.button === "pass") inp.pass = power;
      if (r.button === "shoot") inp.shoot = power;
      if (r.button === "lob") inp.lob = power;
      if (r.button === "through") {
        inp.through = power;
        inp.throughLofted = !!r.flick;
      }
    }
    const sp = k.holdTime("shoot"), pp = k.holdTime("pass");
    this.hud.power = Math.min(1, Math.max(sp, pp) / 0.8);
    this.hud.powerFor = sp > 0 ? "shoot" : pp > 0 ? "pass" : null;
    return inp;
  }

  protected step(dt: number) {
    const inp = this.readInput();
    if (this.paused || dt === 0) return;
    this.sim.applyUser(inp);
    this.advance(dt);
  }

  /** Runs the simulation and plays its sounds and animations. */
  protected advance(dt: number) {
    const sim = this.sim;
    const before = sim.phase;
    sim.update(dt);
    this.eventLog = sim.consume();
    this.playEvents(this.eventLog, before);
  }

  protected playEvents(ev: SimEvent[], phaseBefore: string) {
    const sim = this.sim;
    if (phaseBefore !== sim.phase) {
      if (sim.phase === "play" && (phaseBefore === "kickoff" || phaseBefore === "restart")) this.audio.whistle(1);
      if (sim.phase === "goal") this.audio.whistle(1);
      if (sim.phase === "halftime") this.audio.whistle(2, true);
      if (sim.phase === "fulltime") this.audio.whistle(3, true);
    }
    this.onEvents(ev);
    // the scoring side celebrates
    if (ev.some((e) => e.type === "goal")) for (const p of sim.squads[sim.lastGoalBy]) if (p.role === "field") this.prefabs.get(p.id)?.play("cheer", true);
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
      attacking: sim.owner ? sim.owner.team === sim.cfg.userTeam : (this.hud?.attacking ?? sim.restart?.team === sim.cfg.userTeam),
      power: this.hud?.power ?? 0,
      powerFor: this.hud?.powerFor ?? null,
      paused: this.paused,
      fps: this.fps,
      animMs: this.animMs,
    };
  }
}
