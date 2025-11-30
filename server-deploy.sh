#!/bin/bash

# Server-side deployment script
# Copy this to your server and run: ./server-deploy.sh
# Or add to crontab for auto-deployment

set -e

cd ~/app || { echo "Error: ~/app directory not found!"; exit 1; }

echo "🚀 Starting server deployment..."

# Pull latest code
echo "📥 Pulling latest code..."
git pull

# Stop all containers
echo "🛑 Stopping containers..."
sudo docker-compose -f docker-compose.prod.yml down

# Remove old containers and images
echo "🗑️  Cleaning up old containers..."
sudo docker-compose -f docker-compose.prod.yml rm -f 2>/dev/null || true

# Remove build cache
echo "🧹 Cleaning build cache..."
sudo docker builder prune -f

# Rebuild everything without cache
echo "🔨 Rebuilding containers (no cache)..."
sudo docker-compose -f docker-compose.prod.yml build --no-cache

# Start services
echo "▶️  Starting services..."
sudo docker-compose -f docker-compose.prod.yml up -d

# Wait a bit
echo "⏳ Waiting for services..."
sleep 10

# Show status
echo "📊 Container status:"
sudo docker-compose -f docker-compose.prod.yml ps

echo "✅ Deployment complete!"
echo ""
echo "To view logs: sudo docker-compose -f docker-compose.prod.yml logs -f"

