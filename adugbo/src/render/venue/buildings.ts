import * as THREE from "three";
import { canvasTex, pbr, seeded } from "./materials";

const FLOOR_H = 3.2;

/** Invented shop names (no real businesses, brands or phone numbers). */
export const SHOP_SIGNS = [
  { name: "MAMA BISI PROVISIONS", sub: "Rice · Beans · Garri · Soft drinks", bg: "#1f6fd1", fg: "#ffffff" },
  { name: "IFE BARBING SALON", sub: "Low cut · Fade · Beards", bg: "#d62828", fg: "#ffffff" },
  { name: "OLU VULCANIZER", sub: "Tyres · Tubes · Pump", bg: "#111111", fg: "#f6c90e" },
  { name: "ADUGBO VIEWING CENTRE", sub: "Live football every weekend", bg: "#0b6e4f", fg: "#ffffff" },
  { name: "EKO SUYA SPOT", sub: "Fresh suya · Kilishi", bg: "#ff7a00", fg: "#111111" },
  { name: "CHIKA PHONE REPAIRS", sub: "Screens · Batteries · Charging", bg: "#6a2c91", fg: "#ffffff" },
  { name: "GOOD LUCK TAILORING", sub: "Native · Corporate · Kids", bg: "#f2f2f2", fg: "#1b1b1b" },
  { name: "BLESSED HANDS CHEMIST", sub: "Open daily", bg: "#00a6a6", fg: "#ffffff" },
];

function signTexture(s: (typeof SHOP_SIGNS)[number]) {
  return canvasTex(512, 96, (c, w, h) => {
    c.fillStyle = s.bg;
    c.fillRect(0, 0, w, h);
    c.strokeStyle = s.fg;
    c.lineWidth = 4;
    c.strokeRect(6, 6, w - 12, h - 12);
    c.fillStyle = s.fg;
    c.textAlign = "center";
    c.textBaseline = "middle";
    let size = 46;
    do c.font = `800 ${size}px 'Barlow Condensed', Arial, sans-serif`;
    while (c.measureText(s.name).width > w - 40 && --size > 16);
    c.fillText(s.name, w / 2, h * 0.42);
    c.font = `600 18px 'Barlow Condensed', Arial, sans-serif`;
    c.fillText(s.sub, w / 2, h * 0.8);
    // weathering
    c.fillStyle = "rgba(0,0,0,.18)";
    for (let i = 0; i < 260; i++) c.fillRect(Math.random() * w, Math.random() * h, 3, 1);
  });
}

/** Facade texture: rows of windows with burglar-proof bars, plus a matching emissive map for lit rooms at night. */
function facadeTextures(cols: number, floors: number, rand: () => number, shop: boolean) {
  const W = 64 * cols, H = 96 * floors;
  const lit: boolean[] = [];
  const draw = (emissive: boolean) => (c: CanvasRenderingContext2D) => {
    c.fillStyle = emissive ? "#000" : "#ffffff";
    c.fillRect(0, 0, W, H);
    for (let f = shop ? 1 : 0; f < floors; f++)
      for (let i = 0; i < cols; i++) {
        const x = i * 64 + 14, y = (floors - 1 - f) * 96 + 22, ww = 36, wh = 46;
        const k = f * cols + i;
        if (!emissive) {
          lit[k] = rand() < 0.45;
          c.fillStyle = "rgba(60,48,40,.5)";
          c.fillRect(x - 4, y - 4, ww + 8, wh + 8);
          c.fillStyle = "#2a3238";
          c.fillRect(x, y, ww, wh);
          c.strokeStyle = "#d9d9d9";
          c.lineWidth = 2;
          for (let b = 1; b < 5; b++) {
            c.beginPath();
            c.moveTo(x + (b * ww) / 5, y);
            c.lineTo(x + (b * ww) / 5, y + wh);
            c.stroke();
          }
          c.strokeRect(x, y, ww, wh);
          // rust streak under the sill
          c.fillStyle = "rgba(110,70,40,.25)";
          c.fillRect(x + 4, y + wh + 4, 4, 14);
        } else if (lit[k]) {
          c.fillStyle = rand() < 0.7 ? "#ffcf8a" : "#cfe4ff";
          c.fillRect(x + 2, y + 2, ww - 4, wh - 4);
        }
      }
  };
  const map = canvasTex(W, H, draw(false));
  const emissive = canvasTex(W, H, draw(true));
  return { map, emissive };
}

export interface Building {
  group: THREE.Group;
  /** Facade materials whose emissive intensity is raised in the evening. */
  facades: THREE.MeshStandardMaterial[];
  signs: THREE.MeshStandardMaterial[];
}

// Lagos paint: bright pinks, yellows, sky blues and mint, plus the odd faded cream
const PASTELS = ["#e99ab0", "#f2c94c", "#8ec5e8", "#9fd8b4", "#f4b183", "#c9a6e0", "#f0e6d2", "#e7d26a"];

/**
 * A 1–3 storey Lagos-style block: painted plaster walls, barred windows, corrugated zinc roof,
 * optional ground-floor shop with a hand-painted sign, balcony and roof water tank.
 */
