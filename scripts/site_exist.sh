#!/usr/bin/env bash
set -e

if [ -z "$(ls -A _site)" ]; then
  npm run build:sass -s && npm run build:jekyll
else
  echo "Site folder already exists!"
fi