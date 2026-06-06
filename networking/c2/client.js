import dgram from "node:dgram";
import { createReadStream, read } from "node:fs";
const socket = dgram.createSocket("udp4");

socket.on("message", (message, address) => {
  console.log(address.address);
  console.log(message.toString());
});

const readStream = createReadStream("/Users/ankitsingh/Desktop/send.mov", {
  highWaterMark: 1000,
});

readStream.on("data", (chunk) => {
  socket.send(chunk, 4000, "192.168.31.178", () => {
    console.log("message sent");
  });
});

readStream.on("end", () => {
  socket.send("session ended", 4000, "192.168.31.178");
});
