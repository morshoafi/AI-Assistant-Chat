import axios from "axios";
import { ChatMessageModel } from "../Models/ChatModel";
import { appConfig } from "../Utils/AppConfig";

class ChatService {
    public async sendMessage(sessionId: string, message: string): Promise<ChatMessageModel> {
        // send session_id and message exactly as the backend expects
        const response = await axios.post<ChatMessageModel>(appConfig.chatUrl, { 
            session_id: sessionId, 
            message: message 
        });
        return response.data;
    }
}

export const chatService = new ChatService();