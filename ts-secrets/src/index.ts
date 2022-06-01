/**
 * @klotho::execution_unit {
 *  name = "secrets-main"
 * }
 */



/**
 * @klotho::persist {
 *  type = "secret"
 * }
 */
import fs = require("fs/promises");

import * as express from 'express';

const app = express()
const router = express.Router();
router.use(express.json())

router.get('/', async (req, res) => {
  // NOTE: after klo-compile, copy this 'my_secret.key' into the compiled directory
  // and the `pulumi up` will upload the secret for you.
  const f = await fs.readFile("my_secret.key")
  res.send(f.toString("utf-8"))
});

app.use(router)

/* @klotho::expose {
 *  target = "public"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally at :3000`)
})

export {app}
