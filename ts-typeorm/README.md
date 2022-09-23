# TypeORM Sample App

## Run the app locally

## Compile and Deploy with Klotho

run the terminal commands:
```sh
npm i && npx tsc
```

```sh
# Compile the app
klotho . --app sample-ts-typeorm

# npm install
npm --prefix ./compiled install

# Set username and password
pulumi config set sample-ts-typeorm:typeormdb_username -C ./compiled -s sample-ts-typeorm
pulumi config set sample-ts-typeorm:typeormdb_password -C ./compiled -s sample-ts-typeorm

# Deploy
pulumi up -C ./compiled -s sample-ts-typeorm

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user 
curl -X POST  https://<...>.execute-api.us-east-1.amazonaws.com/stage/user -d '{"firstName": "john", "lastName": "doe"}' -H "Content-Type: application/json"
# > success

# Get all users
curl  https://<...>.execute-api.us-east-1.amazonaws.com/stage/user/john
# > {"id":8,"firstName":"john","lastName":"doe"}
```

## Clean Up
```sh
# Tear down when done
pulumi destroy -C ./compiled -s klotho-orm-example
```
