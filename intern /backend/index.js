import express from "express";
import jwt from "jsonwebtoken";
const JWT_SECRETS = "supersecret";
const app = express();
app.use(express.json());
const USERS = [];
app.get("/", (req, res) => {
  res.send("api is working ");
});
app.post("/signup", (req, res) => {
  const { fullName, Password, phoneNumber } = req.body;
  if (!fullName || !Password || !phoneNumber) {
    return res.status(400).json({
      message: "please send all the details ",
      success: false,
    });
  }
  const ExistingUser = USERS.find((user) => user.phoneNumber === phoneNumber);
  if (ExistingUser) {
    return res.status(409).json({
      message: "user alreday exist ",
      success: true,
    });
  }
  const newUser = {
    id: USERS.length + 1,
    fullName,
    Password,
    phoneNumber,
  };
  USERS.push(newUser);
  return res.status(201).json({
    message: "user successfully created ",
    success: true,
  });
});

app.post("/login", (req, res) => {
  const { phoneNumber, Password } = req.body;

  if (!phoneNumber || !Password) {
    return res.status(400).json({
      success: false,
      message: "phoneNumber and password required",
    });
  }
  const user = USERS.find(
    (u) => u.phoneNumber === phoneNumber && u.Password == Password
  );
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign(
    { id: user.id, phoneNumber: user.phoneNumber },
    JWT_SECRETS,
    { expiresIn: "1d" }
  );
  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
  });
});


app.get("/users", (req, res) => {
  res.json({
    success: true,
    totalUser: USERS.length,
    user: USERS,
  });
});
app.get("/user/:id", (req, res) => {
  const number = Number(req.params.id);
  const user = USERS.find((user) => user.id === number);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user doesn't exist ",
    });
  }
  res.status(200).json({
    user,
    success: true,
  });
});
app.delete("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = USERS.find((user) => user.id === userId);
  if (!index) {
    return res.status(404).json({
      message: "user not avail to delete",
      success: false,
    });
  }
  USERS.splice(index, 1);
  return res.status(200).json({
    message: "user deleted successfully",
    success: true,
  });
});
app.put("/user/:id/phone", (req, res) => {
  const id = Number(req.params.id);
  const { phoneNumber } = req.params;
  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }
  const user = USERS.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const phoneExists = USERS.find(
    (u) => (u.phoneNumber === phoneNumber) & (u.id !== id)
  );
  if (phoneExists) {
    return res.status(409).json({
      success: false,
      message: "Phone number already in use",
    });
  }
  user.phoneNumber = phoneNumber;

  res.status(200).json({
    success: true,
    message: "Phone number updated successfully",
    user,
  });
});
app.listen(3000, () => {
  console.log("server is listening to the port 3000");
});

// POST = create something new
// PUT = update an existing resource (replace)
// PATCH = update part of an existing resource

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

// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";

// const app = express();
// const server = http.createServer(app);

// // Express CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(bodyParser.json());

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// const emailToSocketMapping = new Map();
// const socketIdToEmail = new Map();
// io.on("connection", (socket) => {
//   console.log("Socket connected:", socket.id);
//   // socket.on("room:join", (data) => {
//   //   console.log(data);
//   // });
//   socket.on("room:join", (data) => {
//     const { roomId, emailId } = data;
//     // console.log("user", emailId, "joined room", roomId);
//     emailToSocketMapping.set(emailId, socket.id);
//     socketIdToEmail.set(roomId, emailId);
//     io.to(socket.id).emit("room:join", data);
//     socket.join(roomId);

//     socket.broadcast.to(roomId).emit("user-joined", { emailId });
//   });

//   socket.on("disconnect", () => {
//     console.log("Socket disconnected:", socket.id);
//   });
// });

// server.listen(8001, () => {
//   console.log("Server running on port 8001");
// });
