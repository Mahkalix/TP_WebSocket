import express from "express";
import * as http from "node:http";
import { ChatSocket } from "./chat/chat.socket.js";
import { ChatController as ChatControler } from "./api/chat.controler.js";
import { WhoIAmController as WholAmControler } from "./api/whoami.controler.js";

const PORT = 3001;
const app = express();
const server = http.createServer(app);

// WebSocket
ChatSocket.INSTANCE.setup(server);

// Front API
app.use(express.static('../front/dist'));
app.use(express.json());
app.get('/api/whoami', WholAmControler.get);
app.post('/api/chat', ChatControler.post);

// Écoute de l'API et de la WebSocket
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});