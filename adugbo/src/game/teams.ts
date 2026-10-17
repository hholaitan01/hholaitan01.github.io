import type { Kit } from "../render/kit";

/** Fictional street teams. Names are invented; kits are generated patterns with no real club or sponsor marks. */
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
  { id: "yab", name: "Yaba Express", home: k("#1f6fd1", "#ffffff", "#ffffff", "#1f6fd1", "stripes", "YBX"), away: k("#f2f2f2", "#1f6fd1", "#1f6fd1", "#f2f2f2", "hoop", "YBX"), attrs: { pace: 82, passing: 74, shooting: 70, defending: 64, keeping: 66 } },
  { id: "msh", name: "Mushin Movers", home: k("#d62828", "#111111", "#111111", "#d62828", "hoops", "MSH"), away: k("#111111", "#d62828", "#111111", "#111111", "plain", "MSH"), attrs: { pace: 72, passing: 70, shooting: 78, defending: 76, keeping: 68 } },
  { id: "sur", name: "Surulere Starboys", home: k("#f6c90e", "#0b6e4f", "#0b6e4f", "#f6c90e", "sash", "SRL"), away: k("#0b6e4f", "#f6c90e", "#f6c90e", "#0b6e4f", "chevron", "SRL"), attrs: { pace: 76, passing: 80, shooting: 72, defending: 68, keeping: 70 } },
  { id: "ajg", name: "Ajegunle Kings", home: k("#6a2c91", "#f6c90e", "#f6c90e", "#6a2c91", "halves", "AJK"), away: k("#f6c90e", "#6a2c91", "#6a2c91", "#f6c90e", "pinstripe", "AJK"), attrs: { pace: 78, passing: 76, shooting: 80, defending: 70, keeping: 64 } },
  { id: "osh", name: "Oshodi Rovers", home: k("#ff7a00", "#1b1b1b", "#1b1b1b", "#ff7a00", "plain", "OSR"), away: k("#1b1b1b", "#ff7a00", "#ff7a00", "#1b1b1b", "hoop", "OSR"), attrs: { pace: 70, passing: 72, shooting: 68, defending: 80, keeping: 76 } },
  { id: "idm", name: "Idumota Flyers", home: k("#00a6a6", "#ffffff", "#ffffff", "#00a6a6", "pinstripe", "IDF"), away: k("#ffffff", "#00a6a6", "#00a6a6", "#ffffff", "stripes", "IDF"), attrs: { pace: 84, passing: 68, shooting: 66, defending: 66, keeping: 62 } },
];
