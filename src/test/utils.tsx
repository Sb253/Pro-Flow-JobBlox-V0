import type React from "react"
import type { ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"

// Mock providers for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }

// Mock data generators
export const mockUser = {
  id: "1",
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  role: "admin" as const,
  tenantId: "tenant-1",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
}

export const mockCustomer = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "555-0123",
  type: "residential" as const,
  status: "active" as const,
  tenantId: "tenant-1",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
}

export const mockJob = {
  id: "1",
  title: "Kitchen Renovation",
  description: "Complete kitchen renovation",
  customerId: "1",
  status: "scheduled" as const,
  priority: "high" as const,
  tenantId: "tenant-1",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
}

export const mockApiResponse = <T>(data: T) => ({
  success: true,
  data,
  message: 'Success',
})

export const mockApiError = (message: string) => ({
  success: false,
  error: message,
})

// Helper to wait for async operations
export const waitForLoadingToFinish = () =>
  new Promise(resolve => setTimeout(resolve, 0))
