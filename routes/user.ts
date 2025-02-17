import express from "express";
const userRouter = express.Router();

import UserController from "@app/controllers/userController";

userRouter.get("/user/:id", UserController.getUserById);

export default userRouter
