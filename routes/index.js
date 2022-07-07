const router = require("express").Router();
const authRoutes = require("./auth");
const dashboardRoutes = require("./dashboard");
router.use("/", authRoutes);
router.use("/", dashboardRoutes);
router.get("/", (req, res) => {
	res.format({
		html: () => res.render("index", { isLogin: false }),
		json: () => res.json({ message: "Welcome to Website-authentication API!" }),
	});
});
module.exports = router;
