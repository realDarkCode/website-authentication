const error = require("../utils/error");
const userService = require("../services/user");
const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		// Creating new user
		let user = await userService.createUser(username, email, password);

		// removing password and sensitive data from response
		delete user._doc.password;
		delete user._doc._id;
		delete user._doc.__v;
		// sending back response
		res.status(201).json({ message: "User registered successfully", user });
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		let user = await userService.findByProperty("email", email);
		// searching for user with email
		if (!user) throw error("Invalid credential", 400);
		// check if the password matches
		if (user.password !== password) throw error("Invalid credential", 400);
		// response with user data
		res.status(200).json({ message: `User logged in as ${user.username}` });
	} catch (err) {
		next(err);
	}
};

module.exports = { register, login };
