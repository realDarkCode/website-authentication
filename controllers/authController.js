const register = (req, res) => {
	res.status(201).json({ message: "Registered user" });
};

const login = (req, res) => {
	res.status(200).json({ message: "Login user" });
};

module.exports = { register, login };
