import RAPIER from "@dimforge/rapier3d-compat";
import type { PitchSpec } from "../game/pitch";
import { AIR_K, BALL_MASS, BALL_R, BALL_RESTITUTION, GRAVITY, MAGNUS_K, ROLL_DECEL, SIM_DT } from "./constants";

export type Vec3 = { x: number; y: number; z: number };

let ready: Promise<void> | null = null;
/** Rapier ships as WebAssembly; call once before building a world. */
export function initPhysics(): Promise<void> {
  return (ready ??= RAPIER.init());
}

export type HitKind = "post" | "bar" | "net" | "wall" | "ground" | "player";

/** Rapier world holding the ball, the static arena and kinematic player bodies. */
export class PhysicsWorld {
  readonly world: RAPIER.World;
  readonly ball: RAPIER.RigidBody;
  private ballCollider: RAPIER.Collider;
  private events = new RAPIER.EventQueue(true);
  private kinds = new Map<number, HitKind>();
  private rollDecel: number;
  /** Collisions since the last call to takeHits(), for sound and gameplay (deflections). */
  private hits: { kind: HitKind; speed: number; handle: number }[] = [];
  private players = new Map<number, RAPIER.RigidBody>();

  constructor(readonly pitch: PitchSpec) {
    this.world = new RAPIER.World({ x: 0, y: -GRAVITY, z: 0 });
    this.world.timestep = SIM_DT;
    this.rollDecel = ROLL_DECEL[pitch.surface];
    this.buildArena();
    this.ball = this.world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(0, BALL_R, 0).setCcdEnabled(true),
    );
    this.ballCollider = this.world.createCollider(
      RAPIER.ColliderDesc.ball(BALL_R)
        .setMass(BALL_MASS)
        .setRestitution(BALL_RESTITUTION)
        .setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Multiply)
        .setFriction(0.6)
        .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS),
      this.ball,
    );
  }

  private fixed(desc: RAPIER.ColliderDesc, kind: HitKind, restitution: number, friction = 0.6) {
    desc.setRestitution(restitution).setFriction(friction);
    // Rolling is modelled in step(); solver friction against the fast-spinning ball over-brakes it.
    if (kind === "ground") desc.setFrictionCombineRule(RAPIER.CoefficientCombineRule.Min);
    const c = this.world.createCollider(desc);
    this.kinds.set(c.handle, kind);
    return c;
  }

  private buildArena() {
    const p = this.pitch, L = p.length / 2, W = p.width / 2;
    // ground slab extends well past the lines so a ball leaving an open pitch keeps rolling
    this.fixed(RAPIER.ColliderDesc.cuboid(L + 30, 0.5, W + 30).setTranslation(0, -0.5, 0), "ground", 1.0, 0);
    if (p.walls) {
      const h = p.wallHeight / 2, t = 0.25;
      this.fixed(RAPIER.ColliderDesc.cuboid(L + t, h, t).setTranslation(0, h, W + t), "wall", 0.82);
      this.fixed(RAPIER.ColliderDesc.cuboid(L + t, h, t).setTranslation(0, h, -W - t), "wall", 0.82);
      for (const s of [1, -1]) {
        // end walls leave the goal mouth open
        const seg = (W - p.goalWidth / 2) / 2;
        for (const zs of [1, -1])
          this.fixed(RAPIER.ColliderDesc.cuboid(t, h, seg).setTranslation(s * (L + t), h, zs * (p.goalWidth / 2 + seg)), "wall", 0.82);
      }
    }
    if (p.fenceHeight > p.wallHeight) {
      // chain-link: above the side boards, and floor-to-top behind the goals (goals sit in an alcove)
      const fh = (p.fenceHeight - p.wallHeight) / 2, t = 0.05, wt = 0.25, back = L + p.goalDepth + 0.15;
      for (const zs of [1, -1])
        this.fixed(RAPIER.ColliderDesc.cuboid(back, fh, t).setTranslation(0, p.wallHeight + fh, zs * (W + wt)), "wall", 0.35);
      for (const xs of [1, -1])
        this.fixed(RAPIER.ColliderDesc.cuboid(t, p.fenceHeight / 2, W + wt).setTranslation(xs * back, p.fenceHeight / 2, 0), "wall", 0.35);
    }
    if (p.goals === "none") return;
    for (const s of p.goals === "full" ? [1, -1] : [1]) this.buildGoal(s);
  }

  private buildGoal(side: number) {
    if (this.pitch.goalStyle === "posts") {
      // four-post football: knee-high bollards, nothing to stop the ball behind them
      const x = side * (this.pitch.length / 2), gw = this.pitch.goalWidth / 2;
      for (const z of [gw + 0.1, -gw - 0.1]) this.fixed(RAPIER.ColliderDesc.cylinder(0.3, 0.1).setTranslation(x, 0.3, z), "post", 0.8);
      return;
    }
    const p = this.pitch, x = side * (this.pitch.length / 2), gw = p.goalWidth / 2, gh = p.goalHeight, d = p.goalDepth, pr = 0.06;
    for (const z of [gw + pr, -gw - pr])
      this.fixed(RAPIER.ColliderDesc.cylinder(gh / 2, pr).setTranslation(x, gh / 2, z), "post", 0.9);
    const q = { x: Math.SQRT1_2, y: 0, z: 0, w: Math.SQRT1_2 }; // cylinder axis y -> z
    this.fixed(RAPIER.ColliderDesc.cylinder(gw + 2 * pr, pr).setTranslation(x, gh + pr, 0).setRotation(q), "bar", 0.9);
    // net: soft, high-friction panels (back, sides, roof) that kill the ball's speed
    const nt = 0.05;
    this.fixed(RAPIER.ColliderDesc.cuboid(nt, gh / 2, gw).setTranslation(x + side * (d + nt), gh / 2, 0), "net", 0.12, 1.5);
    for (const z of [gw + pr * 2 + nt, -gw - pr * 2 - nt])
      this.fixed(RAPIER.ColliderDesc.cuboid(d / 2, gh / 2, nt).setTranslation(x + side * (d / 2), gh / 2, z), "net", 0.12, 1.5);
    this.fixed(RAPIER.ColliderDesc.cuboid(d / 2, nt, gw).setTranslation(x + side * (d / 2), gh + nt, 0), "net", 0.12, 1.5);
  }

  /** A kinematic capsule for a player's upper body (knee to head) that aerial balls bounce off. */
  addPlayer(id: number) {
    const b = this.world.createRigidBody(RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 1.15, 0));
    const c = this.world.createCollider(RAPIER.ColliderDesc.capsule(0.45, 0.24).setRestitution(0.35), b);
    this.kinds.set(c.handle, "player");
    this.players.set(id, b);
    c.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
    return c.handle;
  }

  movePlayer(id: number, x: number, z: number) {
    this.players.get(id)?.setNextKinematicTranslation({ x, y: 1.15, z });
  }

  get ballPos(): Vec3 {
    return this.ball.translation();
  }
  get ballVel(): Vec3 {
    return this.ball.linvel();
  }

  grounded(): boolean {
    const p = this.ball.translation(), v = this.ball.linvel();
    return p.y < BALL_R + 0.03 && Math.abs(v.y) < 1.2;
  }

  setBall(pos: Vec3, vel: Vec3 = { x: 0, y: 0, z: 0 }, spin: Vec3 = { x: 0, y: 0, z: 0 }) {
    this.ball.setTranslation(pos, true);
    this.ball.setLinvel(vel, true);
    this.ball.setAngvel(spin, true);
  }

  kick(vel: Vec3, spin: Vec3 = { x: 0, y: 0, z: 0 }) {
    this.ball.setLinvel(vel, true);
    this.ball.setAngvel(spin, true);
  }

  /** Applies drag, rolling resistance and Magnus force, then advances one fixed step. */
  step() {
    const v = this.ball.linvel(), w = this.ball.angvel();
    const sp = Math.hypot(v.x, v.y, v.z);
    this.ball.resetForces(true);
    if (sp > 1e-3) {
      const fx = -AIR_K * sp * v.x, fy = -AIR_K * sp * v.y, fz = -AIR_K * sp * v.z;
      const mx = MAGNUS_K * (w.y * v.z - w.z * v.y), my = MAGNUS_K * (w.z * v.x - w.x * v.z), mz = MAGNUS_K * (w.x * v.y - w.y * v.x);
      this.ball.addForce({ x: (fx + mx) * BALL_MASS, y: (fy + my) * BALL_MASS, z: (fz + mz) * BALL_MASS }, true);
    }
    if (this.grounded()) {
      const ps = Math.hypot(v.x, v.z);
      if (ps < this.rollDecel * SIM_DT) {
        this.ball.setLinvel({ x: 0, y: v.y, z: 0 }, true);
      } else {
        const k = (this.rollDecel * BALL_MASS) / ps;
        this.ball.addForce({ x: -v.x * k, y: 0, z: -v.z * k }, true);
      }
      // rolling without slipping (visual spin); keep the vertical spin component for curl
      const nv = this.ball.linvel();
      this.ball.setAngvel({ x: nv.z / BALL_R, y: w.y * 0.98, z: -nv.x / BALL_R }, true);
    } else {
      // spin decays slowly in flight (no Rapier angular damping: it would fight rolling contact)
      const k = 1 - 0.4 * SIM_DT;
      this.ball.setAngvel({ x: w.x * k, y: w.y * k, z: w.z * k }, true);
    }
    this.world.step(this.events);
    this.events.drainCollisionEvents((h1, h2, started) => {
      if (!started) return;
      const other = h1 === this.ballCollider.handle ? h2 : h2 === this.ballCollider.handle ? h1 : -1;
      const kind = this.kinds.get(other);
      if (kind && kind !== "ground") {
        const bv = this.ball.linvel();
        this.hits.push({ kind, speed: Math.hypot(bv.x, bv.y, bv.z), handle: other });
      }
    });
  }

  takeHits() {
    const h = this.hits;
    this.hits = [];
    return h;
  }

  /**
   * +1 / -1 when the whole ball is over the goal line at that end, between the posts and under the bar; else 0.
   */
  goalCheck(): number {
    const p = this.ball.translation(), L = this.pitch.length / 2;
    if (this.pitch.goals === "none") return 0;
    if (Math.abs(p.z) > this.pitch.goalWidth / 2 || p.y > this.pitch.goalHeight) return 0;
    // inside the frame: past the line but not behind the net (open "posts" goals: just past the line)
    const deep = this.pitch.goalStyle === "posts" ? L + 1.5 : L + this.pitch.goalDepth + BALL_R;
    if (p.x > L + BALL_R && p.x < deep) return 1;
    if (this.pitch.goals === "full" && p.x < -L - BALL_R && p.x > -deep) return -1;
    return 0;
  }

  /** True when the whole ball is outside the touch or goal lines (only meaningful without walls). */
  outOfPlay(): boolean {
    const p = this.ball.translation();
    return Math.abs(p.x) > this.pitch.length / 2 + BALL_R || Math.abs(p.z) > this.pitch.width / 2 + BALL_R;
  }

  free() {
    this.world.free();
  }
}
