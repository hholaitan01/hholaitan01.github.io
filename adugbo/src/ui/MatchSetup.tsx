import { useState } from "react";
import { defaultConfig, MODES, rulesText, type Difficulty, type MatchConfig, type ModeId } from "../game/match/rules";
import { TEAMS, type Team } from "../game/teams";
import { kitsFor } from "../game/match/lineup";
import { MATCH_KEY_HELP } from "../controls/keyboard";
import type { Kit } from "../render/kit";

function Swatch({ kit }: { kit: Kit }) {
  return (
    <span className="swatch" aria-hidden>
      <i style={{ background: kit.shirt, borderColor: kit.trim }} />
      <i style={{ background: kit.shorts }} />
      <i style={{ background: kit.socks }} />
    </span>
  );
}

function TeamCard({ team, kit, label, onPrev, onNext }: { team: Team; kit: Kit; label: string; onPrev: () => void; onNext: () => void }) {
  const a = team.attrs;
  return (
    <div className="team-card">
      <div className="muted">{label}</div>
      <div className="team-row">
        <button aria-label={`Previous ${label} team`} onClick={onPrev}>
          ‹
        </button>
        <div className="team-name">
          <Swatch kit={kit} /> {team.name}
        </div>
        <button aria-label={`Next ${label} team`} onClick={onNext}>
          ›
        </button>
      </div>
      {(["pace", "passing", "shooting", "defending", "keeping"] as const).map((k) => (
        <div className="attr" key={k}>
          <span>{k}</span>
          <div className="bar">
            <div style={{ width: `${a[k]}%` }} />
          </div>
          <b>{a[k]}</b>
        </div>
      ))}
    </div>
  );
}

/** Mode → teams and options → rules shown before kick-off. */
export function MatchSetup({ onStart, onBack }: { onStart: (c: MatchConfig) => void; onBack: () => void }) {
  const [cfg, setCfg] = useState<MatchConfig>(() => defaultConfig("fives"));
  const [step, setStep] = useState<"setup" | "rules">("setup");
  const set = (p: Partial<MatchConfig>) => setCfg((c) => ({ ...c, ...p }));
  const idx = (id: string) => TEAMS.findIndex((t) => t.id === id);
  const cycle = (side: "home" | "away", d: number) => {
    let i = idx(cfg[side]);
    do i = (i + d + TEAMS.length) % TEAMS.length;
    while (TEAMS[i].id === cfg[side === "home" ? "away" : "home"]);
    set({ [side]: TEAMS[i].id });
  };
  const home = TEAMS[idx(cfg.home)], away = TEAMS[idx(cfg.away)];
  const kits = kitsFor(home, away);

  if (step === "rules")
    return (
      <div className="screen">
        <h2>{MODES[cfg.mode].title} — rules for this match</h2>
        <p className="muted">
          {home.name} v {away.name} · you control {cfg.userTeam === 0 ? home.name : away.name} · {cfg.difficulty} CPU
        </p>
        <ul className="rules" data-testid="rules">
          {rulesText(cfg).map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <h3>Controls (keyboard)</h3>
        <table className="keys-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>With the ball</th>
              <th>Without the ball</th>
            </tr>
          </thead>
          <tbody>
            {MATCH_KEY_HELP.map(([k, a, b]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{a}</td>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="btns">
          <button onClick={() => setStep("setup")}>Back</button>
          <button className="primary" onClick={() => onStart(cfg)}>
            Kick off
          </button>
        </div>
      </div>
    );

  return (
    <div className="screen">
      <h2>Play a match</h2>
      <div className="modes" role="radiogroup" aria-label="Mode">
        {(Object.keys(MODES) as ModeId[]).map((m) => (
          <button
            key={m}
            role="radio"
            aria-checked={cfg.mode === m}
            className={cfg.mode === m ? "mode on" : "mode"}
            onClick={() => setCfg({ ...defaultConfig(m, cfg.home, cfg.away), userTeam: cfg.userTeam, difficulty: cfg.difficulty, timeOfDay: cfg.timeOfDay })}
          >
            <b>{MODES[m].title}</b>
            <span>{MODES[m].blurb}</span>
          </button>
        ))}
      </div>
      <div className="teams">
        <TeamCard team={home} kit={kits[0]} label="Home" onPrev={() => cycle("home", -1)} onNext={() => cycle("home", 1)} />
        <div className="vs">v</div>
        <TeamCard team={away} kit={kits[1]} label="Away" onPrev={() => cycle("away", -1)} onNext={() => cycle("away", 1)} />
      </div>
      <div className="options">
        <label>
          You control
          <select aria-label="Your team" value={cfg.userTeam} onChange={(e) => set({ userTeam: +e.target.value as 0 | 1 })}>
            <option value={0}>{home.name}</option>
            <option value={1}>{away.name}</option>
          </select>
        </label>
        <label>
          CPU difficulty
          <select aria-label="Difficulty" value={cfg.difficulty} onChange={(e) => set({ difficulty: e.target.value as Difficulty })}>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          {cfg.mode === "fourpost" ? "Match length" : "Half length"}
          <select aria-label="Match length" value={cfg.halfMinutes} onChange={(e) => set({ halfMinutes: +e.target.value })}>
            {[2, 3, 4, 5, 8].map((m) => (
              <option key={m} value={m}>
                {m} min
              </option>
            ))}
          </select>
        </label>
        <label>
          Time
          <select aria-label="Time of day" value={cfg.timeOfDay} onChange={(e) => set({ timeOfDay: e.target.value as MatchConfig["timeOfDay"] })}>
            <option value="day">Day</option>
            <option value="evening">Evening</option>
          </select>
        </label>
      </div>
      {cfg.mode === "fourpost" && (
        <fieldset className="options house">
          <legend>House rules</legend>
          <label>
            Players a side
            <select aria-label="Players a side" value={cfg.playersPerSide} onChange={(e) => set({ playersPerSide: +e.target.value })}>
              {[3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} v {n}
                </option>
              ))}
            </select>
          </label>
          <label>
            Goal width
            <select aria-label="Goal width" value={cfg.goalWidth} onChange={(e) => set({ goalWidth: +e.target.value })}>
              {[1.2, 1.6, 2.0].map((w) => (
                <option key={w} value={w}>
                  {w.toFixed(1)} m
                </option>
              ))}
            </select>
          </label>
          <label>
            First to
            <select aria-label="First to" value={cfg.targetScore ?? 0} onChange={(e) => set({ targetScore: +e.target.value || null })}>
              {[3, 5, 7].map((n) => (
                <option key={n} value={n}>
                  {n} goals
                </option>
              ))}
              <option value={0}>No limit (clock only)</option>
            </select>
          </label>
          <label>
            Walls
            <select aria-label="Walls" value={cfg.walls ? 1 : 0} onChange={(e) => set({ walls: e.target.value === "1" })}>
              <option value={1}>Cage (ball stays in play)</option>
              <option value={0}>Open street</option>
            </select>
          </label>
        </fieldset>
      )}
      <div className="btns">
        <button onClick={onBack}>Back</button>
        <button className="primary" onClick={() => setStep("rules")}>
          Next: rules
        </button>
      </div>
    </div>
  );
}
