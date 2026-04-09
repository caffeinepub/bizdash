import { Link } from "@tanstack/react-router";
import { Code2, Mail } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      data-ocid="site-footer"
      className="w-full bg-card border-t border-border mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 group w-fit"
              aria-label="VWEDE web dev home"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground transition-smooth group-hover:scale-105">
                <Code2 className="w-[18px] h-[18px]" />
              </span>
              <span className="font-display font-bold text-foreground text-lg">
                VWEDE <span className="text-primary">web dev</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              No-code development powered by Caffeine AI. Building powerful,
              scalable web solutions — faster than traditional development.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Navigation
            </p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {footerLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Get in touch
            </p>
            <a
              href="mailto:maxvwede@gmail.com"
              data-ocid="footer-contact-email"
              className="flex items-center gap-2.5 text-primary hover:text-primary/80 font-semibold text-sm transition-smooth group w-fit"
              aria-label="Send email to maxvwede@gmail.com"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth shrink-0">
                <Mail className="w-4 h-4" />
              </span>
              maxvwede@gmail.com
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open to new projects and collaborations.
              <br />
              Response within 24 hours.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} VWEDE web dev. All rights reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
