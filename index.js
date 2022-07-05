// Importing required modules
require("dotenv").config();
const express = require("express");
const path = require("path");
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

// Routes
app.get("/health", (_req, res) => {
	res.json({ message: "success" });
});
app.get("/", (_req, res) => {
	res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});
// 404 Route
app.use((_req, res, _next) => {
	res.status(404).json({ message: "Not found" });
});
// Starting the main application
app.listen(PORT, () => {
	console.log(`Application started on port: ${PORT}`);
});
