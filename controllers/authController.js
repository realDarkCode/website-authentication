const error = require("../utils/error");
const userService = require("../services/user");
const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		// Creating new user
		let user = await userService.createUser(username, email, password);

		res.status(201).json({ message: "User registered successfully", user });
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		let user = await userService.loginUser(email, password);
		res
			.status(200)
			.json({ message: `User logged in as ${user.username}`, user });
	} catch (err) {
		next(err);
	}
};

module.exports = { register, login };
