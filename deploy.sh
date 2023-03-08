#!/bin/bash

# Run yarn build
yarn build

# Create deploy.tar with content of build folder
tar -cf deploy.tar build/ Dockerfile package.json

# Use CapRover to Deploy
caprover deploy --tarFile deploy.tar --appName ${APP_NAME} --appToken  ${APP_TOKEN} --caproverUrl ${CAPROVER_URL}

# Remove deploy.tar
rm deploy.tar