// Authentication types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  tenantId: string
  permissions: Permission[]
  preferences: UserPreferences
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

export interface Tenant {
  id: string
  name: string
  domain: string
  plan: SubscriptionPlan
  settings: TenantSettings
  createdAt: string
  updatedAt: string
}

export type UserRole = "owner" | "admin" | "manager" | "employee" | "customer"

export interface Permission {
  resource: string
  actions: string[]
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: string
  timezone: string
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  inApp: boolean
}

export type SubscriptionPlan = "free" | "starter" | "professional" | "enterprise"

export interface TenantSettings {
  branding: BrandingSettings
  features: Record<string, boolean>
  integrations: Record<string, any>
}

export interface BrandingSettings {
  logo?: string
  primaryColor: string
  secondaryColor: string
  companyName: string
}
