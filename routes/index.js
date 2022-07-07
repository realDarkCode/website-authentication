const router = require("express").Router();
const authRoutes = require("./auth");
const isLoggedInMiddleware = require("../middlewares/isLoggedIn");
router.use("/", isLoggedInMiddleware, authRoutes);
router.get("/", isLoggedInMiddleware, (req, res) => {
	res.render("index", {
		isLogin: req.user.isLoggedIn,
		error: "",
		message: "",
	});
});
module.exports = router;
