# Synth Portfolio

This repository contains the PR-1 baseline scaffold for the Synth Portfolio.

## PR-1 Baseline

### Token source-of-truth
CSS tokens: `tokens.css` (root) → imported via `app/tokens.css` → `app/globals.css`

### Required environment variables
| Variable | Description | Example |
|---|---|---|
| `SITE_ORIGIN_EN` | Canonical origin for EN locale | `https://lvpjsdev.com` |
| `SITE_ORIGIN_RU` | Canonical origin for RU locale | `https://lvpjsdev.ru` |

If env vars are not set, metadata generation falls back to `https://example.com` and `https://example.ru` for baseline builds.

### CI
Runs `typecheck`, `lint`, `test`, `build` on every push/PR.
