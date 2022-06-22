/**
 * @klotho::execution_unit {
 *  name = "sequelize-main"
 * }
 */

import * as express from 'express';
import { set, get } from './model';


const app = express()
app.use(express.json())


app.post('/item/', async (req, res) => {
  var key = req.body["key"]
  var value = req.body["value"]

  await set(key, value)
  res.send("success")
});


app.get("/item/:key", async (req, res) => {
  let value = await get(req.params["key"]);
  res.send(value);
});

/* 
 * @klotho::expose {
 *  target = "public"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`)
})

