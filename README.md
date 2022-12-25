# Klotho Sample Apps
This repo holds sample applications which demonstrate how to use Klotho to compile to cloud-native versions.

## Typescript
- [ES6 Map Persistence](./ts-cloudfs) Using file-like API to access cloud blob storage
- [Serverless](./ts-serverless-gateway) Shows how to add the `klotho::expose` capability to an [`express`](https://www.npmjs.com/package/express) server to discover HTTP routes, automatically configuring gateway resources to route directly to the execution unit
- [Embed Assets](./ts-embed_assets) Include non-code assets to an execution unit
- [Secret handling](./ts-secrets) Shows how to use `klotho::persist` for secret handling
- [Yoga GraphQL Server](./ts-graphql) Add the `klotho::expose` capability to an `express` app that uses [`type-graphql`](https://www.npmjs.com/package/type-graphql) +Apollo to expose a GraphQL server to the internet with an API gateway
- [Media Storage](./ts-media-storage) Uses a combination of the `klotho::persist` capability, storing images in blob storage, and using `klotho::persist` on an ES6 map for storing image metadata using a key-value store
- [Sequelize](./ts-sequelize) Shows how to add the `klotho::persist` capability to a [`sequelize`](https://www.npmjs.com/package/sequelize) instance for relational data persistence.
- [TypeORM](./ts-typeorm) Shows how to add the `klotho::persist` capability to a [`typeorm`](https://www.npmjs.com/package/typeorm) instance for relational data persistence.
- [Discord Bot](./ts-discordjs) A sample Discord Bot
- [NestJS + Sequelize](./ts-nestjs-sequelize) Sample REST API for managing users built using the NestJS web framework and Sequelize ORM.
- [NextJS + TypeORM](./ts-nextjs-typeorm) Simple NextJS and TypeORM blogging site that allows visitors to read or submit markdown-formatted blog posts.
- [Redis](./ts-redis-cluster) Redis sample app shows how to use the `klotho::persist` capability on a node.js redis client to store data.
- [Redis Cluster](./ts-redis-cluster) Redis cluster sample app shows how to use the `klotho::persist` capability on a node.js redis client to store data.
