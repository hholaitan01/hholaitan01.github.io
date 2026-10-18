import { BALL_R } from "../../physics/constants";
import { PRACTICE_PITCH } from "../pitch";
import { DEFAULT_CONTACTS, GameSim, type ContactTimes } from "./GameSim";
import { len, norm, sub, v2, yawOf, SimPlayer, type V2 } from "./SimPlayer";

export type Drill = "free" | "targets" | "passing";

export const DRILLS: Record<Drill, { title: string; howTo: string; seconds: number | null }> = {
  free: { title: "Free play", howTo: "Dribble, pass to the two partners and shoot at the open goal. No timer.", seconds: null },
  targets: { title: "Target shooting", howTo: "Hit the lit target in the goal. Corners score 3, low targets 2. 60 seconds.", seconds: 60 },
  passing: { title: "Passing circuit", howTo: "Pass to a partner, he returns it. Every pass he controls scores 1. 60 seconds.", seconds: 60 },
};

export interface Target {
  z: number;
  y: number;
  points: number;
}
// goal-mouth targets (z across the goal, y height), radius 0.45 m
export const TARGETS: Target[] = [
  { z: -1.85, y: 1.45, points: 3 },
  { z: 1.85, y: 1.45, points: 3 },
  { z: -1.85, y: 0.45, points: 2 },
  { z: 1.85, y: 0.45, points: 2 },
];
export const TARGET_R = 0.45;

export const USER_ATTRS = { pace: 0.8, control: 0.8, passing: 0.8, shooting: 0.75 };
const PARTNER_ATTRS = { pace: 0.7, control: 0.85, passing: 0.85, shooting: 0.5 };

export interface PracticeState {
  drill: Drill;
  score: number;
  timeLeft: number | null;
  goals: number;
  shots: number;
  passes: number;
  litTarget: number;
  finished: boolean;
  message: string;
}

/** Practice mode: one user player, two training partners who receive and return passes, and drills. */
export class PracticeSim extends GameSim {
  readonly user: SimPlayer;
  readonly partners: SimPlayer[];
  private spots: V2[];
  private resetAt = -1;
  private lastBallX = 0;
  state: PracticeState;

  constructor(drill: Drill, contacts: ContactTimes = DEFAULT_CONTACTS, seed = 7) {
    super(PRACTICE_PITCH, contacts, seed);
    this.user = this.addPlayer(new SimPlayer(0, 0, v2(-4, 0), USER_ATTRS, "You"));
    this.user.yaw = Math.PI / 2;
    this.spots = [v2(4, -7), v2(4, 7)];
    this.partners = this.spots.map((s, i) => {
      const p = this.addPlayer(new SimPlayer(i + 1, 0, s, PARTNER_ATTRS, i ? "Tobi" : "Emeka"));
      p.yaw = yawOf(sub(this.user.pos, s));
      return p;
    });
    this.state = { drill, score: 0, timeLeft: DRILLS[drill].seconds, goals: 0, shots: 0, passes: 0, litTarget: 0, finished: false, message: DRILLS[drill].howTo };
    this.ballToUser();
  }

  ballToUser() {
    const f = this.footPoint(this.user, 0.5);
    this.physics.setBall({ x: f.x, y: BALL_R, z: f.z });
    this.resetAt = -1;
  }

  protected beforeStep(dt: number) {
    const st = this.state;
    if (st.timeLeft !== null && !st.finished) {
      st.timeLeft = Math.max(0, st.timeLeft - dt);
      if (st.timeLeft === 0) {
        st.finished = true;
        st.message = `Time! Score ${st.score}`;
      }
    }
    for (const p of this.partners) this.partnerBrain(p);
    if (this.resetAt > 0 && this.time >= this.resetAt) this.ballToUser();
  }

