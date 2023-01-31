import * as express from "express";
import { createClient } from 'redis';

const setupRedisClient = async () => {
/*
* @klotho::persist {
*   id = "myRedisNode"
*   [environment_variables]
*     REDIS_NODE_HOST = "redis_node.host"
*     REDIS_NODE_PORT = "redis_node.port"
* }
*/
  const client = createClient({socket: {
    host: process.env.REDIS_NODE_HOST,
    port: parseInt(process.env.REDIS_NODE_PORT!),
    keepAlive: 5000
  }})
  await client.connect()
  return client
}


const redisClient = setupRedisClient();

const app = express();
app.use(express.json());

app.post("/user/", async (req, res) => {
  const key = req.body["firstName"];
  const value = req.body["lastName"];
  const client = await redisClient;
  await client.set(key, value);
  res.send("success");
});

app.get("/user/:firstName", async (req, res) => {
  const client = await redisClient;
  const value = await client.get(req.params['firstName']);
  res.send(value);
});


/*
 * @klotho::expose {
 *  target = "public"
 *   id = "redisApp"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`);
});
