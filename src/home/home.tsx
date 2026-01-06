import { RightPanel } from "./right-panel";
import { LeftPanel } from "./left-panel";

export function Home() {
  return (
    <div className="flex h-screen w-screen">
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
