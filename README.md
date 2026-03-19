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

### Agent content ops

The CMS content directory (`content/`) exposes agent-native operations via `app/api/content-ops.*`.

In development, set `CONTENT_OPS_TOKEN` and pass it as a bearer token. You can bypass auth in local-only experiments with `CONTENT_OPS_ALLOW_INSECURE_DEV=true`.

```bash
# list available files
curl 'http://localhost:3000/api/content-ops?op=list' \
  -H 'Authorization: Bearer <CONTENT_OPS_TOKEN>'

# get operation/context contract
curl 'http://localhost:3000/api/content-ops?op=context' \
  -H 'Authorization: Bearer <CONTENT_OPS_TOKEN>'

# read a file
curl 'http://localhost:3000/api/content-ops?op=read&path=pages/home.yaml' \
  -H 'Authorization: Bearer <CONTENT_OPS_TOKEN>'

# write/update a file
curl -X POST http://localhost:3000/api/content-ops \
  -H 'Authorization: Bearer <CONTENT_OPS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"op":"upsert","path":"pages/new.yaml","content":"title: New"}'

# delete a file
curl -X DELETE http://localhost:3000/api/content-ops \
  -H 'Authorization: Bearer <CONTENT_OPS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"op":"delete","path":"pages/new.yaml"}'
```

### CI
Runs `typecheck`, `lint`, `test`, `build` on every push/PR.
