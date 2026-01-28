import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        console.log("message received: " + message.toString());
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            //@ts-ignore
            s.send(message.toString());
        }
    });
});
//# sourceMappingURL=index.js.map