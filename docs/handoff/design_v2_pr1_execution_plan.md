# Design v2 PR-1 Execution Plan

Version: v2.1-slim
Last updated: 2026-03-18
Scope: Minimal baseline PR for the token-only strategy.

## Goal

Ship a clean technical baseline for routes, tokens, metadata, and CI.

## Deliver in PR-1

1. Next.js App Router + TypeScript scaffold.
2. Token source-of-truth (`tokens.css` or `tokens.ts`) from `design_v2`.
3. Route shells: `/`, `/projects`, `/projects/[slug]`, `/legal`.
4. Metadata helper for canonical + hreflang using environment variables:
   - `SITE_ORIGIN_EN=https://lvpjsdev.com`
   - `SITE_ORIGIN_RU=https://lvpjsdev.ru`
5. Lint gate for forbidden hardcoded design colors or fonts outside token files.
6. CI checks: `typecheck`, `lint`, `build`.

## Done Criteria

- [ ] Project builds locally and in CI.
- [ ] CI pipeline passes on the PR branch (`typecheck`, `lint`, `build`).
- [ ] All four route shells compile.
- [ ] Token file exists and is wired into app styles.
- [ ] Metadata helper reads both origin env vars.
- [ ] No hardcoded design literals outside token files in changed code.
- [ ] README notes token path and origin env keys.

## Suggested Commit Order

1. Scaffold + routes.
2. Tokens + lint rule.
3. Metadata helper + CI + README.
