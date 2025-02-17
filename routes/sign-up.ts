import express from "express";
const signUpRoute = express.Router();
import path from "path";
import { mainModuleDir } from "@app/utility/path";
import UserController from "@app/controllers/userController";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/user-img/",
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

signUpRoute.get("/sign-up", (_request: express.Request, response, _next) => {
  response.render(path.join(mainModuleDir, "views", "signup.ejs"));
});

signUpRoute.post(
  "/create-account",
  upload.single("image"),
  UserController.createUser
);

export default signUpRoute;
