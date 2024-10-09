const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../utility/path");
const User = require("../models/user");
const Auth = require("../controllers/authentication")

// router.use("/", (req, response, next) => {
//   const token = req.body.token;
//   console.log(token)
// })

router.use("/login", (request, response, next) => {
  response.render(path.join(rootDir, "views", "login.ejs"));
});

router.use("/authenticate", (req, res, next) => {
  const userInfo = req.body;
  if(userInfo) {
    Auth.authenticate(userInfo).then((token) => {
      res.redirect("/home");
    }, () => {
      res.status(400).send({error: "username or password are incorrect"})
    })
  } else {
    res.redirect("/404")
  }
});

module.exports = router;
