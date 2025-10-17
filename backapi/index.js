const express = require("express");
const http = require("http");
const cors = require("cors");
const ChatSocket = require("./chat/chat.socket");
const WhoIAmController = require("./api/whoami.controller");
const ChatController = require("./api/chat.controller");

const PORT = 3000;
const app = express();
const server = http.createServer(app);

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    })
);

ChatSocket.INSTANCE.setup(server);

app.use(express.static("../front/dist"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
    <h1>Chat App API</h1>
    <p>Le serveur fonctionne correctement !</p>
    <h2>Routes disponibles :</h2>
    <ul>
      <li>GET <a href="/api/whoami">/api/whoami</a> - Obtenir les adresses IP</li>
      <li>POST /api/chat - Envoyer un message</li>
    </ul>
  `);
});

app.get("/api/whoami", WhoIAmController.get);
app.post("/api/chat", ChatController.post);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});