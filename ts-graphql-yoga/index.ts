/* @klotho::execution_unit {
 *   id = "graphql-yoga-api"
 * }
 */
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

// Create and export an Express app that can be used to expose a GraphQL Yoga app with Klotho's 'expose' capability
const app = express();

// Bind GraphQL Yoga to '/graphql' endpoint
app.use('/graphql', graphQLServer)

// Use the Klotho expose capability to expose the Klotho-compiled version of this application to the public

/* @klotho::expose {
 *  target = "public"
 *  id = "graphql-yoga-gateway"
 * }
 */
app.listen(4000, async () => {
  console.log(`Running GraphQL Yoga API Server at http://localhost:4000/graphql`)
});
