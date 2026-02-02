import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
let allSocket: WebSocket[] = [];
wss.on("connection", (socket) => {
  allSocket.push(socket);
  userCount = userCount + 1;
  console.log("user connected " + userCount);
  socket.on("message", (message) => {
    console.log("message received" + message.toString());
    // setTimeout(() => {
    //   socket.send(message.toString() + "message send from the origin");
    // }, 1000);
    //  this upper code is for the reply of the origin not for all the things

    for (let i = 0; i < allSocket.length; i++) {
      const s = allSocket[i];
      s?.send(message.toString() + ": send from the another server ");
    }
  });
});
