# ts-media-storage

A Node/Express application written in TypeScript that exposes an API for reading and writing media files using a backend data store.

---

## Table of Contents
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [How Klotho Capabilities Are Used](#how-klotho-capabilities-are-used)


## Getting Started

### Running Locally
1. Install dependencies by running `npm install`
2. Start the application by running `npm start`

The application will be listening on  http://127.0.0.1:3000.

### Compiling with Klotho
1. Transpile the TypeScript code to JavaScript by executing `tsc`.
2. Execute Klotho against the output of tsc ([./dist](./dist) by default).
  ```shell
  klotho ./dist --app ts-media-storage
  ```

  This process is also implemented by the project's `compile` script:
  ```shell
  npm run-script compile
  ```

### Deploying to AWS With Pulumi
#### Prerequisites
1. Set up your AWS CLI credentials.
2. Install the Pulumi CLI and log in.
3. Compile the application with Klotho.

#### Steps
1. Navigate to the compiled output directory ([./compiled](./compiled) by default).
2. Install the Pulumi deployment application's dependencies by executing `npm install`.
3. Set the AWS deployment region using the pulumi CLI.
   ```shell
   pulumi config set aws:region us-east-1
   ```
4. Deploy the application by running `Pulumi up` and following the CLI prompts.

## API Endpoints

### `GET /`
Simple health-check route that can be used to verify that the application is reachable.

### `POST /v1/media/{id}`
Stores the supplied file and makes it available for retrieval using the supplied `id` value.

This endpoint accepts a body of type `multipart/form-data`
and a single form field `media_file`, which should contain binary content of the media file to be stored.

### `GET /v1/media/{id}`
Returns the file content associated with the supplied `id`.

### `GET /v1/metadata/{id}`
Returns the path at which the file associated with the supplied `id` is stored.
This may be a local file path or an S3 url depending on where the application is being run.

## How Klotho Capabilities Are Used

### Execution Unit 

Used to declare that `index.ts` should be deployed packaged for execution on the specified or resolved compute platform.

### Expose

Exposes the Express app declared in `index.ts` to the internet via an API Gateway.

### Persist - Filesystem

Swaps out the local `fs/promises` implementation with a cloud-enabled alternative to enable persistent storage
of media files in the cloud.

### Persist - Key-Value

Swaps out the local `Map` implementation with a cloud-enabled alternative to enable persistent storage
of media file metadata in the cloud.
