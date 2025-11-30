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

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Verify entrypoint exists and is executable
RUN ls -la /docker-entrypoint.sh && head -5 /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

