#!/bin/bash

set -e

echo "🚀 Starting deployment process..."

# Environment validation
if [ -z "$ENVIRONMENT" ]; then
  echo "❌ ENVIRONMENT variable is required"
  exit 1
fi

echo "📦 Environment: $ENVIRONMENT"

# Install dependencies
echo "📥 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Run quality checks
echo "🔍 Running quality checks..."
npm run quality:check

# Run tests
echo "🧪 Running tests..."
npm run test:ci

# Build application
echo "🏗️ Building application..."
npm run build

# Deploy based on environment
case $ENVIRONMENT in
  "staging")
    echo "🚀 Deploying to staging..."
    vercel --token $VERCEL_TOKEN --prod --env ENVIRONMENT=staging
    ;;
  "production")
    echo "🚀 Deploying to production..."
    vercel --token $VERCEL_TOKEN --prod --env ENVIRONMENT=production
    ;;
  *)
    echo "❌ Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

echo "✅ Deployment completed successfully!"
