from starlette.requests import Request

from app.guard import client_ip
from tests.conftest import ORIGIN, chat_body


def _request(peer: str, forwarded: str | None = None) -> Request:
    headers = []
    if forwarded is not None:
        headers.append((b"x-forwarded-for", forwarded.encode()))
    scope = {
        "type": "http",
        "asgi": {"version": "3.0"},
        "http_version": "1.1",
        "method": "POST",
        "scheme": "http",
        "path": "/api/chat",
        "raw_path": b"/api/chat",
        "query_string": b"",
        "headers": headers,
        "client": (peer, 1234),
        "server": ("test", 80),
    }
    return Request(scope)


def test_sixteenth_message_rests(client):
    body = chat_body()
    headers = {"origin": ORIGIN}
    for _ in range(15):
        response = client.post("/api/chat", json=body, headers=headers)
        assert response.status_code == 200, response.text
    rested = client.post("/api/chat", json=body, headers=headers)
    assert rested.status_code == 429
    assert rested.json() == {"error": "resting"}


def test_message_shape_limits(client):
    headers = {"origin": ORIGIN}
    too_long = client.post("/api/chat", json=chat_body("x" * 1501), headers=headers)
    assert too_long.status_code == 400
    assert too_long.json() == {"error": "too long"}

    too_many = client.post("/api/chat", json=chat_body(turns=13), headers=headers)
    assert too_many.status_code == 400
    assert too_many.json() == {"error": "too many turns"}


def test_missing_origin_is_forbidden(client):
    response = client.post("/api/chat", json=chat_body())
    assert response.status_code == 403
    assert response.json() == {"error": "forbidden"}


def test_forwarded_for_trusts_two_hops():
    assert client_ip(_request("10.0.0.8", "203.0.113.5, 172.16.0.4")) == "203.0.113.5"


def test_public_peer_ignores_forwarded_for():
    assert client_ip(_request("8.8.8.8", "203.0.113.5")) == "8.8.8.8"
