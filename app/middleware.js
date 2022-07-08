const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const middleware = [
	morgan("dev"),
	cors(),
	express.urlencoded({ extended: true }),
	express.json(),
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
		// cookie: { secure: true },
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE_URI,
			collectionName: "sessions",
		}),
	}),
];

module.exports = middleware;
