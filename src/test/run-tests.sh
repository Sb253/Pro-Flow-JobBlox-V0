#!/bin/bash

# Run all tests
echo "Running all tests..."
npm test

# Run tests with coverage
echo "Running tests with coverage..."
npm run test:coverage

# Run tests in CI mode
echo "Running tests in CI mode..."
npm run test:ci

echo "Test execution completed!"
