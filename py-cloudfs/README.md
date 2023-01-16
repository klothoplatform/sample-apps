# Cloudfs Sample App

The py-cloudfs sample application demonstrates how to use the @klotho::persist annotation to store files. The sample application exposes one endpoint, with path / to return the content of a stored file.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)


## Run the app locally

run the terminal commands:
```sh
pip install -r requirements.txt
make run
```

```sh
# Get file data
curl http://localhost:3000/ 
# > Startup at 2023-01-12 18:30:36.455748
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
klotho . --app py-cloudfs -p aws
# Go into the compiled directory
cd compiled
# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s py-cloudfs
# npm install
npm install
# Deploy
pulumi up -s py-cloudfs
# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }
```
## Calling your service

```sh
# Get file data
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/
# > Startup at 2023-01-12 18:30:36.455748

```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s py-cloudfs
```