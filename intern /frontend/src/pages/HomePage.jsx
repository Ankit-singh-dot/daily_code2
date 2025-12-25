import React from "react";
import { useState } from "react";
import { useCallback } from "react";
const HomePage = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !room) {
        alert("Please fill all fields");
        return;
      }

      console.log("Email:", email);
      console.log("Room:", room);
    },
    [email, room]
  );
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
