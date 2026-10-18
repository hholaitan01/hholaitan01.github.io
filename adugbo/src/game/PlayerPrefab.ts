import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { kitMaterial, shirtTexture, type Kit, type KitUniforms } from "../render/kit";
import { STRIDE_SPEED } from "./anim/clips";
import { ACTION_CLIP, ACTION_RATE, ACTION_VARIANTS, locoBlend, selectLocomotion, type ActionName, type LocoInput, type LocoState } from "./anim/locomotion";

export const HEADS = ["m300", "m006", "m007", "m102", "m130", "sm005", "m016", "m108"] as const;
export type HeadId = (typeof HEADS)[number];
export type HairStyle = "full" | "mohawk" | "hightop" | "none";

// Body skin multiplier that matches each face texture (measured from the head textures at build time)
const HEAD_TINT: Record<HeadId, [number, number, number]> = {
  m300: [1, 1, 1],
  m006: [2.199, 2.013, 1.837], m007: [1.448, 1.41, 1.299], m102: [1.448, 1.365, 1.246], m130: [2.034, 1.597, 1.246],
  sm005: [3.14, 2.549, 2.04], m016: [4.22, 3.769, 3.16], m108: [4.408, 3.769, 3.07],
};

export interface PlayerLook {
  kit: Kit;
  name: string;
  number: number;
  head: HeadId;
  hair: HairStyle;
  /** Skin multiplier for the default m300 head and body, 1 = texture as authored. */
  skinTone: number;
  /** Casual top without name, number or badge (spectators). */
  plain?: boolean;
}

export interface ClipInfo {
  name: string;
  duration: number;
  /** Seconds into the clip where the striking foot moves fastest (ball contact), for kick-type clips. */
  contact?: number;
  foot?: "l" | "r";
  /** Striking foot position at contact in the character's frame (x = his left, z = forward), metres. */
  contactPos?: { x: number; z: number };
  /** Ground speed the in-place loop was authored for, measured from planted-foot slide (m/s). */
  stride?: number;
}

/** Loops whose ground speed is measured at load (used to set playback rate so feet don't slide). */
export const MEASURED_LOOPS = ["walk", "jog", "sprint", "dribble", "jogB", "jogSL", "jogSR", "jogFL", "jogFR", "jogBL", "jogBR", "shufL", "shufR"];

/** Shared, analysed data for the footballer GLB. */
export class FootballerAsset {
  readonly clips = new Map<string, THREE.AnimationClip>();
  readonly info = new Map<string, ClipInfo>();
  strideTable: Record<string, number> = {};
  /** Lowest bind-pose y of the body mesh (the soles). */
  floorY = 0;
  private hairCuts = new Map<string, THREE.BufferGeometry>();

  constructor(readonly gltf: GLTF) {
    gltf.scene.traverse((o) => {
      const sm = o as THREE.SkinnedMesh;
      if (!sm.isSkinnedMesh) return;
      // The exporter stored the kit region as COLOR_0.r = region / 8; turn it into an integer attribute.
      const col = sm.geometry.getAttribute("color");
      if (col && !sm.geometry.getAttribute("kitRegion")) {
        const kr = new Float32Array(col.count);
        for (let i = 0; i < col.count; i++) kr[i] = Math.round(col.getX(i) * 8);
        sm.geometry.setAttribute("kitRegion", new THREE.BufferAttribute(kr, 1));
        sm.geometry.deleteAttribute("color");
      }
      if (mat0(sm).name === "rb_body") {
        sm.geometry.computeBoundingBox();
        this.floorY = sm.geometry.boundingBox!.min.y;
      }
      // GLTFLoader turns on vertex colours when COLOR_0 exists; it is data here, not a tint
      const mat = sm.material as THREE.MeshStandardMaterial;
      if (mat.vertexColors) {
        mat.vertexColors = false;
        mat.needsUpdate = true;
      }
    });
    for (const c of gltf.animations) {
      this.clips.set(c.name, c);
      this.info.set(c.name, { name: c.name, duration: c.duration });
    }
    for (const n of ["pass", "strike", "kick"]) this.findContact(n);
    for (const n of MEASURED_LOOPS) {
      this.measureStride(n);
      this.measurePlant(n);
    }
    for (const [n, c] of this.clips) this.durations[n] = c.duration;
    this.strideTable = this.strides(STRIDE_SPEED);
  }

