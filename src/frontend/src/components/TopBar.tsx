import { BarChart3 } from "lucide-react";

export default function TopBar() {
  return (
    <header
      data-ocid="top-nav-bar"
      className="flex items-center h-[52px] px-4 bg-sidebar border-b border-sidebar-border shrink-0 z-20"
    >
      {/* BizDash brand */}
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-sidebar-primary/20 border border-sidebar-primary/30 shadow-sm">
        <BarChart3
          className="shrink-0 text-sidebar-primary"
          style={{ width: 18, height: 18 }}
        />
        <span className="font-display font-semibold text-sidebar-primary text-base tracking-tight whitespace-nowrap leading-none">
          BizDash
        </span>
      </div>
    </header>
  );
}
