import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MatchView } from "../render/MatchView";

const COLORS: Record<string, string> = {
  carry: "#f6c90e", support: "#4dabf7", receive: "#74c0fc", press: "#ff6b6b", cover: "#ffa94d", mark: "#e599f7",
  chase: "#69db7c", hold: "#adb5bd", keeper: "#20c997", "keeper-hold": "#20c997", take: "#ffd43b", wait: "#868e96",
};

/** AI debug: each CPU player's state, target point and note, drawn over the 3D view. Toggle with F3 or the button. */
export function DebugOverlay({ view }: { view: MatchView }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const c = canvas.current;
      if (!c || !view.sim) return;
      const w = c.clientWidth, h = c.clientHeight;
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      }
      const g = c.getContext("2d")!;
      g.clearRect(0, 0, w, h);
      const proj = (x: number, y: number, z: number) => {
        const v = new THREE.Vector3(x, y, z).project(view.camera);
        return [((v.x + 1) / 2) * w, ((1 - v.y) / 2) * h, v.z] as const;
      };
      g.font = "11px ui-monospace, monospace";
      for (const p of view.sim.players) {
        const d = view.sim.ai[p.team].debug.get(p.id);
        if (!d) continue;
        const col = COLORS[d.state] ?? "#fff";
        const [x, y, z] = proj(p.pos.x, 2.15, p.pos.z);
        if (z > 1) continue;
        const [tx, ty] = proj(d.target.x, 0.05, d.target.z), [fx, fy] = proj(p.pos.x, 0.05, p.pos.z);
        g.strokeStyle = col;
        g.setLineDash([4, 3]);
        g.beginPath();
        g.moveTo(fx, fy);
        g.lineTo(tx, ty);
        g.stroke();
        g.setLineDash([]);
        g.beginPath();
        g.arc(tx, ty, 3, 0, Math.PI * 2);
        g.stroke();
        const label = `${p.team ? "B" : "A"}${p.id} ${d.state}`;
        g.fillStyle = "rgba(0,0,0,.6)";
        g.fillRect(x - 2, y - 11, g.measureText(label).width + 4, 24);
        g.fillStyle = col;
        g.fillText(label, x, y);
        g.fillStyle = "#ddd";
        g.fillText(d.note.slice(0, 22), x, y + 11);
      }
      const s = view.sim;
      g.fillStyle = "rgba(0,0,0,.6)";
      g.fillRect(8, h - 92, 270, 50);
      g.fillStyle = "#fff";
      g.fillText(`phase ${s.phase}  owner ${s.owner?.id ?? "-"}  passTarget ${s.passTarget?.id ?? "-"}`, 14, h - 74);
      g.fillText(`CPU ${s.cfg.difficulty}: reaction ${s.diff.reaction}s, press ${s.diff.pressDistance}m, tackles ${s.diff.tackleRate}/s`, 14, h - 60);
      g.fillText(`time ${s.time.toFixed(1)}s  restart ${s.restart?.type ?? "-"}`, 14, h - 46);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [view]);
  return <canvas ref={canvas} className="debug-overlay" data-testid="ai-debug" />;
}
