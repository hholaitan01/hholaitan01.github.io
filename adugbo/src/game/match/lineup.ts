import type { HeadId, PlayerLook } from "../PlayerPrefab";
import type { Kit } from "../../render/kit";
import type { Team } from "../teams";

/** Invented first names used on shirts (not real players). */
const NAMES = ["Ade", "Bayo", "Chidi", "Dayo", "Emeka", "Femi", "Gbenga", "Ibrahim", "Jide", "Kunle", "Lekan", "Musa", "Nnamdi", "Obinna", "Segun", "Tunde", "Uche", "Yusuf", "Kelechi", "Sani"];
const HEADS: HeadId[] = ["m300", "m006", "m007", "m102", "m130", "sm005", "m016", "m108"];

function rgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function colourDistance(a: string, b: string) {
  const x = rgb(a), y = rgb(b);
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}

/** Away side switches to its away kit when the shirts or shorts are too close to the home kit. */
export function kitsFor(home: Team, away: Team): [Kit, Kit] {
  const h = home.home;
  const clash = (k: Kit) => colourDistance(k.shirt, h.shirt) < 140 || (colourDistance(k.shirt, h.trim) < 60 && colourDistance(k.shorts, h.shorts) < 60);
  return [h, clash(away.home) ? away.away : away.home];
}

/** Goalkeeper kit: a colour distinct from both outfield kits. */
export function keeperKit(own: Kit, other: Kit): Kit {
  const options = ["#2e7d32", "#111111", "#c2185b", "#00838f", "#f9a825"];
  const shirt = options.find((c) => colourDistance(c, own.shirt) > 150 && colourDistance(c, other.shirt) > 150) ?? "#111111";
  return { shirt, trim: "#ffffff", shorts: "#111111", socks: shirt, boots: "#111111", pattern: "plain", badge: own.badge };
}

export function lookFor(kit: Kit, index: number, gk: boolean, other: Kit, seed: number): PlayerLook {
  const k = gk ? keeperKit(kit, other) : kit;
  const name = NAMES[(seed * 7 + index * 3) % NAMES.length];
  return {
    kit: k,
    name,
    number: gk ? 1 : [10, 7, 4, 9, 5, 8, 11][index % 7],
    head: HEADS[(seed + index * 3) % HEADS.length],
    hair: (["full", "hightop", "none", "mohawk"] as const)[(index + seed) % 4],
    skinTone: 0.5 + ((index * 37 + seed * 11) % 20) / 100,
  };
}
