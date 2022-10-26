/**
 * @klotho::execution_unit {
 *  id = "events-api"
 * }
 */

import * as Express from "express"
import { MyEmitter } from "./emitter"
import {getUser} from './hello_handler'
const app = Express()

app.post("/hello/:user", async (req, resp) => {
  console.log("got", {params: req.params})
  MyEmitter.emit('hello', req.params.user)
  resp.status(201).send()
})

app.get("/hello/:user", async (req, resp) => {
  console.log("got", {params: req.params})
  const user = await getUser(req.params.user)
  resp.status(200).send(user)
})

/**
 * @klotho::expose {
 *  target = "public"
 *  id = "app"
 * }
 */
app.listen(3000, () => console.log("listening on :3000"))
