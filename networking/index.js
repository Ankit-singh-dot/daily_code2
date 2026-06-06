import dgram from "node:dgram";
const socket = dgram.createSocket("udp4");
// socket.on("message", (message, address) => {
//   const receivedMessage = message.toString();
//   console.log(receivedMessage);
//   console.log(address);
// });
socket.on("message", (message, address) => {
  console.log(message.toString());
  console.log(address);
});

socket.send("hey from client side", 4000, "192.168.31.178", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Message sent");
  }
});
