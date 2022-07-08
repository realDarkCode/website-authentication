const express = require("express");
const cors = require("cors");

const app = express();
require("./config/database");
require("dotenv").config();
require("./config/passport");

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// base url
app.get("/", (req, res) => {
	res.render("index");
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/login",
		successRedirect: "/profile",
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect("/");
	}
);

const checkLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.redirect("/profile");
	}
	next();
};

// login : get
app.get("/login", checkLoggedIn, (req, res) => {
	res.render("login");
});

// login : post
app.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login",
		successRedirect: "/profile",
	})
);

const checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
};

// profile protected route
app.get("/profile", checkAuthenticated, (req, res) => {
	res.render("profile", { username: req.user.username });
});

// logout route
app.get("/logout", (req, res) => {
	try {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			res.redirect("/");
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = app;
