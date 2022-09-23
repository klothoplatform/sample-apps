# ORM Sample App

## Run the app locally

## Compile and Deploy with Klotho

run the terminal commands:
```sh
npm i && npx tsc
```

```sh
# Compile the app
klotho . --app sample-ts-sequelize

# npm install
npm --prefix ./compiled install

# Set username and password
pulumi config set sample-ts-sequelize:typeormdb_username
pulumi config set sample-ts-sequelize:typeormdb_password


# Deploy
pulumi up -C ./compiled -s sample-ts-sequelize

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user 
curl -X POST  https://<...>.execute-api.us-east-1.amazonaws.com/stage/item -d '{"key": 123456, "value": 100}' -H "Content-Type: application/json"
# > success

# Get all users
curl  https://<...>.execute-api.us-east-1.amazonaws.com/stage/item/123456
# > 100
```
## Clean Up
```sh
# Tear down when done
pulumi destroy -C ./compiled -s klotho-orm-example
```
