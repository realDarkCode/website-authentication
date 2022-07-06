const router = require("express").Router();

router.get("/", (_req, res, _next) => {
	res.send("Hello World!");
});

module.exports = router;
