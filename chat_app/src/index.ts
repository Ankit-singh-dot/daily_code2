import { WebSocket, WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
interface User {
  socket: WebSocket;
  room: string;
}
const allSocket: User[] = [];
wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    // @ts-ignore
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "join") {
      console.log("user joined room" + parsedMessage.payload.roomId);
      allSocket.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      console.log("user want to chat ")
      let currentUserRoom = null;

      for (let i = 0; i < allSocket.length; i++) {
        if (allSocket[i]?.socket == socket) {
          currentUserRoom = allSocket[i]?.room;
        }
      }
      console.log("enfwongkprgn")
      for (let i = 0; i < allSocket.length; i++) {
         console.log("reached hee")
        if (allSocket[i]?.room == currentUserRoom) {
          allSocket[i]?.socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});
