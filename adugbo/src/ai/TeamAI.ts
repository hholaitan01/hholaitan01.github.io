import type { MatchSim } from "../game/match/MatchSim";
import { fwd, len, norm, sub, v2, yawOf, type SimPlayer, type V2 } from "../game/sim/SimPlayer";
import { jitter } from "../game/sim/kick";

export type AIState = "keeper" | "keeper-hold" | "carry" | "support" | "receive" | "press" | "cover" | "mark" | "chase" | "hold" | "take" | "wait";

export interface AIDebug {
  state: AIState;
  target: V2;
  note: string;
}

interface Plan {
  state: AIState;
  target: V2;
  sprint: boolean;
  note: string;
  mark?: SimPlayer;
}

const dist = (a: V2, b: V2) => len(sub(a, b));

/** Distance from point p to segment ab. */
function segDist(p: V2, a: V2, b: V2) {
  const ab = sub(b, a), t = Math.max(0, Math.min(1, ((p.x - a.x) * ab.x + (p.z - a.z) * ab.z) / Math.max(1e-6, ab.x * ab.x + ab.z * ab.z)));
  return dist(p, { x: a.x + ab.x * t, z: a.z + ab.z * t });
}

/**
 * State-based team brain. Off the ball every player has a role this moment (support, press, cover, mark, chase,
 * keeper); the carrier weighs shooting, passing and dribbling. Re-planning happens at the difficulty's reaction
 * interval, so easier CPU teams are visibly slower to respond.
 */
export class TeamAI {
  readonly debug = new Map<number, AIDebug>();
  private plans = new Map<number, Plan>();
  private nextThink = new Map<number, number>();
  private tackleCd = new Map<number, number>();
  private carryDecideAt = 0;

  constructor(
    private sim: MatchSim,
    readonly team: number,
  ) {}

  private get d() {
    return this.sim.teamDiff[this.team];
  }

  private opponents() {
    return this.sim.squads[1 - this.team];
  }
  private mates() {
    return this.sim.squads[this.team];
  }

  private nearestOpp(p: V2) {
    let best: SimPlayer | null = null, bd = Infinity;
    for (const o of this.opponents()) {
      const d = dist(o.pos, p);
      if (d < bd) {
        bd = d;
        best = o;
      }
    }
    return { o: best, d: bd };
  }

  /** Time for a player to reach a point at full speed. */
  private eta(p: SimPlayer, at: V2) {
    return dist(p.pos, at) / Math.max(3, p.maxSpeed(false));
  }

  update(dt: number) {
    const sim = this.sim, t = sim.time;
    for (const [id, cd] of this.tackleCd) this.tackleCd.set(id, cd - dt);
    const roles = this.assignRoles();
    for (const p of this.mates()) {
      if (p.controlled) {
        this.debug.set(p.id, { state: "hold", target: p.pos, note: "human" });
        continue;
      }
      if (p.pending || p.stun > 0) continue;
      // restarts: the taker plays it, everyone else takes position
      if (sim.restart && (sim.phase === "kickoff" || sim.phase === "restart")) {
        this.restartBehaviour(p);
        continue;
      }
      if (p.role === "gk") {
        this.keeper(p);
        continue;
      }
      if (sim.owner === p) {
        p.face = null;
        this.carry(p);
        continue;
      }
      if (t >= (this.nextThink.get(p.id) ?? 0) || !this.plans.has(p.id)) {
        this.plans.set(p.id, roles.get(p.id) ?? this.supportPlan(p));
        this.nextThink.set(p.id, t + this.d.reaction * (0.7 + 0.6 * this.sim.rand()));
      }
      const plan = this.plans.get(p.id)!;
      // defenders and support players watch the ball while adjusting position
      p.face = plan.state === "chase" || plan.state === "receive" ? null : sim.ball2();
      // targets that follow moving things are refreshed every step
      if (plan.state === "press" || plan.state === "chase" || plan.state === "receive") Object.assign(plan, roles.get(p.id) ?? plan);
      if (plan.state === "mark" && plan.mark) plan.target = this.goalSide(plan.mark.pos, 1.4);
      this.moveTo(p, plan.target, plan.sprint);
      this.debug.set(p.id, { state: plan.state, target: plan.target, note: plan.note });
      if (plan.state === "press") this.maybeTackle(p);
    }
  }

