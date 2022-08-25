/**
 * @klotho::execution_unit {
 *  id = "events-api"
 * }
 */

import * as Express from "express"
import { MyEmitter } from "./emitter"

const app = Express()

app.post("/hello/:user", async (req, resp) => {
  console.log("got", {params: req.params})
  MyEmitter.emit('hello', req.params.user)
  resp.status(201).send()
})

/**
 * @klotho::expose {
 *  target = "public"
 *  id = "app"
 * }
 */
app.listen(3000, () => console.log("listening on :3000"))
