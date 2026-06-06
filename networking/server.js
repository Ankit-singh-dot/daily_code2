import dgram from "node:dgram";
const socket = dgram.createSocket("udp4");
socket.on("message", (message, address) => {
  const receivedMessage = message.toString();
  console.log(receivedMessage);
  socket.send(
    "Message received from clint side",
    address.port,
    address.address
  );
});
//  bind make the server
socket.on("listening", () => {
  console.log(socket.address());
  const address = socket.address();
  console.log(address.port);
});
socket.bind({ port: 4000 });
