const Team = require('../models/team');

class TeamsConnection {
  constructor (io, socket) {
    this.socket = socket;
    this.io = io;
    this.changeStream = Team.watch();

    socket.on('getTeams', () => this.getTeams());
    socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  getTeams = () => {
    this.changeStream
      .on('change', (data) => {
        this.socket.emit('teams', data);
      });
  };

  disconnect = async () => {
    await this.changeStream.close();
    console.log('Disconnected from teams stream.');
  };
}

const establishTeamsStream = (io) => {
  io.on('connection', (socket) => {
    console.log('Connected to teams stream.');
    // eslint-disable-next-line no-new
    new TeamsConnection(io, socket);
  });
};

module.exports = establishTeamsStream;
