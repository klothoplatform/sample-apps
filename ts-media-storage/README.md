# Media Storage Sample App

The `ts-media-storage` sample application demonstrates how to use the `@klotho::persist` annotation to store media files and serve them through a `@klotho::expose` annotated applocation.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)


## Run the app locally

run the terminal commands:
```sh
npm install
npx ts-node index.ts
```

```sh
# hitting the / endpoint
curl localhost:3000/
# > Hello from Klotho!%

# Upload an image
curl -X POST 'http://localhost:3000/v1/images/myfile' --form 'image=@"path/to/your/image"'
# > Uploaded image to /tmp/myfile.png%


# Retrieve path for uploaded image by id
curl http://localhost:3000/v1/images/myfile
# > /tmp/myfile.png%

# Delete an image by id
curl http://localhost:3000/v1/images/myfile -X DELETE
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
npx tsc && klotho . --app ts-media-storage -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-media-storage

# npm install
npm install

# Deploy
pulumi up -s ts-media-storage

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# hitting the / endpoint
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/
# > Hello from Klotho!%

# Upload an image
curl -X POST https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/v1/images/myfile --form 'image=@"path/to/your/image"'
# > Uploaded image to /tmp/myfile.png%


# Retrieve path for uploaded image by id
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/v1/images/myfile
# > https://338991950301ts-media-storage-payloads.s3.amazonaws.com/files/tmp/myfile.png%

# Delete an image by id is not supported yet in the cloud
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/v1/images/myfile -X DELETE
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s ts-media-storage
```
