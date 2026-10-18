// Ball and surface physics. Size 5 ball: 0.43 kg, 0.22 m diameter.
export const BALL_R = 0.11;
export const BALL_MASS = 0.43;
export const GRAVITY = 9.81;
/** Quadratic air drag: a = AIR_K * v^2 (0.5 * rho * Cd * A / m ≈ 0.5*1.2*0.25*0.038/0.43). */
export const AIR_K = 0.013;
/** Rolling resistance deceleration on the surface, m/s^2. Street concrete ~0.55, worn turf ~0.9. */
export const ROLL_DECEL = { concrete: 0.55, turf: 0.9, sand: 1.8 } as const;
export type Surface = keyof typeof ROLL_DECEL;
/** Lateral (Magnus) acceleration per unit of (spin x velocity). */
export const MAGNUS_K = 0.008;
export const BALL_RESTITUTION = 0.68;
export const SIM_DT = 1 / 120;
