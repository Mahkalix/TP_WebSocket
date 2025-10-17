const ChatSocket = require("../chat/chat.socket");

class ChatController {
    static post(req, res) {
        console.log(req.body);
        ChatSocket.INSTANCE.send(req.body.message);
        res.status(200).send();
    }
}

module.exports = ChatController;
