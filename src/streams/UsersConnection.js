const User = require('../models/user');

class UsersConnection {
  constructor (io, socket) {
    this.socket = socket;
    this.io = io;
    this.changeStream = User.watch();

    socket.on('getUsers', () => this.getUsers());
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  getUsers = () => {
    this.changeStream
      .on('change', (data) => {
        this.socket.emit('users', data);
      });
  };

  disconnect = async () => {
    await this.changeStream.close();
    console.log('Disconnected from users stream.');
  };
}

const establishUsersStream = (io) => {
  io.on('connection', (socket) => {
    console.log('Connected to users stream.');
    // eslint-disable-next-line no-new
    new UsersConnection(io, socket);
  });
};

module.exports = establishUsersStream;