  private probe?: { root: THREE.Object3D; mixer: THREE.AnimationMixer; feet: Record<"l" | "r", THREE.Object3D> };

  /** Samples foot positions (character frame) through a clip at 120 Hz. */
  private sampleFeet(clip: THREE.AnimationClip, end = clip.duration) {
    if (!this.probe) {
      const root = SkeletonUtils.clone(this.gltf.scene);
      this.probe = { root, mixer: new THREE.AnimationMixer(root), feet: { l: root.getObjectByName("ball_l")!, r: root.getObjectByName("ball_r")! } };
    }
    const { root, mixer, feet } = this.probe;
    mixer.stopAllAction();
    const act = mixer.clipAction(clip);
    act.reset().play();
    const dt = 1 / 120, out: Record<"l" | "r", THREE.Vector3[]> = { l: [], r: [] };
    for (let t = 0; t < end; t += dt) {
      act.time = t;
      mixer.update(0);
      root.updateMatrixWorld(true);
      for (const f of ["l", "r"] as const) out[f].push(feet[f].getWorldPosition(new THREE.Vector3()));
    }
    act.stop();
    return { dt, track: out };
  }

  /**
   * Kick clips: ball contact is where a foot moves forward fastest while still near its lowest height in the clip
   * (the swing through the ball, not the follow-through or recovery). Also records where that foot is.
   */
  private findContact(name: string) {
    const clip = this.clips.get(name);
    if (!clip) return;
    // skip the final frame: in-place clips can wrap back to the first pose there
    const { dt, track } = this.sampleFeet(clip, clip.duration - 1 / 30);
    const best = { i: 0, v: 0, foot: "r" as "l" | "r" };
    for (const f of ["l", "r"] as const) {
      const pts = track[f], floor = Math.min(...pts.map((p) => p.y));
      for (let i = 1; i < pts.length; i++) {
        const vz = (pts[i].z - pts[i - 1].z) / dt;
        if (pts[i].y < floor + 0.22 && vz > best.v) Object.assign(best, { i, v: vz, foot: f });
      }
    }
    const p = track[best.foot][best.i];
    this.info.set(name, { ...this.info.get(name)!, contact: +(best.i * dt).toFixed(3), foot: best.foot, contactPos: { x: +p.x.toFixed(3), z: +p.z.toFixed(3) } });
  }

