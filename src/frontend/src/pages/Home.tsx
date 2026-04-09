import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  Bot,
  CheckCircle2,
  Clock,
  DollarSign,
  Globe,
  Layers,
  Rocket,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "Stunning, high-performance websites tailored to your brand — from landing pages to full multi-page corporate sites.",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Apps",
    desc: "Cross-platform applications that work beautifully on every device, built at a fraction of traditional cost and time.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    desc: "Full-featured online stores with product management, secure checkout, and everything needed to sell confidently online.",
  },
  {
    icon: Bot,
    title: "Business Automation",
    desc: "Automate repetitive workflows, data collection, and internal operations so your team can focus on what matters most.",
  },
  {
    icon: Layers,
    title: "Custom Web Applications",
    desc: "Bespoke web apps built around your exact requirements — dashboards, portals, booking systems, and more.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth & Digital Strategy",
    desc: "Identify where technology can drive revenue and efficiency for your business, then build it — fast and affordably.",
  },
];

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "A full-featured online store with real-time inventory, cart, and secure checkout — live in under a week.",
    tags: ["Caffeine AI", "React", "E-Commerce"],
    gradient: "from-primary/30 via-primary/15 to-accent/20",
    icon: ShoppingCart,
  },
  {
    title: "Business Analytics Dashboard",
    desc: "A data-rich dashboard giving a business owner complete visibility into sales, users, and growth metrics.",
    tags: ["Caffeine AI", "TypeScript", "Dashboard"],
    gradient: "from-accent/30 via-accent/15 to-primary/20",
    icon: BarChart2,
  },
  {
    title: "Portfolio & Booking Site",
    desc: "A sleek personal portfolio with an integrated appointment booking system for a service-based professional.",
    tags: ["Caffeine AI", "React", "Web App"],
    gradient: "from-primary/20 via-accent/20 to-primary/30",
    icon: Globe,
  },
];

const stats = [
  {
    icon: Clock,
    stat: "10×",
    label: "Faster delivery",
    desc: "Compared to traditional development timelines",
  },
  {
    icon: DollarSign,
    stat: "60%",
    label: "Cost savings",
    desc: "Lower build & maintenance costs vs traditional teams",
  },
  {
    icon: Rocket,
    stat: "100%",
    label: "Production quality",
    desc: "Every app meets enterprise-grade engineering standards",
  },
];

const advantages = [
  "No long hiring process — start building immediately",
  "On-chain backend — no servers, no DevOps, no downtime",
  "AI writes the code — you own the product entirely",
  "Iterate rapidly based on real user feedback",
  "Production-grade quality every single time",
  "Full ownership of source code and infrastructure",
];

// ─── Animation helper ──────────────────────────────────────────────────────

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

// ─── Component ────────────────────────────────────────────────────────────

