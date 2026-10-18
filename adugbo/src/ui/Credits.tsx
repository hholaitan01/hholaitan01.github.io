import notices from "../../docs/THIRD_PARTY_NOTICES.md?raw";

/** Credits and licence notices (the same text as docs/THIRD_PARTY_NOTICES.md). */
export function Credits({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <h2>Credits</h2>
      <p className="muted">
        ADUGBO: Street Kings. All teams, players, kits, badges and shop names are fictional. Full licence texts:{" "}
        <a href="licences/rocketbox-MIT.txt">Rocketbox MIT</a>, <a href="licences/barlow-condensed-OFL.txt">Barlow Condensed OFL</a>.
      </p>
      <pre className="notices">{notices}</pre>
      <div className="btns">
        <button className="primary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}
