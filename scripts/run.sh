#!/usr/bin/env bash

cd app/

dotnet Monitoring.Api.dll &
cd ..
sleep 10s
python3 receiver.py --url "http://localhost:5000/api/measurements" &
