class Authentication {
  // static authenticate({ username, password }: {username: string, password: string}) {
    // return new Promise((res, rej) => {
    //   // const user = new User({ username, password });
    //   user.add().then(
    //     (r) => {
    //       console.log(r);
    //       res(null);
    //     },
    //     (err) => {
    //       console.log(err);
    //       rej(err)
    //     }
      // );
    // });
  // }

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
