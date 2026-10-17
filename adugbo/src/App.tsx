import { useEffect, useState } from "react";
import { Home } from "./ui/Home";
import { PlayerLab } from "./ui/PlayerLab";
import { PracticeScreen } from "./ui/PracticeScreen";

const routeOf = () => location.hash.replace(/^#\/?/, "") || "home";

export default function App() {
  const [route, setRoute] = useState(routeOf);
  useEffect(() => {
    const on = () => setRoute(routeOf());
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  const go = (r: string) => {
    location.hash = r === "home" ? "" : `/${r}`;
  };
  if (route === "lab") return <PlayerLab />;
  if (route === "practice") return <PracticeScreen onExit={() => go("home")} />;
  return <Home go={go} />;
}
