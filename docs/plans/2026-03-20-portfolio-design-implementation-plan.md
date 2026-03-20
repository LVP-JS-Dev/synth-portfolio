# Plan: Portfolio Design Implementation (v2)

## 1. Foundation & Design System Setup
- Install dependencies: `tamagui`, `@tamagui/next-plugin`, `motion`, `@tamagui/config` (or custom config).
- Create `tamagui.config.ts`:
  - Tokens: Colors (accent-cyan, accent-pink, accent-yellow, bg-base, bg-surface, bg-surface-2, text-primary, text-secondary).
  - Radii (radius-lg, md, sm).
  - Spaces (space-2, 3, 4, 5, 6, 8, 10).
  - Typography: JetBrains Mono (Display), Inter (Body).
  - Shadows/Glows (glow-blur-hard: 24, medium: 14, soft: 8, colors: glow-hard, glow-medium, glow-pink, glow-soft).
- Setup Next.js plugin for Tamagui compiler in `next.config.mjs` (ensure App Router compatibility).
- Inject Tamagui registry in `app/layout.tsx`.
- Import fonts (Inter, JetBrains Mono) via `next/font/google`.

## 2. Shared Primitives & Layout
- Global Navigation (`Top Nav` / `mNav`) - Sticky header, logo, nav links.
- Global Footer (`footer` / `mFooter`) - Copyright, legal links.
- Cookie Banner (`Component / Cookie Banner`) - Fixed position, Accept button.

## 3. Reusable Components
- `Button Primary`: Glowing button with hover/focus/active states.
- `Section Header`: Pre-heading (Eyebrow), Title, Subtitle.
- `Project Card`: Gradient preview, Title, Description, outer glow.
- `Timeline Item`: Dot, Role, Meta, Achievement.
- `Metric Card`: Icon, Value, Label.
- `Content Card`: Article/Talk Title, Meta, Description.
- `Form Field` & `Contact Form`: Input, Label, Icon, Validation states.

## 4. Page Implementations
- **Home View**: Hero section, Areas of Focus, Experience Timeline, Selected Projects, Engineering Quality, Content Grid, Contact CTA.
- **Projects View**: Header, Filter Row (All, React, Next.js, etc.), Grid of Projects, Pagination.
- **Project Case View**: Case Hero, Metrics Row, Overview/Context, Architecture (client, sync, platform), Implementation, Results, Stack/Links.
- **Legal View**: Privacy Policy, Personal Data Consent, Cookie Policy layout.

## 5. Polish & Verification
- Mobile responsiveness for all 4 views.
- Motion implementations for hover states (spring, stiffness 420, damping 20).
- Lighthouse CI performance check.
- A11y keyboard navigation check.