from datetime import datetime
from typing import Annotated
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, func
from utils.dal import BaseModel  
from pydantic import BaseModel as BaseSchema, Field

class ConversationModel(BaseModel):
    __tablename__ = "conversations"
    
    id = Column(Integer, primary_key = True, autoincrement = True)
    session_id = Column(String(255), unique = True, nullable = False, index = True)
    created_at = Column(DateTime, server_default = func.now())


class MessageModel(BaseModel):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key = True, autoincrement = True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable = False, index = True)
    sender = Column(String(50), nullable = False)  # 'user' or 'assistant'
    content = Column(Text, nullable = False)
    created_at = Column(DateTime, server_default = func.now())

class ChatRequestSchema(BaseSchema):
    # required data from React to process a chat message
    session_id: str = Field(..., min_length=36, max_length=36)
    message: Annotated[str, Field(min_length=1, max_length=2000)]


class MessageResponseSchema(BaseSchema):
    # structure for returning saved messages back to React
    id: int
    session_id: str
    sender: str
    content: str
    created_at: datetime

