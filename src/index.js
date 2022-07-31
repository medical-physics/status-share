const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes/record'));

const options = {
  key: fs.readFileSync(__dirname + '/../localhost-key.pem'),
  cert: fs.readFileSync(__dirname + '/../localhost.pem')
};

const server = https
  .createServer(options, app)
  .listen(port, async () => {
    try {
      await mongoose.connect(process.env.ATLAS_URI);
      console.log('Successfully connected to MongoDB');
      console.log(`Server running on port: ${port}`);
    } catch (err) {
      console.log(`Error while connecting to MongoDB: ${err}`);
    }
  });

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'https://localhost:3000'
  }
});

io.on('socketConnection', (socket) => {
  console.log('Connected to socket.io');
});
