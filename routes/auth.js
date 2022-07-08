const router = require("express").Router();
const passport = require("../middlewares/passport");
const authValidation = require("../validation/authValidation");
const authController = require("../controllers/authController");

router.get("/register", (req, res, _next) => {
	res.format({
		html: () =>
			res.render("register", {
				isLogin: req.user.isLoggedIn,
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
				isLogin: req.user.isLoggedIn,
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
	passport.authenticate("local", {
		failureRedirect: "/login",
		successRedirect: "/profile",
	})
);
module.exports = router;
