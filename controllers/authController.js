const userService = require("../services/user");
const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		// Creating new user
		let user = await userService.createUser(username, email, password);

		res.format({
			json: () => {
				res.status(201).json({ message: "User registered successfully", user });
			},
			html: () => {
				res.status(200).render("register", {
					isLogin: false,
					error: "",
					message: "User registered successfully. Login now",
				});
			},
		});
		return;
	} catch (err) {
		if (!Number.isNaN(err.status)) {
			if (err.status >= 400 && err.status < 500) {
				res.format({
					json: () => {
						next(err);
					},
					html: () =>
						res.status(err.status).render(`register`, {
							isLogin: false,
							error: err.message,
							message: "",
						}),
				});
				return;
			}
		}
		next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		let user = await userService.loginUser(email, password);
		res.format({
			json: () => {
				res.status(200).json({ message: "User logged in successfully", user });
			},
			html: () => {
				res.status(200).render("login", {
					isLogin: true,
					error: "",
					message: `Welcome back ${user.username}`,
				});
			},
		});
		return;
	} catch (err) {
		if (!Number.isNaN(err.status)) {
			if (err.status >= 400 && err.status < 500) {
				res.format({
					json: () => {
						next(err);
					},
					html: () =>
						res.status(err.status).render(`login`, {
							isLogin: false,
							error: err.message,
							message: "",
						}),
				});
				return;
			}
		}
		next(err);
	}
};

module.exports = { register, login };
