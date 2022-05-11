const http = require("http");
const express = require('express');
const app = express();
const port = 5000;
const conn = require("./db/conn");

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

async function run() {
	try {
		conn.connectToServer(function (err) {
			if (err) {
				console.log(err);
			}
		});
	} catch (err) {
		console.log(err);
	} /* finally {
		conn.closeConnection(callback);
	} */
}

run();
