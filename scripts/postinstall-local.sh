#!/usr/bin/env bash
set -e

function precommit() {
  if command -v pre-commit >/dev/null; then
    if ! grep -q "https://pre-commit.com" "$(dirname "$0")/../.git/hooks/pre-commit"; then
      echo "[postinstall-local.sh] Installing git hooks (pre-commit)"
      pre-commit install
      pre-commit install --hook-type pre-push
    fi
  else
    read -rp "Install pre-commit and its hooks? " installPreCommit
    case "$installPreCommit" in
    y | Y | yes | YES)
      brew install pre-commit
      echo "[postinstall-local.sh] Installing git hooks (pre-commit)"
      pre-commit install
      pre-commit install --hook-type pre-push
      ;;
    *) ;;
    esac
  fi
}

function main() {
  if [ "$SYSTEM" == "build" ]; then
    echo ""
    echo "[postinstall-local.sh] CI detected. Skipping..."
    echo ""
    exit 0
  fi

  precommit
}

main
