import * as THREE from "three";
import { loadGLB } from "../assets/loader";
import { FootballerAsset, PlayerPrefab, type HeadId, type PlayerLook } from "../game/PlayerPrefab";
import { DEFAULT_CONTACTS, type ContactTimes, type GameSim, type SimEvent } from "../game/sim/GameSim";
import type { SimPlayer, V2 } from "../game/sim/SimPlayer";
import type { PitchSpec } from "../game/pitch";
import { initPhysics } from "../physics/PhysicsWorld";
import { Keyboard } from "../controls/keyboard";
import { Venue } from "./venue/Venue";
import { profile, type QualityProfile, type Settings } from "../settings/settings";
import { makeBall } from "./LabScene";

/**
 * Shared renderer + loop for practice and matches: venue, player prefabs driven by a GameSim, ball, blob shadows,
 * spectators, broadcast camera and the readability probe used by browser tests.
 */
export abstract class GameView<S extends GameSim> {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300);
  sim!: S;
  venue!: Venue;
  readonly q: QualityProfile;
  protected asset!: FootballerAsset;
  protected prefabs = new Map<number, PlayerPrefab>();
  protected ball = makeBall();
  protected keys = new Keyboard();
  protected spectators: PlayerPrefab[] = [];
  private blobs: THREE.Mesh[] = [];
  private ring!: THREE.Mesh;
  private clock = new THREE.Clock();
  private raf = 0;
  private ro: ResizeObserver;
  protected camTarget = new THREE.Vector3();
  protected snapCamera = true;
  paused = false;
  fps = 0;
  /** Milliseconds spent in skinned-animation updates last frame (players, spectators). */
  animMs = 0;
  private frameNo = 0;
  private frames = 0;
  private fpsT = 0;
  /** Last frame's sim events (for tests and sound). */
  eventLog: SimEvent[] = [];

  constructor(
    protected host: HTMLElement,
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

  /** Loads the footballer and Rapier; returns contact times measured from the clips. */
  protected async loadCommon(onProgress?: (f: number) => void): Promise<ContactTimes> {
    const [gltf] = await Promise.all([loadGLB("characters/footballer.glb", onProgress), initPhysics()]);
    this.asset = new FootballerAsset(gltf);
    const c = (n: string, d: number) => this.asset.info.get(n)?.contact ?? d;
    const pos = (n: string, d: { x: number; z: number } | undefined) => this.asset.info.get(n)?.contactPos ?? d;
    return {
      pass: c("pass", DEFAULT_CONTACTS.pass),
      shoot: c("strike", DEFAULT_CONTACTS.shoot),
      kick: c("kick", DEFAULT_CONTACTS.kick),
      header: DEFAULT_CONTACTS.header,
      pos: { pass: pos("pass", DEFAULT_CONTACTS.pos?.pass), shoot: pos("strike", DEFAULT_CONTACTS.pos?.shoot), kick: pos("kick", DEFAULT_CONTACTS.pos?.kick) },
    };
  }

  /** Builds the venue and one prefab per sim player, then starts the loop. */
  protected start(pitch: PitchSpec, look: (p: SimPlayer) => PlayerLook) {
    const s = this.scene;
    this.venue = new Venue(pitch, this.q);
    s.add(this.venue.group);
    this.venue.setTimeOfDay(this.settings.timeOfDay, this.renderer, s);
    this.ball.castShadow = this.q.shadows;
    s.add(this.ball);
    for (const p of this.sim.players) {
      const pf = new PlayerPrefab(this.asset, look(p), { shadows: this.q.shadows });
      this.prefabs.set(p.id, pf);
      s.add(pf.root);
    }
    this.addSpectators();
    if (!this.q.shadows) this.addBlobs();
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.52, 40), new THREE.MeshBasicMaterial({ color: 0xf6c90e, transparent: true, opacity: 0.85 }));
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.position.y = 0.01;
    s.add(this.ring);
    this.raf = requestAnimationFrame(this.loop);
  }

  private addBlobs() {
    // low quality: soft blob shadows keep players grounded without shadow maps
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!, gr = g.createRadialGradient(32, 32, 4, 32, 32, 32);
    gr.addColorStop(0, "rgba(0,0,0,.55)");
    gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    const mat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false });
    const n = this.sim.players.length;
    for (let i = 0; i <= n; i++) {
      const sz = i === n ? 0.35 : 1.1;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(sz, sz), mat);
      m.rotation.x = -Math.PI / 2;
      m.position.y = 0.012;
      this.scene.add(m);
      this.blobs.push(m);
    }
  }

  private addSpectators() {
    const colours = ["#e9e4d8", "#2b6cb0", "#c53030", "#2f855a", "#d69e2e", "#553c9a", "#1a202c", "#dd6b20", "#319795", "#b83280"];
    const heads: HeadId[] = ["m006", "m007", "m102", "m130", "sm005", "m016", "m108", "m300"];
    this.venue.spectatorSpots.slice(0, this.q.spectators).forEach((spot, i) => {
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

  /** Camera looks across the pitch toward -z, so screen up = -z and screen right = +x. */
  protected stickToWorld(s: { x: number; y: number }): V2 {
    return { x: s.x, z: -s.y };
  }

  /** Reads input and advances the simulation. */
  protected abstract step(dt: number): void;
  /** The player marked with the ring (null hides it). */
  protected abstract focusPlayer(): SimPlayer | null;
  /** Point the camera should frame. */
  protected abstract cameraFocus(): V2;
  /** Per-frame HUD refresh. */
  protected abstract refreshHud(): void;

  /** Distance (m) at each strike between the ball and where the kick animation's foot meets it. */
  readonly contactLog: { kind: string; gap: number }[] = [];

  protected onEvents(ev: SimEvent[]) {
    for (const e of ev) {
      if (e.type === "kick" && e.gap !== undefined) this.contactLog.push({ kind: e.kind, gap: e.gap });
      // dives, falls and saves interrupt whatever the player was doing
      if (e.type === "action") this.prefabs.get(e.player)?.play(e.action, e.action === "fall" || e.action.startsWith("dive") || e.action === "save");
      if (e.type === "goal") this.spectators.forEach((p, i) => i % 2 === 0 && p.play("cheer"));
    }
  }

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const real = this.clock.getDelta(), dt = Math.min(real, 1 / 15);
    this.step(this.paused ? 0 : dt);
    this.sync(this.paused ? 0 : dt);
    this.renderer.render(this.scene, this.camera);
    this.frames++;
    this.fpsT += real;
    if (this.fpsT > 0.5) {
      this.fps = Math.round(this.frames / this.fpsT);
      this.frames = this.fpsT = 0;
    }
    this.refreshHud();
  };

  protected sync(dt: number) {
    const sim = this.sim;
    const t0 = performance.now();
    this.frameNo++;
    for (const p of sim.players) {
      const pf = this.prefabs.get(p.id)!;
      pf.root.position.set(p.pos.x, 0, p.pos.z);
      pf.root.rotation.y = p.yaw;
      const heading = p.speed > 0.1 ? Math.atan2(p.vel.x, p.vel.z) - p.yaw : 0;
      pf.update(dt, { speed: p.speed, yawRate: p.yawRate, dribbling: sim.owner === p && !sim.holder, heading, keeper: p.role === "gk" });
    }
    // spectators are background: on low/medium they animate every other frame
    const everyOther = this.settings.quality !== "high";
    for (const sp of this.spectators) if (!everyOther || this.frameNo % 2 === 0) sp.update(everyOther ? dt * 2 : dt, { speed: 0, yawRate: 0 });
    this.animMs = performance.now() - t0;
    const b = sim.physics.ballPos, w = sim.physics.ball.angvel();
    if (this.blobs.length) {
      sim.players.forEach((p, i) => this.blobs[i].position.set(p.pos.x, 0.012, p.pos.z));
      this.blobs[sim.players.length].position.set(b.x, 0.012, b.z);
    }
    this.ball.position.set(b.x, b.y, b.z);
    const wl = Math.hypot(w.x, w.y, w.z);
    if (wl > 1e-3 && dt > 0) this.ball.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(w.x / wl, w.y / wl, w.z / wl), wl * dt));
    const f = this.focusPlayer();
    this.ring.visible = !!f;
    if (f) this.ring.position.set(f.pos.x, 0.01, f.pos.z);
    // broadcast-style side camera
    const c = this.cameraFocus();
    if (this.snapCamera) this.camTarget.set(c.x, 0, c.z);
    else this.camTarget.lerp(new THREE.Vector3(c.x, 0, c.z), 1 - Math.exp(-4 * Math.max(dt, 1 / 60)));
    this.snapCamera = false;
    // short landscape screens (phones) get a closer camera so players stay readable
    const aspect = this.camera.aspect, small = this.host.clientHeight < 500;
    const dist = aspect < 1.2 ? 24 : small ? 14 : 17, height = small ? 8.8 : 10.5;
    this.camera.position.set(this.camTarget.x, height, this.camTarget.z + dist);
    this.camera.lookAt(this.camTarget.x, 0.6, this.camTarget.z - 1);
    this.venue.focus(this.camTarget.x, this.camTarget.z);
  }

  /**
   * Test hook: renders a frame and samples screen colours at the focus player's shirt, the ground beside him and the
   * ball, plus whether the goal posts at +x are inside the view.
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
    const u = this.focusPlayer() ?? this.sim.players[0], bp = this.sim.physics.ballPos, L = this.sim.pitch.length / 2, gw = this.sim.pitch.goalWidth / 2;
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
