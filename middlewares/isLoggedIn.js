module.exports = (req, _res, next) => {
	if (req.user) {
		req.user.isLoggedIn = false;
	} else {
		const user = { isLoggedIn: false };
		req.user = user;
	}
	next();
};