  /**
   * In-place loops: while a foot is planted it slides backwards under the body at exactly the speed the clip was
   * animated for. The median planted-foot speed is that stride speed.
   */
  private measureStride(name: string) {
    const clip = this.clips.get(name);
    if (!clip) return;
    const { dt, track } = this.sampleFeet(clip);
    const speeds: number[] = [];
    for (const f of ["l", "r"] as const) {
      const pts = track[f], floor = Math.min(...pts.map((p) => p.y));
      for (let i = 1; i < pts.length; i++)
        if (pts[i].y < floor + 0.035 && pts[i - 1].y < floor + 0.035) speeds.push(Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z) / dt);
    }
    if (speeds.length < 4) return;
    speeds.sort((a, b) => a - b);
    this.info.set(name, { ...this.info.get(name)!, stride: +speeds[Math.floor(speeds.length / 2)].toFixed(2) });
  }

  /** Normalised time of the left foot's mid-stance in each loop, so blended clips share foot phase. */
  readonly plantPhase: Record<string, number> = {};
  readonly durations: Record<string, number> = {};

  private measurePlant(name: string) {
    const clip = this.clips.get(name);
    if (!clip) return;
    const { dt, track } = this.sampleFeet(clip);
    let best = 0, by = Infinity;
    track.l.forEach((p, i) => {
      if (p.y < by) {
        by = p.y;
        best = i;
      }
    });
    this.plantPhase[name] = (best * dt) / clip.duration;
  }

  /** Measured stride speeds, falling back to the hand-set table for clips that could not be measured. */
  strides(fallback: Record<string, number>): Record<string, number> {
    const out = { ...fallback };
    for (const n of MEASURED_LOOPS) {
      const s = this.info.get(n)?.stride;
      if (s && s > 0.3) out[n] = s;
    }
    return out;
  }

  hairCut(geo: THREE.BufferGeometry, style: HairStyle): THREE.BufferGeometry {
    const key = geo.uuid + style;
    const hit = this.hairCuts.get(key);
    if (hit) return hit;
    if (style === "full" || style === "none") return geo;
    geo.computeBoundingBox();
    const bb = geo.boundingBox!, cx = (bb.min.x + bb.max.x) / 2, h = bb.max.y - bb.min.y;
    const pos = geo.attributes.position, idx = geo.index!.array, keep: number[] = [];
    for (let i = 0; i < idx.length; i += 3) {
      let x = 0, y = 0;
      for (let k = 0; k < 3; k++) {
        x += pos.getX(idx[i + k]) / 3;
        y += pos.getY(idx[i + k]) / 3;
      }
      const ok = style === "mohawk" ? Math.abs(x - cx) < 0.035 && y > bb.min.y + h * 0.35 : y > bb.min.y + h * 0.55;
      if (ok) keep.push(idx[i], idx[i + 1], idx[i + 2]);
    }
    const g = geo.clone();
    g.setIndex(keep);
    this.hairCuts.set(key, g);
    return g;
  }
}

const mat0 = (m: THREE.Mesh) => m.material as THREE.Material;

type Listener = (e: { type: "contact"; action: ActionName; foot: "l" | "r" } | { type: "actionEnd"; action: ActionName }) => void;

/** One footballer in the scene: skinned model, kit, face, and animation state. */
export class PlayerPrefab {
  readonly root: THREE.Group;
  readonly mixer: THREE.AnimationMixer;
  loco: LocoState = "idle";
  locoClipName = "idle";
  action: ActionName | null = null;
  /** Clip used instead of "idle" when standing (e.g. "sit", "talk" for spectators). */
  idleClip: string | null = null;
  private actionTime = 0;
  private contactFired = false;
  private actionAction: THREE.AnimationAction | null = null;
  private body!: THREE.SkinnedMesh;
  private kitU!: KitUniforms;
  private shirtTex: THREE.CanvasTexture | null = null;
  private listeners = new Set<Listener>();
  private meshes: THREE.SkinnedMesh[] = [];

  constructor(private asset: FootballerAsset, look: PlayerLook, opts: { shadows?: boolean } = {}) {
    this.root = SkeletonUtils.clone(asset.gltf.scene) as THREE.Group;
    this.root.name = "Footballer";
    this.root.traverse((o) => {
      const sm = o as THREE.SkinnedMesh;
      if (!sm.isSkinnedMesh) return;
      sm.frustumCulled = false;
      sm.castShadow = opts.shadows ?? true;
      sm.receiveShadow = true;
      const mn = (sm.material as THREE.Material).name;
      if (mn === "rb_body") this.body = sm;
      sm.userData.part = mn;
      this.meshes.push(sm);
    });
    this.mixer = new THREE.AnimationMixer(this.root);
    this.locoW.set("idle", 1);
    // every player starts at a different point of his gait and idle, so a crowd never moves in lockstep
    this.phase = Math.random();
    this.idleOffset = Math.random() * 3;
    this.setLook(look);
  }

