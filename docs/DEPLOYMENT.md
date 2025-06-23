# 🚀 Deployment Guide

## Overview

This document describes the CI/CD pipeline and deployment process for JobBlox CRM.

## Environments

### 🧪 Staging
- **Branch**: `develop`
- **URL**: https://jobblox-staging.vercel.app
- **Auto-deploy**: Yes
- **Purpose**: Testing and QA

### 🚀 Production
- **Branch**: `main`
- **URL**: https://jobblox.vercel.app
- **Auto-deploy**: Yes (with approval)
- **Purpose**: Live application

## Workflows

### 1. Continuous Integration (`ci.yml`)
Runs on every push and PR:
- Code quality checks (ESLint, Prettier, TypeScript)
- Unit tests with coverage
- E2E tests with Playwright
- Security scanning
- Build verification

### 2. Staging Deployment (`deploy-staging.yml`)
Triggers on `develop` branch:
- Builds application for staging
- Deploys to Vercel staging environment
- Deploys Storybook documentation
- Sends Slack notifications

### 3. Production Deployment (`deploy-production.yml`)
Triggers on `main` branch:
- Full test suite execution
- Production build
- Deployment with health checks
- Release tagging
- Notifications

### 4. Visual Testing (`visual-testing.yml`)
Runs on PRs:
- Chromatic visual regression testing
- Component screenshot comparison
- UI consistency validation

### 5. Performance Testing (`performance.yml`)
Runs on main PRs:
- Lighthouse performance audits
- Bundle size analysis
- Performance budget enforcement

## Required Secrets

### GitHub Secrets
\`\`\`bash
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Environment URLs
STAGING_API_URL=https://api-staging.jobblox.com
PROD_API_URL=https://api.jobblox.com
STAGING_BASE_PATH=/staging
PROD_BASE_PATH=/

# Notifications
SLACK_WEBHOOK=your_slack_webhook_url

# Testing
CHROMATIC_PROJECT_TOKEN=your_chromatic_token
CODECOV_TOKEN=your_codecov_token

# Health Check URLs
STAGING_URL=https://jobblox-staging.vercel.app
PROD_URL=https://jobblox.vercel.app
\`\`\`

## Deployment Process

### Staging Deployment
1. Push to `develop` branch
2. CI pipeline runs automatically
3. If all checks pass, deploys to staging
4. Storybook is deployed alongside
5. Team receives Slack notification

### Production Deployment
1. Create PR to `main` branch
2. CI pipeline runs with full test suite
3. Manual approval required for production
4. Deployment with health checks
5. Automatic release tagging
6. Post-deployment verification

## Manual Deployment

### Using Scripts
\`\`\`bash
# Deploy to staging
ENVIRONMENT=staging ./scripts/deploy.sh

# Deploy to production
ENVIRONMENT=production ./scripts/deploy.sh
\`\`\`

### Using GitHub Actions
\`\`\`bash
# Trigger manual deployment
gh workflow run deploy-production.yml
\`\`\`

## Monitoring

### Health Checks
- Automated health checks post-deployment
- 30-second intervals with 5-minute timeout
- Rollback on failure

### Performance Monitoring
- Lighthouse CI integration
- Bundle size tracking
- Performance budget alerts

### Error Tracking
- Automatic error reporting
- Slack notifications for failures
- Detailed logs in GitHub Actions

## Rollback Process

### Automatic Rollback
- Health check failures trigger automatic rollback
- Previous version restored within 2 minutes

### Manual Rollback
\`\`\`bash
# Rollback to previous version
vercel rollback --token $VERCEL_TOKEN
\`\`\`

## Best Practices

1. **Always test in staging first**
2. **Use feature flags for risky changes**
3. **Monitor deployments closely**
4. **Keep deployment scripts updated**
5. **Document any manual steps**

## Troubleshooting

### Common Issues
- **Build failures**: Check TypeScript errors
- **Test failures**: Review test logs in Actions
- **Deployment timeouts**: Check Vercel status
- **Health check failures**: Verify API connectivity

### Getting Help
- Check GitHub Actions logs
- Review Vercel deployment logs
- Contact DevOps team via Slack #devops
