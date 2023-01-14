# Redis Sample App

The redis sample app shows how to use the `klotho::persist` annotation on a node.js redis client to store data.


## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Run the app locally

To install redis locally follow the instructions on the official redis [getting started page](https://redis.io/docs/getting-started/)

```sh
make install
make run
```

Hit your endpoints
```sh
curl -X POST http://localhost:3000/user -d '{"firstName": "john", "lastName": "doe"}' -H "Content-Type: application/json"
# > success%

curl http://localhost:3000/user/john
# > doe%
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
klotho . --app py-redis -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s py-redis

# npm install
npm install

# Deploy
pulumi up -s py-redis

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user 
curl -X POST  https://<...>.execute-api.us-east-1.amazonaws.com/stage/user -d '{"firstName": "john", "lastName": "doe"}' -H "Content-Type: application/json"
# > success

# Get a users last name
curl https://<...>.execute-api.us-east-1.amazonaws.com/stage/user/john
# > doe
```

## Clean Up
```sh
# Tear down when done
pulumi destroy -s py-redis
```
