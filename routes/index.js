const router = require("express").Router();
const path = require("path");
const authRoutes = require("./auth");
router.use(authRoutes);

router.get("/", (_req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
module.exports = router;
