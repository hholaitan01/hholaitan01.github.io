import * as THREE from "three";

export type KitPattern = "plain" | "hoops" | "hoop" | "stripes" | "pinstripe" | "halves" | "sash" | "chevron";

export interface Kit {
  shirt: string;
  trim: string;
  shorts: string;
  socks: string;
  boots: string;
  pattern: KitPattern;
  /** Short club code shown on the chest badge (fictional teams only). */
  badge: string;
  longSleeves?: boolean;
}

// Torso box of the Rocketbox body in metres above the soles: y from, y to, half width, front sign (+z)
const TORSO = [0.95, 1.5, 0.24, 1] as const;
// Heights above the soles where greyed cloth changes from shirt to shorts to socks to boots
const LEVELS = [0.95, 0.5, 0.1] as const;

export function luminance(hex: string): number {
  const c = new THREE.Color(hex);
  return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
}

function fitFont(g: CanvasRenderingContext2D, text: string, maxW: number, size: number, family: string) {
  let s = size;
  do g.font = `800 ${s}px ${family}`;
  while (g.measureText(text).width > maxW && --s > 10);
}

/** Front (left half) and back (right half) of the shirt: pattern, badge, name and number. */
export function drawShirt(g: CanvasRenderingContext2D, kit: Kit, name: string, number: number) {
  const h = 256;
  for (const half of [0, 1]) {
    const x0 = half * 256;
    g.save();
    g.beginPath();
    g.rect(x0, 0, 256, h);
    g.clip();
    g.fillStyle = kit.shirt;
    g.fillRect(x0, 0, 256, h);
    g.fillStyle = kit.trim;
    const p = kit.pattern;
    if (p === "hoops") for (let y = 30; y < h; y += 52) g.fillRect(x0, y, 256, 24);
    else if (p === "hoop") g.fillRect(x0, h * 0.42, 256, h * 0.14);
    else if (p === "stripes") for (let x = x0 + 16; x < x0 + 256; x += 64) g.fillRect(x, 0, 30, h);
    else if (p === "pinstripe") for (let x = x0 + 10; x < x0 + 256; x += 24) g.fillRect(x, 0, 4, h);
    else if (p === "halves") g.fillRect(half ? x0 : x0 + 128, 0, 128, h);
    else if (p === "sash") {
      const d = half ? -1 : 1;
      g.beginPath();
      g.moveTo(x0 + (d > 0 ? 0 : 256), 20);
      g.lineTo(x0 + (d > 0 ? 60 : 196), 0);
      g.lineTo(x0 + (d > 0 ? 256 : 0), h - 40);
      g.lineTo(x0 + (d > 0 ? 196 : 60), h);
      g.closePath();
      g.fill();
    } else if (p === "chevron") {
      g.beginPath();
      g.moveTo(x0, 40);
      g.lineTo(x0 + 128, 130);
      g.lineTo(x0 + 256, 40);
      g.lineTo(x0 + 256, 80);
      g.lineTo(x0 + 128, 170);
      g.lineTo(x0, 80);
      g.closePath();
      g.fill();
    }
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, "rgba(255,255,255,.07)");
    gr.addColorStop(1, "rgba(0,0,0,.18)");
    g.fillStyle = gr;
    g.fillRect(x0, 0, 256, h);
    g.fillStyle = kit.trim;
    g.fillRect(x0, 0, 256, 12);
    g.restore();
  }
  const light = luminance(kit.shirt) > 0.45;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = light ? "#111111" : "#ffffff";
  g.strokeStyle = light ? "rgba(255,255,255,.55)" : "rgba(0,0,0,.55)";
  g.lineWidth = 6;
  const family = "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif";
  g.font = `800 112px ${family}`;
  g.strokeText(String(number), 384, 140);
  g.fillText(String(number), 384, 140);
  const label = name.toUpperCase();
  fitFont(g, label, 200, 30, family);
  g.strokeText(label, 384, 54);
  g.fillText(label, 384, 54);
  g.font = `800 40px ${family}`;
  g.strokeText(String(number), 175, 82);
  g.fillText(String(number), 175, 82);
  // fictional club badge: a plain disc with the team code
  g.beginPath();
  g.arc(72, 72, 20, 0, Math.PI * 2);
  g.fillStyle = kit.trim;
  g.fill();
  g.fillStyle = luminance(kit.trim) > 0.45 ? "#111" : "#fff";
  g.font = `800 13px ${family}`;
  g.fillText(kit.badge, 72, 73);
}

