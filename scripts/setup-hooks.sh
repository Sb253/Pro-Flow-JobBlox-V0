#!/bin/bash

echo "🔧 Setting up Git hooks and code quality tools..."

# Make sure we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run 'git init' first."
    exit 1
fi

# Install husky
echo "📦 Installing Husky..."
npx husky install

# Make hook files executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/pre-push

# Create husky hooks
echo "🪝 Creating Git hooks..."
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx commitlint --edit \$1"
npx husky add .husky/pre-push "npm run test:ci && npm run build"

# Set up git config for better commit messages
echo "⚙️ Configuring Git..."
git config --local core.autocrlf false
git config --local core.eol lf

echo "✅ Git hooks setup complete!"
echo ""
echo "📋 Available commit types:"
echo "  feat:     New feature"
echo "  fix:      Bug fix"
echo "  docs:     Documentation"
echo "  style:    Formatting changes"
echo "  refactor: Code refactoring"
echo "  perf:     Performance improvements"
echo "  test:     Adding tests"
echo "  chore:    Maintenance tasks"
echo "  build:    Build system changes"
echo "  ci:       CI configuration"
echo ""
echo "💡 Example commit: 'feat(auth): add login validation'"
