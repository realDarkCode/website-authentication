const { validationResult } = require("express-validator");

const { username, email, password } = require("./library");
const validateRequest = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ message: errors.array()[0].msg });
	} else {
		next();
	}
};

const registerValidator = [username(), email(), password()];

const loginValidator = [email(), password()];

module.exports = { registerValidator, loginValidator, validateRequest };
