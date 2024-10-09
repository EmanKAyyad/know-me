const User = require("../models/user");

class Authentication {
  static authenticate({ name, password }) {
    return new Promise((res, rej) => {
      const token = this.createToken(name, password);
      new User({ name, password, token });
      res(token);
    });
  }

  static createToken = (username, password) => {
    if (!username) {
      throw new Error("Username not provided");
    }

    if (!password) {
      throw new Error("Password not provided");
    }

    return `${username}-${password}-${new Date().getTime()}`;
  };

  static validateToken(token) {
    const timestamp = token.slice(token.lastIndexOf("-"));
    console.log(timestamp);
  }
}

module.exports = Authentication;
