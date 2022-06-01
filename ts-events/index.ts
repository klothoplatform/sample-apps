/**
 * @klotho::execution_unit {
 *  name = "events-api"
 * }
 */

import events = require("events")
import * as Express from "express"

// @klotho::pubsub
export const MyEmitter = new events.EventEmitter();

import "./hello_handler" // import after emitter set up to register handlers
import "./other/handler"

const app = Express()

app.post("/hello/:user", async (req, resp) => {
  console.log("got", {params: req.params})
  MyEmitter.emit('hello', req.params.user)
  resp.status(201).send()
})

/**
 * @klotho::public
 */
app.listen(3000, () => console.log("listening on :3000"))
