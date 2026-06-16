from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.chat_controller import router as chat_router
from middleware.logger_middleware import LoggerMiddleware
from middleware.exception_handler import register_exception_handlers
from uvicorn import run

# create main server
server = FastAPI()

# register exception handler to format server errors neatly
register_exception_handlers(server)

# register CORS middleware to allow React to communicate with FastAPI
server.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:4000"],
    allow_credentials = True,
    allow_methods = ["GET", "POST"],
    allow_headers = ["*"],
)

# register the logger middleware to track requests in the terminal
server.add_middleware(LoggerMiddleware)

# register chat route
server.include_router(chat_router)

# run server
if __name__ == "__main__":
    run("app:server", port = 4000, reload = True)