class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.socket = io.connect("http://localhost:5000");
    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on("connect", () => {
      console.log("connection established using sockets");
      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "codeal",
      });
      self.socket.on("user_joined", (data) => {
        console.log("a user has joined !", data);
      });
    });
  }
}
