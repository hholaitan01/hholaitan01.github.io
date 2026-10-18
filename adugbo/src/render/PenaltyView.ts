import * as THREE from "three";
import { GameView } from "./GameView";
import { PenaltySim, type PenaltyMode, type PenaltyPhase, type KickResult } from "../game/sim/PenaltySim";
import type { Difficulty } from "../game/match/rules";
import { kitsFor, lookFor } from "../game/match/lineup";
import type { V2 } from "../game/sim/SimPlayer";

export interface PenaltyHud {
  phase: PenaltyPhase;
  message: string;
  userKicking: boolean;
  kicks: { team: 0 | 1; result: KickResult }[];
  goals: [number, number];
  names: [string, string];
  winner: 0 | 1 | null;
  streak: number;
  best: number;
  power: number;
  holding: boolean;
  paused: boolean;
}

/**
 * Penalties seen from behind the penalty spot. The aim marker shows where the shot is going; the power bar fills while
 * shoot is held. In goal, the stick picks the dive side and any action button dives.
 */
export class PenaltyView extends GameView<PenaltySim> {
  hud!: PenaltyHud;
  private marker = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.22, 32), new THREE.MeshBasicMaterial({ color: 0xf6c90e, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthTest: false }));

  async load(mode: PenaltyMode, difficulty: Difficulty, home: string, away: string, onProgress?: (f: number) => void) {
    const contacts = await this.loadCommon(onProgress);
    this.sim = new PenaltySim(mode, difficulty, home, away, 0, contacts, Date.now() % 100000);
    const kits = kitsFor(this.sim.teams[0], this.sim.teams[1]);
    this.start(this.sim.pitch, (p) => lookFor(kits[p.team], p.role === "gk" ? 0 : 1, p.role === "gk", kits[1 - p.team], p.team * 5 + 3));
    this.marker.rotation.y = Math.PI / 2;
    this.marker.renderOrder = 10;
    this.scene.add(this.marker);
    this.refreshHud();
  }

  protected step(dt: number) {
    const sim = this.sim, k = this.keys;
    let dive = false;
    for (const b of k.takeTaps()) {
      if (b === "mute") this.toggleMute();
      if (b === "pause" && sim.phase !== "over") this.paused = !this.paused;
      if (b === "shoot" || b === "pass" || b === "lob" || b === "through") dive = true;
    }
    let shoot: number | undefined;
    for (const r of k.takeReleases()) if (r.button === "shoot") shoot = Math.min(1, r.held / 0.8);
    if (this.paused || dt === 0) return;
    sim.applyInput({ stick: k.stick(), shoot: sim.userKicking ? shoot : undefined, dive: !sim.userKicking && dive }, dt);
    const before = sim.phase;
    sim.update(dt);
    this.eventLog = sim.takeEvents();
    this.onEvents(this.eventLog);
    if (before !== sim.phase && (sim.phase === "result" || sim.phase === "over")) this.audio.whistle(sim.phase === "over" ? 3 : 1, sim.phase === "over");
    // the scorer celebrates
    if (this.eventLog.some((e) => e.type === "goal")) this.prefabs.get(sim.kicker.id)?.play("cheer", true);
  }

  protected placeCamera() {
    const s = this.sim.spot, L = this.sim.L;
    const small = this.host.clientHeight < 500;
    this.camera.position.set(s.x - (small ? 6.2 : 7.2), small ? 2.1 : 2.5, 0);
    this.camera.lookAt(L, 1.0, 0);
    this.venue.focus(s.x + 2, 0);
    // aim marker in the goal mouth, while the user lines up the shot
    const sim = this.sim, gw = sim.pitch.goalWidth / 2, gh = sim.pitch.goalHeight;
    this.marker.visible = sim.userKicking && sim.phase === "aim";
    this.marker.position.set(L + 0.05, 0.2 + sim.aim.y * (gh - 0.45), sim.aim.z * (gw - 0.25));
  }

  protected focusPlayer() {
    return this.sim.userKicking ? this.sim.kicker : this.sim.keeper;
  }

  protected cameraFocus(): V2 {
    return this.sim.spot;
  }

  protected refreshHud() {
    const sim = this.sim, held = this.keys.holdTime("shoot");
    this.hud = {
      phase: sim.phase,
      message: sim.message,
      userKicking: sim.userKicking,
      kicks: [...sim.kicks],
      goals: [sim.goals(0), sim.goals(1)],
      names: [sim.teams[0].name, sim.teams[1].name],
      winner: sim.winner,
      streak: sim.streak,
      best: sim.best,
      power: Math.min(1, held / 0.8),
      holding: held > 0 && sim.userKicking && sim.phase === "aim",
      paused: this.paused,
    };
  }
}