  on(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /** Name printed on the shirt. */
  lookName = "";

  setLook(look: PlayerLook) {
    this.lookName = look.name;
    const t = HEAD_TINT[look.head];
    const tone = look.head === "m300" ? look.skinTone : 1;
    const skin = new THREE.Color(t[0] * tone, t[1] * tone, t[2] * tone);
    this.shirtTex?.dispose();
    this.shirtTex = shirtTexture(look.kit, look.name, look.number, look.plain);
    for (const sm of this.meshes) {
      const part = sm.userData.part as string;
      if (sm === this.body) {
        const base = (sm.userData.baseMaterial ??= sm.material) as THREE.MeshStandardMaterial;
        if (sm.material !== base) (sm.material as THREE.Material).dispose();
        sm.material = kitMaterial(base, look.kit, this.shirtTex, skin, this.asset.floorY);
        this.kitU = (sm.material as THREE.Material).userData.kit;
      } else if (part === "rb_head") {
        sm.visible = look.head === "m300";
        const base = (sm.userData.baseMaterial ??= sm.material) as THREE.MeshStandardMaterial;
        const m = base.clone();
        m.color.setScalar(look.skinTone);
        sm.material = m;
      } else if (part === "rb_hair") {
        sm.visible = look.head === "m300" && look.hair !== "none";
        const g0 = (sm.userData.baseGeometry ??= sm.geometry) as THREE.BufferGeometry;
        sm.geometry = this.asset.hairCut(g0, look.hair);
      } else if (/^rb[hx]_/.test(part)) {
        sm.visible = part.slice(4) === look.head;
      }
    }
  }

  /** Live kit colour change without rebuilding textures (used by the colour pickers). */
  setKitColours(k: Partial<Pick<Kit, "shorts" | "socks" | "boots">>) {
    if (k.shorts) this.kitU.uShorts.value.set(k.shorts);
    if (k.socks) this.kitU.uSocks.value.set(k.socks);
    if (k.boots) this.kitU.uBoots.value.set(k.boots);
  }

  /** Locomotion actions, all playing; weights and time are driven every frame by the blend space. */
  private locoActions = new Map<string, THREE.AnimationAction>();
  private locoW = new Map<string, number>();
  private phase = 0;
  private actionW = 0;
  /** Playback position of the current one-shot action's clip (seconds), or -1. */
  get actionClipTime() {
    return this.action && this.actionAction ? this.actionAction.time : -1;
  }

  /** Heaviest locomotion clip this frame (for HUDs and tests). */
  get dominantClip() {
    let best = "idle", bw = -1;
    for (const [k, v] of this.locoW)
      if (v > bw) {
        bw = v;
        best = k;
      }
    return best;
  }

  private idleOffset = 0;

  private locoAction(name: string) {
    let a = this.locoActions.get(name);
    if (!a) {
      const clip = this.asset.clips.get(name);
      if (!clip) return null;
      a = this.mixer.clipAction(clip);
      a.setLoop(THREE.LoopRepeat, Infinity).play();
      a.time = this.idleOffset % clip.duration;
      a.setEffectiveWeight(0);
      this.locoActions.set(name, a);
    }
    return a;
  }

  /** Plays a one-shot action over locomotion. Returns false if the clip is missing or an action is running. */
  play(action: ActionName, force = false): boolean {
    if (this.action && !force) return false;
    const options = (ACTION_VARIANTS[action] ?? [ACTION_CLIP[action]]).filter((n) => this.asset.clips.has(n));
    const clip = this.asset.clips.get(options[Math.floor(Math.random() * options.length)] ?? ACTION_CLIP[action]);
    if (!clip) return false;
    if (this.actionAction) this.actionAction.stop();
    const a = this.mixer.clipAction(clip);
    a.reset().setLoop(THREE.LoopOnce, 1);
    a.clampWhenFinished = true;
    a.timeScale = ACTION_RATE[action] ?? 1;
    a.play();
    this.actionAction = a;
    this.action = action;
    this.actionTime = 0;
    this.contactFired = false;
    return true;
  }

  private endAction() {
    const done = this.action!;
    this.action = null;
    for (const l of this.listeners) l({ type: "actionEnd", action: done });
  }

  /** Animation viewer: one clip played on its own (null returns to normal behaviour). */
  private preview: THREE.AnimationAction | null = null;
  previewRate = 1;
  setPreview(name: string | null, loop = true) {
    this.preview?.stop();
    this.preview = null;
    if (!name) return;
    const clip = this.asset.clips.get(name);
    if (!clip) return;
    const a = this.mixer.clipAction(clip);
    a.reset().setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity).play();
    a.clampWhenFinished = true;
    a.setEffectiveWeight(1);
    this.preview = a;
  }
  /** Seeks the previewed clip (seconds) and pauses it. */
  seekPreview(t: number) {
    if (!this.preview) return;
    this.previewRate = 0;
    this.preview.time = t;
  }
  get previewTime() {
    return this.preview?.time ?? 0;
  }

