# Design v2 Implementation Handoff Checklist

Last updated: 2026-03-18
Source: `design_v2.pen`

## P0 (Must Pass Before Shipping)

### 1) Foundations
- [ ] Use design tokens only (no raw colors/fonts in component code).
- [ ] Token source-of-truth is defined (for example `src/styles/tokens.css` or `src/theme/tokens.ts`).
- [ ] Required core tokens are present and mapped:
  - `--bg-base: #1A1630`
  - `--bg-surface: #221C3E`
  - `--bg-surface-2: #2C2550`
  - `--text-primary--theme-0: #F7F4FF`
  - `--text-primary--theme-1: #FFF9FF`
  - `--text-primary`: alias resolved by active theme mapping
  - `--text-secondary: #D7CCFF`
  - `--font-display: JetBrains Mono`
  - `--font-body: Inter`
- [ ] Typography floor: no text below `12px`.

Acceptance criteria
- [ ] Static checks (lint/style rules) fail on hardcoded design hex/font literals outside token files.
- [ ] Token file path is documented in the README/implementation notes.

### 2) Accessibility and Ergonomics
- [ ] Contrast meets WCAG 2.2 AA:
  - Normal text >= `4.5:1`
  - Large text >= `3:1`
  - UI boundaries/controls >= `3:1`
- [ ] Touch targets for interactive controls are >= `44x44` (mobile ergonomics), and never below WCAG minimum `24x24`.
- [ ] Focus states are visible on all interactive elements.
- [ ] Cookie consent blocks analytics until accepted.

Acceptance criteria
- [ ] Lighthouse accessibility >= 95 for desktop and mobile routes.
- [ ] Keyboard-only navigation works across nav, filters, cards, and forms.

### 3) Global Layout and Responsive Rules
- [ ] Desktop frames implement 1440 layout behavior.
- [ ] Mobile frames implement 390 layout behavior.
- [ ] Tablet range is validated at 768-1024 widths.
- [ ] No horizontal scroll on desktop/mobile.
- [ ] No clipped/overlapping nodes versus design spec.

Acceptance criteria
- [ ] Visual QA at `390x844`, `768x1024`, `834x1112`, `1024x1366`, and `1440x900` passes without overflow.

### 4) Critical Flows
- [ ] Home hero CTAs: `View Projects`, `Engineering Quality`, `Contact` are wired.
- [ ] Projects cards navigate to case pages.
- [ ] Contact form submits and handles success/error states.
- [ ] Legal links and cookie consent flow are implemented.

Acceptance criteria
- [ ] End-to-end happy path: Home -> Projects -> Case -> Contact submission -> Legal works.
- [ ] Contact error path is handled: validation/network failure shows clear inline error and preserves user input.

## P1 (Core Quality)

### 1) Component Fidelity
- [ ] `Component / Button Primary` style parity (pill radius, stroke, glow, spacing) [node: `oNDTR`].
- [ ] `Project Card`, `Metric Card`, `Content Card`, `Timeline Item`, `Form Field` match structure and spacing [nodes: `z0Nf5`, `eJ7Df`, `MAqDx`, `tUNiC`, `AI6FD`].
- [ ] `Cookie Banner` and `In Development` components match states and hierarchy [nodes: `6fvkC`, `ixV4l`].

Acceptance criteria
- [ ] Component screenshots are visually aligned with design frames.

### 2) Page-Level Fidelity
- [ ] Home/Desktop and Home/Mobile sections preserve hierarchy and spacing rhythm.
- [ ] Projects/Desktop and Projects/Mobile filter + list behavior is consistent.
- [ ] Project Case/Desktop and Project Case/Mobile preserve tuned hierarchy (reduced card fatigue, readable glow).
- [ ] Legal/Desktop and Legal/Mobile structure and copy blocks are complete.
- [ ] Iconography parity is preserved across desktop/mobile for navigation, legal, consent, and metric callouts.

Acceptance criteria
- [ ] No section-level regressions after responsive breakpoints.

### 3) Interaction Semantics
- [ ] Filters expose active state (`aria-pressed` where applicable).
- [ ] Nav/back actions are semantic links or buttons with correct roles.
- [ ] External links use `rel="noopener noreferrer"`.
- [ ] Icons are decorative-only where appropriate (`aria-hidden="true"`) or have an accessible label when they are the only control cue.

### 4) Iconography System
- [ ] Use Lucide icon set consistently (24-grid stroke style) for all UI iconography in implementation.
- [ ] Keep icon sizes consistent by context:
  - `14px`: back/legal chips/cookie accept
  - `16px`: compact nav controls (mobile menu)
  - `20px`: metric callouts
- [ ] Keep icon and label spacing consistent (`gap: 6` for compact controls, `gap: 8` for metric value groups).
- [ ] Icon colors are tokenized or mapped to approved design accents.

Acceptance criteria
- [ ] Screen reader announces key regions and controls correctly.
- [ ] Visual QA confirms icon alignment on `/`, `/projects`, `/projects/[slug]`, `/legal` for desktop + mobile.

## P2 (Polish and Production Readiness)

### 1) Motion and Glow Discipline
- [ ] Glow intensity is restrained for readability (headings emphasized, body text clean).
- [ ] Respect `prefers-reduced-motion` for non-essential animation.

### 2) Content and Governance
- [ ] Replace placeholder/in-development copy where ready.
- [ ] Keep ETA labels configurable (not hardcoded in multiple components).
- [ ] Final legal text reviewed before publication.

### 3) Performance/Observability
- [ ] Lighthouse budgets enforced in CI.
- [ ] Error reporting (Sentry or equivalent) connected for production builds.
- [ ] Analytics events behind consent gate.

## Implementation Verification Commands

```bash
# 1) Run type/lint/tests
npm run typecheck || npx tsc --noEmit
npm run lint
npm test

# 2) Build and preview
npm run build
npm run preview

# 3) Accessibility checks across critical routes/devices
BASE_URL=http://localhost:3000
for route in / /projects /projects/realtime-collaboration-suite /legal; do
  npx lighthouse "${BASE_URL}${route}" --emulated-form-factor=desktop --only-categories=accessibility --quiet
  npx lighthouse "${BASE_URL}${route}" --emulated-form-factor=mobile --only-categories=accessibility --quiet
done
```

## Sign-off

- [ ] P0 complete
- [ ] P1 complete
- [ ] P2 accepted/deferred explicitly
- [ ] Handoff approved for implementation

Owner: ____________________
Date: _____________________
