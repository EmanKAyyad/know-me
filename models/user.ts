import { getDB } from "@app/utility/database";
import { ObjectId, WithId } from "mongodb";

export default class User {
  username: string;
  password: string;
  email: string;
  fname: string;
  lname: string;
  image: string;

  constructor({ username, password, email, fname, lname, image }: User) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.fname = fname;
    this.lname = lname;
    this.image = image;
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
    console.log("id", id);
    const db = getDB();
    return db
      .collection("users")
      .find({ _id: new ObjectId(id) })
      .next();
  }

  static findByUsername(username: string): Promise<WithId<User>[]> {
    const db = getDB();
    return db.collection("users").find({ username }).toArray() as Promise<
      WithId<User>[]
    >;
  }
}
