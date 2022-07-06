const router = require("express").Router();
const authRoutes = require("./auth");

router.use("/auth", authRoutes);

router.get("/", (_req, res) => {
	res.status(200).json({ message: "Welcome to the API" });
});
module.exports = router;
