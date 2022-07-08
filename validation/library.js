const { body } = require("express-validator");
module.exports = {
	username() {
		return body("username")
			.trim()
			.notEmpty()
			.withMessage("username is required")
			.not()
			.custom((val) => /[^A-za-z0-9\s]/g.test(val))
			.withMessage("Username can only use numbers and characters");
	},
	email() {
		return body("email")
			.trim()
			.notEmpty()
			.withMessage("email is required")
			.isEmail()
			.withMessage("must be a valid email address");
	},
	password() {
		return body("password")
			.trim()
			.notEmpty()
			.withMessage("password is required")
			.isLength({ min: 8 })
			.withMessage("password must be 8 characters");
	},
};
