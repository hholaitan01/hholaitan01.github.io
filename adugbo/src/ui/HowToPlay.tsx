import { KEY_HELP, MATCH_KEY_HELP } from "../controls/keyboard";
import { MODES, rulesText, defaultConfig, type ModeId } from "../game/match/rules";

export function HowToPlay({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <h2>How to play</h2>
      <p className="muted">This build is played with a keyboard. Touch controls are not built yet.</p>
      <h3>Match controls</h3>
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
      <ul className="tips">
        <li>Tap pass for a firm pass to the team-mate you are facing; hold longer to play it into space.</li>
        <li>Hold shoot longer for power. More power means less accuracy, and the ball rises — watch the bar.</li>
        <li>Steer the shot: hold up or down while releasing shoot to pick a corner.</li>
        <li>Receiving a hard pass while standing still can bounce off you; move onto the ball to cushion it.</li>
        <li>Mistimed tackles leave you off balance. A slide covers more ground but puts you on the floor.</li>
      </ul>
      <h3>Practice keys</h3>
      <ul className="tips">
        {KEY_HELP.map(([k, v]) => (
          <li key={k}>
            <b>{k}</b> — {v}
          </li>
        ))}
      </ul>
      <h3>Modes</h3>
      {(Object.keys(MODES) as ModeId[]).map((m) => (
        <div key={m}>
          <b>{MODES[m].title}</b> — {MODES[m].blurb}
          <ul className="tips">
            {rulesText(defaultConfig(m)).map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="btns">
        <button className="primary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
