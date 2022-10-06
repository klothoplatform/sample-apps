# TypeORM Sample App

The typeorm sample app shows how to use the `klotho::persist` annotation with the [TypeORM](https://typeorm.io/) Library.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Run the app locally

```sh
npm i 
npx ts-node index.ts
```

Hit your endpoints
```sh
curl http://localhost:3000/user -d '{"firstName": "john", "lastName": "doe"}' -H "Content-Type: application/json"
# > success%

curl http://localhost:3000/user/john
# > {"id":1,"firstName":"john","lastName":"doe"}%
```



## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
npx tsc && klotho . --app ts-typeorm -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-typeorm


# Set username and password
pulumi config set ts-typeorm:typeormdb_username <USERNAME> -s ts-typeorm
pulumi config set --secret ts-typeorm:typeormdb_password <PASSWORD> -s ts-typeorm



# npm install
npm install

# Deploy
pulumi up -s ts-typeorm

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }
```

## Calling your service

```sh
# Add a user 
curl -X POST  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/user -d '{"firstName": "john", "lastName": "doe"}' -H "Content-Type: application/json"
# > success

# Get all users
curl  https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/user/john
# > {"id":8,"firstName":"john","lastName":"doe"}
```

## Clean Up
from the compiled directory
```sh
# Tear down when done
pulumi destroy -s ts-typeorm
```
