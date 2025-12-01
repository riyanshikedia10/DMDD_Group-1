#!/bin/bash

# Script to start both backend and frontend servers

echo "Starting Food Supply Chain Application..."
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not found in PATH"
    echo "Please install Node.js or add it to your PATH"
    echo ""
    echo "You can install Node.js via:"
    echo "  - Homebrew: brew install node"
    echo "  - Download from: https://nodejs.org/"
    echo "  - Or use nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Get the base directory of the script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Start backend server
echo "🚀 Starting backend server on port 5000..."
cd "$BACKEND_DIR"
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "🚀 Starting frontend server on port 5173..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "📡 Backend API: http://localhost:5000/api"
echo "🌐 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait

