# Design v2 Release Risk Contract

Version: v2.1-slim
Last updated: 2026-03-18
Scope: `design_v2` for `lvpjsdev.com` (EN) and `lvpjsdev.ru` (RU).

## Defaults

- UI mode: token-only.
- Locale routing: domain-based (`lvpjsdev.com -> en`, `lvpjsdev.ru -> ru`).
- Owner model: solo development.
- Env keys:
  - `SITE_ORIGIN_EN=https://lvpjsdev.com`
  - `SITE_ORIGIN_RU=https://lvpjsdev.ru`

## Must Pass Now

1. Canonical is self-referencing on each domain.
2. Hreflang is symmetric (`en`, `ru`, `x-default`) with absolute cross-domain URLs, and `x-default` points to the EN fallback URL.
3. No forced locale redirects by IP or `Accept-Language`.
4. Sitemaps are per-domain and contain only same-domain URLs.
5. Contact endpoint has honeypot, captcha, validation, and rate limit.
6. SPF, DKIM, DMARC are valid on both domains.
7. Critical flow passes on both domains:
   - `/ -> /projects -> /projects/[slug] -> /legal -> contact submit`
8. All "Blocking Thresholds (Now)" from `design_v2_release_slo_thresholds.md` pass on both domains.

## Gate Evidence Rule

A gate is PASS only when evidence is attached with:

- metric name
- source of truth (dashboard, query, or logs)
- exact check command or query
- evaluation window
- recorded result

Missing evidence = FAIL.

## Must Pass Before Split Deployment

1. Release manifest parity: `release_id`, `git_sha`, `contract_version`, `config_fingerprint`.
2. Contract compatibility policy: `N/N-1`.
3. Contract tests are blocking in CI.
4. Config and feature-flag parity checks are blocking.
5. Canary and rollback are documented and tested.
6. Synthetic cross-domain probes are running with alerts.

## Solo Release Check Template

```md
# Release Check: design_v2

- Date/Time (UTC):
- Owner:
- Release ID and Git SHA:
- Domain Scope: [ ] lvpjsdev.com [ ] lvpjsdev.ru [ ] both
- Deployment Mode: [ ] unified [ ] split

## Must-Pass Now
- [ ] Canonical
- [ ] Hreflang
- [ ] No auto locale redirect
- [ ] Sitemap integrity
- [ ] Contact anti-abuse
- [ ] SPF/DKIM/DMARC
- [ ] Critical journey (contact form submission)
- [ ] Quality baseline

## Must-Pass Before Split (if split)
- [ ] Release manifest parity
- [ ] N/N-1 compatibility
- [ ] Contract tests
- [ ] Config/flag parity
- [ ] Canary + rollback
- [ ] Synthetic probes

## Decision
- [ ] GO [ ] NO-GO
- Notes:
- Rollback trigger:
- Rollback command/runbook:
```

## Security Baseline Reference

For minimal operational security controls used by this contract, see
`docs/handoff/design_v2_security_baseline_appendix.md`.
