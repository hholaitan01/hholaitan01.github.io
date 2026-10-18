/** Training: free play (our practice drills) or penalty practice. */
export function TrainingMenu({ go }: { go: (r: string) => void }) {
  return (
    <div className="screen" data-testid="training">
      <p className="kicker">Training</p>
      <h2>What do you want to practise?</h2>
      <div className="mode-cards">
        <button className="mode-card" onClick={() => go("practice")}>
          <small>Free play and drills</small>
          <b>Practice court</b>
          <span>Dribble, pass and shoot with no clock, or try the 60-second target and passing drills.</span>
        </button>
        <button className="mode-card" onClick={() => go("training/penalties")}>
          <small>Unlimited</small>
          <b>Penalty practice</b>
          <span>Aim, hold for power, release. Keep your streak going against the keeper.</span>
        </button>
      </div>
      <div className="btns">
        <button onClick={() => go("home")}>Back</button>
      </div>
    </div>
  );
}
