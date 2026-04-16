import { WebSocket, WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
interface User {
  socket: WebSocket;
  room: string;
}
const allSocket: User[] = [];
wss.on("connection", (socket) => {
  socket.on("message", (message:any) => {
    const parsedMessages = JSON.parse(message);

    if (parsedMessages.type === "join") {
      console.log("user joined room" + parsedMessages.payload.roomId);
      allSocket.push({
        socket,
        room: parsedMessages.payload.roomId,
      });
    }
    if (parsedMessages.type === "chat") {
      console.log("user wants to chat ");
      let currentUserRoom = null;
      for (let i = 0; i < allSocket.length; i++) {
        if (allSocket[i]?.socket == socket) {
          currentUserRoom = allSocket[i]?.room;
        }
      }
      console.log("after chat");
      for (let i = 0; i < allSocket.length; i++) {
        console.log("reached here");
        if (allSocket[i]?.room == currentUserRoom) {
          allSocket[i]?.socket.send(parsedMessages.payload.messages);
        }
      }
    }
  });
});
