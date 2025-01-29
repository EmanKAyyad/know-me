import express from "express";
const signInRoute = express.Router();
import path from "path";
import { mainModuleDir } from "@app/utility/path";

signInRoute.use("/sign-in", (_request: express.Request, response, _next) => {
  response.render(path.join(mainModuleDir, "views", "signin.ejs"));
});

export default signInRoute;