# Embedding Assets Sample App
The `ts-docker-override` sample application demonstrates how to use custom dockerfiles and project files (package.json). The application contains three execution units; `assets-hello`, `assets-override`, and `assets-static`.

- `assets-hello`: This execution unit specifies a custom dockerfile, `hello.Dockerfile` to be used instead of the auto generated one. By specifying a `@klotho::execution_unit` annotation in the dockerfile, with the same corresponding `ID` directive, the application instructs klotho on the dockerfile to be used.
- `assets-static`: This execution unit specifies a custom dockerfile, `Dockerfile` to be used instead of the auto generated one. By specifying a `@klotho::execution_unit` annotation in the dockerfile, with the same corresponding `ID` directive, the application instructs klotho on the dockerfile to be used.
- `assets-override`: This execution unit allows klotho to autogenerate the Dockerfile. The execution unit does specify a project file `package.json` to be used instead of the root file. By having a `package.json` file in a directory closer to the `@klotho::execution_unit` annotation, the application is instructing klotho on which project file to include in its compiled output.

## Prerequisites

This guide assumes:
- pulumi is [configured with the proper AWS credentials](https://www.pulumi.com/docs/get-started/aws/begin/#configure-pulumi-to-access-your-aws-account)

## Install dependencies
```sh
npm install
```

## Run the app locally
```sh
npx ts-node index.ts
```

Test APIs with:
```
$ curl localhost:3000/hello
hi%

$ curl localhost:3000/static/hello.txt
Hello Klotho!

$ curl localhost:3000/override
docker overide%
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
npx tsc && klotho . --app $USER-ts-docker-override -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s $USER-ts-docker-override

# npm install pulumi dependencies
npm install

# Deploy
pulumi up -s $USER-ts-docker-override

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/hello
# > hi

# Get the hello.txt
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/static/hello.txt
# > Hello Klotho!

curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/override
# > docker overide%

# Try to get the excluded excludeme.txt
curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/static/excludeme.txt
# > {"message": "Internal server error"}
# status code: 403
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s $USER-ts-docker-override
```
