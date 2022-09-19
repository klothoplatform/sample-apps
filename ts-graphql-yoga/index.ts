import * as express from "express";
import { createServer } from "@graphql-yoga/node";

// Create a GraphQL Yoga Server with a simple schema
const graphQLServer = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello from Klotho!',
      },
    },
  },
});

// Create an Express app that will be used to serve a GraphQL Yoga server as middleware
const app = express();

// Bind GraphQL Yoga to '/graphql' route as an Express middleware
app.use('/graphql', graphQLServer)

// Use the Klotho expose annotation to expose the Klotho-compiled version of this application to the public
// when deployed to a cloud environment.

/* @klotho::expose {
 *  target = "public"
 *  id = "graphql-yoga-gateway"
 * }
 */
app.listen(3000, async () => {
  console.log(`Running GraphQL Yoga API Server at http://localhost:3000/graphql`)
});
