import React from 'react';
import io from 'socket.io-client';
import {
  handleUsersStreamChange,
  handleTeamsStreamChange
} from './Streams';
import { BASE_ENDPOINT } from '../../App';

const SocketIoContext = React.createContext();

export const useSocketIoContext = () => {
  const context = React.useContext(SocketIoContext);
  return context;
};

export const SocketWrapper = ({ children }) => {
  const [socket, setSocket] = React.useState();

  React.useEffect(() => {
    setSocket(io(BASE_ENDPOINT));
  }, [])

  React.useEffect(() => {
    if (socket) {
      socket.on('users', (data) => {
        console.log(data);
        handleUsersStreamChange(data);
      });
      socket.emit('getUsers');

      socket.on('teams', (data) => {
        console.log(data);
        handleTeamsStreamChange(data);
      });
      socket.emit('getTeams');

      return () => {
        socket.disconnect();
        socket.close();
      };
    }
  }, [socket]);

  return (
    <SocketIoContext.Provider value={socket}>
      {children}
    </SocketIoContext.Provider>
  )
}

export default SocketWrapper;
