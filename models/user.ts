import { getDB } from "@app/utility/database";

const mongodb = require("mongodb");

export default class User {
  name;
  password;
  token;
  constructor({
    name,
    password,
    token,
  }: {
    name: string;
    password: string;
    token: string;
  }) {
    this.name = name;
    this.password = password;
    this.token = token;
  }

  add() {
    const db = getDB();

    if (!db) throw new Error("can't create user, no db found");

    return db.collection("users").insertOne(this);
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("users").find().toArray().then();
  }

  static fetchById(id: string) {
    const db = getDB();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .toArray();
  }
};
