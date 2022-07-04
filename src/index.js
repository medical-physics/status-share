const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(require("./routes/record"));

const server = http.createServer(app);

server.listen(port, async () => {
	try {
		await mongoose.connect(process.env.ATLAS_URI);
		console.log("Successfully connected to MongoDB");
	} catch (err) {
		console.log(`Error while connecting to MongoDB: ${err}`);
	}

	console.log(`Server running on port: ${port}`);
});
