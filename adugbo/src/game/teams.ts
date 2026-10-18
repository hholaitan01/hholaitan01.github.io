import type { Kit } from "../render/kit";

/**
 * Street sides named after Lagos neighbourhoods. They are not real clubs and represent no real team: the area names
 * are just place names, and the kits are generated patterns with no club or sponsor marks.
 */
export interface Team {
  id: string;
  name: string;
  home: Kit;
  away: Kit;
  /** 1-100 team ratings used by the AI and match engine. */
  attrs: { pace: number; passing: number; shooting: number; defending: number; keeping: number };
}

const k = (shirt: string, trim: string, shorts: string, socks: string, pattern: Kit["pattern"], badge: string, boots = "#151515"): Kit => ({
  shirt, trim, shorts, socks, boots, pattern, badge,
});

export const TEAMS: Team[] = [
  { id: "onipanu", name: "Onipanu", home: k("#6d28d9", "#ffffff", "#ffffff", "#6d28d9", "halves", "ONP"), away: k("#ffffff", "#6d28d9", "#6d28d9", "#ffffff", "plain", "ONP"), attrs: { pace: 80, passing: 74, shooting: 70, defending: 66, keeping: 64 } },
  { id: "mushin", name: "Mushin", home: k("#0e7c4a", "#111111", "#111111", "#0e7c4a", "pinstripe", "MSH"), away: k("#111111", "#0e7c4a", "#111111", "#111111", "hoop", "MSH"), attrs: { pace: 72, passing: 70, shooting: 78, defending: 78, keeping: 68 } },
  { id: "ojuelegba", name: "Ojuelegba", home: k("#f97316", "#111111", "#111111", "#f97316", "chevron", "OJB"), away: k("#111111", "#f97316", "#f97316", "#111111", "plain", "OJB"), attrs: { pace: 84, passing: 72, shooting: 74, defending: 62, keeping: 64 } },
  { id: "idumota", name: "Idumota", home: k("#facc15", "#1d4ed8", "#1d4ed8", "#facc15", "hoops", "IDM"), away: k("#1d4ed8", "#facc15", "#ffffff", "#1d4ed8", "sash", "IDM"), attrs: { pace: 78, passing: 80, shooting: 70, defending: 66, keeping: 66 } },
  { id: "lafiagi", name: "Lafiagi", home: k("#dc2626", "#ffffff", "#ffffff", "#dc2626", "stripes", "LFG"), away: k("#ffffff", "#dc2626", "#dc2626", "#ffffff", "hoop", "LFG"), attrs: { pace: 74, passing: 68, shooting: 80, defending: 72, keeping: 70 } },
  { id: "isaleeko", name: "Isale-Eko", home: k("#15803d", "#ffffff", "#ffffff", "#15803d", "sash", "ISE"), away: k("#ffffff", "#15803d", "#15803d", "#ffffff", "pinstripe", "ISE"), attrs: { pace: 70, passing: 78, shooting: 68, defending: 76, keeping: 74 } },
  { id: "akoka", name: "Akoka", home: k("#1e3a8a", "#7dd3fc", "#1e3a8a", "#1e3a8a", "hoop", "AKK"), away: k("#7dd3fc", "#1e3a8a", "#1e3a8a", "#7dd3fc", "stripes", "AKK"), attrs: { pace: 76, passing: 82, shooting: 72, defending: 64, keeping: 66 } },
  { id: "bariga", name: "Bariga", home: k("#7f1d1d", "#f5c518", "#f5c518", "#7f1d1d", "sash", "BRG"), away: k("#f5c518", "#7f1d1d", "#7f1d1d", "#f5c518", "plain", "BRG"), attrs: { pace: 72, passing: 70, shooting: 74, defending: 80, keeping: 72 } },
  { id: "abuleoja", name: "Abule-Oja", home: k("#161616", "#ffffff", "#161616", "#161616", "stripes", "ABO"), away: k("#f2f2f2", "#161616", "#f2f2f2", "#f2f2f2", "chevron", "ABO"), attrs: { pace: 68, passing: 74, shooting: 66, defending: 82, keeping: 78 } },
  { id: "olowogbowo", name: "Olowogbowo", home: k("#fde047", "#ffffff", "#ffffff", "#fde047", "halves", "OLW"), away: k("#14532d", "#fde047", "#14532d", "#14532d", "hoops", "OLW"), attrs: { pace: 82, passing: 70, shooting: 76, defending: 66, keeping: 62 } },
  { id: "onola", name: "Onola", home: k("#db2777", "#111111", "#111111", "#db2777", "hoop", "ONL"), away: k("#111111", "#db2777", "#111111", "#111111", "stripes", "ONL"), attrs: { pace: 78, passing: 76, shooting: 78, defending: 64, keeping: 62 } },
  { id: "oshodi", name: "Oshodi", home: k("#0f766e", "#ffffff", "#0f766e", "#0f766e", "chevron", "OSD"), away: k("#ffffff", "#0f766e", "#ffffff", "#ffffff", "halves", "OSD"), attrs: { pace: 70, passing: 72, shooting: 70, defending: 78, keeping: 80 } },
  { id: "mafoluku", name: "Mafoluku", home: k("#6b7280", "#dc2626", "#111111", "#6b7280", "pinstripe", "MFK"), away: k("#dc2626", "#111111", "#111111", "#dc2626", "plain", "MFK"), attrs: { pace: 74, passing: 66, shooting: 72, defending: 76, keeping: 70 } },
  { id: "agege", name: "Agege", home: k("#2563eb", "#f97316", "#ffffff", "#2563eb", "sash", "AGG"), away: k("#f97316", "#2563eb", "#2563eb", "#f97316", "hoops", "AGG"), attrs: { pace: 80, passing: 74, shooting: 74, defending: 70, keeping: 66 } },
];
