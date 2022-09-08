# Embedding Assets Sample App

## Run the app locally
```sh
ts-node index.ts
```

Test APIs with:
```
$ curl localhost:3000/hello
hi%

$ curl localhost:3000/static/hello.txt
Hello Klotho!
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
tsc && klotho . --app $USER-ts-embed-assets -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s $USER-ts-embed-assets

# npm install pulumi dependencies
npm install

# Deploy
pulumi up -s $USER-ts-embed-assets

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.us-east-1.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
curl  https://<...>.execute-api.us-east-1.amazonaws.com/stage/hello
# > hi

# Get the hello.txt
curl https://<...>.execute-api.us-east-1.amazonaws.com/stage/static/hello.txt
# > Hello Klotho!

# Try to get the excluded excludeme.txt
curl https://<...>.execute-api.us-east-1.amazonaws.com/stage/static/excludeme.txt
# > {"message": "Internal server error"}
# status code: 403
```

## Clean Up
```sh
# Tear down when done
pulumi destroy -w ./compiled -s $USER-ts-embed-assets
```
