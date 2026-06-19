import uuid
from fastapi import APIRouter, status
from models.chat_model import ChatRequestSchema, MessageResponseSchema
from services.chat_service import ChatService

router = APIRouter()

@router.post("/api/chat", status_code=status.HTTP_200_OK, response_model=MessageResponseSchema)
def handle_chat_message(chat_schema: ChatRequestSchema):
    # delegate session management and message processing to the service
    with ChatService() as chat_service:
        db_message = chat_service.handle_chat_message(chat_schema)
        
        # return the response using the session_id updated by the service
        return {
            "id": db_message.id,
            "session_id": chat_schema.session_id, 
            "sender": db_message.sender,
            "content": db_message.content,
            "created_at": db_message.created_at
        }