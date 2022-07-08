const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const middleware = [
	morgan("dev"),
	cors(),
	express.urlencoded({ extended: true }),
	express.json(),
];

module.exports = middleware;
