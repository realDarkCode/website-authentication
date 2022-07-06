const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			minlength: [3, "Username must be at least 3 characters long"],
			maxlength: [32, "Username must be at most 32 characters long"],
			trim: true,
			validate: {
				validator: function (v) {
					return /[a-zA-Z][a-zA-Z0-9-_]{3,32}/.test(v);
				},
				message: (props) => `${props.value} is not a valid username`,
			},
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, "Email is required"],
			unique: [true, "Email already exists"],
			validate: {
				validator: function (v) {
					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
				},
				message: (props) => `${props.value} is not a valid email`,
			},
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be at least 8 characters long"],
		},
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
