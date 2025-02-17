import express from "express";
const homeRouter = express.Router();
import path from "path";
import { mainModuleDir } from "@app/utility/path";

homeRouter.get(
  "/home",
  (
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    response.render(path.join(mainModuleDir, "views", "home.ejs"), {
      pageTitle: "home",
    });
  }
);

export default homeRouter;
