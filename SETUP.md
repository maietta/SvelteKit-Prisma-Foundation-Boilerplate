# Basic setup

If you don't already have Yarn globally installed, you can install it with npm:

`npm install -g yarn`

Then, install the dependencies:

`yarn install`

## Running the app

To run the app, run the following command:

`yarn dev`

## Deploying to CapRover (NEW METHOD)

Done only once per CapRover server:

You need to authenticate your CapRover instance with GitHub's Container Registry, as CapRover will fetch build docker images from this registry.

Visit https://github.com/settings/tokens/new and create a new Token.
    Specify a note/name of this token, i.e., "CapRover
    Expiration: Never
    Selected Scopes: read:packages

This newly generated token is your password to the Github Container Registry.

Visit CapRover's UI and select Cluster. Add a remote registry.
    Username: <githubuser>
    Password: <generatedtoken>
    Domain: ghcr.io
    Image Prefix <leaveblank>

Save and Update.

Add a Github APP_NAME, APP_TOKEN and CAPROVER_SERVER secret to your repo as required for deployments as normal.

## Using Prisma

You can maintain a local database for your project and replcate changes to production with Prisma, automagically. This is an advanced feature that will require further documation later.

If using Prisma in your workflow, you can deploy a local database with `docker compose up -f docker-stack.yml`.

The DATABASE_URL secret will need to be available in .env locally but also a production secret set in Github Repo. The workflow lines for this enviornment variable will need to be uncommented accordingly as well as the command in the steps to run the prisma migrate.
