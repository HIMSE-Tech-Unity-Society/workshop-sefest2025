#!/bin/bash

# Ensure script is run from the project root
if [ ! -f "package.json" ]; then
    echo "⚠️ Please run this script from the project root directory."
    exit 1
fi

# Run npm install
echo "⌛ Installing Node.js dependencies..."
pnpm install

# Run npm run dev
echo "🚀 Starting the development server..."
pnpm dev --port 3000