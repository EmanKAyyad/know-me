const fs = require("fs");
const rootDir = require("../utility/path");
const path = require("path");
const usersFile = path.join(rootDir, "users", "users.json");

module.exports = class User {
  name;
  password;
  token;
  constructor({ name, password, token }) {
    this.name = name;
    this.password = password;
    this.token = token;
    this.add();
  }

  add() {
    fs.readFile(usersFile, (err, data) => {
      let users = [];
      if (!err) {
        users = JSON.parse(data.toString());
      }
      users.push(this);
      fs.writeFile(usersFile, JSON.stringify(users), (err) => {
        console.log(err);
      });
    });
  }
};
