# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Simple alpine with files ready to copy
FROM alpine:latest

# Force rebuild - version marker
LABEL version="2.0" rebuild="force"

RUN apk --no-cache add ca-certificates

# Copy built files
COPY --from=build /app/dist /source

# Copy entrypoint script to custom location to avoid conflicts
COPY docker-entrypoint.sh /custom-entrypoint.sh
RUN chmod +x /custom-entrypoint.sh

# Verify entrypoint exists and show its content
RUN echo "=== Verifying entrypoint ===" && \
    ls -la /custom-entrypoint.sh && \
    echo "=== First 10 lines of entrypoint ===" && \
    head -10 /custom-entrypoint.sh && \
    echo "=== Entrypoint verified ==="

# Set entrypoint directly here
ENTRYPOINT ["/custom-entrypoint.sh"]

