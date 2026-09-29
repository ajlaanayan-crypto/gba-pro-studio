#!/bin/bash
cd "/Users/mylisa/Projects/gaming"

# Ensure local server is running in background if not already
if ! curl -s http://localhost:3000/ > /dev/null; then
  echo "⚡ Starting core background service..."
  node server.js > /dev/null 2>&1 &
  sleep 1
fi

echo "🚀 Launching Pokémon LeafGreen Studio App..."
npx electron .