  /** Point between a position and our goal. */
  private goalSide(at: V2, gap: number) {
    const g = this.sim.ownGoal(this.team), dir = norm(sub(g, at));
    return { x: at.x + dir.x * gap, z: at.z + dir.z * gap };
  }

  private moveTo(p: SimPlayer, target: V2, sprint: boolean) {
    const d = sub(target, p.pos), l = len(d);
    const arrive = Math.min(1, l / 1.5);
    p.intent = { move: l > 0.25 ? { x: (d.x / l) * arrive, z: (d.z / l) * arrive } : v2(), sprint: sprint && l > 3 };
    if (l < 0.25) {
      // settle facing the ball
      const b = this.sim.ball2();
      p.yaw = yawOf(sub(b, p.pos));
    }
  }

  /** Off-ball role assignment for this instant. */
  private assignRoles(): Map<number, Plan> {
    const sim = this.sim, roles = new Map<number, Plan>(), ball = sim.ball2(), bv = sim.physics.ballVel;
    const field = this.mates().filter((p) => p.role === "field" && !p.controlled && sim.owner !== p);
    const owner = sim.owner, weHave = owner?.team === this.team, theyHave = owner && owner.team !== this.team;
    // expected receiver of our pass runs onto it
    if (sim.passTarget && sim.passTarget.team === this.team && !sim.passTarget.controlled) {
      const r = sim.passTarget, v = { x: bv.x, z: bv.z }, sp = len(v);
      let target = ball;
      if (sp > 0.5) {
        const dir = norm(v), rel = sub(r.pos, ball), tt = Math.max(0, rel.x * dir.x + rel.z * dir.z);
        target = { x: ball.x + dir.x * tt, z: ball.z + dir.z * tt };
      }
      roles.set(r.id, { state: "receive", target, sprint: true, note: "meet the pass" });
    }
    const ourPassInFlight = !owner && sim.passTarget?.team === this.team;
    if (!owner && !ourPassInFlight) {
      // loose ball: our quickest player chases where the ball will be
      let best: SimPlayer | null = null, bt = Infinity;
      for (const p of field) {
        if (roles.has(p.id)) continue;
        const e = this.eta(p, ball);
        if (e < bt) {
          bt = e;
          best = p;
        }
      }
      if (best) {
        const lead = Math.min(bt, 1);
        roles.set(best.id, { state: "chase", target: { x: ball.x + bv.x * lead * 0.6, z: ball.z + bv.z * lead * 0.6 }, sprint: true, note: `eta ${bt.toFixed(1)}s` });
      }
    } else if (theyHave) {
      // nearest presses (if within press distance), second covers, the rest mark men goal-side
      const order = field.filter((p) => !roles.has(p.id)).sort((a, b) => dist(a.pos, owner.pos) - dist(b.pos, owner.pos));
      const presser = order[0];
      if (presser && dist(presser.pos, owner.pos) < this.d.pressDistance + 4) {
        const ahead = { x: owner.pos.x + owner.vel.x * 0.3, z: owner.pos.z + owner.vel.z * 0.3 };
        roles.set(presser.id, { state: "press", target: this.goalSide(ahead, 0.5), sprint: true, note: "close down" });
      }
      const cover = order[1];
      if (cover) roles.set(cover.id, { state: "cover", target: this.goalSide(owner.pos, 4), sprint: false, note: "cover" });
      const marked = new Set<number>([owner.id]);
      for (const p of order.slice(2)) {
        let best: SimPlayer | null = null, bd = Infinity;
        for (const o of this.opponents()) {
          if (o.role === "gk" || marked.has(o.id)) continue;
          const d = dist(o.pos, p.pos);
          if (d < bd) {
            bd = d;
            best = o;
          }
        }
        if (best && bd < 14) {
          marked.add(best.id);
          roles.set(p.id, { state: "mark", target: this.goalSide(best.pos, 1.4), sprint: false, note: `mark ${best.id}`, mark: best });
        }
      }
    }
    if (weHave) for (const p of field) if (!roles.has(p.id)) roles.set(p.id, this.supportPlan(p));
    for (const p of field) if (!roles.has(p.id)) roles.set(p.id, { state: "hold", target: sim.slot(p), sprint: false, note: "shape" });
    return roles;
  }

