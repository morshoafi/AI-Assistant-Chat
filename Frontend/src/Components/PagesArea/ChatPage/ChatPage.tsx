import { useState, useRef, useEffect, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { ChatMessageModel } from "../../../Models/ChatModel";
import { chatService } from "../../../Services/ChatService";
import ReactMarkdown from "react-markdown";
import "./ChatPage.css";

export function ChatPage() {
    // state management
    const [messages, setMessages] = useState<ChatMessageModel[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // refs
    const sessionIdRef = useRef<string>("new");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // auto-scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // focus input on mount
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    // handlers
    const startNewChat = () => {
        setMessages([]);
        sessionIdRef.current = "new";
        textareaRef.current?.focus();
    };

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // take value directly from ref to ensure latest text (including pasted one)
        const userText = textareaRef.current?.value.trim();
        
        if (!userText || isLoading) return;

        // clear UI inputs
        setInput("");
        setIsLoading(true);

        // create message object
        const userMsg: ChatMessageModel = {
            id: Date.now(),
            sender: "user",
            content: userText,
            created_at: new Date().toISOString()
        };
        
        setMessages((prev) => [...prev, userMsg]);

        try {
            const botResponse = await chatService.sendMessage(sessionIdRef.current, userText);
            
            if (botResponse.session_id) {
                sessionIdRef.current = botResponse.session_id;
            }
            
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Chat Error:", error);
            
            const errorMsg: ChatMessageModel = {
                id: Date.now(),
                sender: "assistant",
                content: "Sorry, I couldn't connect to the server.",
                created_at: new Date().toISOString()
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
            
            // reset textarea height and focus
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.classList.remove('textarea-maxed');
                
                // focus back on input
                setTimeout(() => textareaRef.current?.focus(), 100);
            }
        }
    };

    const isHebrew = (text: string) => /[\u0590-\u05FF]/.test(text);

    // auto-resize logic for textarea
    const handleInputResize = (target: HTMLTextAreaElement) => {
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
        
        // add class if it hits the limit 
        if (target.scrollHeight >= 120) {
            target.classList.add('textarea-maxed');
        } else {
            target.classList.remove('textarea-maxed');
        }
    };

    return (
        <div className="chat-container">
            {/* header */}
            <div className="chat-header">
                <div className="header-info">
                    <span className="status-dot"></span>
                    <span className="status-text">Online</span>
                </div>
                <button onClick={startNewChat} className="new-chat-btn">New Chat 📝</button>
            </div>

            {/* messages list */}
            <div className="messages-list">
                {messages.length === 0 ? (
                    <div className="empty-state">
                        <svg className="welcome-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"></path>
                        </svg>
                        <h2>AI Assistant</h2>
                        <p>I'm your AI Assistant. Ask me anything, or start by exploring the features!</p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const rtl = isHebrew(msg.content);
                        return (
                            <div 
                                key={msg.id} 
                                className={`message-bubble ${msg.sender} ${rtl ? 'rtl' : 'ltr'}`}
                            >
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        );
                    })
                )}
                
                {isLoading && (
                    <div className="message-bubble assistant loading-bubble">
                        <div className="spinner">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* input area */}
            <form onSubmit={handleSubmit} className="chat-input-area">
                <textarea 
                    className="chat-textarea"
                    dir="auto"
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => {
                        handleInputChange(e);
                        handleInputResize(e.target);
                    }}
                    onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e as any);
                        }
                    }}
                    placeholder="Type your message here..."
                    disabled={isLoading}
                    rows={1}
                />
                <button type="submit" className="send-btn" disabled={isLoading}>
                    ➔
                </button>
            </form>
        </div>
    );
}