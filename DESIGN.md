# Design Brief

## Tone & Context
Modern analytics dashboard prioritizing data clarity and operational density. Dark mode as primary experience. Authoritative, contemporary, no ornamentation.

## Palette
| Token | Light OKLCH | Dark OKLCH | Purpose |
|-------|-------------|-----------|---------|
| Primary | 0.52 0.16 247 | 0.65 0.18 142 | Actions, links, highlights |
| Secondary | 0.5 0.12 136 | 0.55 0.18 70 | Tertiary controls |
| Success | 0.65 0.18 142 | 0.65 0.18 142 | Growth, positive trends |
| Warning | 0.62 0.16 30 | 0.72 0.16 30 | Alerts, caution states |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Errors, dangerous actions |
| Neutral | 0.92 0.01 0 | 0.22 0.02 0 | Muted, secondary text |
| Background | 0.98 0.01 0 | 0.11 0.01 0 | Canvas |

## Typography
| Tier | Font | Usage |
|------|------|-------|
| Display | InstrumentSerif (Italic) | Headings, metric labels |
| Body | GeneralSans | All prose, UI text |
| Mono | GeistMono | Data values, code snippets |

## Structural Zones
| Zone | Style |
|------|-------|
| Sidebar | Dark charcoal (0.12 L), 1px border right |
| Header | Card background (0.15 L dark), 1px border bottom, date picker |
| Content | Background (0.11 L dark), card grid |
| KPI Cards | 0.15 L dark bg, 1px border, no shadow |
| Charts | Recharts with chart-1/2/3/4/5 tokens |
| Footer | N/A |

## Shape & Depth
Minimal radius (4–8px). Subtle borders (1px, 24% contrast). No gradients or glows. Depth via layered grays, not shadows.

## Spacing & Rhythm
Compact data density: 16px base, 8px micro. Gap scale: 4px, 8px, 12px, 16px, 24px. Sidebar 240px, content padding 24px.

## Component Patterns
- KPI Cards: flex, gap-8, metric left, chart right, sparkline strip
- User rows: table-like rows, hover highlight (24L)
- Date picker: sidebar dropdown input
- Activity feed: scrollable list, time-left, event-right

## Signature Detail
Monospaced data labels above metric values. Chart sparklines with distinct hues. 1px borders + cool neutral palette = clinical precision.
