const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utility/path");

router.get("/home", (request, response, next) => {
  response.render(path.join(rootDir, "views", "home.ejs"));
});

module.exports = router;
