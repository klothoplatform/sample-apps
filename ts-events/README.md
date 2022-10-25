# Events Sample App

The `ts-events` sample application demonstrates how to use the `@klotho::pubsub` annotation to achieve an event driven architecture. The sample application exposes one endpoint to demonstrate how using the `pubsub` annotation with EventEmitter can trigger subsequent events.
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
$ curl -X POST localhost:3000/hello/user
```

```
$ curl localhost:3000/hello/user
# > user%
```

You will see logged output on your server:
```
got { params: { user: 'user' } }
hello user
goodbye user
...
!
```

## Compile and Deploy with Klotho

run the terminal commands:
```sh
# Compile the app
npx tsc && klotho . --app ts-events -p aws

# Go into the compiled directory
cd compiled

# If you didn't set the aws region as indicated in the compiler output, do that now
pulumi config set aws:region YOUR_REGION -s ts-events

# npm install pulumi dependencies
npm install

# Deploy
pulumi up -s ts-events

# Outputs: {
#   apiUrl: 'https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/'
# }

```
## Calling your service

```sh
curl -X POST https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/hello/user
# >
```

You will see 3 different cloudwatch log groups specifying the sequence of events in the cloud deployed application.

```sh
$ curl https://<...>.execute-api.<YOUR_REGION>.amazonaws.com/stage/hello/user
# > user%
```

/aws/lambda/ts-events-events-api
```
2022-10-04T13:51:18.929-05:00	2022-10-04T18:51:18.929Z 027bcfcc-ae5f-467d-b680-389e5a23e6a5 INFO got { params: { user: 'user' } }
2022-10-04T13:51:18.959-05:00	2022-10-04T18:51:18.959Z 027bcfcc-ae5f-467d-b680-389e5a23e6a5 INFO awaiting 1 promises before exiting
2022-10-04T13:51:19.271-05:00	2022-10-04T18:51:19.270Z 027bcfcc-ae5f-467d-b680-389e5a23e6a5 INFO Sent message { event: 'hello', topic: 'ts-events_myEmitter_hello', arn: 'arn:aws:sns:<YOUR_REGION>:<YOUR_ACCOUNT_ID>:ts-events_myEmitter_hello', payloadId: 'emitter-js_myEmitter/hello/39b3b8b5-97e6-4595-a5f4-efd99ae2ddf4', messageId: 'eebe29b0-a846-5d3d-8900-72062aa173f6' }
```
/aws/lambda/ts-events-events-hello
```
2022-10-04T16:24:54.219-05:00	2022-10-04T21:24:54.219Z 40389af2-db9f-4c4e-bfb5-52257e70895b INFO hello user
2022-10-04T16:24:54.220-05:00	2022-10-04T21:24:54.220Z 40389af2-db9f-4c4e-bfb5-52257e70895b INFO awaiting 2 promises before exiting
2022-10-04T16:24:55.221-05:00	2022-10-04T21:24:55.220Z 40389af2-db9f-4c4e-bfb5-52257e70895b INFO goodbye user
2022-10-04T16:24:55.222-05:00	2022-10-04T21:24:55.222Z 40389af2-db9f-4c4e-bfb5-52257e70895b INFO awaiting 1 promises before exiting
2022-10-04T16:24:55.319-05:00	2022-10-04T21:24:55.319Z 40389af2-db9f-4c4e-bfb5-52257e70895b INFO Sent message { event: 'other', topic: 'ts-events_myEmitter_other', arn: 'arn:aws:sns:<YOUR_REGION>:<YOUR_ACCOUNT_ID>:ts-events_myEmitter_other', payloadId: 'emitter-js_MyEmitter/other/db7b42bb-ca12-4eeb-9d1b-e648fc8483e9', messageId: '068d6783-83c5-5bde-934d-3c3525223796' }

2022-10-04T16:24:55.320-05:00	END RequestId: 40389af2-db9f-4c4e-bfb5-52257e70895b
```
/aws/lambda/ts-events-events-other
```
2022-10-04T21:24:57.642Z 63ac468b-6205-4838-9cfb-210ae4fd93b1 INFO ...
2022-10-04T16:24:57.643-05:00	2022-10-04T21:24:57.643Z 63ac468b-6205-4838-9cfb-210ae4fd93b1 INFO awaiting 2 promises before exiting
2022-10-04T16:25:00.248-05:00	2022-10-04T21:25:00.248Z 63ac468b-6205-4838-9cfb-210ae4fd93b1 INFO !
```

## Clean Up
From the compiled directory still,
```sh
# Tear down when done
pulumi destroy -s ts-events
```
