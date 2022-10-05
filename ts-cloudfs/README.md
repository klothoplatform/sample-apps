# Cloud FS Sample App

## Overview 

The `ts-cloudfs` sample application demonstrates how to use the `@klotho::persist` annotation to store secrets. The sample application exposes one endpoint, with path `/` to return the content of the stored secret.

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
$ curl localhost:3000/
Startup at 2022-10-04T14:58:00.349Z%
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
tsc && klotho . --app ts-cloudfs -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-cloudfs

# npm install pulumi dependencies
npm install

# Deploy
pulumi up -s ts-cloudfs

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
curl  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/
# > Startup at 2022-10-04T18:29:31.920Z%
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s ts-cloudfs
```
