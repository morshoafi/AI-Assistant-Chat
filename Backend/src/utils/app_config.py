from dotenv import load_dotenv
from os import getenv

load_dotenv()

class AppConfig:
    # database connection string from classroom structure
    connection_string: str = str(getenv("CONNECTION_STRING"))
    
    # openAI API key for the chatbot integration
    openai_api_key: str = str(getenv("OPENAI_API_KEY"))