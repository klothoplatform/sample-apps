/**
 * @klotho::execution_unit {
 *  name = "events-other"
 * }
 */

import * as pkg from "../emitter"

pkg.MyEmitter.on('other', async () => {
  console.log(`...`)
  await new Promise(resolve => setTimeout(resolve, Math.random() * 4000 + 1000)) // sleep random 1-5 seconds
  console.log(`!`)
})