export function shirtTexture(kit: Kit, name: string, number: number): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  drawShirt(c.getContext("2d")!, kit, name, number);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export interface KitUniforms {
  uShirt: { value: THREE.Color };
  uShorts: { value: THREE.Color };
  uSocks: { value: THREE.Color };
  uBoots: { value: THREE.Color };
  uSkin: { value: THREE.Color };
  uKitTex: { value: THREE.Texture };
  uLong: { value: THREE.Vector2 };
}

/**
 * Recolours the footballer body. The body texture has the cloth desaturated; the kitRegion vertex attribute
 * says which part a vertex belongs to (0 skin, 1 shirt, 2 shorts, 3 socks, 4 boots, 5 thigh, 6 forearm, 7 knee).
 */
export function kitMaterial(
  base: THREE.MeshStandardMaterial,
  kit: Kit,
  tex: THREE.Texture,
  skin: THREE.Color,
  /** Bind-pose y of the soles: the mesh's local origin is not at the feet. */
  floorY: number,
): THREE.MeshStandardMaterial {
  const m = base.clone();
  const u: KitUniforms = {
    uShirt: { value: new THREE.Color(kit.shirt) },
    uShorts: { value: new THREE.Color(kit.shorts) },
    uSocks: { value: new THREE.Color(kit.socks) },
    uBoots: { value: new THREE.Color(kit.boots) },
    uSkin: { value: skin.clone() },
    uKitTex: { value: tex },
    uLong: { value: new THREE.Vector2(0, kit.longSleeves ? 1 : 0) },
  };
  m.userData.kit = u;
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u, {
      uTorso: { value: new THREE.Vector4(TORSO[0] + floorY, TORSO[1] + floorY, TORSO[2], TORSO[3]) },
      uLevels: { value: new THREE.Vector4(LEVELS[0] + floorY, LEVELS[1] + floorY, LEVELS[2] + floorY, 0) },
    });
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nattribute float kitRegion;\nvarying float vKit;\nvarying vec3 vBind;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvKit = kitRegion;\nvBind = position;");
    sh.fragmentShader = sh.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
      varying float vKit; varying vec3 vBind;
      uniform vec3 uShirt; uniform vec3 uShorts; uniform vec3 uSocks; uniform vec3 uBoots; uniform vec3 uSkin;
      uniform sampler2D uKitTex; uniform vec4 uTorso; uniform vec2 uLong; uniform vec4 uLevels;`,
      )
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
      float kr = vKit;
      vec3 tc = sqrt(diffuseColor.rgb); // judge greyness in (roughly) display space, dark cloth is noisy in linear
      float mxc = max(tc.r, max(tc.g, tc.b));
      float chroma = (mxc - min(tc.r, min(tc.g, tc.b))) / max(mxc, 0.02);
      bool cloth = chroma < 0.2;
      if (cloth && abs(kr - 4.0) > 0.5) kr = vBind.y > uLevels.x ? 1.0 : vBind.y > uLevels.y ? 2.0 : vBind.y > uLevels.z ? 3.0 : 4.0;
      else if (!cloth && kr > 0.5 && kr < 3.5) kr = 0.0;
      if (kr > 4.5) { if (uLong.y > 0.5 && kr > 5.5 && kr < 6.5) kr = 1.0; else kr = 0.0; }
      if (kr > 0.5) {
        vec3 kc;
        if (kr < 1.5) {
          kc = uShirt;
          vec2 t = vec2(vBind.x / (2.0 * uTorso.z) + 0.5, (vBind.y - uTorso.x) / (uTorso.y - uTorso.x));
          if (t.x > 0.0 && t.x < 1.0 && t.y > 0.0 && t.y < 1.0) {
            bool back = vBind.z * uTorso.w < 0.0;
            kc = texture2D(uKitTex, vec2(back ? 0.5 + (1.0 - t.x) * 0.5 : t.x * 0.5, t.y)).rgb;
          }
        } else if (kr < 2.5) kc = uShorts; else if (kr < 3.5) kc = uSocks; else kc = uBoots;
        diffuseColor.rgb = kc * (0.8 + 0.3 * clamp(mxc * 1.6, 0.0, 1.0));
      } else diffuseColor.rgb *= uSkin;`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        "#include <roughnessmap_fragment>\nif (vKit > 3.5 && vKit < 4.5) roughnessFactor = 0.35; else if (vKit > 0.5 && vKit < 3.5) roughnessFactor = 0.82;",
      );
  };
  m.customProgramCacheKey = () => "adugbo-kit-1";
  return m;
}
