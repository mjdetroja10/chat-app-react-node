import express from "express";
import http from "http";
import { Server } from "socket.io";
import { port } from "./config/index.js";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let welcomeTextUsers = [];
io.on("connection", (socket) => {
  // create join function while user is joined the room
  socket.on("join_room", (data) => {
    socket.join(data?.room);

    // get username and its id for show text for user is joined the chat
    welcomeTextUsers.push({ username: data?.username, id: socket.id });
    io.sockets.to(data?.room).emit("join_welcome", welcomeTextUsers);
  });

  // with that get data from client side and create function for receiveing message
  socket.on("send-message", (data) => {
    socket.to(data.room).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    // remove user from welcomeTextUsers list while user leaves chat

    let disconnectUsers = welcomeTextUsers.filter(
      (user) => user.id !== socket.id
    );
    io.sockets.emit("disconnected_users", disconnectUsers);
  });
});

server.listen(port, (err) => {
  if (err) console.log(err, "error");
  console.log("server is running on port: " + port);
});
