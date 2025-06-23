#!/bin/bash

# Development server startup script
echo "🚀 Starting JobBlox CRM Development Server..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating environment file..."
    cp .env.example .env
    echo "✅ Please configure your .env file with appropriate values"
fi

# Run pre-flight checks
echo "🔍 Running pre-flight checks..."
npm run type-check

if [ $? -eq 0 ]; then
    echo "✅ TypeScript check passed"
else
    echo "❌ TypeScript check failed"
    exit 1
fi

# Start the development server
echo "🌟 Starting Vite development server..."
npm run dev
