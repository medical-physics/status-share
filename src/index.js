const http = require("http");
const express = require('express');
const app = express();
const port = 4000;
const { MongoClient } = require("mongodb");
require("dotenv").config();

const server = http.createServer((req, res) => {
	//Set the response HTTP header with HTTP status and Content type
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n');
});

server.listen(port, (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`Server running on port: ${port}`);
});

app.get('/', (req, res) => {
	res.send('Hello World!')
});

const client = new MongoClient(process.env.ATLAS_URI);

async function run() {
	try {
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		console.log("Connected successfully to MongoDB server");
	} finally {
		await client.close();
	}
}

run().catch(console.dir);
