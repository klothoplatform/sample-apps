/**
 * @klotho::execution_unit {
 *  name = "events-hello"
 * }
 */

import { MyEmitter } from "."

const users = new Set<string>()

MyEmitter.on('hello', async (user) => {
  console.log(`hello ${user}`)
  await new Promise(resolve => setTimeout(resolve, 1000)) // sleep 1s
  users.add(user);
  console.log(`goodbye ${user}`)
  MyEmitter.emit("other", "disconnecting")
})
