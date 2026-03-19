#!/usr/bin/env bash
set -euo pipefail

DIST_TYPES_DIR="dist/types"

if [[ -d "$DIST_TYPES_DIR" ]]; then
  rm -r "$DIST_TYPES_DIR"
fi

npm run types:lib

# Keep only lib.d.ts and types.d.ts in dist/types.
shopt -s extglob dotglob nullglob
rm -rf "$DIST_TYPES_DIR"/!(lib.d.ts|types.d.ts)
shopt -u extglob dotglob nullglob

