/**
 * @klotho::execution_unit {
 *  id = "sequelize-main"
 * }
 */

import * as express from "express";
import { set, get } from "./sequelize/model";
import {write, find} from './typeorm/logic'


const app = express();
app.use(express.json());

app.post("/item/", async (req, res) => {
  const key = req.body["key"];
  const value = req.body["value"];

  await set(key, value);
  res.send("success");
});

app.get("/item/:key", async (req, res) => {
  const value = await get(req.params["key"]);
  res.send(value);
});

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
 *   id = "sequelizeApp"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`);
});
