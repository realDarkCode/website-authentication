const router = require("express").Router();
const authValidation = require("../validation/authValidation");
const authController = require("../controllers/authController");
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
