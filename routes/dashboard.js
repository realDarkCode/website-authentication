const router = require("express").Router();

router.get("/dashboard", (_req, res, _next) => {
	res.format({
		html: () => res.render("dashboard", { isLogin: false }),
		json: () => res.status(200).json({ message: "dashboard Get route" }),
	});
});

module.exports = router;
