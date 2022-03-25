/**
 * @keep_warm
 * @compute_size 1core_512mb
 * @topology_group api
 */

import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./userResolver";

const app = setupApp();

async function setupApp() {
  // Note: this needs to be the same name as what is exported for klotho to figure out what to import.
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: false
  });

  const server = new ApolloServer({
    schema
  });

  server.applyMiddleware({ app });


  /**
   * @capability https_server
   */
  app.listen(4000, async () => {
    console.log(`Server is running on http://localhost:4000/graphql`)
  })

  return app
}

exports.app = app
