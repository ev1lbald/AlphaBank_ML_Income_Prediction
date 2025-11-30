#!/bin/bash

# Aggressive deployment script - rebuilds everything from scratch
# Usage: ./deploy.sh

set -e

echo "🚀 Starting aggressive deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}1. Pulling latest code from GitHub...${NC}"
git pull

echo -e "${YELLOW}2. Stopping all containers...${NC}"
sudo docker-compose -f docker-compose.prod.yml down

echo -e "${YELLOW}3. Removing old images (frontend, backend)...${NC}"
sudo docker-compose -f docker-compose.prod.yml rm -f frontend backend nginx 2>/dev/null || true
sudo docker rmi $(sudo docker images | grep -E 'app-frontend|app-backend' | awk '{print $3}') 2>/dev/null || true

echo -e "${YELLOW}4. Removing build cache...${NC}"
sudo docker builder prune -f

echo -e "${YELLOW}5. Rebuilding ALL containers from scratch (no cache)...${NC}"
sudo docker-compose -f docker-compose.prod.yml build --no-cache

echo -e "${YELLOW}6. Starting all services...${NC}"
sudo docker-compose -f docker-compose.prod.yml up -d

echo -e "${YELLOW}7. Waiting for services to be healthy...${NC}"
sleep 5

echo -e "${YELLOW}8. Checking container status...${NC}"
sudo docker-compose -f docker-compose.prod.yml ps

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}Check logs with: sudo docker-compose -f docker-compose.prod.yml logs -f${NC}"

