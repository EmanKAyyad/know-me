import express from "express";
const loginRoute = express.Router();
import path from "path";
import { mainModuleDir } from "@app/utility/path";
import AuthenticationController from "@app/controllers/authentication";

loginRoute.use("/login", (_request: express.Request, response, _next) => {
  response.render(path.join(mainModuleDir, "views", "login.ejs"));
});

loginRoute.post("/authenticate", AuthenticationController.authenticate);
loginRoute.post("/logout", AuthenticationController.logout);

export default loginRoute;
