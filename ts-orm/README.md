# ORM Sample App

## Run the app locally

## Compile and Deploy with Klotho

run the terminal commands:
```sh
npm i && npx tsc
```

```sh
# Compile the app
klotho . --app sample-ts-orm

# npm install
npm --prefix ./compiled install

# Deploy
pulumi up -C ./compiled -s klotho-orm-example

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/'
# }

```
## Calling your service

### sequelize database
```sh
# Add a user 
curl -X POST  https://<...>.execute-api.us-east-1.amazonaws.com/stage/item -d '{"key": 123456, "value": 100}' -H "Content-Type: application/json"
# > success

# Get all users
curl  https://<...>.execute-api.us-east-1.amazonaws.com/stage/item/123456
# > 100
```

### typeorm database
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
