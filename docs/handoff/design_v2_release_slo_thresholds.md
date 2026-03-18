# Design v2 Release SLO Thresholds

Version: v2.1-slim
Last updated: 2026-03-18
Scope: `lvpjsdev.com` (EN) and `lvpjsdev.ru` (RU).

## Blocking Thresholds (Now)

- Canonical coverage: `100%` on critical routes.
- Hreflang symmetry (`en`, `ru`, `x-default`): `100%` on route pairs.
- Sitemap domain integrity: `100%`.
- Contact synthetic success rate (`2xx`): `>= 99.0%` (24h, when contact endpoint is live).
- Contact protection coverage (captcha + rate limit + validation + honeypot): `100%`.
- Accessibility score (critical routes): `>= 95`.
- Performance score (critical routes): `>= 90`.
- Critical console errors: `0`.

## Blocking Thresholds (Before Split)

- Contract compatibility gate pass rate: `>= 99%` (rolling 14 days).
- Release manifest parity per release: `100%`.
- Config parity per release: `100%`.
- Synthetic cross-domain journey pass rate: `>= 99.5%` (24h).
- Canary hold before deploying to the second domain: `>= 30 minutes` with no severity 2+ incidents.

## Operational Targets (After Split)

- Availability per domain: `>= 99.9%` monthly.
- Availability delta: `<= 0.1%` monthly.
- Mean time to detect (MTTD) drift: `<= 5 minutes`.
- Mean time to recover (MTTR) drift: `<= 30 minutes`.

## Scope

- Critical routes: `/`, `/projects`, `/projects/[slug]`, `/legal`.
- Critical journey: `home -> projects -> /projects/[slug] -> legal -> contact form submission`.
