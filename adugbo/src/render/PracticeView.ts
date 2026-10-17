import * as THREE from "three";
import { loadGLB } from "../assets/loader";
import { FootballerAsset, PlayerPrefab, type HeadId } from "../game/PlayerPrefab";
import { DEFAULT_CONTACTS, type ContactTimes, type SimEvent } from "../game/sim/GameSim";
import { PracticeSim, TARGETS, TARGET_R, type Drill } from "../game/sim/PracticeSim";
import { initPhysics } from "../physics/PhysicsWorld";
import { Keyboard } from "../controls/keyboard";
import { TEAMS } from "../game/teams";
import type { Kit } from "../render/kit";
import { buildPitch } from "./pitchMesh";
import { makeBall } from "./LabScene";
import { len, type V2 } from "../game/sim/SimPlayer";

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
}

/** Practice mode renderer + game loop: drives PracticeSim from the keyboard and shows it with player prefabs. */
export class PracticeView {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300);
  sim!: PracticeSim;
  private asset!: FootballerAsset;
  private prefabs = new Map<number, PlayerPrefab>();
  private ball = makeBall();
  private targets: THREE.Mesh[] = [];
  private keys = new Keyboard();
  private clock = new THREE.Clock();
  private raf = 0;
  private ro: ResizeObserver;
  private camTarget = new THREE.Vector3();
  paused = false;
  private frames = 0;
  private fpsT = 0;
  hud: PracticeHud = { drill: "free", score: 0, timeLeft: null, goals: 0, shots: 0, passes: 0, message: "", finished: false, power: 0, powerFor: null, paused: false, fps: 0, owner: "" };
  /** Last frame's sim events (for tests and sound later). */
  eventLog: SimEvent[] = [];

  constructor(private host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    host.appendChild(this.renderer.domElement);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
  }

  async load(drill: Drill, onProgress?: (f: number) => void) {
    const [gltf] = await Promise.all([loadGLB("characters/footballer.glb", onProgress), initPhysics()]);
    this.asset = new FootballerAsset(gltf);
    const c = (n: string, d: number) => this.asset.info.get(n)?.contact ?? d;
    const contacts: ContactTimes = { pass: c("pass", DEFAULT_CONTACTS.pass), shoot: c("strike", DEFAULT_CONTACTS.shoot), kick: c("kick", DEFAULT_CONTACTS.kick), header: DEFAULT_CONTACTS.header };
    this.sim = new PracticeSim(drill, contacts);
    this.buildScene();
    this.raf = requestAnimationFrame(this.loop);
  }

  private buildScene() {
    const s = this.scene;
    s.background = new THREE.Color(0xa9c4d6);
    s.fog = new THREE.Fog(0xa9c4d6, 45, 120);
    s.add(new THREE.HemisphereLight(0xe2f0ff, 0x5e4e3a, 1.15));
    const sun = new THREE.DirectionalLight(0xfff0d8, 2.3);
    sun.position.set(-12, 22, 14);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 18, bottom: -18, near: 1, far: 70 });
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.03;
    s.add(sun);
    s.add(buildPitch(this.sim.pitch));
    s.add(this.ball);
    // target rings in the goal mouth (target drill)
    const L = this.sim.pitch.length / 2;
    for (const t of TARGETS) {
      const m = new THREE.Mesh(new THREE.TorusGeometry(TARGET_R, 0.045, 10, 36), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x000000, roughness: 0.4 }));
      m.position.set(L + 0.05, t.y, t.z);
      m.rotation.y = Math.PI / 2;
      m.visible = false;
      s.add(m);
      this.targets.push(m);
    }
    const heads: HeadId[] = ["m300", "m016", "m108"];
    const home = TEAMS[0].home;
    for (const p of this.sim.players) {
      const isUser = p === this.sim.user;
      const pf = new PlayerPrefab(this.asset, {
        kit: isUser ? home : BIB,
        name: p.name,
        number: isUser ? 10 : p.id + 20,
        head: heads[p.id % heads.length],
        hair: "full",
        skinTone: 0.6,
      });
      this.prefabs.set(p.id, pf);
      s.add(pf.root);
    }
    // marker ring under the controlled player
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.52, 40), new THREE.MeshBasicMaterial({ color: 0xf6c90e, transparent: true, opacity: 0.85 }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    ring.name = "userRing";
    s.add(ring);
    this.camTarget.set(this.sim.user.pos.x, 0, this.sim.user.pos.z);
  }

  setDrill(d: Drill) {
    this.sim.restart(d);
    this.paused = false;
  }

  /** Camera looks across the pitch toward -z, so screen up = -z and screen right = +x. */
  private stickToWorld(s: { x: number; y: number }): V2 {
    return { x: s.x, z: -s.y };
  }

  private handleInput() {
    const sim = this.sim, u = sim.user, k = this.keys;
    for (const b of k.takeTaps()) {
      if (b === "pause") this.paused = !this.paused;
      if (b === "reset" && !this.paused) sim.ballToUser();
    }
    if (this.paused || sim.state.finished) {
      u.intent = { move: { x: 0, z: 0 }, sprint: false };
      k.takeReleases();
      return;
    }
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
    const sp = k.holdTime("shoot"), pp = k.holdTime("pass");
    this.hud.power = Math.min(1, Math.max(sp, pp) / 0.8);
    this.hud.powerFor = sp > 0 ? "shoot" : pp > 0 ? "pass" : null;
  }

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const real = this.clock.getDelta(), dt = Math.min(real, 1 / 15);
    this.handleInput();
    if (!this.paused) {
      this.sim.update(dt);
      this.eventLog = this.sim.consume();
      for (const e of this.eventLog) if (e.type === "action") this.prefabs.get(e.player)?.play(e.action);
    }
    this.sync(this.paused ? 0 : dt);
    this.renderer.render(this.scene, this.camera);
    this.frames++;
    this.fpsT += real;
    if (this.fpsT > 0.5) {
      this.hud.fps = Math.round(this.frames / this.fpsT);
      this.frames = this.fpsT = 0;
    }
    const st = this.sim.state;
    Object.assign(this.hud, { drill: st.drill, score: st.score, timeLeft: st.timeLeft, goals: st.goals, shots: st.shots, passes: st.passes, message: st.message, finished: st.finished, paused: this.paused, owner: this.sim.owner?.name ?? "" });
  };

  private sync(dt: number) {
    const sim = this.sim;
    for (const p of sim.players) {
      const pf = this.prefabs.get(p.id)!;
      pf.root.position.set(p.pos.x, 0, p.pos.z);
      pf.root.rotation.y = p.yaw;
      pf.update(dt, { speed: p.speed, yawRate: p.yawRate, dribbling: sim.owner === p });
    }
    const b = sim.physics.ballPos, w = sim.physics.ball.angvel();
    this.ball.position.set(b.x, b.y, b.z);
    const wl = Math.hypot(w.x, w.y, w.z);
    if (wl > 1e-3 && dt > 0) this.ball.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(w.x / wl, w.y / wl, w.z / wl), wl * dt));
    const ring = this.scene.getObjectByName("userRing")!;
    ring.position.set(sim.user.pos.x, 0.01, sim.user.pos.z);
    const st = sim.state;
    this.targets.forEach((m, i) => {
      m.visible = st.drill === "targets";
      const lit = i === st.litTarget && !st.finished;
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.color.set(lit ? 0xf6c90e : 0xffffff);
      mat.emissive.set(lit ? 0x6a5200 : 0x000000);
    });
    // broadcast-style side camera: follows a point between the user and the ball
    const L = sim.pitch.length / 2;
    let fx = THREE.MathUtils.clamp(sim.user.pos.x * 0.7 + b.x * 0.3, -L + 6, L - 4);
    // keep the goal in shot during target practice
    if (st.drill === "targets") fx = Math.max(fx, L - 12);
    const fz = THREE.MathUtils.clamp(sim.user.pos.z * 0.5 + b.z * 0.2, -6, 6);
    this.camTarget.lerp(new THREE.Vector3(fx, 0, fz), 1 - Math.exp(-4 * Math.max(dt, 1 / 60)));
    const aspect = this.camera.aspect, dist = aspect < 1.2 ? 24 : 17;
    this.camera.position.set(this.camTarget.x, 10.5, this.camTarget.z + dist);
    this.camera.lookAt(this.camTarget.x, 0.6, this.camTarget.z - 1);
  }

  private resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.keys.dispose();
    for (const p of this.prefabs.values()) p.dispose();
    this.sim?.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
