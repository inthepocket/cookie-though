#!/usr/bin/env bash
set -e

STR=$1
if [[ "$STR" == *"beta"* ]]; then
  echo "beta"
elif [[ "$STR" == *"dev"* ]]; then
  echo "dev"
else
 echo "latest"
fi
