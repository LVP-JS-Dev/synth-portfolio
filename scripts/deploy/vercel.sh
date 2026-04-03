#!/usr/bin/env bash
set -euo pipefail

require_env() {
  local name="$1"
  if [[ -z "${!name:-}" ]]; then
    echo "Missing required env var: ${name}" >&2
    exit 1
  fi
}

require_env VERCEL_TOKEN
require_env VERCEL_ORG_ID
require_env VERCEL_PROJECT_ID
require_env SITE_ORIGIN_EN
require_env SITE_ORIGIN_RU

export STATIC_EXPORT="true"
export FORCE_LOCALE="${FORCE_LOCALE:-en}"

VERCEL_CLI_VERSION="${VERCEL_CLI_VERSION:-42.3.0}"

pnpm dlx "vercel@${VERCEL_CLI_VERSION}" pull --yes --environment=production
pnpm dlx "vercel@${VERCEL_CLI_VERSION}" build --prod

rm -rf out/admin .vercel/output/static/admin || true

STATIC_EXPORT="${STATIC_EXPORT}" \
FORCE_LOCALE="${FORCE_LOCALE}" \
SITE_ORIGIN_EN="${SITE_ORIGIN_EN}" \
SITE_ORIGIN_RU="${SITE_ORIGIN_RU}" \
  pnpm dlx "vercel@${VERCEL_CLI_VERSION}" deploy --prebuilt --prod
