const md5 = require("md5");
const User = require("../models/User");
const error = require("../utils/error");
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
	user = new User({ username, email, password: md5(password) });
	return user.save();
};

const loginUser = async (email, password) => {
	// check if user exists with given email
	let user = await findByProperty("email", email);
	if (!user) throw error("Invalid credential", 400);
	// check if the password matches
	if (user.password !== md5(password)) throw error("Invalid credential", 400);
	// return user data
	return user;
};
module.exports = { findByProperty, createUser, loginUser };
