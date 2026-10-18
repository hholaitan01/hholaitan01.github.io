import { useEffect, useRef, useState } from "react";
import { PenaltyView, type PenaltyHud } from "../render/PenaltyView";
import type { PenaltyMode } from "../game/sim/PenaltySim";
import type { Difficulty } from "../game/match/rules";
import { TEAMS } from "../game/teams";
import { loadSettings } from "../settings/settings";
import { TouchPad, useTouchUi } from "./TouchPad";
import { recordJob } from "../game/jobs";

declare global {
  interface Window {
    __penalty?: PenaltyView;
  }
}

/** Penalty shootout against the CPU (with a short setup), or penalty practice. */
export function PenaltyScreen({ mode, go }: { mode: PenaltyMode; go: (r: string) => void }) {
  const [setup, setSetup] = useState<{ home: string; away: string; difficulty: Difficulty } | null>(mode === "practice" ? { home: "onipanu", away: "mushin", difficulty: "normal" } : null);
  const [home, setHome] = useState(TEAMS[0].id);
  const [away, setAway] = useState(TEAMS[1].id);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [n, setN] = useState(0);
  if (!setup)
    return (
      <div className="screen" data-testid="penalty-setup">
        <p className="kicker">Penalty shootout</p>
        <h2>Five kicks each, then sudden death</h2>
        <p className="muted">You take your side's kicks and go in goal for theirs.</p>
        <div className="inline">
          <label>
            Your team{" "}
            <select aria-label="Your team" value={home} onChange={(e) => setHome(e.target.value)}>
              {TEAMS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Against{" "}
            <select aria-label="Opponent" value={away} onChange={(e) => setAway(e.target.value)}>
              {TEAMS.filter((t) => t.id !== home).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            CPU difficulty{" "}
            <select aria-label="CPU difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
              <option value="easy">Easy</option>
              <option value="normal">Normal</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>
        <div className="btns">
          <button className="primary" onClick={() => setSetup({ home, away: away === home ? TEAMS.find((t) => t.id !== home)!.id : away, difficulty })}>
            Start
          </button>
          <button onClick={() => go("home")}>Back</button>
        </div>
      </div>
    );
  return <PenaltyGame key={n} mode={mode} {...setup} onAgain={() => setN((x) => x + 1)} onExit={() => go(mode === "practice" ? "training" : "home")} />;
}

function PenaltyGame({ mode, home, away, difficulty, onAgain, onExit }: { mode: PenaltyMode; home: string; away: string; difficulty: Difficulty; onAgain: () => void; onExit: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<PenaltyView | null>(null);
  const [hud, setHud] = useState<PenaltyHud | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const touch = useTouchUi();
  const recorded = useRef(false);

  useEffect(() => {
    const v = new PenaltyView(host.current!, loadSettings());
    view.current = v;
    window.__penalty = v;
    let alive = true;
    v.load(mode, difficulty, home, away, setProgress).catch((e: unknown) => alive && setError(String(e)));
    const id = setInterval(() => v.sim && v.hud && setHud({ ...v.hud }), 100);
    return () => {
      alive = false;
      clearInterval(id);
      v.dispose();
      delete window.__penalty;
    };
  }, [mode, difficulty, home, away]);

  useEffect(() => {
    if (hud?.phase === "over" && !recorded.current) {
      recorded.current = true;
      recordJob({ kind: "shootout", won: hud.winner === 0, difficulty });
    }
    if (mode === "practice" && hud) recordJob({ kind: "penaltyStreak", streak: hud.best });
  }, [hud, mode, difficulty]);

  const dots = (team: 0 | 1) => {
    const ks = hud?.kicks.filter((k) => k.team === team) ?? [];
    const n = Math.max(5, ks.length);
    return Array.from({ length: n }, (_, i) => <i key={i} className={ks[i] ? (ks[i].result === "goal" ? "goal" : "miss") : ""} />);
  };

  return (
    <div className={touch ? "game touch" : "game"}>
      <div className="game-view" ref={host} />
      {!hud && !error && <div className="loading">Loading penalties… {Math.round(progress * 100)}%</div>}
      {error && <div className="loading error">Could not start: {error}</div>}
      {hud && view.current && (
        <>
          {mode === "shootout" ? (
            <div className="scorebar shootout" data-testid="penalty-hud">
              <span>{hud.names[0]}</span>
              <span className="dots">{dots(0)}</span>
              <b className="score">
                {hud.goals[0]} – {hud.goals[1]}
              </b>
              <span className="dots">{dots(1)}</span>
              <span>{hud.names[1]}</span>
            </div>
          ) : (
            <div className="scorebar" data-testid="penalty-hud">
              <span className="tag">Penalty practice</span>
              <span>Streak {hud.streak}</span>
              <span className="muted">best {hud.best}</span>
            </div>
          )}
          <div className="message" key={hud.message}>
            {hud.message}
          </div>
          {hud.holding && (
            <div className="power" aria-label="power">
              <div style={{ width: `${hud.power * 100}%` }} className="shoot" />
            </div>
          )}
          <div className="controls-hint muted">
            {hud.userKicking ? (touch ? "Stick: aim · hold SHOOT, release" : "WASD/arrows: aim · hold K, release") : touch ? "Stick left/right + DIVE" : "Hold A/D (or arrows) and press K to dive; no direction to stand"}
          </div>
          <div className="toolbar">
            <button onClick={() => view.current && (view.current.paused = !view.current.paused)}>{hud.paused ? "Resume" : "Pause"}</button>
            <button onClick={onExit}>Quit</button>
          </div>
          {touch && hud.phase !== "over" && (
            <TouchPad
              keys={view.current.keys}
              mode="attack"
              slots={{ TL: null, BL: null, BR: null, TR: hud.userKicking ? { label: "SHOOT", button: "shoot" } : { label: "DIVE", button: "shoot" } }}
            />
          )}
          {(hud.phase === "over" || hud.paused) && (
            <div className="overlay" data-testid={hud.phase === "over" ? "penalty-over" : "paused"}>
              <h2>{hud.phase === "over" ? (hud.winner === 0 ? "You win the shootout!" : "You lost the shootout") : "Paused"}</h2>
              {hud.phase === "over" && (
                <p className="big">
                  {hud.names[0]} {hud.goals[0]} – {hud.goals[1]} {hud.names[1]}
                </p>
              )}
              <div className="btns">
                {hud.phase === "over" ? (
                  <button className="primary" onClick={onAgain}>
                    Play again
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
        </>
      )}
    </div>
  );
}
