#!/usr/bin/env bash
set -e

if [[ -d "dist/types" ]]
then
    rm -r dist/types
fi

mkdir dist/types
npm run types
mv src/lib.d.ts src/types.d.ts dist/types
