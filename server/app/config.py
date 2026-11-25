"""Environment configuration. The only hardcoded model name is the default below."""

import os
from pathlib import Path

from dotenv import load_dotenv

_SERVER_DIR = Path(__file__).resolve().parents[1]
load_dotenv(_SERVER_DIR / ".env", override=False)

# Single default. Every other model name comes from the environment.
DEFAULT_CHAT_MODEL = "anthropic:claude-haiku-4-5"

REPO_ROOT = Path(__file__).resolve().parents[2]


def chat_model() -> str:
    return os.getenv("CHAT_MODEL") or DEFAULT_CHAT_MODEL


def chat_fallback_model() -> str | None:
    value = os.getenv("CHAT_FALLBACK_MODEL", "").strip()
    return value or None


def allowed_origin() -> str:
    return os.getenv("ALLOWED_ORIGIN", "https://mindofshaun.com")


def app_env() -> str:
    return os.getenv("APP_ENV", "development")


def trusted_proxy_count() -> int:
    return int(os.getenv("TRUSTED_PROXY_COUNT", "2"))


def daily_request_cap() -> int:
    return int(os.getenv("DAILY_REQUEST_CAP", "400"))


def static_dir() -> Path:
    raw = os.getenv("STATIC_DIR", "").strip()
    if raw:
        return Path(raw)
    return REPO_ROOT / "dist"