  /** Training partner: stays on his spot, meets passes, controls and plays it back into the user's path. */
  private partnerBrain(p: SimPlayer) {
    const home = this.spots[p.id - 1];
    const ball = this.ball2(), bv = this.physics.ballVel;
    let goal = home;
    if (this.owner === p) {
      p.intent = { move: v2(), sprint: false };
      if (p.heldFor > 0.6 && !p.pending) this.pass(p, sub(this.user.pos, p.pos), 0.5);
      return;
    }
    const coming =
      this.passTarget === p || (this.owner === null && this.lastTouch !== p && len(sub(ball, p.pos)) < 6 && Math.hypot(bv.x, bv.z) < 6);
    if (coming) {
      // move to the point on the ball's path closest to him
      const v = { x: bv.x, z: bv.z }, sp = len(v);
      if (sp > 0.5) {
        const dir = norm(v), rel = sub(p.pos, ball), t = Math.max(0, rel.x * dir.x + rel.z * dir.z);
        goal = { x: ball.x + dir.x * t, z: ball.z + dir.z * t };
      } else goal = ball;
    }
    const d = sub(goal, p.pos);
    p.intent = { move: len(d) > 0.3 ? norm(d) : v2(), sprint: false };
    if (!coming && len(d) < 0.3) p.yaw = yawOf(sub(this.user.pos, p.pos));
  }

  protected afterStep() {
    const st = this.state;
    const b = this.physics.ballPos;
    // targets: judged when the ball crosses the goal line
    const L = this.pitch.length / 2;
    if (this.lastBallX <= L && b.x > L && st.drill === "targets" && !st.finished) {
      const t = TARGETS[st.litTarget];
      if (Math.hypot(b.z - t.z, b.y - t.y) < TARGET_R + 0.11) {
        st.score += t.points;
        st.message = `Target hit! +${t.points}`;
        st.litTarget = (st.litTarget + 1 + Math.floor(this.rand() * 3)) % TARGETS.length;
      } else st.message = "Missed the target";
    }
    this.lastBallX = b.x;
    const g = this.physics.goalCheck();
    if (g && this.resetAt < 0) {
      st.goals++;
      if (st.drill === "free") {
        st.score++;
        st.message = "Goal!";
      }
      this.events.push({ type: "goal", side: g, scorer: this.lastTouch?.id ?? null });
      this.resetAt = this.time + 1.6;
    }
    // ball dead: behind the goal, stopped far away or gone over the boards
    const behindLine = b.x > L + 0.3 && Math.abs(b.z) > this.pitch.goalWidth / 2 + 0.2;
    if (this.resetAt < 0 && (behindLine || Math.abs(b.z) > this.pitch.width / 2 + 0.5 || b.x < -L - 0.5)) this.resetAt = this.time + 1.0;
  }

  /** Counts drill stats from the event stream; call once per frame after update(). */
  consume() {
    const ev = this.takeEvents();
    for (const e of ev) {
      if (e.type === "kick" && e.player === 0 && e.kind === "shot") this.state.shots++;
      if (e.type === "possession" && e.player !== null && e.player > 0 && this.lastPasser === 0) {
        this.state.passes++;
        if (this.state.drill === "passing" && !this.state.finished) {
          this.state.score++;
          this.state.message = "Good pass!";
        }
      }
      if (e.type === "kick") this.lastPasser = e.player;
      if (e.type === "possession" && e.player === 0) this.lastPasser = -1;
    }
    return ev;
  }
  private lastPasser = -1;

  restart(drill: Drill = this.state.drill) {
    this.state = { drill, score: 0, timeLeft: DRILLS[drill].seconds, goals: 0, shots: 0, passes: 0, litTarget: 0, finished: false, message: DRILLS[drill].howTo };
    // target practice starts inside shooting range
    this.user.pos = drill === "targets" ? v2(8, 0) : v2(-4, 0);
    this.user.vel = v2();
    this.user.yaw = Math.PI / 2;
    this.owner = null;
    this.passTarget = null;
    this.ballToUser();
  }
}
