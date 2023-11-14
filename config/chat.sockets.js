import { Server } from "socket.io";

export const chatSockets = (socketServer) => {
  let io = new Server(socketServer, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("new connection received ", socket.id);
    socket.on("disconnect", () => {
      console.log("socket disconnected!");
    });
  });
};
