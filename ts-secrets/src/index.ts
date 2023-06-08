/**
 * @klotho::persist {
 *  secret = true
 * id = "secret"
 * }
 */
import fs = require("fs/promises");

/**
 * @klotho::persist {
 *  secret = true
 * id = "secret-2"
 * }
 */
import fs2 = require("fs/promises");

import * as express from "express";

const app = express();
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  // NOTE: after klo-compile, copy this 'my_secret.key' into the compiled directory
  // and the `pulumi up` will upload the secret for you.
  const f = await fs.readFile("my_secret.key");
  const secret1 = await fs2.readFile("other_secret1.key");
  const secret2 = await fs2.readFile("other_secret2.key");
  res.send(
    JSON.stringify({
      "my_secret.key": f.toString("utf-8"),
      "other_secret1.key": secret1.toString("utf-8"),
      "other_secret2.key": secret2.toString("utf-8"),
    })
  );
});

app.use(router);

/* @klotho::expose {
 *  target = "public"
  id = "app"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally at :3000`);
});

export { app };
