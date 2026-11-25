"""Origin, client IP, and in-memory rate limits.

Counters live in this process so a limit can be enforced. They are not logged,
written, or sent anywhere. Restarting the process clears them.
"""

import ipaddress
import threading
import time
from collections import deque
from datetime import UTC, datetime
from urllib.parse import urlsplit

from starlette.requests import Request

from app.config import allowed_origin, app_env, daily_request_cap, trusted_proxy_count

BURST_LIMIT = 15
BURST_WINDOW_SECONDS = 10 * 60
DAILY_PER_IP = 40
MAX_USER_CHARS = 1500
MAX_USER_TURNS = 12


class ShapeError(Exception):
    def __init__(self, error: str) -> None:
        self.error = error
        super().__init__(error)


def origin_allowed(origin: str | None) -> bool:
    if not origin:
        return False
    if origin == allowed_origin():
        return True
    if app_env() == "production":
        return False
    parts = urlsplit(origin)
    if parts.scheme != "http":
        return False
    return parts.hostname in {"localhost", "127.0.0.1"}


def _trusted_peer(host: str) -> bool:
    try:
        address = ipaddress.ip_address(host)
    except ValueError:
        return False
    return address.is_private or address.is_loopback


def client_ip(request: Request) -> str:
    """IP used for limits.

    X-Forwarded-For is ignored unless the TCP peer is loopback or private and
    TRUSTED_PROXY_COUNT is at least 1. The chain is the forwarded parts plus
    that peer. The client is `len(chain) - hops - 1`, clamped at 0, so two
    trusted hops (edge, then ingress) resolve to the visitor.
    """
    peer = request.client.host if request.client and request.client.host else "unknown"
    hops = trusted_proxy_count()
    if hops <= 0 or not _trusted_peer(peer):
        return peer
    forwarded = request.headers.get("x-forwarded-for", "")
    parts = [part.strip() for part in forwarded.split(",") if part.strip()]
    chain = [*parts, peer]
    index = max(0, len(chain) - hops - 1)
    return chain[index]


def _utc_day_start(now: float) -> float:
    moment = datetime.fromtimestamp(now, UTC)
    start = moment.replace(hour=0, minute=0, second=0, microsecond=0)
    return start.timestamp()


def message_text(message: object) -> str:
    if not isinstance(message, dict):
        return ""
    chunks: list[str] = []
    parts = message.get("parts")
    if isinstance(parts, list):
        for part in parts:
            if isinstance(part, dict) and part.get("type") == "text" and isinstance(part.get("text"), str):
                chunks.append(part["text"])
    if chunks:
        return "".join(chunks)
    content = message.get("content")
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        for part in content:
            if not isinstance(part, dict):
                continue
            text = part.get("text")
            if isinstance(text, str):
                chunks.append(text)
    return "".join(chunks)


def check_messages(messages: object) -> None:
    if not isinstance(messages, list):
        raise ShapeError("bad request")
    users = [message for message in messages if isinstance(message, dict) and message.get("role") == "user"]
    if not users:
        raise ShapeError("empty")
    latest = message_text(users[-1])
    if len(latest) > MAX_USER_CHARS:
        raise ShapeError("too long")
    if len(users) > MAX_USER_TURNS:
        raise ShapeError("too many turns")
    if not latest.strip():
        raise ShapeError("empty")


class Limiter:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._hits: dict[str, deque[float]] = {}
        self._global: deque[float] = deque()
        self.accepted = 0
        self.rejected = 0

    def reset(self) -> None:
        with self._lock:
            self._hits.clear()
            self._global.clear()
            self.accepted = 0
            self.rejected = 0

    def note_rejected(self) -> None:
        with self._lock:
            self.rejected += 1

    def allow(self, ip: str, now: float | None = None) -> bool:
        moment = time.time() if now is None else now
        day_start = _utc_day_start(moment)
        window_start = moment - BURST_WINDOW_SECONDS
        keep_after = min(day_start, window_start)
        with self._lock:
            self._prune(self._global, keep_after)
            hits = self._hits.get(ip)
            if hits is None:
                hits = deque()
            else:
                self._prune(hits, keep_after)
            recent = sum(1 for stamp in hits if stamp >= window_start)
            today = sum(1 for stamp in hits if stamp >= day_start)
            global_today = sum(1 for stamp in self._global if stamp >= day_start)
            if recent >= BURST_LIMIT or today >= DAILY_PER_IP or global_today >= daily_request_cap():
                if not hits:
                    self._hits.pop(ip, None)
                return False
            hits.append(moment)
            self._hits[ip] = hits
            self._global.append(moment)
            self.accepted += 1
            return True

    @staticmethod
    def _prune(stamps: deque[float], keep_after: float) -> None:
        while stamps and stamps[0] < keep_after:
            stamps.popleft()


limiter = Limiter()
