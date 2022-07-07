const router = require("express").Router();
const authValidation = require("../validation/authValidation");
const authController = require("../controllers/authController");

router.get("/register", (req, res, _next) => {
	res.format({
		html: () =>
			res.render("register", {
				isLogin: false,
				error: "",
				message: "",
			}),
		json: () => res.status(200).json({ message: "Register Get route" }),
	});
});
router.get("/login", (req, res, _next) => {
	res.format({
		html: () =>
			res.render("login", {
				isLogin: false,
				error: "",
				message: "",
			}),
		json: () => res.status(200).json({ message: "Login Get route" }),
	});
});
router.get("/logout", (req, res, next) => {
	res.redirect("/");
});
router.post(
	"/register",
	authValidation.registerValidator,
	authValidation.validateRequest,
	authController.register
);
router.post(
	"/login",
	authValidation.loginValidator,
	authValidation.validateRequest,
	authController.login
);
module.exports = router;
