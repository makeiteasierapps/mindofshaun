import os

os.environ["CHAT_MODEL"] = "test"
os.environ["CHAT_FALLBACK_MODEL"] = ""
os.environ["PYDANTIC_AI_NO_BANNER"] = "1"
os.environ.setdefault("APP_ENV", "development")
os.environ.setdefault("ALLOWED_ORIGIN", "https://mindofshaun.com")
os.environ.setdefault("DAILY_REQUEST_CAP", "400")
os.environ.setdefault("TRUSTED_PROXY_COUNT", "2")

import pytest
from fastapi.testclient import TestClient

from app.guard import limiter
from app.main import app

ORIGIN = "https://mindofshaun.com"


@pytest.fixture(autouse=True)
def _reset_limiter():
    limiter.reset()
    yield
    limiter.reset()


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def chat_body(text: str = "What do you build?", turns: int = 1) -> dict:
    messages = []
    for index in range(turns):
        messages.append(
            {
                "id": f"m{index}",
                "role": "user",
                "parts": [{"type": "text", "text": text if index == turns - 1 else "hi"}],
            }
        )
    return {"id": "c1", "trigger": "submit-message", "messages": messages}
