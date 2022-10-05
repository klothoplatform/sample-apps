# Graphql Sample App

## Overview 

The `ts-graphql` sample application demonstrates how to use the `@klotho::expose` annotation can be used with graphql. The sample application defines a graphql endpoint to run queries and mutations against.

## Prerequisites

This guide assumes:
- `ts-node` and `tsc` installed globally OR `./node_modules/bin` is on the `PATH`.
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)


## Run the app locally

run the terminal commands:
```sh
npm install
npm run start
# graphql-sample-app@1.0.0 start
# ts-node src/index.ts
# Server is running on http://localhost:4000/graphql
```

Running queries through the browser
```sh
# Set a user 
mutation {
  addUser(userInput: { name: "user1"}) {
    name
  }
}

# Retrieve all users
{
  getUser {
    name
  }
}
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
tsc && klotho . --app ts-graphql -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-graphql

# npm install
npm install

# Deploy
pulumi up -s ts-graphql

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user 
curl 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/graphql' -X POST -H 'content-type: application/json' --data '{"query": "mutation {addUser(userInput: { name: \"username1 \"}) {name}}"}'
# > {"data":{"addUser":{"name":"username1 "}}}

# Get all users
curl -G 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/graphql' --data-urlencode 'query={getUser {name}}'
# > {"data":{"getUser":[{"name":"username1 "}]}}
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s ts-graphql
```
