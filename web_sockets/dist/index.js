import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8000 });
wss.on("connection", function (socket) {
    console.log("user connected");
    //   socket.send("hello");
    setInterval(() => {
        socket.send("current price of the solana is " + Math.random());
    }, 500);
    socket.on("message", (e) => {
        console.log(e.toString());
    });
});
//# sourceMappingURL=index.js.map