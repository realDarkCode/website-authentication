require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const connectDb = require("./database/db");
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;
const DATABASE_URI = process.env.DATABASE_URI;
connectDb(DATABASE_URI)
	.then(() => {
		console.log("Database Connected Successfully.");
		server.listen(PORT, () => {
			console.log(`Server Listening on PORT ${PORT}.`);
		});
	})
	.catch((error) => {
		console.log("App couldn't start due to database connection error");
		console.log(error);
	});
