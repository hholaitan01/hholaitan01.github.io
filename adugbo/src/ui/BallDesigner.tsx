import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BALL_PATTERNS, loadBall, PATTERN_LABEL, PRESETS, saveBall, type BallDesign } from "../game/ball";
import { makeBall, paintBallMesh } from "../render/ballMesh";
import { recordJob } from "../game/jobs";

declare global {
  interface Window {
    __ball?: { design: () => BallDesign };
  }
}

/** A spinning 3D preview of a ball design (drag to turn it). */
function BallPreview({ design }: { design: BallDesign }) {
  const host = useRef<HTMLDivElement>(null);
  const ball = useRef<THREE.Mesh | null>(null);
  useEffect(() => {
    const el = host.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 0.01, 10);
    cam.position.set(0, 0.05, 0.62);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x445544, 1.4));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(1, 1.5, 1.2);
    scene.add(sun);
    const m = makeBall(design);
    ball.current = m;
    scene.add(m);
    let raf = 0, drag: { x: number; y: number } | null = null, spin = 0.6;
    const size = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);
    const down = (e: PointerEvent) => ((drag = { x: e.clientX, y: e.clientY }), el.setPointerCapture(e.pointerId));
    const move = (e: PointerEvent) => {
      if (!drag) return;
      m.rotation.y += (e.clientX - drag.x) * 0.012;
      m.rotation.x += (e.clientY - drag.y) * 0.012;
      drag = { x: e.clientX, y: e.clientY };
      spin = 0;
    };
    const up = () => ((drag = null), (spin = 0.6));
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    let last = performance.now();
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      m.rotation.y += spin * ((t - last) / 1000);
      last = t;
      renderer.render(scene, cam);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
    // the mesh is created once; design changes repaint it below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (ball.current) paintBallMesh(ball.current, design);
  }, [design]);
  return <div className="ball-preview" ref={host} data-testid="ball-preview" />;
}

/** Ball designer: pick a pattern and three colours (or start from a preset). The saved ball is used in your matches. */
export function BallDesigner({ go }: { go: (r: string) => void }) {
  const [d, setD] = useState<BallDesign>(loadBall);
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    window.__ball = { design: () => d };
  }, [d]);
  const set = (p: Partial<BallDesign>) => {
    setD((x) => ({ ...x, ...p }));
    setSaved(false);
  };
  const save = () => {
    saveBall(d);
    recordJob({ kind: "ball" });
    setSaved(true);
  };
  return (
    <div className="screen ball-designer" data-testid="ball-designer">
      <p className="kicker">Your match ball</p>
      <h2>Ball designer</h2>
      <div className="ball-layout">
        <BallPreview design={d} />
        <div className="ball-controls">
          <h3>Start from</h3>
          <div className="presets">
            {PRESETS.map((p) => (
              <button key={p.name} onClick={() => (setD(p.d), setSaved(false))}>
                {p.name}
              </button>
            ))}
          </div>
          <h3>Pattern</h3>
          <div className="presets">
            {BALL_PATTERNS.map((p) => (
              <button key={p} className={d.pattern === p ? "primary" : ""} aria-pressed={d.pattern === p} onClick={() => set({ pattern: p })}>
                {PATTERN_LABEL[p]}
              </button>
            ))}
          </div>
          <h3>Colours</h3>
          <div className="inline">
            <label>
              Base <input type="color" aria-label="Base colour" value={d.base} onChange={(e) => set({ base: e.target.value })} />
            </label>
            <label>
              Pattern <input type="color" aria-label="Pattern colour" value={d.a} onChange={(e) => set({ a: e.target.value })} />
            </label>
            <label>
              Detail <input type="color" aria-label="Detail colour" value={d.b} onChange={(e) => set({ b: e.target.value })} />
            </label>
          </div>
          <p className="muted">Your ball is used in all your matches, practice and penalties. Online, the home player's ball is the match ball, so your opponent and anyone watching see it.</p>
          <div className="btns">
            <button className="primary" onClick={save} disabled={saved}>
              {saved ? "Saved" : "Use this ball"}
            </button>
            <button onClick={() => go("training")}>Try it in training</button>
            <button onClick={() => go("home")}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
