import React from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import {
  handleUsersStreamChange,
  handleTeamsStreamChange
} from "./Streams";
import { BASE_ENDPOINT } from "../App";

// Redux
import { useSelector } from "react-redux";
import { selectIsAccessTokenValid } from "../util/Selectors";

const SocketIoContext = React.createContext();

export const useSocketIoContext = () => {
  const context = React.useContext(SocketIoContext);
  return context;
};

export const SocketWrapper = ({ children }) => {
  const [socket, setSocket] = React.useState();
  const accessToken = useSelector((state) => state.account.accessToken);
  const isTokenValid = useSelector((state) => selectIsAccessTokenValid(state));

  React.useEffect(() => {
    if (isTokenValid) {
      const newSocket = io(BASE_ENDPOINT, {
        query: {
          token: accessToken
        }
      });
      setSocket(newSocket);
    }
  }, [accessToken, isTokenValid]);

  React.useEffect(() => {
    if (socket) {
      socket.on("users", (data) => {
        handleUsersStreamChange(data);
      });
      socket.emit("getUsers");

      socket.on("teams", (data) => {
        handleTeamsStreamChange(data);
      });
      socket.emit("getTeams");

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
  );
};

export default SocketWrapper;

SocketWrapper.propTypes = {
  children: PropTypes.object.isRequired
};
