# Embedding Assets Sample App

## Overview 

The `ts-embed_assets` sample application demonstrates how to use the `@klotho::embed_assets` annotation to direct klotho to include static assets into an execution unit. The sample application exposes three endpoints to demonstrate the embedded assets and exlude directive on `embed_assets` the annotation.

## Prerequisites

This guide assumes:
- `ts-node` and `tsc` installed globally OR `./node_modules/bin` is on the `PATH`.
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Install dependencies
```sh
npm install
```

## Run the app locally
```sh
ts-node index.ts
```

Test APIs with:
```
$ curl localhost:3000/hello
hi%

$ curl localhost:3000/static/hello.txt
Hello Klotho!
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
tsc && klotho . --app $USER-ts-embed-assets -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s $USER-ts-embed-assets

# npm install pulumi dependencies
npm install

# Deploy
pulumi up -s $USER-ts-embed-assets

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
curl  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/hello
# > hi

# Get the hello.txt
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/static/hello.txt
# > Hello Klotho!

# Try to get the excluded excludeme.txt
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/static/excludeme.txt
# > {"message": "Internal server error"}
# status code: 403
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s $USER-ts-embed-assets
```
