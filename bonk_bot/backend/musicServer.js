// server.mjs
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import path, { dirname, join } from "path";
import os from "os";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const http = createServer(app);
const io = new Server(http);
const PORT = 3000;

app.use(express.static(join(__dirname, "public")));
let clients = [];
let currentPlaybackState = {
  isPlaying: false,
  audioUrl: null,
  filename: null,
  timestamp: 0,
  startTime: null,
  serverStartTime: null,
};


app.get("/stream/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = join(__dirname, "music", filename);


  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Audio file not found");
  }

  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Content-Length": stat.size,
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-cache",
  });

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);

  stream.on("error", (err) => {
    console.error("Stream error:", err);
    res.end();
  });
});
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);
clients.push(socket.id);
  io.emit("clientCount", clients.length);
  socket.emit("currentState", currentPlaybackState);
  socket.on("startPlayback", (data) => {
    console.log("▶️ Starting synchronized playback");

    const startTime = Date.now() + 1000;

    currentPlaybackState = {
      isPlaying: true,
audioUrl: `/stream/${data.filename}`,
filename: data.filename,
      timestamp: data.timestamp || 0,
startTime: startTime,
      serverStartTime: Date.now() + 1000,
    };

    io.emit("syncPlay", currentPlaybackState);
  });


  socket.on("updatePosition", (data) => {
    if (currentPlaybackState.isPlaying) {
      currentPlaybackState.timestamp = data.timestamp;
      currentPlaybackState.serverStartTime = Date.now();
    }
  });


  socket.on("pausePlayback", (data) => {
    currentPlaybackState.isPlaying = false;
    currentPlaybackState.timestamp = data.timestamp || 0;
    io.emit("syncPause", { timestamp: currentPlaybackState.timestamp });
  });


  socket.on("seekPlayback", (data) => {
    const startTime = Date.now() + 500; // buffer
    currentPlaybackState.timestamp = data.timestamp;
    currentPlaybackState.serverStartTime = Date.now() + 500;
    io.emit("syncSeek", { startTime, timestamp: data.timestamp });
  });


  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
    clients = clients.filter((id) => id !== socket.id);
    io.emit("clientCount", clients.length);
  });
});


http.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🎵 WiFi Party Mode Server Running!`);
  console.log(`\n📱 DJ Control Panel: http://localhost:${PORT}`);
  console.log(`📱 Client Join Page: http://localhost:${PORT}/client.html`);
  console.log(`\n🌐 Share this IP with friends on same WiFi:`);

  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    interfaces[iface].forEach((addr) => {
      if (addr.family === "IPv4" && !addr.internal) {
        console.log(`   http://${addr.address}:${PORT}/client.html`);
      }
    });
  }
});
