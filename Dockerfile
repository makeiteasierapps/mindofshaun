# --- Stage 1: Build the React frontend ---
FROM node:20-alpine AS client-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Pass build-time environment variables
ARG VITE_BACKEND_URL_PROD
ENV VITE_BACKEND_URL_PROD=${VITE_BACKEND_URL_PROD}
RUN npm run build

# --- Stage 2: Backend + NGINX ---
FROM python:3.11-slim

# Install required packages
RUN apt-get update && \
    apt-get install -y nginx && \
    pip install --no-cache-dir uvicorn

# Set workdir
WORKDIR /app

# Copy Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Python backend code
COPY server/ ./server/
COPY run.py .

# Copy built static files from client
COPY --from=client-builder /app/dist /dist

# Copy nginx config and create needed directories
COPY nginx/nginx.conf /etc/nginx/sites-available/default
RUN mkdir -p /var/log/nginx && \
    mkdir -p /var/lib/nginx/body && \
    mkdir -p /run/nginx && \
    chown -R www-data:www-data /var/log/nginx /var/lib/nginx /run/nginx && \
    ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log && \
    ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Expose the container port (NGINX listens here)
EXPOSE 6066

# Start NGINX and the Python API server
CMD service nginx start && python run.py