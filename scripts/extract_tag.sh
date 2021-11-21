#!/usr/bin/env bash
set -e

STR=$1
if [[ "$STR" == *"beta"* ]]; then
  echo "beta"
elif [[ "$STR" == *"dev"* ]]; then
  echo "dev"
elif [[ "$STR" == *"rc"* ]]; then
  echo "rc"
else
 echo "latest"
fi
