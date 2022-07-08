const bcrypt = require("bcrypt");
const User = require("../models/User");
const error = require("../utils/error");

const saltRounds = 10;

const findByProperty = (property, value) => {
	if (property == "_id") {
		return User.findById(value);
	}
	return User.findOne({ [property]: value });
};

const createUser = async (username, email, password) => {
	// check if user already exists with given email
	let user = await findByProperty("email", email);
	if (user) throw error("User already exists with this email", 400);
	// create new user with given username, email and password
	try {
		user = new User({ username, email, password });
		user.password = await bcrypt.hash(user.password, saltRounds);
		return user.save();
	} catch (err) {
		console.log(err);
		throw error("Something went wrong", 500);
	}
};

const matchPassword = (password, user) => {
	return bcrypt.compare(password, user.password);
};
const loginUser = async (email, password) => {
	// check if user exists with given email
	let user = await findByProperty("email", email);
	if (!user) throw error("Invalid credential", 400);
	// check if the password matches
	if (!(await bcrypt.compare(password, user.password)))
		throw error("Invalid credential", 400);
	// return user data
	return user;
};
module.exports = { findByProperty, createUser, loginUser, matchPassword };
