# Go Fs Sample App

The go-cloudfs sample application demonstrates how to use the `@klotho::persist` annotation to store files. The sample application exposes three endpoints to allow the ability to write, read, and delete files.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Run the app locally

```sh
go build
./go-cloudfs
```

Hit your endpoint
```sh
curl http://localhost:3000/write-file
# > wrote file%

curl http://localhost:3000/read-file
# > Hello world!%

curl http://localhost:3000/delete-file
# > %
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
klotho . --app go-cloudfs -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s go-cloudfs

# npm install
npm install

# Deploy
pulumi up -s go-cloudfs

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/write-file
# > wrote file%

curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/read-file
# > Hello world!%

curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/delete-file
# > %
```

## Clean Up
```sh
# Tear down when done
pulumi destroy -s go-cloudfs
```
