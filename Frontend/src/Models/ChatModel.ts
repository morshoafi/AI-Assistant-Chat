// model for incoming chat messages from the server
export interface ChatMessageModel {
    id: number;
    sender: "user" | "assistant";
    content: string;
    created_at: string;
    session_id?: string;
}

// model for outgoing chat requests sent to the server
export interface ChatRequestModel {
    session_id: string;
    message: string;
}