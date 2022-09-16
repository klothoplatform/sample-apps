/**
 * 
 * @klotho::execution_unit {
 *   id = "assets-static"
 * }
 */

import * as fs from "fs/promises"

export const router = require('express').Router();

/**
 * @klotho::embed_assets {
 *   id = "static-assets"
 *   include = "static/*.txt"
 *   exclude = "static/excludeme.txt"
 * }
 */

router.get("/static/:file", async (req, res) => {
  const content = await fs.readFile(`static/${req.params.file}`)
  res.send(content)
})
