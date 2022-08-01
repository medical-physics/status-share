const Team = require('../models/team');

class TeamsConnection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.changeStream = Team.watch();

    socket.on('getTeams', () => this.getTeams());
    socket.on('disconnectTeams', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  getTeams = () => {
    this.changeStream
      .on('change', (data) => {
        this.io.sockets.emit('teams', data);
      });
  }

  disconnect = async () => {
    await this.changeStream.close();
  }
}

const establishTeamsStream = (io) => {
  io.on('connection', (socket) => {
    console.log('Successfully connected to teams stream.');
    new TeamsConnection(io, socket);
  });
}

module.exports = establishTeamsStream;
