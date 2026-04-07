import { Toaster } from "@/components/ui/sonner";
import { useCallback, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const SIDEBAR_MIN = 60;
const SIDEBAR_MAX = 320;
const SIDEBAR_DEFAULT = 240;
const COLLAPSE_THRESHOLD = 100;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const isDragging = useRef(false);

  const collapsed = sidebarWidth <= COLLAPSE_THRESHOLD;

  const toggleSidebar = useCallback(() => {
    setSidebarWidth((w) =>
      w <= COLLAPSE_THRESHOLD ? SIDEBAR_DEFAULT : SIDEBAR_MIN,
    );
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;
      const newWidth = Math.min(
        SIDEBAR_MAX,
        Math.max(SIDEBAR_MIN, moveEvent.clientX),
      );
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      // Snap: if below threshold, collapse to icon-only
      setSidebarWidth((w) => (w < COLLAPSE_THRESHOLD ? SIDEBAR_MIN : w));
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top navigation bar — full width */}
      <TopBar collapsed={collapsed} onToggleSidebar={toggleSidebar} />

      {/* Sidebar + content row */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <Sidebar collapsed={collapsed} width={sidebarWidth} />

        {/* Drag handle */}
        <button
          type="button"
          aria-label="Resize sidebar"
          data-ocid="sidebar-resize-handle"
          onMouseDown={handleMouseDown}
          className="relative z-10 w-1 shrink-0 cursor-col-resize group bg-transparent border-none outline-none p-0"
          style={{ marginLeft: -4, paddingLeft: 3, paddingRight: 3 }}
        >
          <div className="h-full w-px bg-sidebar-border group-hover:bg-primary/60 focus-visible:bg-primary/60 transition-colors duration-150" />
        </button>

        <main className="flex-1 flex flex-col overflow-hidden bg-background min-w-0">
          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full px-8 py-6">{children}</div>
          </div>
        </main>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
