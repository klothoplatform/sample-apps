# Microservices Sample App

The py-microservices sample application demonstrates how to create a simple microservice to persist data to a key-value store using the `@klotho::expose` and `@klotho::persist` annotations.

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
curl http://localhost:3000/users/john -X POST
# > Created john

# Get user
curl http://localhost:3000/users/john
# > {
# >  "id": "john",
# >  "last_accessed": "2023-01-12T22:29:53"
# > }
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
klotho . --app py-microservices -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s py-microservices

# npm install
npm install

# Deploy
pulumi up -s py-microservices

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/users/john -X POST
# > Created john

# Get user
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/users/john
# > {
# >  "id": "john",
# >  "last_accessed": "2023-01-12T22:29:53"
# > }
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s py-microservices
```