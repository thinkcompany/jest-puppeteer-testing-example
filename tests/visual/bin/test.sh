#!/bin/bash

echo "Installing npm dependencies..."
cd /app/tests/visual
npm install --no-audit --no-optional

echo "Running tests..."
[ ! -z "$WATCH" ] && npm run test:watch || npm run test
