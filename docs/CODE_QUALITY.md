# Code Quality Guidelines

This document outlines the code quality standards and tools used in the JobBlox CRM project.

## 🔧 Tools & Configuration

### Git Hooks (Husky)
- **Pre-commit**: Runs linting, formatting, and type checking on staged files
- **Commit-msg**: Validates commit message format using conventional commits
- **Pre-push**: Runs full test suite and build verification

### Linting & Formatting
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Stylelint**: CSS/SCSS linting
- **TypeScript**: Type checking

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

\`\`\`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

#### Available Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `build`: Build system changes
- `ci`: CI/CD changes
- `security`: Security improvements
- `deps`: Dependency updates

#### Examples:
\`\`\`bash
feat(auth): add user authentication
fix(api): resolve timeout issue
docs: update installation guide
style: format code with prettier
refactor(components): extract common logic
\`\`\`

## 🚀 Setup Instructions

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Setup Git Hooks
\`\`\`bash
npm run setup:hooks
\`\`\`

### 3. Verify Setup
\`\`\`bash
# Run quality checks
npm run quality:check

# Test commit message validation
git commit -m "test: verify commit message format"
\`\`\`

## 📋 Available Scripts

### Code Quality
\`\`\`bash
# Run all linting
npm run lint

# Fix linting issues
npm run lint:fix

# Check code formatting
npm run format:check

# Format code
npm run format

# Type checking
npm run type-check

# Run all quality checks
npm run quality:check

# Fix common issues
npm run quality:fix
\`\`\`

### Testing
\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci

# Run tests for staged files
npm run test:staged
\`\`\`

### Commits
\`\`\`bash
# Interactive commit (recommended)
npm run commit

# Or use git directly with proper format
git commit -m "feat(component): add new feature"
\`\`\`

## 🔍 Pre-commit Checks

When you commit code, the following checks run automatically:

1. **Lint-staged**: Runs on staged files only
   - ESLint with auto-fix
   - Prettier formatting
   - Type checking

2. **Tests**: Runs tests related to changed files

3. **Commit Message**: Validates format

## 🚫 Pre-push Checks

Before pushing to remote, these checks run:

1. **Full Test Suite**: All tests must pass
2. **Build Verification**: Code must build successfully
3. **Security Audit**: Checks for known vulnerabilities

## 🛠️ IDE Integration

### VS Code
Install recommended extensions:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features

### Settings
Add to `.vscode/settings.json`:
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
\`\`\`

## 🔧 Troubleshooting

### Common Issues

1. **Husky hooks not running**
   \`\`\`bash
   npx husky install
   chmod +x .husky/*
   \`\`\`

2. **ESLint errors**
   \`\`\`bash
   npm run lint:fix
   \`\`\`

3. **Prettier conflicts**
   \`\`\`bash
   npm run format
   \`\`\`

4. **Type errors**
   \`\`\`bash
   npm run type-check
   \`\`\`

### Bypassing Hooks (Emergency Only)
\`\`\`bash
# Skip pre-commit hooks (not recommended)
git commit --no-verify -m "emergency fix"

# Skip pre-push hooks (not recommended)
git push --no-verify
\`\`\`

## 📊 Quality Metrics

We maintain high code quality standards:
- **Test Coverage**: > 80%
- **ESLint**: 0 errors, minimal warnings
- **TypeScript**: Strict mode enabled
- **Build**: Must pass without errors
- **Security**: No high/critical vulnerabilities

## 🎯 Best Practices

1. **Write meaningful commit messages**
2. **Keep commits small and focused**
3. **Run tests before committing**
4. **Fix linting issues immediately**
5. **Use TypeScript strictly**
6. **Write tests for new features**
7. **Document complex logic**
8. **Review code before pushing**

## 📚 Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Husky Documentation](https://typicode.github.io/husky/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
