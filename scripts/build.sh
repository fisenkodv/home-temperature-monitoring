#!/usr/bin/env bash

cd $(pwd)/$(dirname "$0")/../

printf "Building App...\n\n"
rm -r build/app
mkdir -p build/app
cd src/server
npm run prestart:prod
mv dist/* ../../build/app
cd ../..

printf "Building UI...\n\n"
rm -r build/ui
mkdir -p build/ui
cd src/client
npm run build --prod
mv dist/client/* ../../build/ui
cd ../..