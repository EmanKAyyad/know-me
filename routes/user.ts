import express from "express";
const router = express.Router();

import UserController from "@app/controllers/user";

router.get("/user", UserController.getUsers);

module.exports = router;
