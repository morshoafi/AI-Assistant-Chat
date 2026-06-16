from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

class LoggerMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # print HTTP method and route path
        print("Method:", request.method)
        print("Route:", request.url.path)

        # print request body if it exists
        try: 
            body_bytes = await request.body()
            body_text = body_bytes.decode("utf-8") 
            if body_text: 
                print("Body:", body_text)
        except:
            pass

        # proceed to the next middleware or controller
        response = await call_next(request)

        return response