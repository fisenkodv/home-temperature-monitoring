#!/usr/bin/env bash

cd $(pwd)/$(dirname "$0")/../

printf "Cleaning up...\n\n"
rm -r build/

printf "Building docker image...\n\n"
docker build --rm --tag fisenkodv/monitoring:latest --file Dockerfile .
docker push fisenkodv/monitoring:latest

printf "Copying scripts...\n\n"
mkdir -p build
cp src/Monitoring.Receiver/receiver.py build/
cp scripts/run.sh build/