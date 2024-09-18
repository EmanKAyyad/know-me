const fs = require("fs");
const rootDir =  require("../utility/path");
const path = require("path");
const usersFile = path.join(rootDir, "users", "users.json");

module.exports = class User {
  name;
  constructor({ name }) {
    if(!name) throw new Error("Error, name is not provided");
    this.name = name;
  }

  add() {
    fs.readFile(usersFile, (err, data) => {
        let users = []
        if(!err) {
            users = JSON.parse(data.toString());
        }
        users.push(this);
        fs.writeFile(usersFile, JSON.stringify(users), (err) => {
            console.log(err)
        })
    })
  }
};
