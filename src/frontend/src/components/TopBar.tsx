import { cn } from "@/lib/utils";
import { BarChart3 } from "lucide-react";

interface TopBarProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

export default function TopBar({ collapsed, onToggleSidebar }: TopBarProps) {
  return (
    <header
      data-ocid="top-nav-bar"
      className="flex items-center h-[52px] px-4 bg-sidebar border-b border-sidebar-border shrink-0 z-20"
    >
      {/* BizDash brand button — toggles sidebar */}
      <button
        type="button"
        data-ocid="bizdash-toggle-btn"
        onClick={onToggleSidebar}
        aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
        aria-expanded={!collapsed}
        className={cn(
          "flex items-center gap-2.5 px-3 py-2 rounded-full transition-smooth",
          "bg-sidebar-primary/20 border border-sidebar-primary/30",
          "shadow-[0_1px_3px_0_oklch(0_0_0/0.2)]",
          "hover:bg-sidebar-primary/30 hover:border-sidebar-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          "text-sidebar-foreground",
        )}
      >
        <BarChart3
          className="shrink-0 text-sidebar-primary"
          style={{ width: 18, height: 18 }}
        />
        <span className="font-display font-semibold text-sidebar-primary text-base tracking-tight whitespace-nowrap leading-none">
          BizDash
        </span>
      </button>
    </header>
  );
}
