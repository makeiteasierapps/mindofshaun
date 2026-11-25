# --- Web build ---
FROM node:20-alpine AS web-builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit
COPY . .
RUN npm run build

# --- API and built site, one process on port 8000 ---
FROM python:3.12-slim AS runtime

COPY --from=ghcr.io/astral-sh/uv:0.12.5 /uv /uvx /bin/

WORKDIR /app
COPY server/pyproject.toml server/uv.lock ./
RUN uv sync --frozen --no-dev

COPY server/app ./app
COPY --from=web-builder /app/dist ./static

ENV PATH="/app/.venv/bin:$PATH" \
    STATIC_DIR=/app/static \
    APP_ENV=production \
    PYDANTIC_AI_NO_BANNER=1

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
