import React from 'react';
import io from 'socket.io-client';
import {
  handleUsersStreamChange,
  handleTeamsStreamChange
} from './Streams';
import BASE_ENDPOINT from '../../App';

const SocketIoContext = React.createContext();

export const useSocketIoContext = () => {
  const context = React.useContext(SocketIoContext);
  return context;
};

export const SocketWrapper = (props) => {

  React.useEffect(() => {
    const newSocket = io(BASE_ENDPOINT);
    newSocket.on('users', (data) => {
      console.log(data);
      handleUsersStreamChange(data);
    });
    newSocket.emit('getUsers');
    newSocket.on('teams', (data) => {
      console.log(data);
      handleTeamsStreamChange(data);
    });
    newSocket.emit('getTeams');
    return () => {
      newSocket.disconnect();
      newSocket.close();
    };
  }, []);

  return (
    <SocketIoContext.Provider>
      {props.children}
    </SocketIoContext.Provider>
  )
}
