require("dotenv").config();
const ejs = require("ejs");
const passport = require("passport");
const express = require("express");
const { notFoundHandler, errorHandler } = require("./error");
const app = express();

// App configuration
app.set("view engine", "ejs");
app.set("trust proxy", 1);
// global middleware
app.use(require("./middleware"));
// passport js
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use(require("./routes"));
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
