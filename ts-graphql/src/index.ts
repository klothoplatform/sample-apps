/**
 * @keep_warm
 * @compute_size 1core_512mb
 * @topology_group api
 */

import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./userResolver";

const app = express();
bootstrap();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: false
  });

  const server = new ApolloServer({
    schema
  });

  server.applyMiddleware({ app });


  if (process.env["CLOUDCC"] != "true") {
    app.listen(4000, async () => {
      console.log(`Server is running on http://localhost:4000/graphql`)
    })
  }

}

/**
 * Connects the webapp to the Internet with an API Gateway
 * @capability https_server
 */
exports.app = app
