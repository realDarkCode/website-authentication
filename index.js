require("dotenv").config();
const app = require("./app");

// PORT MUST BE 4000 (Authorized redirect URIs)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`server is running at http://localhost:${PORT}`);
});
