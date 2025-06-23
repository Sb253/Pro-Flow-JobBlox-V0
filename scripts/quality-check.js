const { execSync } = require("child_process")
const chalk = require("chalk")

const checks = [
  {
    name: "TypeScript Compilation",
    command: "npm run type-check",
    description: "Checking TypeScript types...",
  },
  {
    name: "ESLint",
    command: "npm run lint",
    description: "Running ESLint...",
  },
  {
    name: "Prettier",
    command: "npm run format:check",
    description: "Checking code formatting...",
  },
  {
    name: "Tests",
    command: "npm run test:ci",
    description: "Running test suite...",
  },
  {
    name: "Build",
    command: "npm run build",
    description: "Testing production build...",
  },
]

async function runQualityChecks() {
  console.log(chalk.blue("🔍 Running quality checks...\n"))

  let passed = 0
  let failed = 0

  for (const check of checks) {
    try {
      console.log(chalk.yellow(`⏳ ${check.description}`))
      execSync(check.command, { stdio: "pipe" })
      console.log(chalk.green(`✅ ${check.name} passed\n`))
      passed++
    } catch (error) {
      console.log(chalk.red(`❌ ${check.name} failed\n`))
      console.log(chalk.red(error.stdout?.toString() || error.message))
      failed++
    }
  }

  console.log(chalk.blue("\n📊 Quality Check Results:"))
  console.log(chalk.green(`✅ Passed: ${passed}`))
  console.log(chalk.red(`❌ Failed: ${failed}`))

  if (failed > 0) {
    console.log(chalk.red("\n💥 Quality checks failed! Please fix the issues above."))
    process.exit(1)
  } else {
    console.log(chalk.green("\n🎉 All quality checks passed!"))
  }
}

runQualityChecks().catch(console.error)
