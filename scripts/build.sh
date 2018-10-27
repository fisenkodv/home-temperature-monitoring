#!/usr/bin/env bash

cd $(pwd)/$(dirname "$0")/../

printf "Cleaning up...\n\n"
rm -r build/

printf "Building backend...\n\n"
mkdir -p build/app
export ASPNETCORE_ENVIRONMENT=Production
dotnet publish src/Monitoring.Web/Monitoring.Api/Monitoring.Api.csproj -o ../../../build/app -c Release -r linux-arm

printf "Building frontend...\n\n"
mkdir -p build/app/wwwroot
cd src/Monitoring.Client
ng build --prod --aot --extract-licenses false
mv dist/client/* ../../build/app/wwwroot
cd ../..

printf "Copying scripts...\n\n"
cp src/Monitoring.Receiver/receiver.py build/
cp scripts/run.sh build/