export const APP_CONFIG = {
  name: "JobBlox CRM",
  description: "Professional CRM for Service Businesses",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  basePath: import.meta.env.VITE_BASE_PATH || "/",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  features: {
    devTools: import.meta.env.DEV,
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    errorReporting: import.meta.env.VITE_ENABLE_ERROR_REPORTING === "true",
  },
  limits: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxUploadFiles: 5,
    requestTimeout: 30000, // 30 seconds
  },
} as const

export type AppConfig = typeof APP_CONFIG
