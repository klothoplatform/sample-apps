#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")" # cd to where we are now
cd ../../.. # get to repo root

# Default the app name to the package name. If we have jq available on PATH, prefer that to "npm pkg" — it's
# significantly faster.
if &>/dev/null jq --version ;  then
  default_app_name="$(cat package.json | jq -r .name)"
else
  default_app_name="$(npm pkg get name | sed -E 's/^"|"$//g')"
fi
if [[ -z "${KLOTHO_APP_NAME:-}" ]]; then
  export KLOTHO_APP_NAME="$default_app_name"
fi

if [[ "$KLOTHO_APP_NAME" == "$default_app_name" ]]; then
  KLOTHO_OUT_DIR=compiled
else
  KLOTHO_OUT_DIR="compiled-klotho/$KLOTHO_APP_NAME"
fi
export KLOTHO_OUT_DIR
