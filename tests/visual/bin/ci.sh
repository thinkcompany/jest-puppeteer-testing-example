#!/bin/bash

echo "Installing npm dependencies..."
cd ./tests/visual
npm install --no-audit --no-optional

echo "Running tests..."
npm run test:ci
