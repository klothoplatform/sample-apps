export const router = require('express').Router();

router.get("/hello", async (req, res) => {
  res.send("hi")
})
