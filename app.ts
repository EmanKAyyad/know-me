import express from "express";
import path from "path";
import loginRoute from "./routes/login";
import signInRoute from "./routes/sign-in";
const app = express();
const MongoConnect = require("./utility/database").MongoConnect;
app.set("view engine", "ejs");
app.set("views", "views");
const bodyParser = require("body-parser");
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(loginRoute);
app.use(signInRoute)
app.use(homeRoute);
app.use(userRoute);

app.use("/", (_req, res: express.Response) => {
  res.redirect("/login")
})

app.use(
  "/404",
  (
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    response.status(404).send(`<h1>Page Not Found</h1>`);
  }
);

MongoConnect(() => {
  app.listen(3000);
  console.log("connected")
});
