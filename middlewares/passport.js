const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserService = require("../services/user");
passport.use(
	new LocalStrategy(async (email, password, done) => {
		try {
			let user = await UserService.findByProperty("email", email);
			if (!user) return done(null, false, { message: "Invalid credential" });
			if (!(await UserService.matchPassword(password, user)))
				return done(null, false, { message: "Invalid credential" });

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);
// create session id
// whenever we login it creates user id inside  sessions
passport.serializeUser((user, done) => {
	done(null, user._id);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
	try {
		let user = await UserService.findByProperty("_id", id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});
