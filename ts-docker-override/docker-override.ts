/**
 * 
 * @klotho::execution_unit {
 *   id = "assets-override"
 * }
 */

export const router = require('express').Router();

router.get("/override", async (req, res) => {
  res.send("docker overide")
})
