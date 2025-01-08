import { Header } from "@/components/header";
import { LeftPanel } from "@/components/left-panel";
import { RightPanel } from "@/components/right-panel";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="w-full flex">
        <Sidebar />
        <div className="w-full flex">
          <LeftPanel />
          <RightPanel />
          </div>
        </div>
      </div>
  );
}
