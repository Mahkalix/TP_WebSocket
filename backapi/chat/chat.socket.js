const { Server } = require("socket.io");

class ChatSocket {
    static INSTANCE = new ChatSocket();
    static OUT = "message";
    static IN = "message";
    static CORS = {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    };

    io;

    setup(httpServer) {
        this.io = new Server(httpServer, {
            cors: ChatSocket.CORS,
            pingTimeout: 60000,
            pingInterval: 25000,
            connectTimeout: 45000,
            transports: ["websocket", "polling"],
        });
        this.io.on("connection", (socket) => this.onConnected(socket));
    }

    send(message) {
        console.log(`>>> ${message}`);
        this.io.emit(ChatSocket.OUT, message);
    }

    onConnected(socket) {
        console.log(`Client ${socket.id} connecté`);
        socket.emit(ChatSocket.OUT, "Bienvenue !");
        socket.on(ChatSocket.IN, (message) => this.onMessage(socket, message));
        socket.on("disconnect", (reason) => {
            console.log(`Client ${socket.id} déconnecté : ${reason}`);
        });
    }

    onMessage(socket, message) {
        console.log(`(${socket.id}) Message reçu :`, message);
        socket.emit("echo", `Echo: ${message}`);
    }
}

module.exports = ChatSocket;