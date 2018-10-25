#!/usr/bin/env bash

cd $(pwd)/$(dirname "$0")/../

printf "Cleaning up...\n\n"
rm -r build/

printf "Building backend...\n\n"
mkdir -p build/app
cd src/server
npm run prestart:prod
cp package.json dist/
mv dist/* ../../build/app
cd ../..

printf "Building frontend...\n\n"
mkdir -p build/app/public
cd src/client
ng build --prod
mv dist/client/* ../../build/app/public
cd ../..

printf "Copying scripts...\n\n"
cp src/receiver/receiver.py build/
cp scripts/run.sh build/