export default function Home() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        data-ocid="hero-section"
        aria-labelledby="hero-heading"
        className="relative min-h-[88vh] flex items-center overflow-hidden bg-foreground"
      >
        {/* Hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-25"
          style={{
            backgroundImage:
              'url("/assets/generated/hero-vwede.dim_1200x700.jpg")',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-foreground/70 via-foreground/85 to-foreground/95"
          aria-hidden="true"
        />
        {/* Decorative glow */}
        <div
          className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.18 142) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 w-full">
          <div className="max-w-3xl flex flex-col gap-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="border-primary/40 text-primary bg-primary/10 font-mono text-xs uppercase tracking-widest px-3 py-1"
              >
                No-Code Developer · Caffeine AI
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="hero-title text-primary-foreground"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hi, I'm <span className="gradient-text">Vwede.</span>
              <br />
              <span className="text-primary-foreground/90">
                I build websites,
              </span>
              <br />
              <span className="gradient-text">apps &amp; more.</span>
            </motion.h1>

            <motion.p
              className="section-subtitle text-primary-foreground/70 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              I'm a developer who creates powerful digital products — websites,
              web apps, mobile apps, and business solutions — using{" "}
              <span className="text-primary font-semibold">Caffeine AI</span>. I
              help businesses grow by building technology that works.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <Link to="/contact">
                <Button
                  size="lg"
                  data-ocid="hero-cta-contact"
                  className="cta-button text-base gap-2 h-12 px-8"
                >
                  Let's Build Together <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                data-ocid="hero-cta-services"
                onClick={() => scrollTo("services")}
                className="h-12 px-8 text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-smooth"
              >
                See What I Build
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        data-ocid="about-section"
        aria-labelledby="about-heading"
        className="bg-background py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <motion.p className="data-label" {...fadeUp(0)}>
              About Vwede
            </motion.p>
            <motion.h2
              id="about-heading"
              className="section-title"
              {...fadeUp(0.08)}
            >
              A developer who builds{" "}
              <span className="gradient-text">real things</span>, fast.
            </motion.h2>
            <motion.div
              className="flex flex-col gap-4 text-muted-foreground leading-relaxed"
              {...fadeUp(0.16)}
            >
              <p>
                I'm Vwede — a developer specialising in{" "}
                <span className="accent-text">Caffeine AI</span>. I create
                websites, web apps, mobile apps, e-commerce platforms, and
                custom business solutions that help companies grow and operate
                more efficiently.
              </p>
              <p>
                My mission is to give businesses access to world-class
                technology at an accessible price point. Whether you're a
                startup launching your first product or an established business
                looking to modernise, I make it happen quickly and to an
                exceptionally high standard.
              </p>
              <p>
                Caffeine AI is the platform I work with — it powers full-stack
                applications on the Internet Computer, delivering built-in
                security, global availability, and scalability without the
                complexity and cost of traditional infrastructure.
              </p>
            </motion.div>
            <motion.ul className="flex flex-col gap-2 pt-2" {...fadeUp(0.22)}>
              {[
                "Websites that attract and convert visitors",
                "Apps that streamline how your business operates",
                "Digital strategies that drive real growth",
                "Fast delivery — days, not months",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </motion.ul>
            <motion.div {...fadeUp(0.3)}>
              <Link to="/contact">
                <Button
                  size="lg"
                  data-ocid="about-cta"
                  className="cta-button gap-2 h-11 px-7 text-sm w-fit"
                >
                  Work with Me <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Visual panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
              <img
                src="/assets/generated/hero-vwede.dim_1200x700.jpg"
                alt="Abstract digital illustration representing modern web development"
                className="w-full object-cover aspect-video"
                loading="lazy"
              />
            </div>
            {/* Floating stat chips */}
            <div className="absolute -bottom-5 -left-5 bg-card border border-border rounded-xl px-5 py-3 shadow-md">
              <p className="text-2xl font-display font-bold text-foreground">
                10×
              </p>
              <p className="text-xs text-muted-foreground">Faster delivery</p>
            </div>
            <div className="absolute -top-5 -right-5 bg-card border border-border rounded-xl px-5 py-3 shadow-md">
              <p className="text-2xl font-display font-bold gradient-text">∞</p>
              <p className="text-xs text-muted-foreground">Scalable apps</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY VWEDE (stats + advantages) ───────────────────────────────── */}
      <section
        data-ocid="why-section"
        className="bg-muted/30 border-y border-border py-24 md:py-32"
        aria-labelledby="why-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <motion.p className="data-label" {...fadeUp(0)}>
              The Advantage
            </motion.p>
            <motion.h2
              id="why-heading"
              className="section-title max-w-2xl"
              {...fadeUp(0.08)}
            >
              Why choose Vwede over a{" "}
              <span className="gradient-text">traditional developer?</span>
            </motion.h2>
            <motion.p className="section-subtitle max-w-xl" {...fadeUp(0.16)}>
              Traditional development is slow, expensive, and opaque. Building
              with Caffeine AI changes the equation entirely.
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map(({ icon: Icon, stat, label, desc }, i) => (
              <motion.div key={label} {...fadeUp(i * 0.1)}>
                <Card className="p-8 text-center border-border bg-card hover:shadow-md transition-smooth h-full">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </span>
                  <p className="text-4xl font-display font-bold text-primary mb-1">
                    {stat}
                  </p>
                  <p className="font-semibold text-foreground mb-1">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Advantages checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advantages.map((item, i) => (
              <motion.div
                key={item}
                {...fadeUp(i * 0.06)}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section
        id="services"
        data-ocid="services-section"
        aria-labelledby="services-heading"
        className="bg-background py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <motion.p className="data-label" {...fadeUp(0)}>
              Services
            </motion.p>
            <motion.h2
              id="services-heading"
              className="section-title max-w-xl"
              {...fadeUp(0.08)}
            >
              Everything I can build{" "}
              <span className="gradient-text">for your business</span>
            </motion.h2>
            <motion.p className="section-subtitle max-w-xl" {...fadeUp(0.16)}>
              From simple websites to complex web applications — polished
              digital products that drive results.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.08)}>
                <Card
                  data-ocid={`service-card-${i}`}
                  className="h-full bg-card border-border hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-smooth group"
                >
                  <CardContent className="pt-8 pb-8 px-6 flex flex-col gap-4">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-display font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button
                size="lg"
                data-ocid="services-cta"
                className="cta-button gap-2 h-12 px-8 text-base"
              >
                Start a Project <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
      <section
        id="portfolio"
        data-ocid="portfolio-section"
        aria-labelledby="portfolio-heading"
        className="bg-muted/30 border-y border-border py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 flex flex-col items-center gap-4">
            <motion.p className="data-label" {...fadeUp(0)}>
              Portfolio
            </motion.p>
            <motion.h2
              id="portfolio-heading"
              className="section-title max-w-xl"
              {...fadeUp(0.08)}
            >
              Projects built with{" "}
              <span className="gradient-text">Caffeine AI</span>
            </motion.h2>
            <motion.p className="section-subtitle max-w-xl" {...fadeUp(0.16)}>
              Real applications that solve real business problems — delivered
              fast and built to last.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map(({ title, desc, tags, gradient, icon: Icon }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.1)} className="group">
                <Card
                  data-ocid={`portfolio-card-${i}`}
                  className="h-full bg-card border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-smooth flex flex-col"
                >
                  {/* Thumbnail */}
                  <div
                    className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <Icon className="w-14 h-14 text-primary/40 group-hover:text-primary/60 group-hover:scale-110 transition-smooth" />
                    <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono bg-card/70 backdrop-blur-sm text-foreground px-2 py-0.5 rounded-md border border-border/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <CardContent className="pt-5 pb-6 px-6 flex flex-col gap-2 flex-1">
                    <h3 className="font-display font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" {...fadeUp(0.3)}>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                data-ocid="portfolio-cta"
                className="secondary-button h-12 px-8 text-base gap-2"
              >
                Discuss Your Project <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA BAND ──────────────────────────────────────────────── */}
      <section
        data-ocid="cta-band"
        aria-labelledby="cta-heading"
        className="bg-primary py-20"
      >
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl font-display font-bold text-primary-foreground"
          >
            Ready to build something extraordinary?
          </h2>
          <p className="text-lg text-primary-foreground/75 max-w-lg">
            Whether it's a brand-new website, a custom app, or a digital
            strategy that drives growth — let's make it real.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/contact">
              <Button
                size="lg"
                data-ocid="band-cta-primary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold h-12 px-10 text-base gap-2 transition-smooth"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a
              href="mailto:maxvwede@gmail.com"
              data-ocid="band-cta-email"
              className="text-sm text-primary-foreground/80 font-semibold hover:text-primary-foreground transition-smooth underline underline-offset-4"
            >
              maxvwede@gmail.com
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
