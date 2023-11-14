import { Server } from "socket.io";

export const chatSockets = (socketServer) => {
  let io = new Server(socketServer, {
    cors: {
      origin: "*",
    },
  });
  io.sockets.on("connection", (socket) => {
    console.log("new connection received ", socket.id);
    socket.on("disconnect", () => {
      console.log("socket disconnected!");
    });
    socket.on("join_room", function (data) {
      console.log("joining request received :", data);
      socket.join(data.chatroom);
      io.in(data.chatroom).emit("user_joined :", data);
    });
    // CHANGE :: detect send_message and broadcast to everyone in the room
    socket.on("send_message", function (data) {
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
