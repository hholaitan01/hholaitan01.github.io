import { useEffect, useRef, useState } from "react";
import { PracticeView, type PracticeHud } from "../render/PracticeView";
import { DRILLS, type Drill } from "../game/sim/PracticeSim";
import { KEY_HELP } from "../controls/keyboard";

declare global {
  interface Window {
    __practice?: PracticeView;
  }
}

export function PracticeScreen({ onExit }: { onExit: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<PracticeView | null>(null);
  const [hud, setHud] = useState<PracticeHud | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [drill, setDrill] = useState<Drill>("free");

  useEffect(() => {
    const v = new PracticeView(host.current!);
    view.current = v;
    window.__practice = v;
    let alive = true;
    v.load("free", setProgress).catch((e: unknown) => alive && setError(String(e)));
    const id = setInterval(() => v.sim && setHud({ ...v.hud }), 100);
    return () => {
      alive = false;
      clearInterval(id);
      v.dispose();
      delete window.__practice;
    };
  }, []);

  const choose = (d: Drill) => {
    setDrill(d);
    view.current?.setDrill(d);
  };

  return (
    <div className="game">
      <div className="game-view" ref={host} />
      {!hud && !error && <div className="loading">Loading practice… {Math.round(progress * 100)}%</div>}
      {error && <div className="loading error">Could not start practice: {error}</div>}
      {hud && (
        <>
          <div className="scorebar" data-testid="practice-hud">
            <span className="tag">{DRILLS[hud.drill].title}</span>
            <span>Score {hud.score}</span>
            {hud.timeLeft !== null && <span>{Math.ceil(hud.timeLeft)}s</span>}
            <span className="muted">
              goals {hud.goals} · shots {hud.shots} · passes {hud.passes}
            </span>
          </div>
          <div className="message" key={hud.message}>
            {hud.message}
          </div>
          {hud.powerFor && (
            <div className="power" aria-label="power">
              <div style={{ width: `${hud.power * 100}%` }} className={hud.powerFor} />
            </div>
          )}
          <div className="toolbar">
            {(Object.keys(DRILLS) as Drill[]).map((d) => (
              <button key={d} className={d === drill ? "primary" : ""} onClick={() => choose(d)}>
                {DRILLS[d].title}
              </button>
            ))}
            <button onClick={() => view.current?.setDrill(drill)}>Restart</button>
            <button onClick={() => view.current && (view.current.paused = !view.current.paused)}>{hud.paused ? "Resume" : "Pause"}</button>
            <button onClick={onExit}>Menu</button>
          </div>
          <details className="keys">
            <summary>Keyboard</summary>
            {KEY_HELP.map(([k, v]) => (
              <div key={k}>
                <b>{k}</b> {v}
              </div>
            ))}
            <p className="muted">Touch controls are not built yet; practice needs a keyboard for now.</p>
          </details>
          {(hud.paused || hud.finished) && (
            <div className="overlay">
              <h2>{hud.finished ? "Drill complete" : "Paused"}</h2>
              {hud.finished && <p className="big">Score {hud.score}</p>}
              <div className="btns">
                {hud.finished ? (
                  <button className="primary" onClick={() => view.current?.setDrill(drill)}>
                    Try again
                  </button>
                ) : (
                  <button className="primary" onClick={() => view.current && (view.current.paused = false)}>
                    Resume
                  </button>
                )}
                <button onClick={onExit}>Menu</button>
              </div>
            </div>
          )}
          <div className="fps">{hud.fps} fps</div>
        </>
      )}
    </div>
  );
}
