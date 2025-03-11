import { MongoClient, Db } from "mongodb";
let _db: Db;
export const dbUrl =
  "mongodb+srv://emanAdmin:planetmongo12@cluster0.xxb8h.mongodb.net/know-me?retryWrites=true&w=majority&appName=Cluster0";

  
export const MongoConnect = (callback: () => void) => {
  MongoClient.connect(dbUrl)
    .then((res) => {
      _db = res.db();
      callback();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDB = (): Db => {
  if (_db) {
    return _db;
  }

  throw "no db found";
};
