# Design v2 PR-1 Execution Plan

Version: v2.1-slim
Last updated: 2026-03-18
Scope: Minimal baseline PR for the token-only strategy.

## Goal

Ship a clean technical baseline for routes, tokens, metadata, and CI.

### Research Insights

- Default to Server Components in App Router route shells; add `"use client"` only when browser APIs are required.
- For two-domain locale SEO, canonical and hreflang must be absolute and symmetric across `lvpjsdev.com` and `lvpjsdev.ru`.
- CI needs origin env stubs to avoid false failures in `next build` when secrets are unavailable.

### Edge Cases

- Missing `SITE_ORIGIN_EN` or `SITE_ORIGIN_RU` can generate broken metadata or fail builds.
- If both origins point to the same domain, hreflang mapping becomes invalid.
- Scope creep risk: adding API/contact backend or animation work in PR-1 reduces baseline reliability.

### Implementation Notes

- Out of scope for PR-1: Tamagui runtime integration, animation/motion, `/api/contact` implementation, split deployment mechanics.
- Keep route shells minimal and compile-safe; no dependency on feature components yet.
- Record any temporary assumptions in `README` under a "PR-1 baseline" section.

### Tests

- Run `npm run typecheck`, `npm run lint`, and `npm run build` in CI with origin env stubs.
- Verify route shell rendering manually for `/`, `/projects`, `/projects/[slug]`, `/legal`.
- Verify metadata helper uses safe fallback origins when required env vars are missing.

## Deliver in PR-1

1. Next.js App Router + TypeScript scaffold.
2. Token source-of-truth (`tokens.css` or `tokens.ts`) from `design_v2`.
3. Route shells: `/`, `/projects`, `/projects/[slug]`, `/legal`.
4. Metadata helper for canonical + hreflang using environment variables:
   - `SITE_ORIGIN_EN=https://lvpjsdev.com`
   - `SITE_ORIGIN_RU=https://lvpjsdev.ru`
5. Lint gate for forbidden hardcoded design colors or fonts outside token files.
6. CI checks: `typecheck`, `lint`, `build`.

### Research Insights

- Keep one token source-of-truth decision in PR-1 to avoid drift; default recommendation is `tokens.css` for baseline simplicity.
- ESLint alone is not enough for CSS value restrictions; combine ESLint (TS/TSX) with Stylelint (CSS) if CSS token enforcement is needed.
- Metadata helper should be centralized (`lib/metadata.ts`) and consumed by route metadata to keep canonical/hreflang consistent.

### Edge Cases

- Overly strict lint rules can block valid icon/style use; limit rules to known design literals and exclude token source files.
- Missing metadata helper usage on one route leads to partial SEO coverage despite passing build.
- CI may pass locally but fail in remote runners if Node/TypeScript versions are not pinned consistently.

### Implementation Notes

- Suggested concrete paths for PR-1:
  - `app/layout.tsx`
  - `app/globals.css`
  - `app/tokens.css` (if chosen)
  - `lib/metadata.ts`
  - `.github/workflows/ci.yml`
- Metadata helper contract for PR-1:
  - inputs: `path`, `locale`
  - outputs: absolute canonical + `en`/`ru`/`x-default` alternates
- CI job-level env defaults:
  - `SITE_ORIGIN_EN=https://example.com`
  - `SITE_ORIGIN_RU=https://example.ru`

### Tests

- Add unit tests for metadata helper:
  - canonical URL generation for EN/RU
  - hreflang set contains `en`, `ru`, `x-default`
  - fallback behavior when required env vars are absent
- Add lint smoke checks for token policy on changed files.
- Confirm all four route shells compile in `next build`.

## Done Criteria

- [ ] Project builds locally and in CI.
- [ ] CI pipeline passes on the PR branch (`typecheck`, `lint`, `build`).
- [ ] All four route shells compile.
- [ ] Token file exists and is wired into app styles.
- [ ] Metadata helper reads both origin env vars.
- [ ] No hardcoded design literals outside token files in changed code.
- [ ] README notes token path and origin env keys.

### Research Insights

- Binary checklist items are necessary but insufficient without command-backed verification.
- Acceptance criteria should map to explicit CI/manual checks to avoid subjective "done".

### Edge Cases

- Criteria can be marked complete while one route misses metadata helper wiring.
- Token file may exist but not be imported, causing silent styling drift.
- README can be outdated unless updated in same PR as env/token changes.

### Implementation Notes

- Treat these as measurable checks:
  - CI pass evidence from PR branch
  - route compile evidence from `next build`
  - lint evidence for no forbidden literals
  - metadata test evidence for env usage
- Missing evidence for any criterion should be considered not done.

### Tests

- CI required checks:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build`
- Metadata helper unit tests must pass in CI.
- Manual verify in page source for canonical + hreflang on at least `/` and `/projects`.

## Suggested Commit Order

1. Scaffold + routes.
2. Tokens + lint rule.
3. Metadata helper + CI + README.

### Research Insights

- Isolate risk: infrastructure and metadata changes should be in smaller commits for easier rollback.
- Ordering should minimize rework: paths first, policy second, metadata and CI last.

### Edge Cases

- Combining metadata and CI in one commit can slow diagnosis if CI fails.
- Large mixed commits increase revert blast radius for a solo workflow.

### Implementation Notes

- Optional safer split (4 commits):
  1. scaffold + route shells
  2. token source + lint/style rules
  3. metadata helper + tests
  4. CI workflow + README updates
- Keep each commit independently buildable.

### Tests

- After each commit, run local smoke sequence:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build`
- If a commit fails build, revert that commit immediately and continue with a fixed follow-up commit.
