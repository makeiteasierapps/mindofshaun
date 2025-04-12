import sys
import logging
import os
import traceback
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import socketio
import dspy
from server.services.SocketClient import socket_client
from server.utils.mongo_client import MongoDbClient
from server.routes.blog import router as blog_router
from server.routes.projects import router as projects_router
from server.routes.blog_ai_tools import router as blog_ai_router
from server.routes.admin import router as admin_router

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    mongo_client = MongoDbClient('personal_page')
    app.state.mongo_client = mongo_client

    # Setup Socket.IO event handlers after system_state_manager is initialized
    # from app.socket_handlers.setup_socket_handlers import setup_socket_handlers
    # setup_socket_handlers(socket_client, app)
    # app.state.sio = socket_client
    yield

async def error_handling_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        stack_trace = traceback.format_exception(exc_type, exc_value, exc_traceback)
        
        logger.error(f"Unhandled error: {str(e)}")
        logger.error(f"Stack trace: {''.join(stack_trace)}")
        
        return JSONResponse(
            status_code=500,
            content={
                "error": str(e),
                "type": exc_type.__name__,
                "stack_trace": stack_trace
            }
        )

def create_app():
    app = FastAPI(lifespan=lifespan)
    socket_app = socketio.ASGIApp(socket_client, app)

    # Initialize DSPy
    os.getenv("OPENAI_API_KEY")
    lm = dspy.LM('openai/gpt-4o-mini')
    dspy.configure(lm=lm)
    app.middleware("http")(error_handling_middleware)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://mindofshaun.com", "http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"],
        allow_headers=["Content-Type", "Accept", "dbName", "uid", 'Kb-ID'],
    )

    app.include_router(blog_router)
    app.include_router(projects_router)
    app.include_router(blog_ai_router)
    app.include_router(admin_router)
    return socket_app