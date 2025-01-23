"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = require("path");
var app = (0, express_1.default)();
var MongoConnect = require("./utility/database").MongoConnect;
app.set("view engine", "ejs");
app.set("views", "views");
var bodyParser = require("body-parser");
var loginRoute = require("./routes/login");
var homeRoute = require("./routes/home");
var userRoute = require("./routes/user");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(loginRoute);
app.use(homeRoute);
app.use(userRoute);
app.use("/404", function (request, response, next) {
    response.status(404).send("<h1>Page Not Found</h1>");
});
MongoConnect(function () {
    app.listen(3000);
});
