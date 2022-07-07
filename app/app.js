require("dotenv").config();
const ejs = require("ejs");
const express = require("express");
const { notFoundHandler, errorHandler } = require("./error");
const app = express();

// App configuration
app.set("view engine", "ejs");

app.use(require("./middleware"));
app.use(require("./routes"));
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
