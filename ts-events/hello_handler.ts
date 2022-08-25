/**
 * @klotho::execution_unit {
 *  id = "events-hello"
 * }
 */

import { MyEmitter } from "./emitter"

const users = new Set<string>()

MyEmitter.on('hello', async (user) => {
  console.log(`hello ${user}`)
  await new Promise(resolve => setTimeout(resolve, 1000)) // sleep 1s
  users.add(user);
  console.log(`goodbye ${user}`)
  MyEmitter.emit("other", "disconnecting")
})
