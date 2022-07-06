const router = require("express").Router();

router.post("/register", (req, res, next) => {
	res.status(200).json({ message: "Registering user" });
});
router.post("/login", (req, res, next) => {
	res.status(200).json({ message: "Logging in user" });
});
module.exports = router;
