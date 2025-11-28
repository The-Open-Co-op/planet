#!/bin/bash
# Script to cleanly restart the development server

echo "🔄 Restarting development server..."

# Kill any existing processes
echo "Stopping existing processes..."
pkill -f "bun.*dev" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

# Wait a moment for processes to clean up
sleep 1

# Clear any temporary files that might cause issues
echo "Clearing temporary files..."
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf .vite 2>/dev/null || true

# Start the dev server
echo "Starting development server..."
bun dev