# Go Secrets Sample App

The secrets sample app shows how to use the `klotho::config` annotation to store a static, read-only secret.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Run the app locally

```sh
go build
./go-secrets
```

Hit your endpoint
```sh
curl http://localhost:3000/
# > very secret%
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
klotho . --app go-secret -p aws

## Copy the secret into compiled
cp my_secret.key ./compiled

# If you didn't set the config file path to your secret, do that now 
pulumi config set go-secret:config-mySecret-FilePath my_secret.key

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s go-secret

# npm install
npm install

# Deploy
pulumi up -s go-secret

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/
# > very secret
```

## Clean Up
```sh
# Tear down when done
pulumi destroy -s go-secret
```
