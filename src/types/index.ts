import type React from "react"
// Centralized type definitions
export * from "./api"
export * from "./auth"
export * from "./business"
export * from "./ui"
export * from "./forms"

// Global app types
export interface AppConfig {
  name: string
  version: string
  environment: "development" | "staging" | "production"
  features: Record<string, boolean>
}

export interface AppState {
  isLoading: boolean
  error: string | null
  user: User | null
  tenant: Tenant | null
}

export interface RouteConfig {
  path: string
  component: React.ComponentType
  exact?: boolean
  protected?: boolean
  roles?: string[]
  title?: string
  description?: string
}

export interface User {
  id: string
  username: string
  email: string
}

export interface Tenant {
  id: string
  name: string
  domain: string
}
