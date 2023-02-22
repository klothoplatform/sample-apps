# Go Expose Sample App

The go-expose sample application demonstrates how to use the `@klotho::expose` annotation to create a public, reachable API endpoint.

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
curl http://localhost:3000/
# > Hello%

curl http://localhost:3000/expose
# > Hello From Klotho Expose!%

curl http://localhost:3000/extra
# > Extra routes%

curl http://localhost:3000/extra/one
# > Extra route one%

curl http://localhost:3000/extra/two
# > Extra route two%
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
klotho . --app go-expose -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s go-expose

# npm install
npm install

# Deploy
pulumi up -s go-expose

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/
# > Hello%

curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/expose
# > Hello From Klotho Expose!%

curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/extra
# > Extra routes%

curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/extra/one
# > Extra route one%

curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/extra/two
# > Extra route two%
```
## Clean Up
```sh
# Tear down when done
pulumi destroy -s go-cloudfs
```