  update(dt: number, inp: LocoInput) {
    if (this.preview) {
      for (const a of this.locoActions.values()) a.setEffectiveWeight(0);
      this.actionAction?.setEffectiveWeight(0);
      this.preview.setEffectiveWeight(1);
      this.preview.timeScale = this.previewRate;
      this.mixer.update(dt);
      return;
    }
    // label state (HUD/tests) and blend weights
    this.loco = selectLocomotion(this.loco, inp);
    const idle = this.idleClip ?? "idle";
    const blend = locoBlend(inp, this.asset.strideTable, this.asset.durations, idle);
    const k = Math.min(1, dt * 10);
    for (const name of new Set([...this.locoW.keys(), ...Object.keys(blend.weights)])) {
      const w = (this.locoW.get(name) ?? 0) + ((blend.weights[name] ?? 0) - (this.locoW.get(name) ?? 0)) * (dt > 0 ? k : 1);
      if (w < 1e-3 && !blend.weights[name]) this.locoW.delete(name);
      else this.locoW.set(name, w);
    }
    // normalise so the pose is never pulled toward the bind pose
    let total = 0;
    for (const v of this.locoW.values()) total += v;
    // shared gait phase: advance by distance covered / metres per cycle
    const effSpeed = blend.cycle > 0 ? Math.max(inp.speed, Math.abs(inp.yawRate) > 1.6 && inp.speed < 1 ? 1.1 : 0) : 0;
    if (blend.cycle > 0) this.phase = (this.phase + (effSpeed / blend.cycle) * dt) % 1;
    // one-shot actions fade in fast and out at their end
    if (this.action && this.actionAction) {
      this.actionTime += dt;
      this.actionW = Math.min(1, this.actionW + dt / 0.1);
      const a = this.actionAction, left = a.getClip().duration - a.time;
      if (left / Math.max(0.1, a.timeScale) < 0.2) this.actionW = Math.min(this.actionW, (left / a.timeScale) / 0.2);
      const info = this.asset.info.get(ACTION_CLIP[this.action]);
      if (info?.contact !== undefined && !this.contactFired && a.time >= info.contact) {
        this.contactFired = true;
        for (const l of this.listeners) l({ type: "contact", action: this.action, foot: info.foot ?? "r" });
      }
      if (left <= 1e-3 || this.actionTime > a.getClip().duration / a.timeScale + 0.1) this.endAction();
    } else this.actionW = Math.max(0, this.actionW - dt / 0.2);
    if (!this.action && this.actionAction && this.actionW === 0) {
      this.actionAction.stop();
      this.actionAction = null;
    }
    this.actionAction?.setEffectiveWeight(this.actionW);
    for (const [name, w] of this.locoW) {
      const a = this.locoAction(name);
      if (!a) continue;
      a.setEffectiveWeight((w / Math.max(total, 1e-6)) * (1 - this.actionW));
      if (name === idle || name === "idle" || name === "talk" || name === "sit") a.timeScale = 1;
      else {
        // moving clips follow the shared phase, offset so every clip plants the left foot together
        a.timeScale = 0;
        const d = a.getClip().duration;
        a.time = ((this.phase + (this.asset.plantPhase[name] ?? 0)) % 1) * d;
      }
    }
    for (const [name, a] of this.locoActions) if (!this.locoW.has(name)) a.setEffectiveWeight(0);
    this.locoClipName = this.dominantClip;
    this.mixer.update(dt);
  }

  bone(name: string): THREE.Object3D | undefined {
    return this.root.getObjectByName(name);
  }

  dispose() {
    this.mixer.stopAllAction();
    this.shirtTex?.dispose();
    this.listeners.clear();
  }
}
