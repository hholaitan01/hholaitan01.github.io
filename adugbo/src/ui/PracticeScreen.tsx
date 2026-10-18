import { useEffect, useRef, useState } from "react";
import { PracticeView, type PracticeHud } from "../render/PracticeView";
import { DRILLS, type Drill } from "../game/sim/PracticeSim";
import { KEY_HELP } from "../controls/keyboard";
import { TouchPad, useTouchUi } from "./TouchPad";
import { loadSettings, saveSettings, type Quality, type Settings, type TimeOfDay } from "../settings/settings";

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
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const drillRef = useRef<Drill>("free");
  const touch = useTouchUi();

  useEffect(() => {
    // the renderer is rebuilt when graphics settings change (antialiasing can't be toggled live)
    setHud(null);
    const v = new PracticeView(host.current!, settings);
    view.current = v;
    window.__practice = v;
    let alive = true;
    v.load(drillRef.current, setProgress).catch((e: unknown) => alive && setError(String(e)));
    const id = setInterval(() => v.sim && setHud({ ...v.hud }), 100);
    return () => {
      alive = false;
      clearInterval(id);
      v.dispose();
      delete window.__practice;
    };
  }, [settings]);

  const change = (s: Partial<Settings>) => {
    // start from what is saved (in-game mute may have changed it)
    const next = { ...loadSettings(), ...s };
    saveSettings(next);
    setSettings(next);
  };

  const choose = (d: Drill) => {
    setDrill(d);
    drillRef.current = d;
    view.current?.setDrill(d);
  };

  return (
    <div className={touch ? "game touch" : "game"}>
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
          <div className="settings">
            <label>
              Graphics{" "}
              <select aria-label="Graphics quality" value={settings.quality} onChange={(e) => change({ quality: e.target.value as Quality })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label>
              Time{" "}
              <select aria-label="Time of day" value={settings.timeOfDay} onChange={(e) => change({ timeOfDay: e.target.value as TimeOfDay })}>
                <option value="day">Day</option>
                <option value="evening">Evening</option>
              </select>
            </label>
          </div>
          <details className="keys">
            <summary>Keyboard</summary>
            {KEY_HELP.map(([k, v]) => (
              <div key={k}>
                <b>{k}</b> {v}
              </div>
            ))}
          </details>
          {touch && view.current && !hud.paused && !hud.finished && <TouchPad keys={view.current.keys} mode="attack" extra={{ label: "BALL", button: "reset" }} />}
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
          <div className="fps">
            {hud.fps} fps · anim {hud.animMs.toFixed(1)} ms
          </div>
        </>
      )}
    </div>
  );
}
