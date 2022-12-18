const express = require("express");
const socket = require("socket.io");
const app = express();
const server = require("http").Server(app);
let usersConnected = 0;
const PORT = 3000;

app.use(express.static("Frontend"));
server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

const checkNumberOfUsers = () => {
  console.log(`Users connected:${usersConnected} `);
};

const io = socket(server);

io.on("connection", (socket) => {
  usersConnected++;
  checkNumberOfUsers();

  socket.on("username", (data) => {
    io.sockets.emit("username", data);
  });

  socket.on("newMessage", (data) => {
    io.sockets.emit("newMessage", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", (data) => {
    socket.broadcast.emit("stopTyping", data);
  });
});
