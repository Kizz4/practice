#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "package.json" ]; then
    npm create vite@latest app -- --template react-ts --yes
fi

if [ ! -f "package-lock.json" ]; then
    npm install
else
    npm ci
fi

exec npm run dev -- --host
