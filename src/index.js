const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketio = require('socket.io');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes/record'));

const establishUsersStream = require('./streams/UsersConnection');
const establishTeamsStream = require('./streams/TeamsConnection');

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

const io = socketio(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

establishUsersStream(io);
establishTeamsStream(io);
