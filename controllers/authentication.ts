import User from "@app/models/user";

class Authentication {
  static authenticate({ name, password }: {name: string, password: string}) {
    return new Promise((res, rej) => {
      const token = this.createToken(name, password);
      const user = new User({ name, password, token });
      user.add().then(
        (r) => {
          console.log(r);
          res(null);
        },
        (err) => {
          console.log(err);
          rej(err)
        }
      );
    });
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
}

module.exports = Authentication;
