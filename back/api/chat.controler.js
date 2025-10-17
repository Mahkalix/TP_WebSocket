import { ChatSocket } from '../chat/chat.socket.js';

export class ChatController {
    static post(req, res) {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        try {
            ChatSocket.INSTANCE.send(message);
            res.status(200).json({ success: true, message: 'Message sent' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}