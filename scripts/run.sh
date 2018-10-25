#!/usr/bin/env bash

cd app/

if [ ! -d "node_modules" ] ; then
npm i
fi

cd ../
node app/main.js &
python3 receiver.py --url "http://localhost:3000/api/telemetry" &
