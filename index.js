// Importing required modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initializing the express app
const app = express();

// Application configuration
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starting the main application
app.listen(PORT, () => {
	console.log(`Application started on port: ${PORT}`);
});
