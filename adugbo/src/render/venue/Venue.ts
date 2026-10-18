import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import type { PitchSpec } from "../../game/pitch";
import type { QualityProfile, TimeOfDay } from "../../settings/settings";
import { buildPitch } from "../pitchMesh";
import { building, mural, type Building } from "./buildings";
import { canvasTex, pbr, seeded } from "./materials";
import { cable, chainLink, chairGeometry, floodMast, minibus, powerPole, streetLamp, umbrella } from "./props";

/** Worn artificial turf: mown stripes, bald patches by the goals and centre (generated, original). */
function turfMaterial(w: number, d: number) {
  const S = 8, W = Math.round(w * S), H = Math.round(d * S);
  const t = canvasTex(W, H, (c) => {
    for (let i = 0; i < 12; i++) {
      c.fillStyle = i % 2 ? "#3c7a35" : "#447f3b";
      c.fillRect((i * W) / 12, 0, W / 12 + 1, H);
    }
    for (let i = 0; i < 9000; i++) {
      c.fillStyle = `rgba(${Math.random() < 0.5 ? "20,40,15" : "120,150,80"},${Math.random() * 0.25})`;
      c.fillRect(Math.random() * W, Math.random() * H, 2, 2);
    }
    // worn, sandy patches where play concentrates
    for (const [x, y, r] of [[0.06, 0.5, 0.09], [0.94, 0.5, 0.09], [0.5, 0.5, 0.07]]) {
      const g = c.createRadialGradient(x * W, y * H, 0, x * W, y * H, r * W);
      g.addColorStop(0, "rgba(150,125,80,.75)");
      g.addColorStop(1, "rgba(150,125,80,0)");
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);
    }
  });
  return new THREE.MeshStandardMaterial({ map: t, roughness: 0.95 });
}

/** Spots where the view may place spectators (position, facing yaw, pose). */
export interface SpectatorSpot {
  pos: THREE.Vector3;
  yaw: number;
  pose: "sit" | "stand";
}

/**
 * "Adugbo court": a fenced concrete cage pitch in a Lagos-inspired neighbourhood street, built procedurally from
 * CC0 textures. Day and evening lighting; evening adds floodlights, street lamps and lit windows.
 */
export class Venue {
  readonly group = new THREE.Group();
  readonly spectatorSpots: SpectatorSpot[] = [];
  private sun = new THREE.DirectionalLight(0xffffff, 2.5);
  private hemi = new THREE.HemisphereLight(0xdfefff, 0x5a4a38, 1);
  private sky = new Sky();
  private floods: THREE.SpotLight[] = [];
  private floodLamps: THREE.MeshStandardMaterial[] = [];
  private lamps: { light: THREE.PointLight; mat: THREE.MeshStandardMaterial }[] = [];
  private buildings: Building[] = [];
  private envRT: THREE.WebGLRenderTarget | null = null;
  timeOfDay: TimeOfDay = "day";

