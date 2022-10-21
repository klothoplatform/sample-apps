/**
 * @klotho::execution_unit {
 *  id = "events-hello"
 * }
 */

import { MyEmitter } from "./emitter"

/**
 * @klotho::persist {
 *   id = "users"
 * }
 */
 const users = new Map<string, string>();


MyEmitter.on('hello', async (user) => {
  console.log(`hello ${user}`)
  await new Promise(resolve => setTimeout(resolve, 1000)) // sleep 1s
  users.set(user, user);
  console.log(`goodbye ${user}`)
  MyEmitter.emit("other", "disconnecting")
})

export const getUser = async (user: string) => {
  return await users.get(user)
}