# Klotho Sample Apps
This repo holds sample applications which demonstrate how to use Klotho to compile to cloud-native versions.

## Typescript
- [cloud FS](./ts-cloudfs) Using file-like API to access cloud blob storage
- [microservices](./ts-microservices) Cross execution unit function calls breaks the app into microservices while writing it like a monolith.
- [serverless](./ts-serverless-gateway) Using `express` in a Klotho-compatible way to discover HTTP routes, automatically configuring gateway resources to route directly to the execution unit.
- [graphql](./ts-graphql) How to use a framework in a Klotho-compatible way
- [websocket](./ts-websocket-gateway) :construction: Set up a websocket gateway
