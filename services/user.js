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
	user = new User({ username, email, password });
	return user.save();
};

module.exports = { findByProperty, createUser };
