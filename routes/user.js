const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utility/path");

router.get("/user", (request, response, next) => {
  response.sendFile(path.join(rootDir, "views", "user.html"));
});

module.exports = router;
