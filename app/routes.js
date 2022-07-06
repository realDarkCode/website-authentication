const router = require("express").Router();
const applicationRoutes = require("../routes/");
router.get("/health", (_req, res) => {
	res.status(200).json({ message: "success" });
});
router.use("/api/v1", applicationRoutes);

module.exports = router;
