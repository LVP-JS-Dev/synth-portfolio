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
| `FORCE_LOCALE` | Build-time locale for static export (`en`/`ru`) | `en` |
| `STATIC_EXPORT` | When `true`, require `FORCE_LOCALE` | `true` |

If env vars are not set, metadata generation falls back to `https://example.com` and `https://example.ru` for baseline builds.

### CMS (Decap, local-only)

The Decap CMS admin lives at `http://localhost:3000/admin/` and edits YAML content under `content/`.

Run it locally in two terminals:

```bash
pnpm cms:server
pnpm dev
```

Uploaded media is stored in `public/uploads/` (committed to Git).

`/admin` is intentionally **disabled in production** (returns 404).

### Agent content ops
This repo previously exposed `content/` operations via a Next.js API route. That API route is removed to keep the site compatible with static export.

### CI
Runs `typecheck`, `lint`, `test`, `build:static:en`, `build:static:ru`, and Playwright E2E tests (`test:e2e`) on every push/PR.

## Deploy

We deploy to **two domains**:
- `.com` → **Vercel** (GitHub Actions workflow: `.github/workflows/deploy-vercel-com.yml`)
- `.ru` → **Yandex Cloud Object Storage (static website)** (workflow: `.github/workflows/deploy-yandex-ru.yml`)

Notes:
- The Decap CMS admin (`/admin`) is intentionally **not deployed** (removed from static artifacts during build/deploy).
- For Object Storage website hosting, the bucket should be configured with `index.html` as the index document and `404.html` as the error document.
- The `.ru` deploy workflow clears the bucket before uploading (CI sets `YC_BUCKET_PURGE_OK=true`), so use a dedicated bucket for the site.
- Yandex Object Storage does not support arbitrary custom response headers on its own; to match the `.com` security headers, put a CDN in front and configure them at the CDN layer.

### GitHub Actions secrets

These workflows require repository/environment secrets:

**Shared (used by both deploys):**
- `SITE_ORIGIN_EN` (e.g. `https://example.com`)
- `SITE_ORIGIN_RU` (e.g. `https://example.ru`)

**Vercel (.com):**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

**Yandex Cloud (.ru):**
- `YC_SA_KEY_JSON` (service account authorized key JSON contents)
- `YC_CLOUD_ID`
- `YC_FOLDER_ID`
- `YC_BUCKET_NAME_RU` (Object Storage bucket name)

### Manual deploy (local)

```bash
# Vercel (.com)
VERCEL_TOKEN=... VERCEL_ORG_ID=... VERCEL_PROJECT_ID=... \
SITE_ORIGIN_EN=https://example.com SITE_ORIGIN_RU=https://example.ru \
  pnpm deploy:vercel

# Yandex Cloud (.ru) — Object Storage (static)
YC_BUCKET_PURGE_OK=true YC_SA_KEY_JSON="$(cat sa-key.json)" YC_CLOUD_ID=... YC_FOLDER_ID=... YC_BUCKET_NAME_RU=... \
SITE_ORIGIN_EN=https://example.com SITE_ORIGIN_RU=https://example.ru \
  pnpm deploy:yc:ru
```

## Testing

This project uses **Vitest** for unit testing and **Playwright** for End-to-End (E2E) testing.

### Running Unit Tests

To run the unit test suite:

```bash
pnpm test
```

### Running E2E Tests (Playwright)

Before running E2E tests for the first time, you must install the required browser binaries:

```bash
pnpm exec playwright install
```

Once installed, you can run the full E2E test suite in headless mode:

```bash
pnpm run test:e2e
```

**Note:** The E2E tests will automatically start the Next.js development server (`next dev`) on port 3000 if it isn't already running.

#### Debugging and UI Mode

Playwright comes with a built-in UI mode that is excellent for debugging, stepping through tests, and inspecting the DOM at every step:

```bash
pnpm run test:e2e:ui
```

This will open a browser window with the Playwright inspector, allowing you to run individual tests, see traces, and view network requests.
