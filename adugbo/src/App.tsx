import { lazy, Suspense, useEffect, useState } from "react";
import { Home } from "./ui/Home";
import { MatchSetup } from "./ui/MatchSetup";
import { Credits } from "./ui/Credits";

// the 3D screens pull in three.js and Rapier (several MB): load them only when needed
const PlayerLab = lazy(() => import("./ui/PlayerLab").then((m) => ({ default: m.PlayerLab })));
const PracticeScreen = lazy(() => import("./ui/PracticeScreen").then((m) => ({ default: m.PracticeScreen })));
const MatchScreen = lazy(() => import("./ui/MatchScreen").then((m) => ({ default: m.MatchScreen })));
import { HowToPlay } from "./ui/HowToPlay";
import { SettingsScreen } from "./ui/SettingsScreen";
import type { MatchConfig } from "./game/match/rules";

const routeOf = () => location.hash.replace(/^#\/?/, "") || "home";

export default function App() {
  const [route, setRoute] = useState(routeOf);
  const [match, setMatch] = useState<{ cfg: MatchConfig; n: number } | null>(null);
  useEffect(() => {
    const on = () => setRoute(routeOf());
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  const go = (r: string) => {
    location.hash = r === "home" ? "" : `/${r}`;
  };
  return <Suspense fallback={<div className="loading">Loading…</div>}>{screen()}</Suspense>;

  function screen() {
    switch (route) {
    case "lab":
      return <PlayerLab />;
    case "practice":
      return <PracticeScreen onExit={() => go("home")} />;
    case "play":
      return (
        <MatchSetup
          onBack={() => go("home")}
          onStart={(cfg) => {
            setMatch({ cfg, n: 0 });
            go("match");
          }}
        />
      );
    case "match":
      // a reload loses the in-memory setup: go back to it rather than show an empty match
      if (!match) {
        queueMicrotask(() => go("play"));
        return null;
      }
      return <MatchScreen key={match.n} config={match.cfg} onExit={() => go("home")} onReplay={() => setMatch({ cfg: match.cfg, n: match.n + 1 })} />;
    case "howto":
      return <HowToPlay onBack={() => go("home")} />;
    case "credits":
      return <Credits onBack={() => go("home")} />;
    case "settings":
      return <SettingsScreen onBack={() => go("home")} />;
    default:
      return <Home go={go} />;
    }
  }
}
