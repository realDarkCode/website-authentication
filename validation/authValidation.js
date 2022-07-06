const { validationResult, body } = require("express-validator");

const validateRequest = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ message: errors.array()[0].msg });
	} else {
		next();
	}
};

const registerValidator = [
	body("username")
		.notEmpty()
		.withMessage("username is required")
		.not()
		.custom((val) => /[^A-za-z0-9\s]/g.test(val))
		.withMessage("Username not use uniq characters"),
	body("email")
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("must be a valid email address"),
	body("password")
		.notEmpty()
		.withMessage("password is required")
		.isLength({ min: 8 })
		.withMessage("password must be 8 characters"),
];

const loginValidator = [
	body("username").notEmpty().withMessage("username or email is required"),
	body("password").notEmpty().withMessage("password is required"),
];

module.exports = { registerValidator, loginValidator, validateRequest };
