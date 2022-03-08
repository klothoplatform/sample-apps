/**
 * @topology_group secrets_main
 */


/**
 * @capability secret_persist
 */
import fs = require("fs/promises");

import * as express from 'express';

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
  // NOTE: after klo-compile, copy this into the compiled directory to have it uploaded for you on update
  const f = await fs.readFile("my_secret.key")
  res.send(f.toString("utf-8"))
});

/**
 * @capability https_server
 */
 app.listen(3000, async () => {
  console.log(`App listening locally at :3000`)
})

export {app}
