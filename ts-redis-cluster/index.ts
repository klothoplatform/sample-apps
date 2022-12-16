import * as express from "express";
import { createCluster } from 'redis';

const setupRedisClient = async () => {
  let port: number | undefined = undefined
  if (process.env.REDIS_PORT !== undefined) {
    port = parseInt(process.env.REDIS_PORT)
    console.log('using redis port: ', port)
  }
  /**
  * @klotho::persist {
  *   id = "redis"
  * }
  */
  const client = createCluster({
    rootNodes:[
      {
        url: 'redis://127.0.0.1:8001'
      },
      {
        url: 'redis://127.0.0.1:8002'
      },
      {
        url: 'redis://127.0.0.1:8003'
      }
    ],
  })
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
