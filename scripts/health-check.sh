#!/bin/bash

set -e

URL=$1
MAX_ATTEMPTS=30
ATTEMPT=1

if [ -z "$URL" ]; then
  echo "❌ URL parameter is required"
  exit 1
fi

echo "🏥 Starting health check for $URL"

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
  echo "🔍 Attempt $ATTEMPT/$MAX_ATTEMPTS"
  
  if curl -f -s "$URL/health" > /dev/null; then
    echo "✅ Health check passed!"
    exit 0
  fi
  
  echo "⏳ Waiting 10 seconds before retry..."
  sleep 10
  ATTEMPT=$((ATTEMPT + 1))
done

echo "❌ Health check failed after $MAX_ATTEMPTS attempts"
exit 1
