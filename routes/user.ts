import express from "express";
const userRouter = express.Router();

import UserController from "@app/controllers/userController";

userRouter.get("/user/:id", UserController.getUserById);

userRouter.get("/user", UserController.getUserFromSession)

export default userRouter
