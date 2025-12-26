import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useSocket } from "../Providers/SocketProvider";
import { useEffect } from "react";
const HomePage = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  console.log(socket);
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
      if (!email || !room) {
        alert("Please fill all fields");
        return;
      }
      console.log("Email:", email);
      console.log("Room:", room);
    },
    [email, room, socket]
  );
  const handleJoinRoom = 
  useEffect(() => {
    socket.on("room:join", (data) => {
      console.log(`data from backend ${console.log(data)}`);
    },[socket]);
  });
  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        {/* <label htmlFor="email">Email Id</label> */}
        <input
          type="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {/* <label htmlFor="room">Room number </label> */}
        <input
          type="text"
          id="room"
          placeholder="enter ur room number "
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        ></input>
        <button>join</button>
      </form>
    </div>
  );
};

export default HomePage;
