import dgram from "node:dgram";
import { createWriteStream } from "node:fs";
const socket = dgram.createSocket("udp4");
const writeFile = createWriteStream("number.mov");
socket.on("message", async (message, address) => {
  if (message.toString() === "session ended") {
    socket.send("completed", address.port, address.address);
  } else {
    writeFile.write(message);
  }
});

socket.bind({ port: 4000 });
