/**
 * @klotho::execution_unit {
 *  name = "cloudfs-main"
 * }
 */


// @klotho::persist
import fs = require("fs/promises");

import * as express from 'express';

const app = express()
app.use(express.json())

const helloPath = "/tmp/hello.txt"

app.get('/', async (req, res) => {
  await setupRun
  const f = await fs.readFile(helloPath)
  res.send(f.toString("utf-8"))
});

/* @klotho::expose {
 *  target = "public"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`)
})

export {app}

async function setup() {
  const t = new Date()
  console.log(`Writing startup time ${t.toISOString()} to ${helloPath}`)
  await fs.writeFile(helloPath, `Startup at ${t.toISOString()}`)
}

const setupRun = setup()