  /** Support: take the formation slot, then drift away from the nearest marker to offer a passing lane. */
  private supportPlan(p: SimPlayer): Plan {
    const s = this.sim.slot(p);
    const { o, d } = this.nearestOpp(s);
    let target = s;
    if (o && d < 3) {
      const away = norm(sub(s, o.pos));
      target = { x: s.x + away.x * (3 - d), z: s.z + away.z * (3 - d) };
    }
    return { state: "support", target: this.clampPitch(target), sprint: false, note: "find space" };
  }

  private clampPitch(p: V2): V2 {
    const L = this.sim.L - 0.8, W = this.sim.W - 0.8;
    return { x: Math.max(-L, Math.min(L, p.x)), z: Math.max(-W, Math.min(W, p.z)) };
  }

  private maybeTackle(p: SimPlayer) {
    const sim = this.sim, o = sim.owner;
    if (!o || o.team === this.team || (this.tackleCd.get(p.id) ?? 0) > 0) return;
    const d = dist(p.pos, o.pos);
    const facing = Math.cos(yawOf(sub(o.pos, p.pos)) - p.yaw) > 0.5;
    // better defenders wait for a loose touch instead of diving in
    const exposed = dist(sim.ball2(), o.pos) >= this.d.tackleTiming;
    if (!exposed) return;
    // tackleRate is attempts per second while in range; update() runs every fixed step
    if (d < 1.3 && facing && this.sim.rand() < this.d.tackleRate * (1 / 120)) {
      sim.tackle(p);
      this.tackleCd.set(p.id, 0.9);
    } else if (d > 1.4 && d < 2.1 && facing && len(o.vel) > 3 && this.sim.rand() < this.d.slideChance * 0.05) {
      sim.tackle(p, true);
      this.tackleCd.set(p.id, 2.5);
    }
  }

  // ---- ball carrier -------------------------------------------------------------------------------------------

