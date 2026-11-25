"""HTTP API and built frontend files. Unknown paths, including unknown /api paths, are 404."""

import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, Response
from pydantic_ai.ui.vercel_ai import VercelAIAdapter

from app.agent import MODEL_SETTINGS, USAGE_LIMITS, agent
from app.config import allowed_origin, app_env, static_dir
from app.guard import ShapeError, check_messages, client_ip, limiter, origin_allowed

logger = logging.getLogger("app.chat")
logger.setLevel(logging.INFO)
logging.getLogger("uvicorn.access").disabled = True

MAX_BODY_BYTES = 65_536


def log_complete(result: object) -> None:
    usage = getattr(result, "usage", None)
    response = getattr(result, "response", None)
    model_name = getattr(response, "model_name", None)
    logger.info(
        "chat complete model=%s input_tokens=%s output_tokens=%s requests=%s",
        model_name,
        getattr(usage, "input_tokens", None),
        getattr(usage, "output_tokens", None),
        getattr(usage, "requests", None),
    )


def _reject(reason: str, status: int) -> JSONResponse:
    limiter.note_rejected()
    logger.info(
        "chat rejected reason=%s rejected=%s accepted=%s",
        reason,
        limiter.rejected,
        limiter.accepted,
    )
    return JSONResponse({"error": reason}, status_code=status)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    async with agent:
        yield


app = FastAPI(
    title="mindofshaun",
    max_body_size=MAX_BODY_BYTES,
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

_cors: dict[str, object] = {
    "allow_origins": [allowed_origin()],
    "allow_methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["content-type", "accept"],
    "allow_credentials": False,
}
if app_env() != "production":
    _cors["allow_origin_regex"] = r"http://(localhost|127\.0\.0\.1)(:\d+)?$"
app.add_middleware(CORSMiddleware, **_cors)


@app.exception_handler(HTTPException)
async def http_error(_request: Request, exc: HTTPException) -> JSONResponse:
    status = 404 if exc.status_code == 405 else exc.status_code
    detail = "Not Found" if status == 404 else exc.detail
    return JSONResponse({"detail": detail}, status_code=status)


@app.get("/api/health")
async def health() -> dict[str, bool]:
    return {"ok": True}


@app.post("/api/chat")
async def chat(request: Request) -> Response:
    if not origin_allowed(request.headers.get("origin")):
        return _reject("forbidden", 403)
    try:
        payload = await request.json()
    except Exception:
        logger.error("chat error type=BadJson")
        return _reject("bad request", 400)
    if not isinstance(payload, dict):
        return _reject("bad request", 400)
    try:
        check_messages(payload.get("messages"))
    except ShapeError as exc:
        return _reject(exc.error, 400)
    if not limiter.allow(client_ip(request)):
        return _reject("resting", 429)
    logger.info("chat accepted accepted=%s rejected=%s", limiter.accepted, limiter.rejected)
    try:
        return await VercelAIAdapter.dispatch_request(
            request,
            agent=agent,
            sdk_version=6,
            usage_limits=USAGE_LIMITS,
            model_settings=MODEL_SETTINGS,
            on_complete=log_complete,
            manage_message_history="client",
        )
    except Exception as exc:
        logger.error("chat error type=%s", type(exc).__name__)
        raise


def _static_file(path: str) -> Path | None:
    root = static_dir().resolve()
    if not path or path.endswith("/"):
        return None
    candidate = (root / path).resolve()
    try:
        candidate.relative_to(root)
    except ValueError:
        return None
    if candidate.is_file():
        return candidate
    return None


@app.get("/")
async def index() -> FileResponse:
    page = static_dir().resolve() / "index.html"
    if page.is_file():
        return FileResponse(page)
    raise HTTPException(status_code=404)


@app.api_route(
    "/api/{path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
)
async def unknown_api(path: str) -> None:
    raise HTTPException(status_code=404)


@app.get("/{path:path}")
async def static_file(path: str) -> FileResponse:
    if path == "api" or path.startswith("api/"):
        raise HTTPException(status_code=404)
    found = _static_file(path)
    if found is None:
        raise HTTPException(status_code=404)
    return FileResponse(found)
