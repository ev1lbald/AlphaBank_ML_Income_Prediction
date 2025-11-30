#!/bin/sh
set -e

echo "=== Frontend container starting ==="
echo "Copying files to shared volume..."

# Wait a moment for volume to be mounted
sleep 2

# Copy all files to volume (mounted at /volume)
if [ -d "/volume" ]; then
    echo "Volume mounted, copying files..."
    rm -rf /volume/* 2>/dev/null || true
    cp -r /usr/share/nginx/html/* /volume/ 2>/dev/null || true
    echo "Files copied to volume successfully!"
else
    echo "WARNING: Volume not mounted at /volume"
fi

echo "=== Frontend container ready ==="

# Keep container running
exec sh -c "while true; do sleep 3600; done"

