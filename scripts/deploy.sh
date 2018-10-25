#!/usr/bin/env bash

cd $(pwd)/$(dirname "$0")/../

printf "Copying build...\n\n"
scp -r build/* pi@192.168.1.170:/home/pi/monitoring