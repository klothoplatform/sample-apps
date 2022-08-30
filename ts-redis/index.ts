/**
 * @klotho::execution_unit {
 *  id = "redis-main"
 * }
 */

import * as express from "express";
import { createClient } from 'redis';

/**
* @klotho::persist {
*   id = "redis"
* }
*/
const client = createClient({});

const app = express();
app.use(express.json());

app.post("/user/", async (req, res) => {
  const key = req.body["firstName"];
  const value = req.body["lastName"];
  await client.connect();
  await client.set(key, value);
  await client.quit()
  res.send("success");
});

app.get("/user/:firstName", async (req, res) => {
  await client.connect();
  const value = await client.get(req.params['firstName']);
  await client.quit()
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
