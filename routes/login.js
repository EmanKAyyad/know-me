const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utility/path")

router.use("/login", (request, response, next) => {
  response.sendFile(path.join(rootDir, "views", "login.html"))
});

router.use("/add-name", (req, res, next) => {
  console.log(req.body);
  res.redirect("/home");
});

module.exports = router;
