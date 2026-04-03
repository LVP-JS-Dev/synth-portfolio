#!/usr/bin/env bash
set -euo pipefail

require_env() {
  local name="$1"
  if [[ -z "${!name:-}" ]]; then
    echo "Missing required env var: ${name}" >&2
    exit 1
  fi
}

require_env YC_SA_KEY_JSON
require_env YC_CLOUD_ID
require_env YC_FOLDER_ID
require_env YC_BUCKET_NAME_RU
require_env SITE_ORIGIN_EN
require_env SITE_ORIGIN_RU

KEY_FILE="$(mktemp)"
cleanup() {
  rm -f "${KEY_FILE}"
}
trap cleanup EXIT
printf '%s' "${YC_SA_KEY_JSON}" > "${KEY_FILE}"

yc config set service-account-key "${KEY_FILE}"
yc config set cloud-id "${YC_CLOUD_ID}"
yc config set folder-id "${YC_FOLDER_ID}"

SITE_ORIGIN_EN="${SITE_ORIGIN_EN}" SITE_ORIGIN_RU="${SITE_ORIGIN_RU}" pnpm run build:static:ru

if [[ "${YC_BUCKET_PURGE_OK:-false}" == "true" ]]; then
  yc storage s3 rm --recursive "s3://${YC_BUCKET_NAME_RU}/"
else
  echo "Skipping bucket purge. Set YC_BUCKET_PURGE_OK=true to delete old files before upload." >&2
fi
yc storage s3 cp --recursive out-ru/ "s3://${YC_BUCKET_NAME_RU}/"
