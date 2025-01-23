import User from "@app/models/user";
import express from "express";

export default class UserController {
  static getUsers = (
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    User.fetchAll().then((users) => {
      console.log(users);
      response.render("user", {
        users: users,
      });
    });
  };
}
