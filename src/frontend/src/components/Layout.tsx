import { Toaster } from "@/components/ui/sonner";
import CircleNav from "./Sidebar";
import TopBar from "./TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top bar — full width */}
      <TopBar />

      {/* Circle nav bar + main content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <CircleNav />

        <main
          className="flex-1 flex flex-col overflow-hidden bg-background min-w-0"
          id="main-content"
          tabIndex={-1}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full px-8 py-6">{children}</div>
          </div>
        </main>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
