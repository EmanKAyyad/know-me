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
    const isBodyValid = this.validateUserFieldsInResponse(request.body);

    if (isBodyValid != true) {
      response.send(isBodyValid);
    }
    this.validateUserFieldsExistInDb(request.body).then((result) => {
      if (result.success) {
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
      } else {
        response.statusCode = result.statusCode || 400;
        response.send({ error: result.error });
      }
    });
  };

  private static async validateUserFieldsExistInDb(user: User) {
    return await Promise.all([
      User.checkIfEmailExists(user.email),
      User.checkIfUsername(user.username),
    ]).then(([emailExists, usernameExists]) => {
      if (emailExists) {
        return { error: "Email already Exists", statusCode: 400 };
      } else if (usernameExists) {
        return { error: "Username already Exists", statusCode: 400 };
      } else {
        return { success: true };
      }
    });
  }

  private static validateUserFieldsInResponse(user: User) {
    for (let i = 0; i < Object.keys(user).length; i++) {
      if (!Object.values(user)[i]) {
        return {
          error: `Property ${Object.keys(user)[i]} doesn't exist`,
        };
      }
    }
    return true;
  }

  static getUserFromSession = (req: express.Request, res: express.Response) => {
    if (req.session.user) {
      res.redirect("/user/" + req.session.user._id);
    } else {
      res.redirect("/");
    }
  };

  static getUserById = (req: express.Request, res: express.Response) => {
    const userId = req.params["id"];
    if (!userId) {
      throw new Error("user id not found");
    }

    User.fetchById(userId)
      .then((user) => {
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