export function building(w: number, d: number, floors: number, seed: number, opts: { shop?: number; normals?: boolean } = {}): Building {
  const rand = seeded(seed);
  const g = new THREE.Group();
  const h = floors * FLOOR_H;
  const tint = PASTELS[Math.floor(rand() * PASTELS.length)];
  const wallMat = pbr("plaster", { repeat: 2, color: tint, normals: opts.normals });
  const cols = Math.max(2, Math.round(w / 2.6));
  const { map, emissive } = facadeTextures(cols, floors, rand, opts.shop !== undefined);
  const facade = new THREE.MeshStandardMaterial({ map, emissiveMap: emissive, emissive: 0xffffff, emissiveIntensity: 0, color: tint, roughness: 0.9 });
  // walls: front (+z) uses the facade; others plain plaster
  const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [wallMat, wallMat, wallMat, wallMat, facade, wallMat]);
  box.position.y = h / 2;
  box.castShadow = box.receiveShadow = true;
  g.add(box);
  // zinc roof, slightly pitched with overhang
  const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, 0.08, d + 0.8), pbr("zinc", { repeat: 2, color: rand() < 0.5 ? "#b08060" : "#9a9a9a", metalness: 0.5, normals: opts.normals }));
  roof.position.set(0, h + 0.35, 0.1);
  roof.rotation.x = 0.12;
  roof.castShadow = true;
  g.add(roof);
  const signs: THREE.MeshStandardMaterial[] = [];
  if (opts.shop !== undefined) {
    const s = SHOP_SIGNS[opts.shop % SHOP_SIGNS.length];
    const sm = new THREE.MeshStandardMaterial({ map: signTexture(s), emissive: 0xffffff, emissiveMap: null, emissiveIntensity: 0, roughness: 0.7 });
    sm.emissiveMap = sm.map;
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w - 0.6, 6), 1.1), sm);
    sign.position.set(0, FLOOR_H - 0.55, d / 2 + 0.06);
    g.add(sign);
    signs.push(sm);
    // open shop front: dark interior, rolled shutter, awning
    const front = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.7, 2.1), new THREE.MeshStandardMaterial({ color: 0x1b1a18, roughness: 1 }));
    front.position.set(0, 1.05, d / 2 + 0.02);
    g.add(front);
    const awning = new THREE.Mesh(new THREE.BoxGeometry(w * 0.8, 0.05, 1.2), pbr("zinc", { repeat: 1, color: "#7c8a8f", metalness: 0.5, normals: false }));
    awning.position.set(0, 2.35, d / 2 + 0.6);
    awning.rotation.x = 0.2;
    awning.castShadow = true;
    g.add(awning);
  }
  if (floors > 1 && rand() < 0.6) {
    const bal = new THREE.Mesh(new THREE.BoxGeometry(w * 0.6, 0.15, 1.1), wallMat);
    bal.position.set(0, FLOOR_H + 0.05, d / 2 + 0.55);
    bal.castShadow = true;
    g.add(bal);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(w * 0.6, 0.9, 0.05), new THREE.MeshStandardMaterial({ color: 0x2b2b2b, wireframe: false, roughness: 0.6 }));
    rail.position.set(0, FLOOR_H + 0.55, d / 2 + 1.08);
    g.add(rail);
  }
  if (rand() < 0.55) {
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.7, 1.4, 14), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.55 }));
    tank.position.set((rand() - 0.5) * (w - 2), h + 1.1, (rand() - 0.5) * (d - 2));
    tank.castShadow = true;
    g.add(tank);
  }
  return { group: g, facades: [facade], signs };
}

/** Original mural for the wall behind a goal: bold street lettering and shapes. */
export function mural(w: number, h: number): THREE.Mesh {
  const t = canvasTex(1024, 384, (c, W, H) => {
    const grd = c.createLinearGradient(0, 0, W, H);
    grd.addColorStop(0, "#0b6e4f");
    grd.addColorStop(0.5, "#1f6fd1");
    grd.addColorStop(1, "#6a2c91");
    c.fillStyle = grd;
    c.fillRect(0, 0, W, H);
    for (let i = 0; i < 14; i++) {
      c.fillStyle = ["#f6c90e", "#ff7a00", "#ffffff", "#d62828"][i % 4];
      c.globalAlpha = 0.35;
      c.beginPath();
      c.arc(Math.random() * W, Math.random() * H, 30 + Math.random() * 90, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;
    c.font = "800 190px 'Barlow Condensed', Arial Black, sans-serif";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.lineWidth = 14;
    c.strokeStyle = "#111";
    c.strokeText("ADUGBO", W / 2, H * 0.45);
    c.fillStyle = "#f6c90e";
    c.fillText("ADUGBO", W / 2, H * 0.45);
    c.font = "700 54px 'Barlow Condensed', Arial, sans-serif";
    c.fillStyle = "#fff";
    c.fillText("STREET KINGS · OWN YOUR STREET", W / 2, H * 0.82);
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }));
  m.receiveShadow = true;
  return m;
}
