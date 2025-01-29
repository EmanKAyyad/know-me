import express from "express";
const loginRoute = express.Router();
import path from "path";
import { mainModuleDir } from "@app/utility/path";
const Auth = require("../controllers/authentication");

loginRoute.use("/login", (_request: express.Request, response, _next) => {
  response.render(path.join(mainModuleDir, "views", "login.ejs"));
});

loginRoute.use("/authenticate", (req: express.Request, res, _next) => {
  const userInfo = req.body;
  if (userInfo) {
    Auth.authenticate(userInfo)
      .then(() => {
        res.redirect("/home");
      })
      .catch(() => {
        res.status(400).send({ error: "username or password are incorrect" });
      });
  } else {
    res.redirect("/404");
  }
});

export default loginRoute;
