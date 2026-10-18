import * as THREE from "three";
import { MatchView } from "./MatchView";
import type { UserInput } from "../game/match/MatchSim";
import { defaultConfig } from "../game/match/rules";
import type { SimEvent } from "../game/sim/GameSim";
import type { V2 } from "../game/sim/SimPlayer";
import { validBall } from "../game/ball";
import type { MatchStart, ServerMsg } from "../net/protocol";
import { decodeInput, encodeInput, encodeSnap, SnapPlayer } from "../net/snapshot";
import type { RoomLink } from "../net/client";

export type OnlineRole = "host" | "guest" | "spectator";

const SNAP_EVERY = 0.05; // 20 snapshots a second
const INPUT_EVERY = 1 / 30;

/**
 * An online match. The host (seat 0) runs the real simulation with both players' inputs and sends snapshots; the
 * guest (seat 1) sends its input and draws the snapshots, as do spectators. Nobody can pause.
 */
export class OnlineMatchView extends MatchView {
  role: OnlineRole = "spectator";
  private link!: RoomLink;
  private snaps = new SnapPlayer();
  private pendingEv: SimEvent[] = [];
  private snapT = 0;
  private inputT = 0;
  private inputSeq = 0;
  private lastInputSent = "";
  /** Host: the guest's latest stick and sprint, plus button presses not yet applied. */
  private remote: UserInput = { move: { x: 0, z: 0 }, sprint: false };
  private remoteSeq = -1;
  private endSent = false;
  /** Called once when this side's simulation reaches full time. */
  onFullTime: (score: [number, number]) => void = () => {};

  async loadOnline(start: MatchStart, role: OnlineRole, link: RoomLink, onProgress?: (f: number) => void) {
    this.role = role;
    this.link = link;
    this.canPause = false;
    const cfg = { ...defaultConfig("fives", start.home, start.away), halfMinutes: start.halfMinutes, userTeam: (role === "guest" ? 1 : 0) as 0 | 1, timeOfDay: start.timeOfDay };
    await this.load(cfg, onProgress, start.seed, [true, true]);
    const ball = validBall(start.ball);
    if (ball) this.setBallDesign(ball);
  }

  /** Network messages for the match (the screen forwards them). */
  onNet(m: ServerMsg) {
    if (m.t === "snap" && this.role !== "host") this.snaps.push(m.d);
    if (m.t === "in" && this.role === "host") {
      const { seq, inp } = decodeInput(m.d);
      if (seq <= this.remoteSeq) return;
      this.remoteSeq = seq;
      // keep presses until the next simulation step uses them
      this.remote = { ...inp, pass: inp.pass ?? this.remote.pass, shoot: inp.shoot ?? this.remote.shoot, lob: inp.lob ?? this.remote.lob, through: inp.through ?? this.remote.through, throughLofted: inp.throughLofted || this.remote.throughLofted, switchPlayer: inp.switchPlayer || this.remote.switchPlayer };
    }
  }

  /** Seconds since the host's last snapshot (guest/spectator connection health). */
  get quietFor() {
    return this.snaps.quietFor;
  }

  protected step(dt: number) {
    const inp = this.readInput();
    if (this.role === "host") this.stepHost(dt, inp);
    else this.stepRemote(dt, inp);
    if (this.sim.phase === "fulltime" && !this.endSent && (this.role !== "spectator")) {
      this.endSent = true;
      this.link.send({ t: "end", score: [...this.sim.score] as [number, number] });
      this.onFullTime([...this.sim.score] as [number, number]);
    }
  }

  private stepHost(dt: number, inp: UserInput) {
    if (dt === 0) return;
    const sim = this.sim;
    sim.applyUser(inp, 0);
    sim.applyUser(this.remote, 1);
    this.remote = { move: this.remote.move, sprint: this.remote.sprint };
    this.advance(dt);
    this.pendingEv.push(...this.eventLog);
    this.snapT += dt;
    if (this.snapT >= SNAP_EVERY || sim.phase === "fulltime") {
      this.snapT = 0;
      this.link.send({ t: "snap", d: encodeSnap(sim, this.pendingEv), score: [...sim.score] as [number, number], half: sim.half, clock: sim.clock });
      this.pendingEv = [];
    }
  }

  private stepRemote(dt: number, inp: UserInput) {
    if (this.role === "guest") {
      this.inputT += dt;
      const press = inp.pass !== undefined || inp.shoot !== undefined || inp.lob !== undefined || inp.through !== undefined || inp.switchPlayer;
      const s = encodeInput(inp, 0);
      // send presses at once, the stick at 30 Hz when it changes (and twice a second regardless)
      if (press || (this.inputT >= INPUT_EVERY && (s !== this.lastInputSent || this.inputT > 0.5))) {
        this.inputT = 0;
        this.lastInputSent = s;
        this.link.send({ t: "in", d: encodeInput(inp, ++this.inputSeq) });
      }
    }
    const before = this.sim.phase;
    this.eventLog = this.snaps.apply(this.sim, dt);
    this.playEvents(this.eventLog, before);
  }

  protected focusPlayer() {
    return this.role === "spectator" ? null : this.sim.controlled;
  }

  protected cameraFocus(): V2 {
    if (this.role !== "spectator") return super.cameraFocus();
    const sim = this.sim, b = sim.ball2();
    return { x: THREE.MathUtils.clamp(b.x, -sim.L + 7, sim.L - 7), z: THREE.MathUtils.clamp(b.z * 0.4, -sim.W * 0.4, sim.W * 0.4) };
  }

  protected refreshHud() {
    super.refreshHud();
    if (this.role === "spectator") this.hud.controlled = "";
  }
}
