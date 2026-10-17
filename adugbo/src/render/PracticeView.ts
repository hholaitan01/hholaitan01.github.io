import * as THREE from "three";
import { loadGLB } from "../assets/loader";
import { FootballerAsset, PlayerPrefab, type HeadId } from "../game/PlayerPrefab";
import { DEFAULT_CONTACTS, type ContactTimes, type SimEvent } from "../game/sim/GameSim";
import { PracticeSim, TARGETS, TARGET_R, type Drill } from "../game/sim/PracticeSim";
import { initPhysics } from "../physics/PhysicsWorld";
import { Keyboard } from "../controls/keyboard";
import { TEAMS } from "../game/teams";
import type { Kit } from "../render/kit";
import { Venue } from "./venue/Venue";
import { profile, type QualityProfile, type Settings } from "../settings/settings";
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

  readonly q: QualityProfile;
  venue!: Venue;
  private spectators: PlayerPrefab[] = [];
  private blobs: THREE.Mesh[] = [];

  constructor(
    private host: HTMLElement,
    readonly settings: Settings,
  ) {
    this.q = profile(settings.quality);
    this.renderer = new THREE.WebGLRenderer({ antialias: this.q.antialias, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(this.q.pixelRatio);
    this.renderer.shadowMap.enabled = this.q.shadows;
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
    this.venue = new Venue(this.sim.pitch, this.q);
    s.add(this.venue.group);
    this.venue.setTimeOfDay(this.settings.timeOfDay, this.renderer, s);
    this.ball.castShadow = this.q.shadows;
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
    this.addSpectators();
    if (!this.q.shadows) {
      // low quality: soft blob shadows keep players grounded without shadow maps
      const blob = new THREE.CanvasTexture(
        (() => {
          const c = document.createElement("canvas");
          c.width = c.height = 64;
          const g = c.getContext("2d")!, gr = g.createRadialGradient(32, 32, 4, 32, 32, 32);
          gr.addColorStop(0, "rgba(0,0,0,.55)");
          gr.addColorStop(1, "rgba(0,0,0,0)");
          g.fillStyle = gr;
          g.fillRect(0, 0, 64, 64);
          return c;
        })(),
      );
      const mat = new THREE.MeshBasicMaterial({ map: blob, transparent: true, depthWrite: false });
      for (let i = 0; i <= this.sim.players.length; i++) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(i === this.sim.players.length ? 0.35 : 1.1, i === this.sim.players.length ? 0.35 : 1.1), mat);
        m.rotation.x = -Math.PI / 2;
        m.position.y = 0.012;
        s.add(m);
        this.blobs.push(m);
      }
    }
    // marker ring under the controlled player
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.52, 40), new THREE.MeshBasicMaterial({ color: 0xf6c90e, transparent: true, opacity: 0.85 }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    ring.name = "userRing";
    s.add(ring);
    this.camTarget.set(this.sim.user.pos.x, 0, this.sim.user.pos.z);
  }

  private addSpectators() {
    const colours = ["#e9e4d8", "#2b6cb0", "#c53030", "#2f855a", "#d69e2e", "#553c9a", "#1a202c", "#dd6b20", "#319795", "#b83280"];
    const heads: HeadId[] = ["m006", "m007", "m102", "m130", "sm005", "m016", "m108", "m300"];
    const spots = this.venue.spectatorSpots.slice(0, this.q.spectators);
    spots.forEach((spot, i) => {
      const c = colours[i % colours.length];
      const pf = new PlayerPrefab(
        this.asset,
        {
          kit: { shirt: c, trim: c, shorts: i % 3 ? "#2d3748" : "#e2e8f0", socks: "#1a1a1a", boots: "#3a3a3a", pattern: "plain", badge: "" },
          name: "",
          number: 0,
          head: heads[i % heads.length],
          hair: i % 2 ? "hightop" : "none",
          skinTone: 0.55,
          plain: true,
        },
        { shadows: this.q.shadows },
      );
      pf.idleClip = spot.pose === "sit" ? "sit" : i % 2 ? "talk" : "idle";
      pf.root.position.copy(spot.pos);
      pf.root.rotation.y = spot.yaw;
      this.scene.add(pf.root);
      this.spectators.push(pf);
    });
  }

  private snapCamera = true;

  setDrill(d: Drill) {
    this.sim.restart(d);
    this.paused = false;
    this.snapCamera = true;
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
      for (const e of this.eventLog) {
        if (e.type === "action") this.prefabs.get(e.player)?.play(e.action);
        if (e.type === "goal") this.spectators.forEach((p, i) => i % 2 === 0 && p.play("cheer"));
      }
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
    for (const sp of this.spectators) sp.update(dt, { speed: 0, yawRate: 0 });
    const b = sim.physics.ballPos, w = sim.physics.ball.angvel();
    if (this.blobs.length) {
      sim.players.forEach((p, i) => this.blobs[i].position.set(p.pos.x, 0.012, p.pos.z));
      this.blobs[sim.players.length].position.set(b.x, 0.012, b.z);
    }
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
    if (this.snapCamera) this.camTarget.set(fx, 0, fz);
    else this.camTarget.lerp(new THREE.Vector3(fx, 0, fz), 1 - Math.exp(-4 * Math.max(dt, 1 / 60)));
    this.snapCamera = false;
    // short landscape screens (phones) get a closer camera so players stay readable
    const aspect = this.camera.aspect, small = this.host.clientHeight < 500;
    const dist = aspect < 1.2 ? 24 : small ? 14 : 17, height = small ? 8.8 : 10.5;
    this.camera.position.set(this.camTarget.x, height, this.camTarget.z + dist);
    this.camera.lookAt(this.camTarget.x, 0.6, this.camTarget.z - 1);
    this.venue.focus(this.camTarget.x, this.camTarget.z);
  }

  /**
   * Test hook: renders a frame and samples screen colours at the user's shirt, the ground beside him and the ball,
   * plus whether the user, ball and goal mouth are inside the camera view.
   */
  probe() {
    this.renderer.render(this.scene, this.camera);
    const gl = this.renderer.getContext(), c = this.renderer.domElement;
    const read = (p: THREE.Vector3) => {
      const v = p.clone().project(this.camera);
      const x = Math.round(((v.x + 1) / 2) * c.width), y = Math.round(((v.y + 1) / 2) * c.height);
      const px = new Uint8Array(4 * 9);
      gl.readPixels(Math.max(0, x - 1), Math.max(0, y - 1), 3, 3, gl.RGBA, gl.UNSIGNED_BYTE, px);
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < 9; i++) {
        r += px[i * 4];
        g += px[i * 4 + 1];
        b += px[i * 4 + 2];
      }
      const inView = Math.abs(v.x) <= 1 && Math.abs(v.y) <= 1 && v.z < 1;
      return { rgb: [r / 9, g / 9, b / 9], inView };
    };
    const u = this.sim.user, bp = this.sim.physics.ballPos, L = this.sim.pitch.length / 2, gw = this.sim.pitch.goalWidth / 2;
    return {
      shirt: read(new THREE.Vector3(u.pos.x, 1.25, u.pos.z)),
      ground: read(new THREE.Vector3(u.pos.x - 1.2, 0.02, u.pos.z + 1.2)),
      ball: read(new THREE.Vector3(bp.x, bp.y, bp.z)),
      groundNearBall: read(new THREE.Vector3(bp.x + 0.5, 0.02, bp.z + 0.5)),
      goalPosts: [read(new THREE.Vector3(L, 1, gw)), read(new THREE.Vector3(L, 1, -gw))].map((r) => r.inView),
    };
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
    for (const p of this.spectators) p.dispose();
    this.venue?.dispose();
    this.sim?.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