  constructor(
    readonly pitch: PitchSpec,
    private q: QualityProfile,
  ) {
    const rand = seeded(42);
    const L = pitch.length / 2, W = pitch.width / 2;
    this.sky.scale.setScalar(1000);
    this.group.add(this.sky);
    this.group.add(this.hemi, this.sun, this.sun.target);
    this.sun.castShadow = q.shadows;
    this.sun.shadow.mapSize.set(q.shadowMap, q.shadowMap);
    Object.assign(this.sun.shadow.camera, { left: -30, right: 30, top: 24, bottom: -24, near: 1, far: 120 });
    this.sun.shadow.bias = -0.0005;
    this.sun.shadow.normalBias = 0.03;

    // ground: concrete court, asphalt streets around it
    const street = new THREE.Mesh(new THREE.PlaneGeometry(160, 120), pbr("asphalt", { repeat: 24, normals: q.normalMaps }));
    street.rotation.x = -Math.PI / 2;
    street.position.y = -0.01;
    street.receiveShadow = true;
    this.group.add(street);
    const courtW = 2 * (L + pitch.goalDepth + 0.15), courtD = 2 * (W + 0.3);
    const court = new THREE.Mesh(
      new THREE.PlaneGeometry(courtW, courtD),
      pitch.surface === "turf" ? turfMaterial(courtW, courtD) : pbr("concrete", { repeat: 6, color: "#86786a", normals: q.normalMaps }),
    );
    court.rotation.x = -Math.PI / 2;
    court.receiveShadow = true;
    this.group.add(court);
    this.group.add(buildPitch(pitch, { ground: false }));

    this.addFence(L, W);
    this.addFloodlights(L, W);

    // far side street (z < 0): a row of shops/houses facing the court, with traffic and spectators
    let x = -L - 12;
    let shop = 0;
    while (x < L + 12) {
      const w = 6 + Math.floor(rand() * 4);
      const floors = 1 + Math.floor(rand() * 3);
      const b = building(w, 8, floors, 100 + shop, { shop: shop++, normals: q.normalMaps });
      b.group.position.set(x + w / 2, 0, -W - 9.5);
      this.add(b);
      x += w + 0.4 + rand() * 1.2;
    }
    // behind each goal: buildings facing the court, and a mural wall behind the +x goal
    for (const s of [1, -1]) {
      let z = -W - 2;
      let i = 0;
      while (z < W + 6) {
        const w = 6 + Math.floor(rand() * 3);
        const b = building(w, 7, 1 + Math.floor(rand() * 3), 300 + i + (s > 0 ? 0 : 50), { shop: rand() < 0.4 ? shop++ : undefined, normals: q.normalMaps });
        b.group.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2;
        b.group.position.set(s * (L + pitch.goalDepth + 9), 0, z + w / 2);
        this.add(b);
        z += w + 0.5;
        i++;
      }
    }
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.2, 12), pbr("plaster", { repeat: 2, color: "#e8e1d0", normals: q.normalMaps }));
    wall.position.set(L + pitch.goalDepth + 4, 1.6, 0);
    wall.castShadow = wall.receiveShadow = true;
    this.group.add(wall);
    const m = mural(11.6, 3);
    m.position.set(L + pitch.goalDepth + 3.84, 1.6, 0);
    m.rotation.y = -Math.PI / 2;
    this.group.add(m);

    // street life on the far side
    const busCount = Math.max(1, Math.round(2 * q.props));
    for (let i = 0; i < busCount; i++) {
      const bus = minibus();
      bus.position.set(-L + 4 + i * 22, 0, -W - 4.2);
      bus.rotation.y = i % 2 ? Math.PI : 0;
      this.group.add(bus);
    }
    const umbrellaColors: [string, string][] = [["#d62828", "#ffffff"], ["#1f6fd1", "#f6c90e"], ["#0b6e4f", "#ffffff"]];
    const umbrellas = Math.round(3 * q.props);
    for (let i = 0; i < umbrellas; i++) {
      const u = umbrella(umbrellaColors[i % 3]);
      u.position.set(-6 + i * 9, 0, -W - 2.6);
      this.group.add(u);
    }
    // chairs and benches along the fence (some get seated spectators)
    const chairMats = [0xd62828, 0x1f6fd1, 0xf2f2f2, 0x0b6e4f].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5 }));
    const chairGeo = chairGeometry();
    for (let i = 0; i < 16; i++) {
      if (rand() > q.props + 0.1) continue;
      const cx = -L + 2 + i * 2.4 + rand() * 0.6, cz = -W - 1.4 - rand() * 0.4;
      const ch = new THREE.Mesh(chairGeo, chairMats[i % 4]);
      ch.position.set(cx, 0, cz);
      ch.rotation.y = Math.PI + (rand() - 0.5) * 0.5;
      ch.castShadow = true;
      this.group.add(ch);
      this.spectatorSpots.push({ pos: new THREE.Vector3(cx, 0, cz), yaw: ch.rotation.y + Math.PI, pose: "sit" });
    }
    for (let i = 0; i < 8; i++) this.spectatorSpots.push({ pos: new THREE.Vector3(-L + 5 + i * 4.8 + rand(), 0, -W - 2.2 - rand()), yaw: (rand() - 0.5) * 0.6, pose: "stand" });
    for (const s of [1, -1]) this.spectatorSpots.push({ pos: new THREE.Vector3(s * (L + pitch.goalDepth + 1.4), 0, -W + 1 + rand() * 2), yaw: s > 0 ? -Math.PI / 2 : Math.PI / 2, pose: "stand" });
    // shuffle so lower quality settings still spread spectators along the street
    this.spectatorSpots.sort(() => rand() - 0.5);

    // power poles and cables, street lamps
    const poleZ = -W - 6.8, poles: THREE.Vector3[] = [];
    for (let px = -L - 8; px <= L + 8; px += 13) {
      const p = powerPole();
      p.position.set(px, 0, poleZ);
      this.group.add(p);
      poles.push(new THREE.Vector3(px, 8.4, poleZ));
    }
    for (let i = 0; i + 1 < poles.length; i++)
      for (const dz of [-0.7, 0, 0.7]) this.group.add(cable(poles[i].clone().setZ(poleZ + dz), poles[i + 1].clone().setZ(poleZ + dz), 0.5 + rand() * 0.4));
    for (let i = 0; i < 4; i++) {
      const sl = streetLamp();
      sl.group.position.set(-L + 2 + i * 13, 0, -W - 7.4);
      this.group.add(sl.group);
      const light = new THREE.PointLight(0xffa64d, 0, 18, 2);
      light.position.copy(sl.lampPos).add(sl.group.position);
      this.group.add(light);
      this.lamps.push({ light, mat: sl.lampMat });
    }
  }

  private add(b: Building) {
    this.group.add(b.group);
    this.buildings.push(b);
  }

  private addFence(L: number, W: number) {
    const p = this.pitch;
    if (p.fenceHeight <= p.wallHeight) return;
    const t = chainLink();
    const mat = (w: number, h: number) => {
      const tt = t.clone();
      tt.repeat.set(w / 0.12, h / 0.12);
      tt.needsUpdate = true;
      return new THREE.MeshStandardMaterial({ map: tt, alphaTest: 0.4, transparent: false, side: THREE.DoubleSide, metalness: 0.5, roughness: 0.5 });
    };
    const back = L + p.goalDepth + 0.15, fh = p.fenceHeight - p.wallHeight;
    for (const zs of [1, -1]) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(2 * back, fh), mat(2 * back, fh));
      f.position.set(0, p.wallHeight + fh / 2, zs * (W + 0.25));
      this.group.add(f);
    }
    for (const xs of [1, -1]) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(2 * W + 0.5, p.fenceHeight), mat(2 * W, p.fenceHeight));
      f.position.set(xs * back, p.fenceHeight / 2, 0);
      f.rotation.y = Math.PI / 2;
      this.group.add(f);
    }
    // posts every 4 m and a top rail
    const steel = new THREE.MeshStandardMaterial({ color: 0x6f777b, metalness: 0.6, roughness: 0.5 });
    const post = new THREE.CylinderGeometry(0.04, 0.04, p.fenceHeight, 6);
    for (let x = -back; x <= back + 0.01; x += (2 * back) / Math.round((2 * back) / 4))
      for (const zs of [1, -1]) {
        const m = new THREE.Mesh(post, steel);
        m.position.set(x, p.fenceHeight / 2, zs * (W + 0.27));
        this.group.add(m);
      }
    for (const zs of [1, -1]) {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2 * back, 6), steel);
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, p.fenceHeight, zs * (W + 0.27));
      this.group.add(rail);
    }
  }

  private addFloodlights(L: number, W: number) {
    const h = 11;
    for (const xs of [1, -1])
      for (const zs of [1, -1]) {
        const { group, head, lampMat } = floodMast(h);
        const pos = new THREE.Vector3(xs * (L - 4), 0, zs * (W + 1.4));
        group.position.copy(pos);
        head.lookAt(new THREE.Vector3(-xs * 6, -h, -zs * 8).add(pos).setY(-4));
        this.group.add(group);
        this.floodLamps.push(lampMat);
        const spot = new THREE.SpotLight(0xfff3e0, 0, 90, 1.0, 0.7, 2);
        spot.position.set(pos.x, h + 0.3, pos.z);
        spot.target.position.set(-xs * 2, 0, -zs * 1);
        spot.castShadow = this.q.floodlightShadows;
        spot.shadow.mapSize.set(1024, 1024);
        spot.shadow.bias = -0.0008;
        this.group.add(spot, spot.target);
        this.floods.push(spot);
      }
  }

  /** Applies day or evening lighting. Builds an environment map from the sky when the quality allows. */
  setTimeOfDay(t: TimeOfDay, renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
    this.timeOfDay = t;
    const evening = t === "evening";
    const u = this.sky.material.uniforms;
    const elev = evening ? 2.5 : 52, azim = evening ? -115 : -140;
    const sunDir = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - elev), THREE.MathUtils.degToRad(azim));
    u.sunPosition.value.copy(sunDir);
    u.turbidity.value = evening ? 9 : 5;
    u.rayleigh.value = evening ? 2.6 : 1.1;
    u.mieCoefficient.value = evening ? 0.012 : 0.004;
    u.mieDirectionalG.value = 0.82;
    this.sun.position.copy(sunDir).multiplyScalar(60);
    this.sun.color.set(evening ? 0xff9a55 : 0xfff2dc);
    this.sun.intensity = evening ? 0.6 : 2.6;
    this.hemi.color.set(evening ? 0x6d7fa8 : 0xf1f4f6);
    this.hemi.groundColor.set(evening ? 0x2c2420 : 0x5a4a38);
    this.hemi.intensity = evening ? 0.5 : 0.75;
    for (const f of this.floods) f.intensity = evening ? 750 : 0;
    for (const m of this.floodLamps) {
      m.emissive.set(evening ? 0xfff6e0 : 0x000000);
      m.emissiveIntensity = evening ? 3 : 0;
    }
    for (const l of this.lamps) {
      l.light.intensity = evening ? 30 : 0;
      l.mat.emissive.set(evening ? 0xffa64d : 0x000000);
      l.mat.emissiveIntensity = evening ? 2.5 : 0;
    }
    for (const b of this.buildings) {
      for (const f of b.facades) f.emissiveIntensity = evening ? 1.1 : 0;
      for (const s of b.signs) s.emissiveIntensity = evening ? 0.35 : 0;
    }
    const fog = evening ? 0x3b3440 : 0xb9cfdd;
    scene.fog = new THREE.Fog(fog, 60, 170);
    renderer.toneMappingExposure = evening ? 1.0 : 0.9;
    this.envRT?.dispose();
    this.envRT = null;
    scene.environment = null;
    if (this.q.envMap) {
      const pm = new THREE.PMREMGenerator(renderer);
      const skyScene = new THREE.Scene();
      const sky = new Sky();
      sky.scale.setScalar(1000);
      for (const k of Object.keys(u)) (sky.material.uniforms[k].value as unknown) = u[k].value;
      skyScene.add(sky);
      this.envRT = pm.fromScene(skyScene);
      scene.environment = this.envRT.texture;
      scene.environmentIntensity = evening ? 0.12 : 0.2;
      pm.dispose();
    }
  }

  /** Shadow camera follows the action so the shadow map resolution is spent near the players. */
  focus(x: number, z: number) {
    const d = this.sun.position.clone().normalize().multiplyScalar(60);
    this.sun.target.position.set(x, 0, z);
    this.sun.position.set(x + d.x, d.y, z + d.z);
  }

  dispose() {
    this.envRT?.dispose();
    this.group.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
    });
  }
}
