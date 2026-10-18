import * as THREE from "three";
import { PracticeSim, TARGETS, TARGET_R, type Drill } from "../game/sim/PracticeSim";
import { TEAMS } from "../game/teams";
import type { Kit } from "../render/kit";
import type { HeadId } from "../game/PlayerPrefab";
import { len, type V2 } from "../game/sim/SimPlayer";
import { GameView } from "./GameView";

const BIB: Kit = { shirt: "#ff6b1a", trim: "#1b1b1b", shorts: "#1b1b1b", socks: "#1b1b1b", boots: "#202020", pattern: "plain", badge: "TRN" };

export interface PracticeHud {
  drill: Drill;
  score: number;
  timeLeft: number | null;
  goals: number;
  shots: number;
  passes: number;
  message: string;
  finished: boolean;
  power: number;
  powerFor: "shoot" | "pass" | null;
  paused: boolean;
  fps: number;
  owner: string;
  animMs: number;
}

/** Practice mode: drives PracticeSim from the keyboard; target rings for the target drill. */
export class PracticeView extends GameView<PracticeSim> {
  private targets: THREE.Mesh[] = [];
  hud: PracticeHud = { drill: "free", score: 0, timeLeft: null, goals: 0, shots: 0, passes: 0, message: "", finished: false, power: 0, powerFor: null, paused: false, fps: 0, owner: "", animMs: 0 };

  async load(drill: Drill, onProgress?: (f: number) => void) {
    const contacts = await this.loadCommon(onProgress);
    this.sim = new PracticeSim(drill, contacts);
    const heads: HeadId[] = ["m300", "m016", "m108"];
    this.start(this.sim.pitch, (p) => ({
      kit: p === this.sim.user ? TEAMS[0].home : BIB,
      name: p.name,
      number: p === this.sim.user ? 10 : p.id + 20,
      head: heads[p.id % heads.length],
      hair: "full",
      skinTone: 0.6,
    }));
    const L = this.sim.pitch.length / 2;
    for (const t of TARGETS) {
      const m = new THREE.Mesh(new THREE.TorusGeometry(TARGET_R, 0.045, 10, 36), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x000000, roughness: 0.4 }));
      m.position.set(L + 0.05, t.y, t.z);
      m.rotation.y = Math.PI / 2;
      m.visible = false;
      this.scene.add(m);
      this.targets.push(m);
    }
  }

  setDrill(d: Drill) {
    this.sim.restart(d);
    this.paused = false;
    this.snapCamera = true;
  }

  protected step(dt: number) {
    const sim = this.sim, u = sim.user, k = this.keys;
    for (const b of k.takeTaps()) {
      if (b === "pause") this.paused = !this.paused;
      if (b === "mute") this.toggleMute();
      if (b === "reset" && !this.paused) sim.ballToUser();
    }
    if (this.paused || sim.state.finished) {
      u.intent = { move: { x: 0, z: 0 }, sprint: false };
      k.takeReleases();
    } else {
      const move = this.stickToWorld(k.stick());
      u.intent = { move, sprint: k.held("sprint") };
      for (const r of k.takeReleases()) {
        const power = Math.min(1, r.held / 0.8);
        const rm = this.stickToWorld(r.stick), aim = len(rm) > 0.1 ? rm : null;
        if (r.button === "pass") sim.pass(u, aim ?? { x: Math.sin(u.yaw), z: Math.cos(u.yaw) }, power);
        if (r.button === "lob") sim.pass(u, aim ?? { x: Math.sin(u.yaw), z: Math.cos(u.yaw) }, power, true);
        if (r.button === "shoot") {
          // aim across the goal with up/down; with no input pick the far post
          const aimZ = aim && Math.abs(rm.z) > 0.2 ? Math.sign(rm.z) * 0.8 : u.pos.z > 0 ? -0.6 : 0.6;
          sim.shoot(u, 1, aimZ, power);
        }
      }
    }
    const sp = k.holdTime("shoot"), pp = k.holdTime("pass");
    this.hud.power = Math.min(1, Math.max(sp, pp) / 0.8);
    this.hud.powerFor = sp > 0 ? "shoot" : pp > 0 ? "pass" : null;
    if (dt > 0) {
      sim.update(dt);
      this.eventLog = sim.consume();
      this.onEvents(this.eventLog);
    }
    const st = sim.state;
    this.targets.forEach((m, i) => {
      m.visible = st.drill === "targets";
      const lit = i === st.litTarget && !st.finished;
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.color.set(lit ? 0xf6c90e : 0xffffff);
      mat.emissive.set(lit ? 0x6a5200 : 0x000000);
    });
  }

  protected focusPlayer() {
    return this.sim.user;
  }

  protected cameraFocus(): V2 {
    const sim = this.sim, b = sim.ball2(), L = sim.pitch.length / 2;
    let fx = THREE.MathUtils.clamp(sim.user.pos.x * 0.7 + b.x * 0.3, -L + 6, L - 4);
    // keep the goal in shot during target practice
    if (sim.state.drill === "targets") fx = Math.max(fx, L - 12);
    return { x: fx, z: THREE.MathUtils.clamp(sim.user.pos.z * 0.5 + b.z * 0.2, -6, 6) };
  }

  protected refreshHud() {
    const st = this.sim.state;
    Object.assign(this.hud, { drill: st.drill, score: st.score, timeLeft: st.timeLeft, goals: st.goals, shots: st.shots, passes: st.passes, message: st.message, finished: st.finished, paused: this.paused, owner: this.sim.owner?.name ?? "", fps: this.fps, animMs: this.animMs });
  }
}
