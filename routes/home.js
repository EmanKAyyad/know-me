const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utility/path").default;

router.get("/home", (request, response, next) => {
  response.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = router;
