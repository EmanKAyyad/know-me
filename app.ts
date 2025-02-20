import express from "express";
import path from "path";
import loginRoute from "./routes/login";
import signUpRoute from "./routes/sign-up";
import homeRoute from "./routes/home";
import userRoute from "./routes/user";
import session from "express-session";

const app = express();
const MongoConnect = require("./utility/database").MongoConnect;
app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: "know-me",
  resave: false,
  saveUninitialized: false,
}))
app.use(express.static(path.join(__dirname, "public")));

app.use(loginRoute);
app.use(signUpRoute)
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
