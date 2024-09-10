const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login");
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, "public")))

app.use(loginRoute)
app.use(homeRoute);
app.use(userRoute)

app.use((request, response, next) => {
  response.status(404).send(`<h1>Page Not Found</h1>`);
});

app.listen(3000);
