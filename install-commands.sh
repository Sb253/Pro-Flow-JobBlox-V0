#!/bin/bash

# Clean install
echo "🧹 Cleaning previous installations..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install additional development tools (optional)
echo "🛠️ Installing additional development tools..."
npm install -D @types/node @vitejs/plugin-react-swc

# Install global tools (optional)
echo "🌐 Installing global tools..."
npm install -g typescript @storybook/cli

# Verify installation
echo "✅ Verifying installation..."
npm list --depth=0

echo "🎉 Installation complete!"
echo ""
echo "Available scripts:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run test         - Run tests"
echo "  npm run lint         - Lint code"
echo "  npm run storybook    - Start Storybook"
echo ""
echo "To start development:"
echo "  npm run dev"
