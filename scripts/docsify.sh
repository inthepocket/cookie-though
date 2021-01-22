#!/usr/bin/env bash
set -e

if [[ -d "doc" ]]
then
    rm -r doc
fi

mkdir doc
cp -r docsify assets docs doc
cp index.html README.md doc
