import uuid
from fastapi import APIRouter, status
from models.chat_model import ChatRequestSchema, MessageResponseSchema
from services.chat_service import ChatService

router = APIRouter()

@router.post("/api/chat", status_code=status.HTTP_200_OK, response_model=MessageResponseSchema)
def handle_chat_message(chat_schema: ChatRequestSchema):
    # generate new session ID if missing or new
    if not chat_schema.session_id or chat_schema.session_id == "new":
        chat_schema.session_id = str(uuid.uuid4())
    
    # process message via chat service
    with ChatService() as chat_service:
        db_message = chat_service.handle_chat_message(chat_schema)
        return {
            "id": db_message.id,
            "session_id": chat_schema.session_id, 
            "sender": db_message.sender,
            "content": db_message.content,
            "created_at": db_message.created_at
        }