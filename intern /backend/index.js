// import express from "express";
// const app = express();
// app.use(express.json());
// const USERS = [];
// console.log(USERS);
// app.get("/", (req, res) => {
//   res.send("API is working");
// });
// app.post("/signup", (req, res) => {
//     console.log("BODY:", req.body);
//   const { fullname, lastName, phoneNumber, password } = req.body;
//   if (!fullname || !lastName || !phoneNumber || !password) {
//     return res.status(400).json({
//       message: "Missing required fields",
//       success: false,
//     });
//   }

//   const existingUser = USERS.find((user) => user.phoneNumber === phoneNumber);
//   if (existingUser) {
//     return res.status(409).json({
//       message: "User already exists",
//       success: false,
//     });
//   }
//   const newUser = {
//     id: USERS.length + 1,
//     fullname,
//     lastName,
//     phoneNumber,
//     password,
//   };

//   USERS.push(newUser);
//   return res.status(201).json({
//     message: "Account created successfully",
//     success: true,
//     user: {
//       id: newUser.id,
//       fullname,
//       lastName,
//       phoneNumber,
//     },
//   });
// });

// app.get("/users", (req, res) => {
//   res.json({
//     success: true,
//     totalUsers: USERS.length,
//     users: USERS,
//   });
// });
// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// import express from "express";
// import http from "http";
// import { WebSocketServer } from "ws";

// const app = express();
// const port = 3000;
// const server = http.createServer(app);
// const wss = new WebSocketServer({ server });
// wss.on("connection", (ws, request) => {
//   console.log("New WebSocket connection");
//   ws.on("message", (message) => {
//     console.log("received", message.toString());
//     wss;
//   });
//   ws.on("close", () => {
//     console.log("❌ Client disconnected");
//   });
//   ws.on("error", (err) => {
//     console.error("⚠️ WebSocket error:", err);
//   });
// });

// server.listen(port, () => {
//   console.log(`HTTP + WebSocket server running on port ${port}`);
// });

import bodyParser from "body-parser";
import express from "express";
import { Server, Socket } from "socket.io";
const io = new Server();
const app = express();
app.use(bodyParser.json());
const emailToSocketMapping = new Map();
io.on("connection", (Socket) => {
  Socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("user", emailId, "joined room ", roomId);
    emailToSocketMapping.set(emailId, roomId);
    Socket.join(roomId);
    Socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});
app.listen(8000, () => {
  console.log("running on the port 8000");
});
io.listen(8001);
