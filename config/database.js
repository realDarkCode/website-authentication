require("dotenv").config();
const mongoose = require("mongoose");

mongoose
	.connect(process.env.DATABASE_URI)
	.then(() => {
		console.log("db is connected");
	})
	.catch((error) => {
		console.log(error.message);
	});
