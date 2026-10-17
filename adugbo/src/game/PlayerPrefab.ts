import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { kitMaterial, shirtTexture, type Kit, type KitUniforms } from "../render/kit";
import { STRIDE_SPEED } from "./anim/clips";
import { ACTION_CLIP, locoClip, selectLocomotion, type ActionName, type LocoInput, type LocoState } from "./anim/locomotion";

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
}

/** Shared, analysed data for the footballer GLB. */
export class FootballerAsset {
  readonly clips = new Map<string, THREE.AnimationClip>();
  readonly info = new Map<string, ClipInfo>();
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
  }

  /**
   * Samples a kick clip and finds the ball-contact time: the frame where a foot moves forward fastest while it is
   * still near its lowest height in the clip (the swing through the ball, not the follow-through or recovery).
   */
  private findContact(name: string) {
    const clip = this.clips.get(name);
    if (!clip) return;
    const root = SkeletonUtils.clone(this.gltf.scene);
    const mixer = new THREE.AnimationMixer(root);
    const act = mixer.clipAction(clip);
    act.play();
    const dt = 1 / 120;
    const track: Record<"l" | "r", THREE.Vector3[]> = { l: [], r: [] };
    // skip the final frame: in-place clips can wrap back to the first pose there
    for (let t = 0; t < clip.duration - 1 / 30; t += dt) {
      act.time = t;
      mixer.update(0);
      root.updateMatrixWorld(true);
      for (const f of ["l", "r"] as const) track[f].push(root.getObjectByName(`ball_${f}`)!.getWorldPosition(new THREE.Vector3()));
    }
    const best = { t: 0, v: 0, foot: "r" as "l" | "r" };
    for (const f of ["l", "r"] as const) {
      const pts = track[f], floor = Math.min(...pts.map((p) => p.y));
      for (let i = 1; i < pts.length; i++) {
        const vz = (pts[i].z - pts[i - 1].z) / dt;
        if (pts[i].y < floor + 0.22 && vz > best.v) Object.assign(best, { t: i * dt, v: vz, foot: f });
      }
    }
    this.info.set(name, { ...this.info.get(name)!, contact: +best.t.toFixed(3), foot: best.foot });
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
  private current: THREE.AnimationAction;
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
    this.current = this.mixer.clipAction(asset.clips.get("idle")!);
    this.current.play();
    this.mixer.addEventListener("finished", () => {
      if (this.action) this.endAction();
    });
    this.setLook(look);
  }

  on(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  setLook(look: PlayerLook) {
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

  private crossTo(name: string, rate: number, fade: number) {
    const clip = this.asset.clips.get(name)!;
    const next = this.mixer.clipAction(clip);
    next.timeScale = rate;
    if (next === this.current) return;
    next.reset().setLoop(THREE.LoopRepeat, Infinity).play();
    // keep the foot phase continuous between gait cycles
    next.time = (this.current.time / this.current.getClip().duration) * clip.duration;
    this.current.crossFadeTo(next, fade, false);
    this.current = next;
  }

  /** Plays a one-shot action over locomotion. Returns false if the clip is missing or an action is running. */
  play(action: ActionName): boolean {
    if (this.action) return false;
    const clip = this.asset.clips.get(ACTION_CLIP[action]);
    if (!clip) return false;
    const a = this.mixer.clipAction(clip);
    a.reset().setLoop(THREE.LoopOnce, 1);
    a.clampWhenFinished = true;
    a.timeScale = 1;
    a.play();
    this.current.crossFadeTo(a, 0.12, false);
    this.actionAction = a;
    this.action = action;
    this.actionTime = 0;
    this.contactFired = false;
    return true;
  }

  private endAction() {
    const done = this.action!;
    const back = this.mixer.clipAction(this.asset.clips.get(this.locoClipName)!);
    back.reset().setLoop(THREE.LoopRepeat, Infinity).play();
    this.actionAction!.crossFadeTo(back, 0.2, false);
    this.current = back;
    this.action = null;
    this.actionAction = null;
    for (const l of this.listeners) l({ type: "actionEnd", action: done });
  }

  update(dt: number, inp: LocoInput) {
    const next = selectLocomotion(this.loco, inp);
    const lc = locoClip(next, inp, STRIDE_SPEED);
    const clip = next === "idle" && this.idleClip ? this.idleClip : lc.clip, rate = lc.rate;
    this.loco = next;
    if (!this.action) {
      if (clip !== this.locoClipName) this.crossTo(clip, rate, 0.25);
      else this.current.timeScale = rate;
    }
    this.locoClipName = clip;
    if (this.action && this.actionAction) {
      this.actionTime += dt;
      const info = this.asset.info.get(ACTION_CLIP[this.action]);
      if (info?.contact !== undefined && !this.contactFired && this.actionAction.time >= info.contact) {
        this.contactFired = true;
        for (const l of this.listeners) l({ type: "contact", action: this.action, foot: info.foot ?? "r" });
      }
    }
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
