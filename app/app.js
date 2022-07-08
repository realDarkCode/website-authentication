require("dotenv").config();
const ejs = require("ejs");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const express = require("express");
const { notFoundHandler, errorHandler } = require("./error");
const app = express();

// App configuration
app.set("view engine", "ejs");
// global middleware
app.use(require("./middleware"));
// passport js
app.set("trust proxy", 1); // trust first proxy
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE_URI,
			collectionName: "sessions",
		}),
		// cookie: { secure: true },
	})
);

app.use(passport.initialize());
app.use(passport.session());
// routes
app.use(require("./routes"));
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