  private carry(p: SimPlayer) {
    const sim = this.sim, goal = sim.attackGoal(this.team), toGoal = sub(goal, p.pos), dGoal = len(toGoal);
    const pressure = this.nearestOpp(p.pos);
    if (sim.time >= this.carryDecideAt) {
      this.carryDecideAt = sim.time + this.d.decisionInterval;
      const n = () => jitter(this.sim.rand) * this.d.noise;
      // shooting: in range, decent angle, lane not packed
      const angleOk = Math.abs(p.pos.z) < sim.pitch.goalWidth * 1.6 || dGoal < 7;
      const blockers = this.opponents().filter((o) => o.role === "field" && segDist(o.pos, p.pos, goal) < 0.9).length;
      const shootScore = dGoal < this.d.shootRange && angleOk ? 0.9 - dGoal / (this.d.shootRange * 1.6) - blockers * 0.25 + n() : -1;
      // passing: best open teammate, valuing progress toward goal
      let passScore = -1, recv: SimPlayer | null = null;
      for (const m of this.mates()) {
        if (m === p || m.role === "gk") continue;
        const l = dist(p.pos, m.pos);
        if (l < 3 || l > 26) continue;
        const lane = Math.min(...this.opponents().map((o) => segDist(o.pos, p.pos, m.pos)));
        if (lane < 1.1 + l * 0.04) continue;
        const open = Math.min(5, this.nearestOpp(m.pos).d) / 5;
        const progress = (dGoal - dist(m.pos, goal)) / 12;
        const sc = 0.4 + 0.45 * progress + 0.35 * open + (pressure.d < 2.5 ? 0.35 : 0) - (l > 18 ? 0.15 : 0) + n();
        if (sc > passScore) {
          passScore = sc;
          recv = m;
        }
      }
      const dribbleScore = 0.3 + (pressure.d > 3.5 ? 0.3 : -0.15) + (p.heldFor < 0.5 ? 0.3 : 0) - (p.heldFor > 3 ? 0.2 : 0) + n();
      if (shootScore > passScore && shootScore > dribbleScore && shootScore > 0.15) {
        const k = sim.keepers[1 - this.team];
        const aimZ = k ? (k.pos.z > 0 ? -0.75 : 0.75) : jitter(this.sim.rand) * 0.7;
        sim.shoot(p, Math.sign(goal.x), aimZ, Math.min(1, 0.45 + this.sim.rand() * 0.4));
        this.debug.set(p.id, { state: "carry", target: goal, note: `shoot ${shootScore.toFixed(2)}` });
        return;
      }
      if (recv && passScore > dribbleScore) {
        sim.pass(p, sub(recv.pos, p.pos), 0.5, dist(p.pos, recv.pos) > 20 && this.sim.rand() < 0.5);
        this.debug.set(p.id, { state: "carry", target: recv.pos, note: `pass→${recv.id} ${passScore.toFixed(2)}` });
        return;
      }
    }
    // dribble: toward goal, bending away from the nearest opponent, staying on the pitch
    let dir = norm(toGoal);
    if (pressure.o && pressure.d < 3.5) {
      const away = norm(sub(p.pos, pressure.o.pos));
      const side = { x: -dir.z, z: dir.x }, s = Math.sign(side.x * away.x + side.z * away.z) || 1;
      const w = (3.5 - pressure.d) / 3.5;
      dir = norm({ x: dir.x + side.x * s * w * 1.2, z: dir.z + side.z * s * w * 1.2 });
    }
    const ahead = { x: p.pos.x + dir.x * 2, z: p.pos.z + dir.z * 2 };
    const c = this.clampPitch(ahead);
    dir = norm(sub(c, p.pos));
    p.intent = { move: dir, sprint: pressure.d > 4 && dGoal > 8 };
    this.debug.set(p.id, { state: "carry", target: c, note: `dribble (press ${pressure.d.toFixed(1)}m)` });
  }

  // ---- goalkeeper ---------------------------------------------------------------------------------------------

