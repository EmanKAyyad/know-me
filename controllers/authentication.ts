import User from "@app/models/user";
import express from "express";

export default class AuthenticationController {
  static async authenticate(
    request: express.Request,
    response: express.Response
  ) {
    const { username, password } = request.body;
    const matchingUsers = await User.findByUsername(username);
    const user = matchingUsers.find((user) => user["password"] === password);
    if (user) {
      request.session.user = user;
      response.redirect("/user/" + user._id);
    } else {
      throw new Error("Username or password are incorrect");
    }
  }

  static createToken = (username: string, password: string) => {
    if (!username) {
      throw new Error("Username not provided");
    }

    if (!password) {
      throw new Error("Password not provided");
    }

    return `${username}-${password}-${new Date().getTime()}`;
  };

  static validateToken(token: string) {
    const timestamp = token.slice(token.lastIndexOf("-"));
    console.log(timestamp);
  }

  static logout(request: express.Request, response: express.Response) {
    request.session.destroy((error) => {
      console.log("logout failed", error);
      response.redirect("/")
    });
  }
}

module.exports = AuthenticationController;
