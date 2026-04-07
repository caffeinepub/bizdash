import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Moon, Sun, Users } from "lucide-react";
import { useThemeStore } from "../store/theme";

interface SidebarProps {
  collapsed: boolean;
  width: number;
}

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
];

export default function Sidebar({ collapsed, width }: SidebarProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <aside
      data-ocid="sidebar-nav"
      className="flex flex-col h-full bg-sidebar border-r border-sidebar-border shrink-0"
      style={{ width }}
    >
      {/* Nav Items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth",
              "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              "[&.active]:text-sidebar-primary [&.active]:bg-sidebar-accent",
              collapsed && "justify-center px-2",
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="border-t border-sidebar-border px-2 py-3 shrink-0">
        {/* Theme toggle */}
        <button
          type="button"
          data-ocid="theme-toggle"
          onClick={toggleTheme}
          title={
            collapsed
              ? theme === "dark"
                ? "Light mode"
                : "Dark mode"
              : undefined
          }
          className={cn(
            "w-full flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-smooth",
            "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed ? "justify-center px-2" : "gap-3",
          )}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 shrink-0" />
          ) : (
            <Moon className="w-4 h-4 shrink-0" />
          )}
          {!collapsed && (
            <span className="truncate">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
