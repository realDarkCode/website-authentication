const { validationResult } = require("express-validator");

const { username, email, password } = require("./library");
const validateRequest = (req, res, next) => {
	const errors = validationResult(req);

	const page = req.path.toString().includes("register") ? "register" : "login";
	if (!errors.isEmpty()) {
		res.format({
			json: () => res.status(422).json({ error: errors.array()[0].msg }),
			html: () =>
				res.status(422).render(`${page}`, {
					isLogin: req.user.isLoggedIn,
					error: errors.array()[0].msg,
					message: "",
				}),
		});
		return;
	} else {
		next();
	}
};

const registerValidator = [username(), email(), password()];

const loginValidator = [email(), password()];

module.exports = { registerValidator, loginValidator, validateRequest };
