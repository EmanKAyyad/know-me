const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utility/path");
const User = require("../models/user");

router.use("/login", (request, response, next) => {
  response.sendFile(path.join(rootDir, "views", "login.html"));
});

router.use("/add-name", (req, res, next) => {
  const user = new User(req.body);
  user.add();
  res.redirect("/home");
});

module.exports = router;
