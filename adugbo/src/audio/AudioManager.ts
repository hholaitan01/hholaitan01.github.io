import type { Settings } from "../settings/settings";

/** CC0 Kenney samples in public/assets/audio, grouped by variants. */
const SAMPLES: Record<string, string[]> = {
  kick: ["kick_0", "kick_1", "kick_2"],
  shot: ["shot_0", "shot_1"],
  post: ["post_0", "post_1"],
  board: ["board_0", "board_1"],
  fence: ["fence_0"],
  net: ["net_0"],
  tackle: ["tackle_0"],
};

/**
 * Game audio on Web Audio: sampled impacts plus synthesised whistle, crowd and street ambience (generated in code,
 * so there is no recorded crowd, commentary or music to license). Buses: master → sfx / crowd.
 * Browsers only allow audio after a user gesture; `unlock()` is wired to the first pointer/key event.
 */
export class AudioManager {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfx!: GainNode;
  private crowd!: GainNode;
  private buffers = new Map<string, AudioBuffer>();
  private noise!: AudioBuffer;
  private bed: { src: AudioBufferSourceNode; gain: GainNode; filter: BiquadFilterNode }[] = [];
  private excite = 0;
  private settings: Settings;
  /** Names of sounds played (most recent last), for tests. */
  readonly played: string[] = [];

  constructor(settings: Settings) {
    this.settings = settings;
  }

  get running() {
    return this.ctx?.state === "running";
  }

  /** Creates/resumes the context; call from a user gesture. */
  async unlock() {
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.crowd = this.ctx.createGain();
      this.sfx.connect(this.master);
      this.crowd.connect(this.master);
      this.master.connect(this.ctx.destination);
      this.applyVolumes();
      this.noise = this.makeNoise(4);
      void this.loadSamples();
    }
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }

  setSettings(s: Settings) {
    this.settings = s;
    this.applyVolumes();
  }

  private applyVolumes() {
    if (!this.ctx) return;
    const s = this.settings, t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(s.muted ? 0 : s.masterVolume, t, 0.05);
    this.sfx.gain.setTargetAtTime(s.sfxVolume, t, 0.05);
    this.crowd.gain.setTargetAtTime(s.crowdVolume, t, 0.05);
  }

  private async loadSamples() {
    const ctx = this.ctx!;
    const names = Object.values(SAMPLES).flat();
    await Promise.all(
      names.map(async (n) => {
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}assets/audio/${n}.mp3`);
          this.buffers.set(n, await ctx.decodeAudioData(await res.arrayBuffer()));
        } catch {
          // a missing or undecodable file just stays silent
        }
      }),
    );
  }

  /** Brown-ish noise buffer used for crowd, ambience and the net. */
  private makeNoise(seconds: number) {
    const ctx = this.ctx!, len = Math.floor(ctx.sampleRate * seconds), b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = last * 3.5;
    }
    return b;
  }

  /** One-shot sample. `x` is the sound's horizontal screen position −1..1 for panning. */
  play(name: keyof typeof SAMPLES, opts: { gain?: number; rate?: number; x?: number } = {}) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const variants = SAMPLES[name], buf = this.buffers.get(variants[Math.floor(Math.random() * variants.length)]);
    if (!buf) return;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = (opts.rate ?? 1) * (0.94 + Math.random() * 0.12);
    const g = ctx.createGain();
    g.gain.value = opts.gain ?? 1;
    const pan = ctx.createStereoPanner();
    pan.pan.value = Math.max(-1, Math.min(1, opts.x ?? 0)) * 0.7;
    src.connect(g).connect(pan).connect(this.sfx);
    src.start();
    this.played.push(name);
  }

  /** Referee-style whistle (synthesised pea-whistle trill). `blasts` short blasts, or one long. */
  whistle(blasts = 1, long = false) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    let t = ctx.currentTime + 0.02;
    for (let i = 0; i < blasts; i++) {
      const dur = long && i === blasts - 1 ? 0.9 : 0.22;
      const osc = ctx.createOscillator(), trill = ctx.createOscillator(), trillGain = ctx.createGain(), g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 2900;
      trill.frequency.value = 38;
      trillGain.gain.value = 140;
      trill.connect(trillGain).connect(osc.frequency);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.16, t + 0.02);
      g.gain.setValueAtTime(0.16, t + dur - 0.05);
      g.gain.linearRampToValueAtTime(0, t + dur);
      osc.connect(g).connect(this.sfx);
      osc.start(t);
      trill.start(t);
      osc.stop(t + dur + 0.05);
      trill.stop(t + dur + 0.05);
      t += dur + 0.12;
    }
    this.played.push("whistle");
  }

  /** Short UI tick. */
  click() {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
    o.frequency.setValueAtTime(880, t);
    o.frequency.exponentialRampToValueAtTime(440, t + 0.06);
    g.gain.setValueAtTime(0.08, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.1);
  }

  /** Continuous crowd murmur and street rumble; `size` 0..1 scales the crowd (number of spectators). */
  startAmbience(size: number, evening: boolean) {
    const ctx = this.ctx;
    if (!ctx || this.bed.length) return;
    const layer = (freq: number, q: number, gain: number, bus: GainNode) => {
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      src.loop = true;
      src.playbackRate.value = 0.9 + Math.random() * 0.2;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = freq;
      filter.Q.value = q;
      const g = ctx.createGain();
      g.gain.value = gain;
      src.connect(filter).connect(g).connect(bus);
      src.start();
      this.bed.push({ src, gain: g, filter });
    };
    // voices band (crowd chatter) and low street/traffic rumble
    layer(700, 0.8, 0.05 + 0.08 * size, this.crowd);
    layer(160, 0.6, evening ? 0.05 : 0.08, this.sfx);
  }

  /** Crowd reaction: "ooh" for a near miss or save, a roar for a goal. */
  react(kind: "ooh" | "goal") {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = kind === "goal" ? 1.15 : 0.85;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = kind === "goal" ? 1000 : 520;
    f.Q.value = 0.9;
    const g = ctx.createGain(), t = ctx.currentTime, peak = kind === "goal" ? 0.55 : 0.3, dur = kind === "goal" ? 3.2 : 1.2;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + (kind === "goal" ? 0.35 : 0.25));
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f).connect(g).connect(this.crowd);
    src.start(t, Math.random() * 2);
    src.stop(t + dur + 0.1);
    this.excite = 1;
    this.played.push(kind);
  }

  /** Lets the crowd bed swell when play gets close to a goal (0..1). */
  setTension(v: number) {
    if (!this.ctx || !this.bed[0]) return;
    this.excite = Math.max(this.excite * 0.995, v);
    this.bed[0].filter.frequency.setTargetAtTime(650 + this.excite * 350, this.ctx.currentTime, 0.4);
  }

  dispose() {
    for (const b of this.bed) b.src.stop();
    this.bed = [];
    void this.ctx?.close();
    this.ctx = null;
  }
}
