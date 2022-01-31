# Graphql Sample App

## Run the app locally

run the terminal commands:
```sh
cd graphql-sample-app
npm install
npm run start
# graphql-sample-app@1.0.0 start
# ts-node src/index.ts
# Server is running on http://localhost:4000/graphql
```

Running queries through the browser
```sh
# Set a user 
mutation {
  addUser(userInput: { name: "user1"}) {
    name
  }
}

# Retrieve all users
{
  getUser {
    name
  }
}
```

## Compile and Deploy with Cloudcc

run the terminal commands:
```sh
# Compile the app
cloudcc compile \
    --runenv AWS \
    --appname graphql-app-<user> \
    --out-dir compiled \
    ./dist/index.js

# npm install
npm --prefix ./compiled install

# Deploy
cloudcc up -w ./compiled -s cloudcc-webapi-example

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Add a user 
curl 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/graphql' -X POST -H 'content-type: application/json' --data '{"query": "mutation {addUser(userInput: { name: \"username1 \"}) {name}}"}'
# > {"data":{"addUser":{"name":"username1 "}}}

# Get all users
curl -G 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/graphql' --data-urlencode 'query={getUser {name}}'
# > {"data":{"getUser":[{"name":"username1 "}]}}
```

## Clean Up
```sh
# Tear down when done
cloudcc destroy -w ./compiled -s cloudcc-webapi-example
```