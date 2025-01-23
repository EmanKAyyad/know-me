import express from "express";
const router = express.Router();
import path from "path";
import { mainModuleDir } from "@app/utility/path";

router.get(
  "/home",
  (
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    response.render(path.join(mainModuleDir, "views", "home.ejs"));
  }
);

module.exports = router;
