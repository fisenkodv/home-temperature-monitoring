#!/usr/bin/env bash

cd app/

python3 receiver.py --url "http://192.168.1.2:5050/api/measurements" &
