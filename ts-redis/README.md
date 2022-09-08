# Redis Sample App

## Run the app locally

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
tsc && klotho ./dist --app sample-ts-redis

# npm install
npm --prefix ./compiled install

# Deploy
pulumi up -w ./compiled -s klotho-redis-example

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/'
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
pulumi destroy -w ./compiled -s klotho-redis-example
```
