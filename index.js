import dotenv from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const app = express();
dotenv.config();

const PORT = process.env.PORT;



const server = require("http").createServer(app);


const io = require("socket.io")(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST"]
  }
});

io.on("connect", (socket) => {
  console.log("user connected", socket.id);
  socket.on("chat-msg", function (data) {
    io.emit("chat-msg", data);
  });
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);




// const app = require("express")();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"]
//     }
//   });

server.listen(3001, function () {
  console.log(`SOCKET-IO RUNNING... GO CATCH IT`);
});