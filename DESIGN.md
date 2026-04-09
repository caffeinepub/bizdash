# Design Brief: VWEDE Web Dev

## Direction
VWEDE Web Dev — Professional no-code developer portfolio showcasing Caffeine AI expertise and web solutions for business growth.

## Tone
Bold, confident, modern sans-serif aesthetic. Minimal ornamentation lets typography and spacing create hierarchy — the design gets out of the way to let Vwede's expertise speak.

## Differentiation
Purple primary accent paired with vibrant gold for confidence moments (CTAs, "why no-code"). Typography-driven hierarchy with generous spacing creates editorial clarity while maintaining approachability.

## Color Palette

| Token      | Light OKLCH | Dark OKLCH | Role                                 |
| ---------- | ----------- | ---------- | ------------------------------------ |
| background | 0.98 0.01 0 | 0.12 0.01 0 | Canvas, main surface                 |
| foreground | 0.15 0.02 0 | 0.93 0.01 0 | Primary text, high contrast          |
| card       | 0.95 0.01 0 | 0.16 0.02 0 | Elevated surfaces, portfolio/service |
| primary    | 0.65 0.18 142 | 0.65 0.18 142 | No-code brand, actions, focus       |
| accent     | 0.68 0.22 70 | 0.78 0.18 70 | Confidence moments, warmer CTAs     |
| muted      | 0.92 0.01 0 | 0.22 0.02 0 | Secondary text, subtle backgrounds  |

## Typography

- Display: Plus Jakarta Sans — hero headings, section titles (geometric, confident)
- Body: General Sans — all prose, UI text, form labels (clean, readable)
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-4xl font-bold`, label `text-sm font-semibold uppercase`, body `text-base`

## Elevation & Depth

Card layering (card bg on canvas bg) with 1px borders creates depth. No shadows or glows — rely on lightness contrast and spacing. Hover states use opacity and scale, not shadow amplification.

## Structural Zones

| Zone     | Background               | Border    | Notes                                      |
| -------- | ------------------------ | --------- | ------------------------------------------ |
| Header   | card (0.95 L / 0.16 L)   | border-b  | Sticky, brand + nav links, 1px divider     |
| Hero     | background (full-width)  | —         | Large typography, CTA button, breathing    |
| About    | card (elevated)           | subtle    | Image + content, alternating grid          |
| Services | background (light grid)  | —         | 3-column card grid, border per card        |
| Portfolio| alternating sections     | subtle    | Project cards with image + description     |
| Contact  | muted-foreground subtle  | —         | Dark background, form + email display      |
| Footer   | card (0.95 L / 0.16 L)   | border-t  | Links, copyright, 1px divider              |

## Spacing & Rhythm

Sections: 40px mobile / 64px desktop padding. Card gap: 16px–24px. Micro-spacing: 8px, 12px. Typography drives rhythm — heading + subtitle + body with breathing room between sections.

## Component Patterns

- **CTA Button**: primary bg, rounded-lg, hover:opacity-90 + scale-[0.98], icon optional
- **Cards**: card bg, 1px border, rounded-lg, shadow-subtle on hover
- **Form**: input bg-card, border-border, focus:ring-2 ring-primary
- **Navigation**: sticky header, font-body text-foreground, hover:text-primary, hamburger `md:hidden`

## Motion

- Entrance: fade-in on scroll (optional, subtle)
- Hover: opacity + scale-[0.98] on interactive elements (150ms ease-out)
- No decorative animations — focus on responsiveness and feedback

## Constraints

- Never use raw hex or RGB — all colors via OKLCH tokens
- No full-page gradients or glow effects — depth via layering and contrast
- Maintain 1.05 line-height minimum for readability
- Responsive mobile-first: sm/md/lg breakpoints for stacking/grid

## Signature Detail

Purple + gold pairing creates visual confidence without neon aesthetic. Bold sans display paired with refined body font establishes authority while remaining approachable — befitting a developer who demystifies complex technical solutions through no-code.
