# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Copy to volume
FROM alpine:latest

RUN apk --no-cache add ca-certificates
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

# Keep container running to maintain volume mount
CMD ["sh", "-c", "while true; do sleep 3600; done"]

