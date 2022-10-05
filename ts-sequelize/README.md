# Sequelize Sample App

## Overview

The sequelize sample app shows how to use the `klotho::persist` annotation with the sequelize client.

## Prerequisites

This guide assumes:
- `ts-node` and `tsc` installed globally OR `./node_modules/bin` is on the `PATH`.
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Run the app locally

```sh
npm i 
npx ts-node index.ts
```

Hit your endpoints
```sh
curl http://localhost:3000/item -X POST -d '{"key": "test_key", "value": "test_value"}' -H "Content-Type: application/json"
# > success%

curl http://localhost:3000/item/test_key
# > test_value%
```



## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
tsc && klotho . --app ts-sequelize -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-sequelize

# npm install
npm install

# Deploy
pulumi up -s ts-sequelize

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

## Compile and Deploy with Klotho

run the terminal commands:
```sh
npm i && npx tsc
```

```sh
# Compile the app
klotho . --app sample-ts-sequelize

# npm install
npm --prefix ./compiled install

# Set username and password
pulumi config set ts-sequelize:sequelizedb_username <USERNAME> -s sample-ts-sequelize
pulumi config set --secret ts-sequelize:sequelizedb_password <PASSWORD> -s sample-ts-sequelize


# Deploy
pulumi up -s sample-ts-sequelize

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user 
curl -X POST  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/item -d '{"key": "test_key", "value": "test_value"}' -H "Content-Type: application/json"
# > success

# Get all users
curl  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/item/test_key
# > 100
```
## Clean Up
From within the compiled directory
```sh
# Tear down when done
pulumi destroy -s ts-sequelize
```
