# Graphql Yoga Sample App

## Overview 

The `ts-graphql-yoga` sample application demonstrates how to use the `@klotho::expose` annotation can be used with a graphql-yoga server. The sample application defines a graphql endpoint to run queries and mutations against.

## Prerequisites

This guide assumes:
- `ts-node` and `tsc` installed globally OR `./node_modules/bin` is on the `PATH`.
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)


## Run the app locally

run the terminal commands:
```sh
npm install
npx ts-node index.ts
# graphql-sample-app@1.0.0 start
# ts-node src/index.ts
# Server is running on http://localhost:3000/graphql
```

Running queries through the browser
```sh
# hello
  query {
    hello
  }

# > {
# >  "data": {
# >    "hello": "Hello from Klotho!"
# >  }
# > }
```

## Compile and Deploy with Cloudcc

run the terminal commands:
```sh
# Compile the app
tsc && klotho . --app ts-graphql-yoga -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-graphql-yoga

# npm install
npm install

# Deploy
pulumi up -s ts-graphql-yoga

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user 
curl 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/graphql' -X POST -H 'content-type: application/json' --data '{"query": "query {hello}"}'
# > {"data":{"hello":"Hello from Klotho!"}}%
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s ts-graphql-yoga
```
