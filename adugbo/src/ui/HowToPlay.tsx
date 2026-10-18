import { KEY_HELP, MATCH_KEY_HELP } from "../controls/keyboard";
import { MODES, rulesText, defaultConfig, type ModeId } from "../game/match/rules";

export function HowToPlay({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <h2>How to play</h2>
      <p className="muted">Keyboard on computers. On phones and tablets an eFootball-style touch pad appears instead (it is hidden on desktop).</p>
      <h3>Touch controls (phones and tablets)</h3>
      <table className="keys-table">
        <thead>
          <tr>
            <th>Control</th>
            <th>With the ball</th>
            <th>Without the ball</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Left thumb, anywhere on the left half</td>
            <td>move (the stick appears where you touch)</td>
            <td>move</td>
          </tr>
          <tr>
            <td>Bottom-left button</td>
            <td>PASS (flick up: lofted pass)</td>
            <td>SWITCH player</td>
          </tr>
          <tr>
            <td>Top-left button</td>
            <td>THROUGH ball (flick up: lofted through ball)</td>
            <td>SLIDE tackle</td>
          </tr>
          <tr>
            <td>Top-right button</td>
            <td>SHOOT (hold for power)</td>
            <td>TACKLE</td>
          </tr>
          <tr>
            <td>Big bottom-right button</td>
            <td>DASH (hold)</td>
            <td>DASH (hold)</td>
          </tr>
        </tbody>
      </table>
      <p className="muted">In practice a BALL button brings the ball back to your feet. Pause and mute are at the top of the screen.</p>
      <h3>Match controls (keyboard)</h3>
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
      <h3>Penalties</h3>
      <ul className="tips">
        <li>Taking a kick: move the aim ring in the goal with W A S D or the arrows (the stick on a phone), hold K (SHOOT) for power and release. More power is faster but less accurate, and it rises.</li>
        <li>In goal: as they run up, hold left or right and press K (DIVE on a phone) to dive that way; press it with no direction to stay up the middle.</li>
        <li>Shootout: five kicks each, then sudden death. Penalty practice (in Training) keeps your streak.</li>
      </ul>
      <h3>Online</h3>
      <ul className="tips">
        <li>Friendly: create a room and send the 5-letter code (or the invite link) to a friend. Quick match: anyone who is searching, two 90-second halves. Ranked: someone near your rating; wins and losses move your rating on the Rankings table.</li>
        <li>The home player's device runs the match, so the away player sees it a moment later. Keep the game on screen, and use a steady connection.</li>
        <li>Leaving a match for 30 seconds gives it to the other player. Watch matches lists live games; turn off watching for your own in Settings.</li>
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
