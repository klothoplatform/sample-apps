# Media Storage Sample App

The `py-media-storage` sample application demonstrates how to use the `@klotho::persist` annotation to store media files and serve them through a `@klotho::expose` annotated applocation.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)


## Run the app locally

run the terminal commands:
```sh
make install
make run
```

```sh

# Upload an image
curl -X POST 'http://localhost:3000/v1/images/myfile.png' --form 'image=@"path/to/your/image"'
# > Uploaded image to /tmp/myfile.png

# Retrieve path for uploaded image by id
curl http://localhost:3000/v1/images/myfile.png
# > /tmp/myfile.png
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
klotho . --app py-media-storage -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s py-media-storage

# npm install
npm install

# Deploy
pulumi up -s py-media-storage

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
# Upload an image
curl -X POST https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/v1/images/myfile.png --form 'image=@"path/to/your/image"'
# > Uploaded image to /tmp/myfile.png


# Retrieve path for uploaded image by id
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/v1/images/myfile.png
# > https://338991950301py-media-storage-payloads.s3.amazonaws.com/files/tmp/myfile.png
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s py-media-storage
```
