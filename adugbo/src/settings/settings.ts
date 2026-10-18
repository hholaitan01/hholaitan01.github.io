export type Quality = "low" | "medium" | "high";
export type TimeOfDay = "day" | "evening";

export interface Settings {
  quality: Quality;
  timeOfDay: TimeOfDay;
  /** 0..1 */
  masterVolume: number;
  sfxVolume: number;
  crowdVolume: number;
  muted: boolean;
}

export interface QualityProfile {
  pixelRatio: number;
  antialias: boolean;
  shadows: boolean;
  shadowMap: number;
  spectators: number;
  /** Fraction of decorative props kept. */
  props: number;
  normalMaps: boolean;
  floodlightShadows: boolean;
  envMap: boolean;
}

export function profile(q: Quality, dpr = typeof devicePixelRatio === "number" ? devicePixelRatio : 1): QualityProfile {
  switch (q) {
    case "low":
      return { pixelRatio: 1, antialias: false, shadows: false, shadowMap: 512, spectators: 3, props: 0.4, normalMaps: false, floodlightShadows: false, envMap: false };
    case "medium":
      return { pixelRatio: Math.min(dpr, 1.5), antialias: true, shadows: true, shadowMap: 1024, spectators: 7, props: 0.75, normalMaps: true, floodlightShadows: false, envMap: true };
    case "high":
      return { pixelRatio: Math.min(dpr, 2), antialias: true, shadows: true, shadowMap: 2048, spectators: 12, props: 1, normalMaps: true, floodlightShadows: true, envMap: true };
  }
}

const KEY = "adugbo.settings.v1";

/** Phones default to medium, everything else to high. */
export function defaultSettings(): Settings {
  const coarse = typeof matchMedia === "function" && matchMedia("(pointer: coarse)").matches;
  return { quality: coarse ? "medium" : "high", timeOfDay: "day", masterVolume: 0.8, sfxVolume: 0.9, crowdVolume: 0.6, muted: false };
}

export function loadSettings(): Settings {
  const d = defaultSettings();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return d;
    const s = JSON.parse(raw) as Partial<Settings>;
    const vol = (v: unknown, def: number) => (typeof v === "number" && v >= 0 && v <= 1 ? v : def);
    return {
      quality: s.quality === "low" || s.quality === "medium" || s.quality === "high" ? s.quality : d.quality,
      timeOfDay: s.timeOfDay === "evening" ? "evening" : "day",
      masterVolume: vol(s.masterVolume, d.masterVolume),
      sfxVolume: vol(s.sfxVolume, d.sfxVolume),
      crowdVolume: vol(s.crowdVolume, d.crowdVolume),
      muted: s.muted === true,
    };
  } catch {
    return d;
  }
}

export function saveSettings(s: Settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // storage blocked (private mode): settings just won't persist
  }
}
