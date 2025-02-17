import User from "@app/models/user";
import express from "express";
export default class UserController {
  static getUsers = (
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    User.fetchAll().then((users) => {
      response.render("user", {
        users: users,
        pageTitle: "profile",
      });
    });
  };

  static createUser = (
    request: express.Request,
    response: express.Response
  ) => {
    const fullPath = "/user-img/" + request.file?.filename;

    const userInfo = { ...request.body, image: fullPath };
    const user = new User(userInfo);
    user.add().then(
      (res) => {
        response.redirect("/user/" + res.insertedId);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  static getUserById = (req: express.Request, res: express.Response) => {
    console.log("request", req.url);
    const userId = req.params["id"];
    if (!userId) {
      throw new Error("user id not found");
    }

    User.fetchById(userId)
      .then((user) => {
        console.log(user);
        res.render("user", {
          pageTitle: "Profile",
          user,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
