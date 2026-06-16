from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .app_config import AppConfig

# create base model:
BaseModel = declarative_base()

class Dal:

    def create_session(self):
        
        # create an engine object (handles the connection to the database)
        engine = create_engine(AppConfig.connection_string)
 
        # create all tables defined in ORM models (that inherit from declarative_base)
        # NOTE: This creates tables if they don't already exist
        BaseModel.metadata.create_all(engine)
 
        # create a session factory bound to the engine:
        session_creator = sessionmaker(bind = engine)
 
        # create an actual session instance from the factory:
        session = session_creator()
 
        # return the session so it can be used for database operations:
        return session
    

dal = Dal()