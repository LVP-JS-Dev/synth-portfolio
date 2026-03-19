# Design v2 PR-2 Execution Plan

Version: v1.1-slim
Last updated: 2026-03-19
Scope: UI component layer and route composition on top of merged PR-1 baseline.

## Goal

Ship high-fidelity UI for `design_v2` on routes `/`, `/projects`, `/projects/[slug]`, and `/legal`.
Keep route shells as Server Components by default. Use `tokens.css` as the visual source of truth.

## Scope and Boundaries

### In scope

- Reusable UI, layout, and section components for `design_v2`.
- Route wiring from shells to real sections/components.
- Accessibility baseline (WCAG 2.2 AA), security minimum, and performance guardrails.
- Metadata continuity with `lib/metadata.ts` and route-level title/description overrides.

### Out of scope

- Live `/api/contact` backend implementation (PR-3).
- Analytics integration (PR-3, behind consent gate contract prepared in PR-2).
- Motion polish and advanced visual effects.
- CSP enforcement mode (PR-3 after report-only stabilization).

## Baseline Delta (from PR-1)

Already done in PR-1:

- App Router scaffold and route shells exist.
- `tokens.css` and `app/tokens.css` are wired.
- `lib/metadata.ts` exists with unit tests.
- CI runs `audit`, `typecheck`, `lint`, `test`, `build`.

Missing for PR-2:

- `lucide-react` dependency.
- `components/` tree and route composition.
- Security headers in `next.config.ts`.
- Component-level test infrastructure for TSX (`jsdom`, Testing Library).

## Recommended File Tree

```text
components/
  ui/
    Button.tsx
    FormField.tsx
    IconWrapper.tsx
    SectionHeader.tsx
    ProjectCard.tsx
    MetricCard.tsx
    ContentCard.tsx
    TimelineItem.tsx
    ContactForm.tsx
    InDevelopment.tsx
  layout/
    SiteNav.tsx
    SiteFooter.tsx
    CookieBanner.tsx
  sections/
    HeroSection.tsx
    AboutSection.tsx
    ExperienceSection.tsx
    ProjectsGrid.tsx
    ProjectFilters.tsx
    QualitySection.tsx
    ContentSection.tsx
    ContactSection.tsx

lib/
  content.ts

app/
  layout.tsx
  page.tsx
  projects/page.tsx
  projects/[slug]/page.tsx
  legal/page.tsx

next.config.ts
vitest.config.ts
```

## Implementation Constraints

### Server and Client boundaries

- Server by default for all components.
- Allow `"use client"` only in:
  - `components/layout/CookieBanner.tsx`
  - `components/sections/ProjectFilters.tsx`
  - `components/sections/ContactSection.tsx`
- Route shells stay server-only (`app/page.tsx`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`, `app/legal/page.tsx`, `app/layout.tsx`).

### Icon and spacing guardrails

- Lucide icon sizes: `14` (compact/chips), `16` (mobile toggles), `20` (metric callouts).
- Decorative icons must use `aria-hidden="true"`.
- If icon is the only visual action cue, add accessible label text.
- Use only tokenized spacing (`--space-*`) and tokenized typography; no raw pixel literals in JSX style props.

### Token discipline

- No hardcoded hex colors or font family literals outside token files.
- `tokens.css` remains source of truth for token values used by components.

### Naming and structure

- Component files: `PascalCase.tsx`, one primary export per file.
- Tests co-located as `ComponentName.test.tsx`.
- Shared primitives in `components/ui`, route composition in `components/sections`, page shell framing in `components/layout`.

## Security Minimum for PR-2

### Response headers (`next.config.ts`)

Add:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security` for production HTTPS environments

### CSP for PR-2

- Keep CSP in `Report-Only` mode in PR-2.
- Do not use blocking static `script-src 'self'` in App Router.
- If set in static headers, include a temporary compatibility policy with `script-src 'self' 'unsafe-inline'` and move to nonce-based policy later.
- Do not set `report-uri` in PR-2 unless a real report endpoint exists.

### Consent and form safety

- Default consent state blocks non-essential scripts/network calls.
- Dismiss is not consent.
- `ContactForm` in PR-2 is UI validation contract; backend submit remains deferred to PR-3.
- Honeypot field uses visually-hidden pattern (`position absolute`, off-screen, `tabindex="-1"`, `autocomplete="off"`), not `display:none`.

## Performance and Quality Gates

| Gate | Threshold | Enforcement |
|---|---:|---|
| `npm audit --audit-level=high` | 0 high/critical | CI blocking |
| Shared client JS gzip baseline | warn `<= 190 KB`, block `<= 210 KB` | CI script from build artifacts |
| Lighthouse accessibility | `>= 95` (desktop/mobile, median of 3) | manual evidence in PR-2, CI target in follow-up |
| Lighthouse performance | `>= 90` desktop, `>= 85` mobile (median of 3) | manual evidence in PR-2, CI target in follow-up |
| Uncaught runtime errors | 0 on critical routes | local smoke check + CI follow-up |

Critical routes: `/`, `/projects`, `/projects/[slug]`, `/legal`.

## Test Strategy

### Prerequisite test stack (Phase 1)

Before component tests, add:

- `jsdom`
- `@testing-library/react`
- `@testing-library/user-event`
- `@vitejs/plugin-react`
- `vitest.config.ts` with `test.environment = 'jsdom'`

### Unit tests

- `components/ui/Button.test.tsx`
- `components/ui/IconWrapper.test.tsx`
- `components/ui/FormField.test.tsx`
- `components/layout/CookieBanner.test.tsx`
- Extend `lib/metadata.test.ts` for title/description overrides (backward-compatible).

### Verification commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Lighthouse runs (manual evidence in this PR):

```bash
npm run build
npm run start
# run Lighthouse desktop and mobile for critical routes, 3 runs each, keep median
```

## Phase Plan

1. **Foundation**
   - Install `lucide-react` and component test prerequisites.
   - Add security headers and report-only CSP baseline.
2. **Primitives and layout**
   - Build `ui/*` primitives and `layout/*` shell.
3. **Sections and content model**
   - Add `lib/content.ts` first, then `sections/*`.
4. **Route wiring and metadata**
   - Wire pages to sections and extend `buildMetadata` before final route SEO copy wiring.
5. **Quality pass**
   - Complete accessibility/performance checks, fix regressions, and finalize docs.

## Commit Order (solo-friendly)

1. `chore: add PR-2 test infra and lucide dependency`
2. `feat: add security headers and report-only CSP baseline`
3. `feat: add UI primitives and related tests`
4. `feat: add layout components and cookie consent contract`
5. `feat: add content model and section components`
6. `feat: wire routes and extend metadata overrides`
7. `chore: quality pass for a11y/perf and final docs`

Each commit should pass `typecheck`, `lint`, `test`, and `build` before continuing.

## Done Criteria

- [ ] UI routes use real `design_v2` sections/components instead of placeholders.
- [ ] `lucide-react` is integrated with icon size/a11y guardrails.
- [ ] Server/client boundary rules are respected.
- [ ] Security headers are present; CSP is report-only and non-breaking.
- [ ] No non-essential third-party requests before consent.
- [ ] Component tests run in jsdom and pass in CI.
- [ ] `npm audit`, `typecheck`, `lint`, `test`, and `build` pass.
- [ ] Lighthouse evidence attached for all critical routes (desktop + mobile medians).
- [ ] No critical console/runtime errors on critical routes.
- [ ] P0/P1 checklist items are satisfied, except live contact submission explicitly deferred to PR-3.
