export const APP_CONFIG = {
  name: "JobBlox",
  version: "1.0.0",
  description: "Multi-Tenant CRM for Service Businesses",
  author: "JobBlox Team",

  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "/api",
    version: "v1",
    timeout: 30000,
  },

  // Authentication
  auth: {
    tokenKey: "auth_token",
    tenantKey: "tenant_id",
    refreshThreshold: 5 * 60 * 1000, // 5 minutes
  },

  // UI Configuration
  ui: {
    themeKey: "jobblox-ui-theme",
    defaultTheme: "dark",
    toastDuration: 5000,
  },

  // Feature Flags
  features: {
    tempoRoutes: import.meta.env.VITE_TEMPO === "true",
    mockApi: import.meta.env.VITE_MOCK_API === "true" || import.meta.env.DEV,
    debugTools: import.meta.env.DEV,
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  // File Upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
} as const

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  LOGIN_TENANT: "/login/tenant",
  LOGIN_ADMIN: "/login/admin",
  ADMIN: "/admin",
  BACKOFFICE: "/backoffice",
  SAAS: "/saas",
  TENANTS: "/tenants",
  SUBSCRIPTION: "/subscription",
} as const

export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
  CUSTOMER: "customer",
} as const

export const JOB_STATUSES = {
  DRAFT: "draft",
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  ON_HOLD: "on_hold",
} as const

export const CUSTOMER_TYPES = {
  RESIDENTIAL: "residential",
  COMMERCIAL: "commercial",
  INDUSTRIAL: "industrial",
} as const

export const INVOICE_STATUSES = {
  DRAFT: "draft",
  SENT: "sent",
  PAID: "paid",
  OVERDUE: "overdue",
  CANCELLED: "cancelled",
} as const
