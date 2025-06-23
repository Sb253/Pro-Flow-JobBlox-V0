// Replace this

// API Endpoints Configuration
// This file defines all the API endpoints for the multi-tenant CRM system

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const API_VERSION = "v1";

export const API_ENDPOINTS = {
  // Base URL
  BASE: `${API_BASE_URL}/${API_VERSION}`,

  // Authentication endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
    CHECK_TOKEN: "/auth/check-token",
  },

  // User management endpoints
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
    PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
    UPLOAD_AVATAR: "/users/upload-avatar",
    PERMISSIONS: (id: string) => `/users/${id}/permissions`,
    ROLES: "/users/roles",
    INVITE: "/users/invite",
    BULK_INVITE: "/users/bulk-invite",
    DEACTIVATE: (id: string) => `/users/${id}/deactivate`,
    ACTIVATE: (id: string) => `/users/${id}/activate`,
    PREFERENCES: (id: string) => `/users/${id}/preferences`,
  },

  // Tenant management endpoints
  TENANTS: {
    BASE: "/tenants",
    BY_ID: (id: string) => `/tenants/${id}`,
    SETTINGS: (id: string) => `/tenants/${id}/settings`,
    BRANDING: (id: string) => `/tenants/${id}/branding`,
    FEATURES: (id: string) => `/tenants/${id}/features`,
    BILLING: (id: string) => `/tenants/${id}/billing`,
    SUBSCRIPTION: (id: string) => `/tenants/${id}/subscription`,
    USAGE: (id: string) => `/tenants/${id}/usage`,
    INTEGRATIONS: (id: string) => `/tenants/${id}/integrations`,
  },

  // Customer management endpoints
  CUSTOMERS: {
    BASE: "/customers",
    BY_ID: (id: string) => `/customers/${id}`,
    SEARCH: "/customers/search",
    EXPORT: "/customers/export",
    IMPORT: "/customers/import",
    BULK_UPDATE: "/customers/bulk-update",
    BULK_DELETE: "/customers/bulk-delete",
    PROJECTS: (id: string) => `/customers/${id}/projects`,
    INVOICES: (id: string) => `/customers/${id}/invoices`,
    ESTIMATES: (id: string) => `/customers/${id}/estimates`,
    PAYMENTS: (id: string) => `/customers/${id}/payments`,
    NOTES: (id: string) => `/customers/${id}/notes`,
    DOCUMENTS: (id: string) => `/customers/${id}/documents`,
    CONTACTS: (id: string) => `/customers/${id}/contacts`,
    HISTORY: (id: string) => `/customers/${id}/history`,
    TAGS: (id: string) => `/customers/${id}/tags`,
    MERGE: "/customers/merge",
    DUPLICATE: (id: string) => `/customers/${id}/duplicate`,
  },

  // Job/Project management endpoints
  JOBS: {
    BASE: "/jobs",
    BY_ID: (id: string) => `/jobs/${id}`,
    SEARCH: "/jobs/search",
    EXPORT: "/jobs/export",
    IMPORT: "/jobs/import",
    TEMPLATES: "/jobs/templates",
    TEMPLATE_BY_ID: (id: string) => `/jobs/templates/${id}`,
    GANTT: (id: string) => `/jobs/${id}/gantt`,
    TIMELINE: (id: string) => `/jobs/${id}/timeline`,
    TASKS: (id: string) => `/jobs/${id}/tasks`,
    TASK_BY_ID: (jobId: string, taskId: string) =>
      `/jobs/${jobId}/tasks/${taskId}`,
    RESOURCES: (id: string) => `/jobs/${id}/resources`,
    DOCUMENTS: (id: string) => `/jobs/${id}/documents`,
    TIME_ENTRIES: (id: string) => `/jobs/${id}/time-entries`,
    EXPENSES: (id: string) => `/jobs/${id}/expenses`,
    PROGRESS: (id: string) => `/jobs/${id}/progress`,
    STATUS: (id: string) => `/jobs/${id}/status`,
    ASSIGN: (id: string) => `/jobs/${id}/assign`,
    UNASSIGN: (id: string) => `/jobs/${id}/unassign`,
    CLONE: (id: string) => `/jobs/${id}/clone`,
    ARCHIVE: (id: string) => `/jobs/${id}/archive`,
    RESTORE: (id: string) => `/jobs/${id}/restore`,
    PHASES: (id: string) => `/jobs/${id}/phases`,
    MILESTONES: (id: string) => `/jobs/${id}/milestones`,
    DEPENDENCIES: (id: string) => `/jobs/${id}/dependencies`,
    CALENDAR: (id: string) => `/jobs/${id}/calendar`,
    BUDGET: (id: string) => `/jobs/${id}/budget`,
    PROFITABILITY: (id: string) => `/jobs/${id}/profitability`,
  },

  // Task management endpoints
  TASKS: {
    BASE: "/tasks",
    BY_ID: (id: string) => `/tasks/${id}`,
    SEARCH: "/tasks/search",
    ASSIGN: (id: string) => `/tasks/${id}/assign`,
    UNASSIGN: (id: string) => `/tasks/${id}/unassign`,
    COMPLETE: (id: string) => `/tasks/${id}/complete`,
    REOPEN: (id: string) => `/tasks/${id}/reopen`,
    DEPENDENCIES: (id: string) => `/tasks/${id}/dependencies`,
    COMMENTS: (id: string) => `/tasks/${id}/comments`,
    ATTACHMENTS: (id: string) => `/tasks/${id}/attachments`,
    TIME_LOG: (id: string) => `/tasks/${id}/time-log`,
  },

  // Estimate/Quote management endpoints
  ESTIMATES: {
    BASE: "/estimates",
    BY_ID: (id: string) => `/estimates/${id}`,
    SEARCH: "/estimates/search",
    EXPORT: "/estimates/export",
    TEMPLATES: "/estimates/templates",
    TEMPLATE_BY_ID: (id: string) => `/estimates/templates/${id}`,
    DUPLICATE: (id: string) => `/estimates/${id}/duplicate`,
    SEND: (id: string) => `/estimates/${id}/send`,
    APPROVE: (id: string) => `/estimates/${id}/approve`,
    REJECT: (id: string) => `/estimates/${id}/reject`,
    CONVERT_TO_JOB: (id: string) => `/estimates/${id}/convert-to-job`,
    CONVERT_TO_INVOICE: (id: string) => `/estimates/${id}/convert-to-invoice`,
    PDF: (id: string) => `/estimates/${id}/pdf`,
    PREVIEW: (id: string) => `/estimates/${id}/preview`,
    REVISIONS: (id: string) => `/estimates/${id}/revisions`,
    COMMENTS: (id: string) => `/estimates/${id}/comments`,
    FOLLOW_UP: (id: string) => `/estimates/${id}/follow-up`,
    EXPIRE: (id: string) => `/estimates/${id}/expire`,
    EXTEND: (id: string) => `/estimates/${id}/extend`,
  },

  // Invoice management endpoints
  INVOICES: {
    BASE: "/invoices",
    BY_ID: (id: string) => `/invoices/${id}`,
    SEARCH: "/invoices/search",
    EXPORT: "/invoices/export",
    TEMPLATES: "/invoices/templates",
    TEMPLATE_BY_ID: (id: string) => `/invoices/templates/${id}`,
    DUPLICATE: (id: string) => `/invoices/${id}/duplicate`,
    SEND: (id: string) => `/invoices/${id}/send`,
    REMIND: (id: string) => `/invoices/${id}/remind`,
    MARK_PAID: (id: string) => `/invoices/${id}/mark-paid`,
    MARK_UNPAID: (id: string) => `/invoices/${id}/mark-unpaid`,
    VOID: (id: string) => `/invoices/${id}/void`,
    PDF: (id: string) => `/invoices/${id}/pdf`,
    PREVIEW: (id: string) => `/invoices/${id}/preview`,
    PAYMENTS: (id: string) => `/invoices/${id}/payments`,
    CREDIT_NOTES: (id: string) => `/invoices/${id}/credit-notes`,
    RECURRING: "/invoices/recurring",
    RECURRING_BY_ID: (id: string) => `/invoices/recurring/${id}`,
    OVERDUE: "/invoices/overdue",
    AGING: "/invoices/aging",
  },

  // Payment management endpoints
  PAYMENTS: {
    BASE: "/payments",
    BY_ID: (id: string) => `/payments/${id}`,
    SEARCH: "/payments/search",
    EXPORT: "/payments/export",
    PROCESS: (id: string) => `/payments/${id}/process`,
    REFUND: (id: string) => `/payments/${id}/refund`,
    VOID: (id: string) => `/payments/${id}/void`,
    METHODS: "/payments/methods",
    GATEWAYS: "/payments/gateways",
    TRANSACTIONS: "/payments/transactions",
    RECONCILE: "/payments/reconcile",
    BATCH: "/payments/batch",
    RECURRING: "/payments/recurring",
    FAILED: "/payments/failed",
    RETRY: (id: string) => `/payments/${id}/retry`,
  },

  // Employee management endpoints
  EMPLOYEES: {
    BASE: "/employees",
    BY_ID: (id: string) => `/employees/${id}`,
    SEARCH: "/employees/search",
    EXPORT: "/employees/export",
    IMPORT: "/employees/import",
    DEPARTMENTS: "/employees/departments",
    POSITIONS: "/employees/positions",
    SKILLS: "/employees/skills",
    CERTIFICATIONS: (id: string) => `/employees/${id}/certifications`,
    SCHEDULE: (id: string) => `/employees/${id}/schedule`,
    AVAILABILITY: (id: string) => `/employees/${id}/availability`,
    TIME_OFF: (id: string) => `/employees/${id}/time-off`,
    PERFORMANCE: (id: string) => `/employees/${id}/performance`,
    PAYROLL: (id: string) => `/employees/${id}/payroll`,
    DOCUMENTS: (id: string) => `/employees/${id}/documents`,
    EMERGENCY_CONTACTS: (id: string) => `/employees/${id}/emergency-contacts`,
  },

  // Inventory management endpoints
  INVENTORY: {
    BASE: "/inventory",
    BY_ID: (id: string) => `/inventory/${id}`,
    SEARCH: "/inventory/search",
    EXPORT: "/inventory/export",
    IMPORT: "/inventory/import",
    CATEGORIES: "/inventory/categories",
    SUPPLIERS: "/inventory/suppliers",
    LOCATIONS: "/inventory/locations",
    ADJUST: (id: string) => `/inventory/${id}/adjust`,
    TRANSFER: (id: string) => `/inventory/${id}/transfer`,
    MOVEMENTS: (id: string) => `/inventory/${id}/movements`,
    LOW_STOCK: "/inventory/low-stock",
    REORDER: "/inventory/reorder",
    VALUATION: "/inventory/valuation",
    AUDIT: "/inventory/audit",
    BARCODE: (id: string) => `/inventory/${id}/barcode`,
  },

  // Time tracking endpoints
  TIME_ENTRIES: {
    BASE: "/time-entries",
    BY_ID: (id: string) => `/time-entries/${id}`,
    SEARCH: "/time-entries/search",
    EXPORT: "/time-entries/export",
    START: "/time-entries/start",
    STOP: (id: string) => `/time-entries/${id}/stop`,
    PAUSE: (id: string) => `/time-entries/${id}/pause`,
    RESUME: (id: string) => `/time-entries/${id}/resume`,
    APPROVE: (id: string) => `/time-entries/${id}/approve`,
    REJECT: (id: string) => `/time-entries/${id}/reject`,
    BULK_APPROVE: "/time-entries/bulk-approve",
    BULK_REJECT: "/time-entries/bulk-reject",
    TIMESHEET: "/time-entries/timesheet",
    SUMMARY: "/time-entries/summary",
    CURRENT: "/time-entries/current",
  },

  // Document management endpoints
  DOCUMENTS: {
    BASE: "/documents",
    BY_ID: (id: string) => `/documents/${id}`,
    SEARCH: "/documents/search",
    UPLOAD: "/documents/upload",
    BULK_UPLOAD: "/documents/bulk-upload",
    DOWNLOAD: (id: string) => `/documents/${id}/download`,
    PREVIEW: (id: string) => `/documents/${id}/preview`,
    THUMBNAIL: (id: string) => `/documents/${id}/thumbnail`,
    SHARE: (id: string) => `/documents/${id}/share`,
    UNSHARE: (id: string) => `/documents/${id}/unshare`,
    PERMISSIONS: (id: string) => `/documents/${id}/permissions`,
    VERSIONS: (id: string) => `/documents/${id}/versions`,
    RESTORE: (id: string, version: string) =>
      `/documents/${id}/versions/${version}/restore`,
    CATEGORIES: "/documents/categories",
    TAGS: "/documents/tags",
    FOLDERS: "/documents/folders",
    FOLDER_BY_ID: (id: string) => `/documents/folders/${id}`,
    RECENT: "/documents/recent",
    FAVORITES: "/documents/favorites",
    TRASH: "/documents/trash",
    RESTORE_FROM_TRASH: (id: string) => `/documents/${id}/restore`,
  },

  // Reports endpoints
  REPORTS: {
    BASE: "/reports",
    DASHBOARD: "/reports/dashboard",
    FINANCIAL: "/reports/financial",
    PROJECT: "/reports/project",
    CUSTOMER: "/reports/customer",
    EMPLOYEE: "/reports/employee",
    INVENTORY: "/reports/inventory",
    TIME: "/reports/time",
    CUSTOM: "/reports/custom",
    CUSTOM_BY_ID: (id: string) => `/reports/custom/${id}`,
    EXPORT: (type: string) => `/reports/${type}/export`,
    SCHEDULE: "/reports/schedule",
    SCHEDULED: "/reports/scheduled",
    TEMPLATES: "/reports/templates",
    KPI: "/reports/kpi",
    ANALYTICS: "/reports/analytics",
    PROFITABILITY: "/reports/profitability",
    CASH_FLOW: "/reports/cash-flow",
    AGING: "/reports/aging",
    TAX: "/reports/tax",
  },

  // Notifications endpoints
  NOTIFICATIONS: {
    BASE: "/notifications",
    BY_ID: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_UNREAD: (id: string) => `/notifications/${id}/unread`,
    MARK_ALL_READ: "/notifications/mark-all-read",
    DELETE: (id: string) => `/notifications/${id}`,
    DELETE_ALL: "/notifications/delete-all",
    SETTINGS: "/notifications/settings",
    PREFERENCES: "/notifications/preferences",
    TEMPLATES: "/notifications/templates",
    SEND: "/notifications/send",
    BULK_SEND: "/notifications/bulk-send",
    HISTORY: "/notifications/history",
    UNREAD_COUNT: "/notifications/unread-count",
  },

  // Integration endpoints
  INTEGRATIONS: {
    BASE: "/integrations",
    AVAILABLE: "/integrations/available",
    CONNECTED: "/integrations/connected",
    CONNECT: (provider: string) => `/integrations/${provider}/connect`,
    DISCONNECT: (provider: string) => `/integrations/${provider}/disconnect`,
    CONFIGURE: (provider: string) => `/integrations/${provider}/configure`,
    TEST: (provider: string) => `/integrations/${provider}/test`,
    SYNC: (provider: string) => `/integrations/${provider}/sync`,
    LOGS: (provider: string) => `/integrations/${provider}/logs`,
    WEBHOOKS: "/integrations/webhooks",
    WEBHOOK_BY_ID: (id: string) => `/integrations/webhooks/${id}`,
    API_KEYS: "/integrations/api-keys",
    OAUTH: (provider: string) => `/integrations/${provider}/oauth`,
    CALLBACK: (provider: string) => `/integrations/${provider}/callback`,
    SYNC_JOBS: "/integrations/sync-jobs",
    SYNC_JOB_BY_ID: (id: string) => `/integrations/sync-jobs/${id}`,
    MAPPINGS: "/integrations/mappings",
    MAPPING_BY_ID: (id: string) => `/integrations/mappings/${id}`,
    RATE_LIMITS: (provider: string) => `/integrations/${provider}/rate-limits`,
    HEALTH: (provider: string) => `/integrations/${provider}/health`,
  },

  // QuickBooks specific endpoints
  QUICKBOOKS: {
    BASE: "/integrations/quickbooks",
    CONNECT: "/integrations/quickbooks/connect",
    DISCONNECT: "/integrations/quickbooks/disconnect",
    OAUTH_URL: "/integrations/quickbooks/oauth-url",
    CALLBACK: "/integrations/quickbooks/callback",
    REFRESH_TOKEN: "/integrations/quickbooks/refresh-token",
    COMPANY_INFO: "/integrations/quickbooks/company-info",
    CUSTOMERS: "/integrations/quickbooks/customers",
    CUSTOMER_BY_ID: (id: string) => `/integrations/quickbooks/customers/${id}`,
    ITEMS: "/integrations/quickbooks/items",
    ITEM_BY_ID: (id: string) => `/integrations/quickbooks/items/${id}`,
    INVOICES: "/integrations/quickbooks/invoices",
    INVOICE_BY_ID: (id: string) => `/integrations/quickbooks/invoices/${id}`,
    PAYMENTS: "/integrations/quickbooks/payments",
    PAYMENT_BY_ID: (id: string) => `/integrations/quickbooks/payments/${id}`,
    ACCOUNTS: "/integrations/quickbooks/accounts",
    TAX_CODES: "/integrations/quickbooks/tax-codes",
    SYNC_CUSTOMERS: "/integrations/quickbooks/sync/customers",
    SYNC_INVOICES: "/integrations/quickbooks/sync/invoices",
    SYNC_PAYMENTS: "/integrations/quickbooks/sync/payments",
    SYNC_ITEMS: "/integrations/quickbooks/sync/items",
    SYNC_ALL: "/integrations/quickbooks/sync/all",
    SYNC_STATUS: "/integrations/quickbooks/sync/status",
    WEBHOOK_VERIFY: "/integrations/quickbooks/webhook/verify",
    WEBHOOK_RECEIVE: "/integrations/quickbooks/webhook/receive",
  },

  // Accounting platform endpoints
  ACCOUNTING: {
    BASE: "/integrations/accounting",
    PROVIDERS: "/integrations/accounting/providers",
    CONNECT: (provider: string) =>
      `/integrations/accounting/${provider}/connect`,
    DISCONNECT: (provider: string) =>
      `/integrations/accounting/${provider}/disconnect`,
    SYNC: (provider: string) => `/integrations/accounting/${provider}/sync`,
    CUSTOMERS: (provider: string) =>
      `/integrations/accounting/${provider}/customers`,
    INVOICES: (provider: string) =>
      `/integrations/accounting/${provider}/invoices`,
    PAYMENTS: (provider: string) =>
      `/integrations/accounting/${provider}/payments`,
    ITEMS: (provider: string) => `/integrations/accounting/${provider}/items`,
    ACCOUNTS: (provider: string) =>
      `/integrations/accounting/${provider}/accounts`,
    REPORTS: (provider: string) =>
      `/integrations/accounting/${provider}/reports`,
  },

  // CRM Integration endpoints
  CRM: {
    BASE: "/integrations/crm",
    PROVIDERS: "/integrations/crm/providers",
    CONNECT: (provider: string) => `/integrations/crm/${provider}/connect`,
    DISCONNECT: (provider: string) =>
      `/integrations/crm/${provider}/disconnect`,
    SYNC: (provider: string) => `/integrations/crm/${provider}/sync`,
    CONTACTS: (provider: string) => `/integrations/crm/${provider}/contacts`,
    LEADS: (provider: string) => `/integrations/crm/${provider}/leads`,
    OPPORTUNITIES: (provider: string) =>
      `/integrations/crm/${provider}/opportunities`,
    ACCOUNTS: (provider: string) => `/integrations/crm/${provider}/accounts`,
    ACTIVITIES: (provider: string) =>
      `/integrations/crm/${provider}/activities`,
  },

  // Marketing Integration endpoints
  MARKETING: {
    BASE: "/integrations/marketing",
    PROVIDERS: "/integrations/marketing/providers",
    CONNECT: (provider: string) =>
      `/integrations/marketing/${provider}/connect`,
    DISCONNECT: (provider: string) =>
      `/integrations/marketing/${provider}/disconnect`,
    SYNC: (provider: string) => `/integrations/marketing/${provider}/sync`,
    LISTS: (provider: string) => `/integrations/marketing/${provider}/lists`,
    CONTACTS: (provider: string) =>
      `/integrations/marketing/${provider}/contacts`,
    CAMPAIGNS: (provider: string) =>
      `/integrations/marketing/${provider}/campaigns`,
    TEMPLATES: (provider: string) =>
      `/integrations/marketing/${provider}/templates`,
    ANALYTICS: (provider: string) =>
      `/integrations/marketing/${provider}/analytics`,
  },

  // Payment Integration endpoints
  PAYMENT_INTEGRATIONS: {
    BASE: "/integrations/payments",
    PROVIDERS: "/integrations/payments/providers",
    CONNECT: (provider: string) => `/integrations/payments/${provider}/connect`,
    DISCONNECT: (provider: string) =>
      `/integrations/payments/${provider}/disconnect`,
    PROCESS: (provider: string) => `/integrations/payments/${provider}/process`,
    REFUND: (provider: string) => `/integrations/payments/${provider}/refund`,
    WEBHOOKS: (provider: string) =>
      `/integrations/payments/${provider}/webhooks`,
    TRANSACTIONS: (provider: string) =>
      `/integrations/payments/${provider}/transactions`,
    CUSTOMERS: (provider: string) =>
      `/integrations/payments/${provider}/customers`,
    SUBSCRIPTIONS: (provider: string) =>
      `/integrations/payments/${provider}/subscriptions`,
  },

  // Webhook endpoints
  WEBHOOKS: {
    BASE: "/webhooks",
    BY_ID: (id: string) => `/webhooks/${id}`,
    TEST: (id: string) => `/webhooks/${id}/test`,
    LOGS: (id: string) => `/webhooks/${id}/logs`,
    RETRY: (id: string) => `/webhooks/${id}/retry`,
    EVENTS: "/webhooks/events",
    SUBSCRIPTIONS: "/webhooks/subscriptions",
  },

  // Calendar endpoints
  CALENDAR: {
    BASE: "/calendar",
    EVENTS: "/calendar/events",
    EVENT_BY_ID: (id: string) => `/calendar/events/${id}`,
    AVAILABILITY: "/calendar/availability",
    SCHEDULE: "/calendar/schedule",
    SYNC: "/calendar/sync",
    IMPORT: "/calendar/import",
    EXPORT: "/calendar/export",
  },

  // Communication endpoints
  COMMUNICATION: {
    BASE: "/communication",
    EMAILS: "/communication/emails",
    EMAIL_BY_ID: (id: string) => `/communication/emails/${id}`,
    SEND_EMAIL: "/communication/emails/send",
    SMS: "/communication/sms",
    SEND_SMS: "/communication/sms/send",
    TEMPLATES: "/communication/templates",
    TEMPLATE_BY_ID: (id: string) => `/communication/templates/${id}`,
    CAMPAIGNS: "/communication/campaigns",
    CAMPAIGN_BY_ID: (id: string) => `/communication/campaigns/${id}`,
    CONTACTS: "/communication/contacts",
    LISTS: "/communication/lists",
    UNSUBSCRIBE: "/communication/unsubscribe",
  },

  // Settings endpoints
  SETTINGS: {
    BASE: "/settings",
    GENERAL: "/settings/general",
    COMPANY: "/settings/company",
    BILLING: "/settings/billing",
    SECURITY: "/settings/security",
    INTEGRATIONS: "/settings/integrations",
    NOTIFICATIONS: "/settings/notifications",
    CUSTOMIZATION: "/settings/customization",
    BACKUP: "/settings/backup",
    IMPORT_EXPORT: "/settings/import-export",
    API: "/settings/api",
    WEBHOOKS: "/settings/webhooks",
    AUDIT_LOG: "/settings/audit-log",
  },

  // Search endpoints
  SEARCH: {
    BASE: "/search",
    GLOBAL: "/search/global",
    CUSTOMERS: "/search/customers",
    JOBS: "/search/jobs",
    INVOICES: "/search/invoices",
    ESTIMATES: "/search/estimates",
    DOCUMENTS: "/search/documents",
    EMPLOYEES: "/search/employees",
    SUGGESTIONS: "/search/suggestions",
    RECENT: "/search/recent",
    SAVED: "/search/saved",
  },

  // File upload endpoints
  UPLOADS: {
    BASE: "/uploads",
    AVATAR: "/uploads/avatar",
    DOCUMENT: "/uploads/document",
    IMAGE: "/uploads/image",
    BULK: "/uploads/bulk",
    PRESIGNED_URL: "/uploads/presigned-url",
    PROGRESS: (id: string) => `/uploads/${id}/progress`,
    CANCEL: (id: string) => `/uploads/${id}/cancel`,
  },

  // Audit endpoints
  AUDIT: {
    BASE: "/audit",
    LOGS: "/audit/logs",
    EXPORT: "/audit/export",
    SEARCH: "/audit/search",
    RETENTION: "/audit/retention",
  },

  // Health check endpoints
  HEALTH: {
    BASE: "/health",
    STATUS: "/health/status",
    DATABASE: "/health/database",
    REDIS: "/health/redis",
    STORAGE: "/health/storage",
    INTEGRATIONS: "/health/integrations",
  },
};

// Helper functions for dynamic endpoint generation
export const buildEndpoint = (
  template: string,
  params: Record<string, string>,
): string => {
  let endpoint = template;
  Object.entries(params).forEach(([key, value]) => {
    endpoint = endpoint.replace(`:${key}`, value);
  });
  return endpoint;
};

export const buildQueryString = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v.toString()));
      } else {
        queryParams.append(key, value.toString());
      }
    }
  });
  return queryParams.toString();
};

export const getFullUrl = (
  endpoint: string,
  params?: Record<string, any>,
): string => {
  const baseUrl = `${API_ENDPOINTS.BASE}${endpoint}`;
  if (params && Object.keys(params).length > 0) {
    const queryString = buildQueryString(params);
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }
  return baseUrl;
};

// Export default
export default API_ENDPOINTS;
