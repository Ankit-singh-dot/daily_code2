import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    userCount = userCount + 1;
    console.log("user connected " + userCount);
    socket.on("message", (message) => {
        console.log("message received" + message.toString());
        setTimeout(() => {
            socket.send(message.toString() + ": Sent from the server ");
        }, 1000);
    });
});
//# sourceMappingURL=index.js.map