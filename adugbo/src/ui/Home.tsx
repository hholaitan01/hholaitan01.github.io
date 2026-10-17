export function Home({ go }: { go: (route: string) => void }) {
  return (
    <div className="home">
      <h1>
        ADUGBO<span>Street Kings</span>
      </h1>
      <div className="menu">
        <button className="primary" onClick={() => go("practice")}>
          Practice
        </button>
        <button onClick={() => go("lab")}>Player lab</button>
      </div>
      <p className="muted">Match modes arrive in a later build. Practice currently needs a keyboard.</p>
    </div>
  );
}
