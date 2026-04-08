import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Moon, Sun, Users } from "lucide-react";
import { useThemeStore } from "../store/theme";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
];

export default function CircleNav() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <aside
      data-ocid="sidebar-nav"
      aria-label="Main navigation"
      className="flex flex-col items-center gap-2 py-4 px-2 h-full bg-sidebar border-r border-sidebar-border shrink-0 w-16 z-10"
    >
      {/* Nav items */}
      <nav
        className="flex flex-col items-center gap-1.5 flex-1"
        aria-label="Site pages"
      >
        {navItems.map(({ to, label, icon: Icon }) => (
          <div key={to} className="relative group">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              aria-label={label}
              data-ocid={`nav-item-${label.toLowerCase()}`}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-smooth",
                "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                "[&.active]:text-sidebar-primary-foreground [&.active]:bg-sidebar-primary [&.active]:shadow-md",
              )}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
            </Link>

            {/* Tooltip */}
            <div
              role="tooltip"
              className={cn(
                "pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50",
                "px-2.5 py-1.5 rounded-md text-xs font-body font-medium whitespace-nowrap",
                "bg-popover text-popover-foreground border border-border shadow-md",
                "opacity-0 scale-95 transition-smooth",
                "group-hover:opacity-100 group-hover:scale-100",
              )}
            >
              {label}
            </div>
          </div>
        ))}
      </nav>

      {/* Separator */}
      <div className="w-6 h-px bg-sidebar-border shrink-0" />

      {/* Theme toggle */}
      <div className="shrink-0 relative group">
        <button
          type="button"
          data-ocid="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full transition-smooth",
            "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent",
          )}
        >
          {theme === "dark" ? (
            <Sun className="w-[18px] h-[18px] shrink-0" />
          ) : (
            <Moon className="w-[18px] h-[18px] shrink-0" />
          )}
        </button>

        {/* Tooltip */}
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50",
            "px-2.5 py-1.5 rounded-md text-xs font-body font-medium whitespace-nowrap",
            "bg-popover text-popover-foreground border border-border shadow-md",
            "opacity-0 scale-95 transition-smooth",
            "group-hover:opacity-100 group-hover:scale-100",
          )}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </div>
      </div>
    </aside>
  );
}
