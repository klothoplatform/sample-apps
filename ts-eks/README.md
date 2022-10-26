# EKS Sample App

The `ts-eks` sample application demonstrates how to use the `@klotho::exec_unit` annotation to run nodes on eks.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)


## Run the app locally

run the terminal commands:
```sh
npm install
npx ts-node index.ts
```

```sh
# Add a user
 curl localhost:3000/users/john -X PUT
# > Created john%

# Get all users
curl localhost:3000/users
# > ["john"]%
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
npx tsc && klotho . --app ts-eks -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-eks

# npm install
npm install

# Deploy
pulumi up -s ts-eks

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/users/john -X PUT
# > Created john%

# Get all users
curl localhost:3000/users
# > ["john"]%
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s ts-eks
```
