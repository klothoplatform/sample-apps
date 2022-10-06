# Sequelize Sample App

The sequelize sample app shows how to use the `klotho::persist` annotation with the [sequelize](https://sequelize.org/) client.

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
curl http://localhost:3000/item -X POST -d '{"key": "test_key", "value": "test_value"}' -H "Content-Type: application/json"
# > success%

curl http://localhost:3000/item/test_key
# > test_value%
```



## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
npx tsc && klotho . --app ts-sequelize -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-sequelize

# Set username and password
pulumi config set ts-sequelize:sequelizedb_username <USERNAME> -s ts-sequelize
pulumi config set --secret ts-sequelize:sequelizedb_password <PASSWORD> -s ts-sequelize



# npm install
npm install

# Deploy
pulumi up -s ts-sequelize

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
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
