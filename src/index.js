const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes/record'));

const establishUsersStream = require('./streams/UsersConnection');
const establishTeamsStream = require('./streams/TeamsConnection');

const buildPath = path.join(__dirname, '..', 'client', 'build');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(buildPath));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

/* const options = {
  key: fs.readFileSync(path.join(__dirname, '..', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '..', 'localhost.pem'))
}; */

const server = http
  .createServer(app)
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

io.use((socket, next) => {
  if (socket.handshake?.query?.token) {
    const token = socket.handshake.query.token;

    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      socket.decoded = decodedToken;
      next();
    } catch (err) {
      next(new Error('Socket.io authentication error.'));
    }
  } else {
    next(new Error('Socket.io authentication error.'));
  }
});

establishUsersStream(io);
establishTeamsStream(io);
