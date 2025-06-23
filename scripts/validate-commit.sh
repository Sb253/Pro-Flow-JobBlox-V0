#!/bin/bash

# Validate commit message format
commit_regex='^(feat|fix|docs|style|refactor|perf|test|chore|revert|build|ci|security|deps|config|ui|a11y|i18n|seo|analytics|experiment)($$.+$$)?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ Invalid commit message format!"
    echo ""
    echo "📋 Format: type(scope): description"
    echo ""
    echo "Types: feat, fix, docs, style, refactor, perf, test, chore, build, ci"
    echo "Example: feat(auth): add user authentication"
    echo ""
    exit 1
fi
