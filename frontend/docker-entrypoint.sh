#!/bin/sh
set -e

echo "=========================================="
echo "=== Frontend container starting ==="
echo "=========================================="

# Wait a moment for volume to be mounted
echo "Waiting for volume mount..."
sleep 3

# Copy all files to volume (mounted at /volume)
if [ -d "/volume" ]; then
    echo "✓ Volume mounted at /volume"
    echo "Copying files from /source to /volume..."
    
    # Remove old files
    rm -rf /volume/* 2>/dev/null || true
    rm -rf /volume/.* 2>/dev/null || true
    
    # Copy all files including hidden ones
    cp -r /source/. /volume/ 2>/dev/null || cp -r /source/* /volume/ 2>/dev/null || true
    
    echo "✓ Files copied to volume successfully!"
    echo "Files in volume:"
    ls -la /volume/ | head -10
    
else
    echo "✗ ERROR: Volume not mounted at /volume"
    echo "Current directory contents:"
    ls -la /
    exit 1
fi

echo "=========================================="
echo "=== Frontend container ready ==="
echo "=========================================="

# Keep container running to maintain volume
echo "Container will stay running..."
exec sh -c "while true; do sleep 3600; done"
