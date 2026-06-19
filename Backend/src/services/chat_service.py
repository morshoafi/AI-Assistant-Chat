import uuid
from openai import OpenAI
from utils.app_config import AppConfig
from utils.dal import dal
from models.chat_model import ChatRequestSchema, ConversationModel, MessageModel

class ChatService:

    def __init__(self):
        # initialize OpenAI client and database session
        self.client = OpenAI(api_key = AppConfig.openai_api_key)
        self.session = dal.create_session()

    def get_or_create_conversation(self, session_id: str) -> ConversationModel:
        # check if conversation already exists in DB
        conversation = self.session.query(ConversationModel).filter(
            ConversationModel.session_id == session_id
        ).first()

        # if it doesn't exist, create a new one
        if not conversation:
            conversation = ConversationModel(session_id = session_id)
            self.session.add(conversation)
            self.session.commit()
            self.session.refresh(conversation)
        
        return conversation

    def handle_chat_message(self, request: ChatRequestSchema):
        try:
            # generate new session ID if missing or new
            if not request.session_id or request.session_id == "new":
                request.session_id = str(uuid.uuid4())

            # get or create the conversation object
            conversation = self.get_or_create_conversation(request.session_id)
            conv_id = conversation.id

            # save the user's message to MySQL
            user_msg = MessageModel(
                conversation_id = conv_id,
                sender = "user",
                content = request.message
            )
            self.session.add(user_msg)
            self.session.commit()

            # fetch full chat history for OpenAI context
            history = self.session.query(MessageModel).filter(
                MessageModel.conversation_id == conv_id
            ).order_by(MessageModel.created_at.asc()).all()

            # define AI persona
            system_prompt = {
                "role": "system", 
                "content": (
                    "You are a creative, helpful, and friendly AI assistant. "
                    "Always use emojis to make the conversation engaging. "
                    "Strictly use clean Markdown: use bold for emphasis, bullet points for lists, "
                    "and clear headers for structured info. Keep the tone professional but inviting."
                )
            }

            # inject system prompt at start of message list
            openai_messages = [system_prompt] + [
                {"role": "user" if getattr(m, "sender", "user") == "user" else "assistant", "content": str(getattr(m, "content", ""))}
                for m in history
            ]

            # send history to OpenAI and get response
            response = self.client.chat.completions.create(
                model = "gpt-4o-mini",
                messages = openai_messages  # type: ignore
            )
            assistant_text = response.choices[0].message.content

            # save OpenAI's response to MySQL
            assistant_msg = MessageModel(
                conversation_id = conv_id,
                sender = "assistant",
                content = assistant_text
            )
            self.session.add(assistant_msg)
            self.session.commit()
            self.session.refresh(assistant_msg)

            # return the final assistant message object
            return assistant_msg

        except Exception as e:
            self.session.rollback()
            raise e

    # ------------- closing and context manager ---------------

    def close(self):
        self.session.close()

    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc, tb):
        self.close()