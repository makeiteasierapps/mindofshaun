# --- Stage 1: Build the React frontend ---
FROM node:20-alpine AS client-builder

# Install dependencies first (separate from code to improve caching)
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

# Copy source and build 
COPY . .
ARG VITE_BACKEND_URL_PROD
ENV VITE_BACKEND_URL_PROD=${VITE_BACKEND_URL_PROD}
RUN npm run build

# --- Stage 2: Backend + NGINX ---
FROM python:3.11-slim AS server-builder

# Install Python dependencies first (separate layer)
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install OS packages in a single layer
RUN apt-get update && \
    apt-get install -y --no-install-recommends nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Python backend code
COPY server/ ./server/
COPY run.py .

# Copy built static files from client
COPY --from=client-builder /app/dist /dist

# Configure nginx
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