from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

def register_exception_handlers(server: FastAPI) -> None:

    # handle standard HTTP exceptions
    @server.exception_handler(HTTPException)
    def http_exception_handler(request: Request, err: HTTPException) -> JSONResponse:
        print("HTTP Error:", str(err))
        return JSONResponse(status_code = err.status_code, content = {"message": err.detail})

    # handle validation errors (e.g. missing or wrong data fields from request)
    @server.exception_handler(RequestValidationError)
    def validation_exception_handler(request: Request, err: RequestValidationError) -> JSONResponse:
        print("Validation Error:", str(err))
        try:
            all_errors = err.errors()
            first_error = all_errors[0]
            prop_name = first_error["loc"][1]
            err_msg = first_error["msg"]
            message = f"Invalid {prop_name}: {err_msg}"
        except:
            message = str(err)
        return JSONResponse(status_code = status.HTTP_400_BAD_REQUEST, content = {"message": message})

    # handle any other general internal server errors
    @server.exception_handler(Exception)
    def general_exception_handler(request: Request, err: Exception) -> JSONResponse:
        # log the real error internally for YOU to see
        print("CRITICAL ERROR:", str(err)) 
        
        # return a generic message to the client
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            content={"message": "An unexpected error occurred. Please try again later."}
        )