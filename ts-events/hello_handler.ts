/**
 * @klotho::execution_group {
 *  name = "events-hello"
 * }
 */

import { MyEmitter } from "."

MyEmitter.on('hello', async (user) => {
  console.log(`hello ${user}`)
  await new Promise(resolve => setTimeout(resolve, 1000)) // sleep 1s
  console.log(`goodbye ${user}`)
})

console.log("registered 'hello'")