  private keeper(k: SimPlayer) {
    const sim = this.sim, goal = sim.ownGoal(this.team), ball = sim.ball2();
    k.face = ball;
    if (sim.holder === k) {
      // hold briefly, then throw to an open teammate (or kick long under no option)
      k.intent = { move: v2(), sprint: false };
      if (k.heldFor > 1.2 && !k.pending) {
        let best: SimPlayer | null = null, bs = -Infinity;
        for (const m of this.mates()) {
          if (m === k) continue;
          const open = this.nearestOpp(m.pos).d, l = dist(k.pos, m.pos);
          const sc = open - l * 0.08;
          if (sc > bs) {
            bs = sc;
            best = m;
          }
        }
        if (best) sim.keeperDistribute(k, best.pos, dist(k.pos, best.pos) > 18);
      }
      this.debug.set(k.id, { state: "keeper-hold", target: k.pos, note: `hold ${k.heldFor.toFixed(1)}s` });
      return;
    }
    // smother: an attacker carrying the ball right onto him inside the area
    const carrier = sim.owner && sim.owner.team !== this.team ? sim.owner : null;
    if (carrier && sim.inKeeperArea(k) && dist(carrier.pos, k.pos) < 2.5 && !k.pending) {
      this.moveTo(k, ball, true);
      if (dist(k.pos, ball) < 1.0 && (this.tackleCd.get(k.id) ?? 0) <= 0) {
        this.tackleCd.set(k.id, 1.0);
        const chance = 0.25 + 0.5 * (k.attrs.keeping ?? 0.6) - 0.3 * carrier.attrs.control;
        if (this.sim.rand() < chance) {
          carrier.stun = 0.4;
          sim.keeperCatch(k);
          sim.events.push({ type: "save", player: k.id, kind: "claim" });
        }
      }
      this.debug.set(k.id, { state: "keeper", target: ball, note: "smother" });
      return;
    }
    // claim loose balls in the area when he is clearly closest
    const loose = !sim.owner && sim.inKeeperArea(k) && dist(ball, goal) < 5;
    if (loose) {
      const myEta = this.eta(k, ball), theirs = Math.min(...this.opponents().map((o) => this.eta(o, ball)));
      if (myEta < theirs * 0.8) {
        this.moveTo(k, ball, true);
        if (dist(k.pos, ball) < 1.0 && sim.physics.ballPos.y < 1.8) sim.keeperCatch(k);
        this.debug.set(k.id, { state: "keeper", target: ball, note: "claim" });
        return;
      }
    }
    // narrow the angle: on the line from goal centre to the ball
    const toBall = sub(ball, goal), d = len(toBall);
    const out = Math.min(2.2, 0.8 + d * 0.06);
    let target = { x: goal.x + (toBall.x / Math.max(d, 0.01)) * out, z: goal.z + (toBall.z / Math.max(d, 0.01)) * out };
    target.z = Math.max(-sim.pitch.goalWidth / 2, Math.min(sim.pitch.goalWidth / 2, target.z));
    if (Math.sign(target.x - goal.x) !== -Math.sign(goal.x)) target = { x: goal.x - Math.sign(goal.x) * 0.6, z: target.z };
    this.moveTo(k, target, false);
    k.yaw = yawOf(sub(ball, k.pos));
    this.debug.set(k.id, { state: "keeper", target, note: "angle" });
  }

  // ---- restarts -----------------------------------------------------------------------------------------------

  private restartBehaviour(p: SimPlayer) {
    const sim = this.sim, r = sim.restart!;
    if (r.taker === p && r.team === this.team) {
      p.intent = { move: v2(), sprint: false };
      if (sim.phaseTime > 0.9 + this.d.reaction && !p.pending) {
        // take it: a short pass to the best-placed teammate (keepers roll it out)
        if (sim.holder === p) return;
        if (sim.owner !== p && sim.canPlay(p) === null) {
          this.moveTo(p, sim.ball2(), false);
          return;
        }
        let best: SimPlayer | null = null, bs = -Infinity;
        for (const m of this.mates()) {
          if (m === p || m.role === "gk") continue;
          const sc = this.nearestOpp(m.pos).d - dist(m.pos, p.pos) * 0.05;
          if (sc > bs) {
            bs = sc;
            best = m;
          }
        }
        const aim = best ? sub(best.pos, p.pos) : fwd(p.yaw);
        sim.pass(p, aim, 0.5, r.type === "corner" || (r.type === "goalkick" && dist(p.pos, best?.pos ?? p.pos) > 18));
      }
      this.debug.set(p.id, { state: "take", target: p.pos, note: r.type });
      return;
    }
    const plan = p.role === "gk" ? null : this.supportPlan(p);
    if (p.role === "gk") this.keeper(p);
    else this.moveTo(p, plan!.target, false);
    if (p.role !== "gk") this.debug.set(p.id, { state: "wait", target: plan!.target, note: r.type });
  }
}
