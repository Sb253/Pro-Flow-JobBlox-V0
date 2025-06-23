module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Formatting, missing semi colons, etc
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf", // Performance improvements
        "test", // Adding missing tests
        "chore", // Maintain
        "revert", // Revert to a commit
        "build", // Build system or external dependencies
        "ci", // CI configuration files and scripts
        "security", // Security improvements
        "deps", // Dependencies update
        "config", // Configuration changes
        "ui", // UI/UX improvements
        "a11y", // Accessibility improvements
        "i18n", // Internationalization
        "seo", // SEO improvements
        "analytics", // Analytics and tracking
        "experiment", // A/B testing and experiments
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
  },
}
