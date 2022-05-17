/**
 * @klotho::execution_group {
 *  name = "events-api"
 * }
 */

import events = require("events")
import * as Express from "express"

export const MyEmitter = new events.EventEmitter();

import "./hello_handler" // import after emitter set up to register handlers

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
