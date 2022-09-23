/**
 * @klotho::execution_unit {
 *  id = "sequelize-main"
 * }
 */

import * as express from "express";
import {write, find} from './typeorm/logic'


const app = express();
app.use(express.json());

app.post("/user/", async (req, res) => {
  const key = req.body["firstName"];
  const value = req.body["lastName"];

  await write(key, value);
  res.send("success");
});

app.get("/user/:firstName", async (req, res) => {
  const value = await find(req.params["firstName"]);
  res.send(value);
});


/*
 * @klotho::expose {
 *  target = "public"
 *   id = "typeOrmApp"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`);
});
