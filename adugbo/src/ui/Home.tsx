export function Home({ go }: { go: (route: string) => void }) {
  return (
    <div className="home">
      <h1>
        ADUGBO<span>Street Kings</span>
      </h1>
      <div className="menu">
        <button className="primary" onClick={() => go("play")}>
          Play match
        </button>
        <button onClick={() => go("practice")}>Practice</button>
        <button onClick={() => go("howto")}>How to play</button>
        <button onClick={() => go("settings")}>Settings</button>
        <button onClick={() => go("lab")}>Player lab</button>
        <button onClick={() => go("credits")}>Credits</button>
      </div>
      <p className="muted">Keyboard required in this build. Single player against the CPU; no local or online multiplayer.</p>
    </div>
  );
}
