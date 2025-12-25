import React, { useContext } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { useMemo } from "react";
const socketContext = createContext(null);
export const useSocket = () => {
  const socket = useContext(socketContext);
  return socket;
};
const SocketProvider = (props) => {
  const socket = useMemo(() => io("localhost:8000"), []);
  return (
    <socketContext.Provider value={socket}>
      {props.children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
