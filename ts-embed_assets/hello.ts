/**
 * 
 * @klotho::execution_unit {
 *   id = "assets-hello"
 *   keep_warm = true
 * }
 */

export const router = require('express').Router();

router.get("/hello", async (req, res) => {
  res.send("hi")
})
