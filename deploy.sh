#!/bin/bash

APP_NAME="my-app"
APP_TOKEN="45a0fc928aa4c3756251b81709da45abb4183c53a0bab31976bf79f5a2a47a9a"
CAPROVER_URL="https://captain.example.com"

# Run yarn build
yarn build

# Create deploy.tar with content of build folder
tar -cf deploy.tar build/ Dockerfile package.json

# Use CapRover to Deploy
caprover deploy --tarFile deploy.tar --appName ${APP_NAME} --appToken  ${APP_TOKEN} --caproverUrl ${CAPROVER_URL}

# Remove deploy.tar
rm deploy.tar