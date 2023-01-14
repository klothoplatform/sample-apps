# Secrets Sample App

The secrets sample app shows how to use the `klotho::persist` annotation to store secrets.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Run the app locally

```sh
make install
make run
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
klotho . --app py-secrets -p aws

## Copy the secret into compiled
cp my_secret.key ./compiled

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s py-secrets

# npm install
npm install

# Deploy
pulumi up -s py-secrets

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
pulumi destroy -s py-secrets
```
