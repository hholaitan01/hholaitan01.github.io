import { useEffect, useRef, useState } from "react";
import { MatchView, type MatchHud } from "../render/MatchView";
import type { MatchConfig } from "../game/match/rules";
import { loadSettings } from "../settings/settings";
import { DebugOverlay } from "./DebugOverlay";

declare global {
  interface Window {
    __match?: MatchView;
  }
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function MatchScreen({ config, onExit, onReplay }: { config: MatchConfig; onExit: () => void; onReplay: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<MatchView | null>(null);
  const [hud, setHud] = useState<MatchHud | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState(() => new URLSearchParams(location.search).has("debug"));

  useEffect(() => {
    const v = new MatchView(host.current!, { ...loadSettings(), timeOfDay: config.timeOfDay });
    view.current = v;
    window.__match = v;
    let alive = true;
    v.load(config, setProgress).catch((e: unknown) => alive && setError(String(e)));
    const id = setInterval(() => v.sim && v.hud && setHud({ ...v.hud }), 100);
    const onKey = (e: KeyboardEvent) => e.code === "F3" && (e.preventDefault(), setDebug((d) => !d));
    addEventListener("keydown", onKey);
    return () => {
      alive = false;
      clearInterval(id);
      removeEventListener("keydown", onKey);
      v.dispose();
      delete window.__match;
    };
  }, [config]);

  const sim = view.current?.sim;
  const pauseOrFull = hud && (hud.paused || hud.phase === "fulltime");
  return (
    <div className="game">
      <div className="game-view" ref={host} />
      {!hud && !error && <div className="loading">Loading match… {Math.round(progress * 100)}%</div>}
      {error && <div className="loading error">Could not start the match: {error}</div>}
      {hud && sim && (
        <>
          <div className="scorebar" data-testid="match-hud">
            <span>{hud.home}</span>
            <b className="score">
              {hud.score[0]} – {hud.score[1]}
            </b>
            <span>{hud.away}</span>
            <span className="tag">
              {config.mode === "fourpost" ? "" : `H${hud.half} `}
              {mmss(hud.clock)}
            </span>
          </div>
          {hud.message && hud.phase !== "play" && (
            <div className="message" key={hud.message}>
              {hud.message}
            </div>
          )}
          <div className="controlled">
            {hud.controlled}
            {hud.hasBall ? " ●" : ""}
          </div>
          {hud.powerFor && (
            <div className="power" aria-label="power">
              <div style={{ width: `${hud.power * 100}%` }} className={hud.powerFor} />
            </div>
          )}
          <div className="toolbar">
            <button onClick={() => view.current && (view.current.paused = !view.current.paused)}>{hud.paused ? "Resume" : "Pause"}</button>
            <button onClick={() => setDebug((d) => !d)}>{debug ? "Hide AI debug" : "AI debug"}</button>
          </div>
          {debug && view.current && <DebugOverlay view={view.current} />}
          <div className="fps">
            {hud.fps} fps · anim {hud.animMs.toFixed(1)} ms
          </div>
          {pauseOrFull && (
            <div className="overlay" data-testid={hud.phase === "fulltime" ? "fulltime" : "paused"}>
              <h2>{hud.phase === "fulltime" ? sim.message : "Paused"}</h2>
              <p className="big">
                {hud.home} {hud.score[0]} – {hud.score[1]} {hud.away}
              </p>
              {hud.phase === "fulltime" && (
                <table className="stats-table">
                  <tbody>
                    {(
                      [
                        ["Possession %", ...sim.possessionShare()],
                        ["Shots", sim.stats[0].shots, sim.stats[1].shots],
                        ["On target", sim.stats[0].onTarget, sim.stats[1].onTarget],
                        ["Passes completed", `${sim.stats[0].passesCompleted}/${sim.stats[0].passes}`, `${sim.stats[1].passesCompleted}/${sim.stats[1].passes}`],
                        ["Tackles won", `${sim.stats[0].tacklesWon}/${sim.stats[0].tackles}`, `${sim.stats[1].tacklesWon}/${sim.stats[1].tackles}`],
                        ["Saves", sim.stats[0].saves, sim.stats[1].saves],
                      ] as [string, string | number, string | number][]
                    ).map(([k, a, b]) => (
                      <tr key={k}>
                        <td>{a}</td>
                        <th>{k}</th>
                        <td>{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="btns">
                {hud.phase === "fulltime" ? (
                  <button className="primary" onClick={onReplay}>
                    Rematch
                  </button>
                ) : (
                  <button className="primary" onClick={() => view.current && (view.current.paused = false)}>
                    Resume
                  </button>
                )}
                {hud.phase !== "fulltime" && <button onClick={onReplay}>Restart</button>}
                <button onClick={onExit}>Quit to menu</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
