import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Code2, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeStore } from "../store/theme";

type NavItem =
  | { kind: "link"; to: string; label: string; exact: boolean }
  | { kind: "anchor"; href: string; label: string; section: string };

const navItems: NavItem[] = [
  { kind: "link", to: "/", label: "Home", exact: true },
  { kind: "anchor", href: "/#about", label: "About", section: "about" },
  {
    kind: "anchor",
    href: "/#services",
    label: "Services",
    section: "services",
  },
  {
    kind: "anchor",
    href: "/#portfolio",
    label: "Portfolio",
    section: "portfolio",
  },
  { kind: "link", to: "/contact", label: "Contact", exact: false },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function AnchorNavItem({
  item,
  className,
  onClick,
}: {
  item: Extract<NavItem, { kind: "anchor" }>;
  className?: string;
  onClick?: () => void;
}) {
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      e.preventDefault();
      scrollToSection(item.section);
    }
    onClick?.();
  }

  return (
    <a
      href={item.href}
      onClick={handleClick}
      data-ocid={`nav-link-${item.label.toLowerCase()}`}
      className={className}
    >
      {item.label}
    </a>
  );
}

export default function NavBar() {
  const { theme, toggleTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopLinkClass = cn(
    "px-4 py-2 rounded-md text-sm font-medium transition-smooth",
    "text-muted-foreground hover:text-foreground hover:bg-muted",
  );

  const mobileLinkClass = cn(
    "px-4 py-2.5 rounded-md text-sm font-medium transition-smooth",
    "text-muted-foreground hover:text-foreground hover:bg-muted",
  );

  return (
    <header
      data-ocid="top-nav-bar"
      className={cn(
        "sticky top-0 z-30 w-full border-b transition-smooth",
        scrolled
          ? "bg-card/95 backdrop-blur-sm border-border shadow-subtle"
          : "bg-card border-border",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="VWEDE web dev — home"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground shadow-sm transition-smooth group-hover:shadow-md group-hover:scale-105">
            <Code2 className="w-[18px] h-[18px]" />
          </span>
          <span className="font-display font-bold text-foreground text-lg tracking-tight whitespace-nowrap leading-none">
            VWEDE <span className="text-primary font-semibold">web dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navItems.map((item) =>
            item.kind === "link" ? (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                data-ocid={`nav-link-${item.label.toLowerCase()}`}
                className={cn(
                  desktopLinkClass,
                  "[&.active]:text-primary [&.active]:font-semibold [&.active]:bg-primary/8",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <AnchorNavItem
                key={item.label}
                item={item}
                className={desktopLinkClass}
              />
            ),
          )}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            data-ocid="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-md transition-smooth",
              "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent hover:border-border",
            )}
          >
            {theme === "dark" ? (
              <Sun className="w-[18px] h-[18px]" />
            ) : (
              <Moon className="w-[18px] h-[18px]" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="w-[18px] h-[18px]" />
            ) : (
              <Menu className="w-[18px] h-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="md:hidden border-t border-border bg-card px-6 pb-4 pt-2 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) =>
            item.kind === "link" ? (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                onClick={() => setMenuOpen(false)}
                data-ocid={`mobile-nav-link-${item.label.toLowerCase()}`}
                className={cn(
                  mobileLinkClass,
                  "[&.active]:text-primary [&.active]:font-semibold",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <AnchorNavItem
                key={item.label}
                item={item}
                className={mobileLinkClass}
                onClick={() => setMenuOpen(false)}
              />
            ),
          )}
        </nav>
      )}
    </header>
  );
}
