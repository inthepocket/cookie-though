#!/usr/bin/env bash
set -e

# In order to make the sed command work in OSX, add '' after -i
# However, adding it will cause GitLab CI build to fail, so remove it after testing
ENV=$1
if [[ "$ENV" == *"staging"* ]]; then
  echo "Replacing css for website"
  sed -i '' "s/\"/'/g" ./public/src.77de5100.css
  css=$(cat ./public/src.77de5100.css)
  sed -i '' "s/minified-css/$css/g" ./public/src.77de5100.js
else
  echo "Replacing css for library"
  sed -i '' "s/\"/'/g" ./dist/lib.css
  css=$(cat ./dist/lib.css)
  sed -i '' "s/minified-css/$css/g" ./dist/lib.js
fi