import User from "@app/models/user";
import express from "express";
import * as argon2 from "argon2";
import { ERROR_CODES } from "@app/utility/error-codes";

export default class AuthenticationController {
  static async authenticate(
    request: express.Request,
    response: express.Response
  ) {
    const { username, password } = request.body;
    const matchingUser = await User.checkIfUsername(username);

    if (!matchingUser) {
      throw new Error("Username or password are incorrect");
    }

    try {
      if (await argon2.verify(matchingUser["password"], password)) {
        request.session.user = matchingUser;
        response.redirect("/user/" + matchingUser._id);
      } else {
        response.statusCode = ERROR_CODES.UNAUHTORIZED;
        response.send({ error: "Username or password are incorrect" });
      }
    } catch (err) {
      console.log(err)
    }
  }

  static logout(request: express.Request, response: express.Response) {
    request.session.destroy((error) => {
      if (error) {
        console.log("logout failed", error);
      }
      response.redirect("/");
    });
  }
}

module.exports = AuthenticationController;
