import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { loadGLB } from "../assets/loader";
import { FootballerAsset, PlayerPrefab, type PlayerLook } from "../game/PlayerPrefab";
import type { ActionName } from "../game/anim/locomotion";

/** Procedural ball (original artwork): white sphere with dark panels drawn on a canvas texture. */
export function makeBall(): THREE.Mesh {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#f4f4f0";
  g.fillRect(0, 0, 512, 256);
  g.fillStyle = "#1c1c1c";
  for (let row = 0; row < 5; row++)
    for (let col = 0; col < 8; col++) {
      const x = col * 64 + (row % 2) * 32, y = 24 + row * 52;
      g.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        g.lineTo(x + Math.cos(a) * 13, y + Math.sin(a) * 13 * (row === 0 || row === 4 ? 0.6 : 1));
      }
      g.fill();
    }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.11, 32, 20), new THREE.MeshStandardMaterial({ map: t, roughness: 0.45 }));
  m.castShadow = true;
  return m;
}

export interface LabStats {
  state: string;
  clip: string;
  action: string | null;
  fps: number;
  triangles: number;
  joints: number;
  clipCount: number;
  contacts: Record<string, string>;
  lastContact: string;
}

/** Player test scene: one prefab on a scrolling treadmill floor, orbit camera, and a ball struck on contact frames. */
export class LabScene {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(40, 1, 0.05, 200);
  private controls: OrbitControls;
  private clock = new THREE.Clock();
  private floorTex!: THREE.CanvasTexture;
  asset?: FootballerAsset;
  player?: PlayerPrefab;
  private ball = makeBall();
  private ballVel = new THREE.Vector3();
  private ballLive = false;
  speed = 0;
  yawRate = 0;
  dribbling = false;
  private frames = 0;
  private fpsT = 0;
  stats: LabStats = { state: "-", clip: "-", action: null, fps: 0, triangles: 0, joints: 0, clipCount: 0, contacts: {}, lastContact: "none" };
  private raf = 0;
  private ro: ResizeObserver;

  constructor(private host: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    host.appendChild(this.renderer.domElement);
    this.camera.position.set(2.6, 1.6, 3.4);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1, 0);
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 1.2;
    this.controls.maxDistance = 12;
    this.buildStage();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
    this.raf = requestAnimationFrame(this.loop);
  }

  private buildStage() {
    this.scene.background = new THREE.Color(0x9fb8c8);
    this.scene.fog = new THREE.Fog(0x9fb8c8, 18, 60);
    const hemi = new THREE.HemisphereLight(0xdfefff, 0x5a4a38, 1.1);
    const sun = new THREE.DirectionalLight(0xfff1dc, 2.4);
    sun.position.set(4, 8, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 30 });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    this.scene.add(hemi, sun);
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    g.fillStyle = "#6b6e66";
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2500; i++) {
      g.fillStyle = `rgba(${Math.random() < 0.5 ? "0,0,0" : "255,255,255"},${Math.random() * 0.08})`;
      g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    g.fillStyle = "rgba(255,255,255,.35)";
    g.fillRect(0, 0, 256, 3);
    this.floorTex = new THREE.CanvasTexture(c);
    this.floorTex.colorSpace = THREE.SRGBColorSpace;
    this.floorTex.wrapS = this.floorTex.wrapT = THREE.RepeatWrapping;
    this.floorTex.repeat.set(20, 20);
    this.floorTex.anisotropy = 8;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ map: this.floorTex, roughness: 0.9 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
    this.ball.visible = false;
    this.scene.add(this.ball);
  }

  async load(look: PlayerLook, onProgress?: (f: number) => void) {
    const gltf = await loadGLB("characters/footballer.glb", onProgress);
    this.asset = new FootballerAsset(gltf);
    this.player = new PlayerPrefab(this.asset, look);
    this.scene.add(this.player.root);
    this.player.on((e) => {
      if (e.type === "contact") this.strike(e.action, e.foot);
    });
    let tris = 0;
    this.player.root.traverse((o) => {
      const m = o as THREE.SkinnedMesh;
      if (m.isSkinnedMesh && m.visible) tris += (m.geometry.index?.count ?? m.geometry.attributes.position.count) / 3;
    });
    const joints = new Set<string>();
    this.player.root.traverse((o) => {
      if ((o as THREE.Bone).isBone) joints.add(o.name);
    });
    const contacts: Record<string, string> = {};
    for (const [n, i] of this.asset.info) if (i.contact !== undefined) contacts[n] = `${i.contact.toFixed(2)}s/${i.duration.toFixed(2)}s ${i.foot}`;
    Object.assign(this.stats, { triangles: Math.round(tris), joints: joints.size, clipCount: this.asset.clips.size, contacts });
  }

  /** Places the ball at the striking foot and launches it forward (player faces +z). */
  private strike(action: ActionName, foot: "l" | "r") {
    const bone = this.player!.bone(foot === "l" ? "ball_l" : "ball_r")!;
    const p = bone.getWorldPosition(new THREE.Vector3());
    this.ball.position.set(p.x, 0.11, p.z + 0.12);
    const power = action === "shoot" ? 22 : action === "kick" ? 16 : 10;
    const lift = action === "shoot" ? 3.5 : action === "kick" ? 5 : 0.6;
    this.ballVel.set(0, lift, power);
    this.ball.visible = true;
    this.ballLive = true;
    this.stats.lastContact = `${action} (${foot} foot) at ${(performance.now() / 1000).toFixed(2)}`;
  }

  play(action: ActionName) {
    return this.player?.play(action) ?? false;
  }

  private resize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 1 / 20);
    if (this.player) {
      this.player.update(dt, { speed: this.speed, yawRate: this.yawRate, dribbling: this.dribbling });
      // treadmill: the floor moves under the in-place player at the commanded speed (texture repeat = 2 m)
      this.floorTex.offset.y -= (this.speed * dt) / 2;
      this.player.root.rotation.y += this.yawRate * dt * (this.speed < 1 ? 1 : 0);
      Object.assign(this.stats, { state: this.player.loco, clip: this.player.locoClipName, action: this.player.action });
    }
    if (this.ballLive) {
      this.ballVel.y -= 9.81 * dt;
      this.ball.position.addScaledVector(this.ballVel, dt);
      this.ball.rotation.x += this.ballVel.z * dt * 8;
      if (this.ball.position.y < 0.11) {
        this.ball.position.y = 0.11;
        this.ballVel.y *= -0.55;
        this.ballVel.z *= 0.8;
      }
      if (this.ball.position.z > 30) this.ballLive = this.ball.visible = false;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.frames++;
    this.fpsT += dt;
    if (this.fpsT > 0.5) {
      this.stats.fps = Math.round(this.frames / this.fpsT);
      this.frames = 0;
      this.fpsT = 0;
    }
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.controls.dispose();
    this.player?.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
