// API Service Layer for Multi-Tenant CRM
import type {
  User,
  Customer,
  Job,
  Estimate,
  Invoice,
  Payment,
  Employee,
  InventoryItem,
  TimeEntry,
  Document,
  ApiResponse,
  CreateUserRequest,
  UpdateUserRequest,
  CreateCustomerRequest,
  CreateJobRequest,
  CreateEstimateRequest,
  CreateInvoiceRequest,
} from "../types/backend"
import { APP_CONFIG } from "../utils/constants"

class ApiService {
  private baseUrl: string
  private token: string | null = null
  private tenantId: string | null = null
  private isDevelopment: boolean

  constructor() {
    this.baseUrl = `${APP_CONFIG.api.baseUrl}/${APP_CONFIG.api.version}`
    this.token = localStorage.getItem(APP_CONFIG.auth.tokenKey)
    this.tenantId = localStorage.getItem(APP_CONFIG.auth.tenantKey)
    this.isDevelopment = APP_CONFIG.features.mockApi
  }

  // Add mock data method
  private getMockResponse<T>(data: T): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve({
            success: true,
            data,
            message: "Mock response",
          })
        },
        Math.random() * 1000 + 500,
      ) // Random delay between 500-1500ms
    })
  }

  // Update the request method to handle development mode
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    // In development mode, return mock data for certain endpoints
    if (this.isDevelopment && this.shouldMock(endpoint)) {
      return this.handleMockRequest<T>(endpoint, options)
    }

    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    if (this.tenantId) {
      headers["X-Tenant-ID"] = this.tenantId
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), APP_CONFIG.api.timeout)

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        // Handle different error types
        if (response.status === 401) {
          this.clearAuth()
          throw new Error("Authentication required")
        }
        if (response.status === 403) {
          throw new Error("Access forbidden")
        }
        if (response.status === 404) {
          throw new Error("Resource not found")
        }
        if (response.status >= 500) {
          throw new Error("Server error - please try again later")
        }

        // Try to get error message from response
        try {
          const errorData = await response.json()
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        } catch {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API request failed:", error)

      // Return mock data in development if API fails
      if (this.isDevelopment) {
        console.warn("API failed, returning mock data")
        return this.handleMockRequest<T>(endpoint, options)
      }

      throw error
    }
  }

  private shouldMock(endpoint: string): boolean {
    // Mock certain endpoints in development
    const mockEndpoints = ["/auth/login", "/customers", "/jobs", "/invoices", "/users"]
    return mockEndpoints.some((mock) => endpoint.includes(mock))
  }

  private async handleMockRequest<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
    // Handle different mock responses based on endpoint
    if (endpoint.includes("/auth/login")) {
      return this.getMockResponse({
        user: {
          id: "1",
          email: "demo@jobblox.com",
          firstName: "Demo",
          lastName: "User",
          role: "admin",
          tenantId: "tenant-1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: "mock-token-123",
        tenantId: "tenant-1",
      } as any)
    }

    if (endpoint.includes("/customers")) {
      return this.getMockResponse([
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "555-0123",
          type: "residential",
          status: "active",
          tenantId: "tenant-1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "555-0124",
          type: "commercial",
          status: "active",
          tenantId: "tenant-1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ] as any)
    }

    if (endpoint.includes("/jobs")) {
      return this.getMockResponse([
        {
          id: "1",
          title: "Kitchen Renovation",
          description: "Complete kitchen renovation including cabinets and countertops",
          customerId: "1",
          status: "in_progress",
          priority: "high",
          scheduledDate: new Date().toISOString(),
          tenantId: "tenant-1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ] as any)
    }

    // Default mock response
    return this.getMockResponse([] as any)
  }

  // Authentication methods
  setAuthToken(token: string) {
    this.token = token
    localStorage.setItem(APP_CONFIG.auth.tokenKey, token)
  }

  setTenantId(tenantId: string) {
    this.tenantId = tenantId
    localStorage.setItem(APP_CONFIG.auth.tenantKey, tenantId)
  }

  clearAuth() {
    this.token = null
    this.tenantId = null
    localStorage.removeItem(APP_CONFIG.auth.tokenKey)
    localStorage.removeItem(APP_CONFIG.auth.tenantKey)
  }

  // Authentication API
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string; tenantId: string }>> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(
    userData: CreateUserRequest & { password: string; tenantName: string },
  ): Promise<ApiResponse<{ user: User; token: string; tenantId: string }>> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.request("/auth/refresh", {
      method: "POST",
    })
  }

  // User Management API
  async getUsers(params?: {
    page?: number
    limit?: number
    role?: string
  }): Promise<ApiResponse<User[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.role) queryParams.append("role", params.role)

    return this.request(`/users?${queryParams.toString()}`)
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request(`/users/${id}`)
  }

  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    })
  }

  // Customer Management API
  async getCustomers(params?: {
    page?: number
    limit?: number
    status?: string
    type?: string
    search?: string
  }): Promise<ApiResponse<Customer[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.status) queryParams.append("status", params.status)
    if (params?.type) queryParams.append("type", params.type)
    if (params?.search) queryParams.append("search", params.search)

    return this.request(`/customers?${queryParams.toString()}`)
  }

  async getCustomer(id: string): Promise<ApiResponse<Customer>> {
    return this.request(`/customers/${id}`)
  }

  async createCustomer(customerData: CreateCustomerRequest): Promise<ApiResponse<Customer>> {
    return this.request("/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
    })
  }

  async updateCustomer(id: string, customerData: Partial<CreateCustomerRequest>): Promise<ApiResponse<Customer>> {
    return this.request(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customerData),
    })
  }

  async deleteCustomer(id: string): Promise<ApiResponse<void>> {
    return this.request(`/customers/${id}`, {
      method: "DELETE",
    })
  }

  // Job Management API
  async getJobs(params?: {
    page?: number
    limit?: number
    status?: string
    customerId?: string
    assignedTo?: string
  }): Promise<ApiResponse<Job[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.status) queryParams.append("status", params.status)
    if (params?.customerId) queryParams.append("customerId", params.customerId)
    if (params?.assignedTo) queryParams.append("assignedTo", params.assignedTo)

    return this.request(`/jobs?${queryParams.toString()}`)
  }

  async getJob(id: string): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}`)
  }

  async createJob(jobData: CreateJobRequest): Promise<ApiResponse<Job>> {
    return this.request("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    })
  }

  async updateJob(id: string, jobData: Partial<CreateJobRequest>): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(jobData),
    })
  }

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return this.request(`/jobs/${id}`, {
      method: "DELETE",
    })
  }

  // Estimate Management API
  async getEstimates(params?: {
    page?: number
    limit?: number
    status?: string
    customerId?: string
  }): Promise<ApiResponse<Estimate[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.status) queryParams.append("status", params.status)
    if (params?.customerId) queryParams.append("customerId", params.customerId)

    return this.request(`/estimates?${queryParams.toString()}`)
  }

  async getEstimate(id: string): Promise<ApiResponse<Estimate>> {
    return this.request(`/estimates/${id}`)
  }

  async createEstimate(estimateData: CreateEstimateRequest): Promise<ApiResponse<Estimate>> {
    return this.request("/estimates", {
      method: "POST",
      body: JSON.stringify(estimateData),
    })
  }

  async updateEstimate(id: string, estimateData: Partial<CreateEstimateRequest>): Promise<ApiResponse<Estimate>> {
    return this.request(`/estimates/${id}`, {
      method: "PUT",
      body: JSON.stringify(estimateData),
    })
  }

  async deleteEstimate(id: string): Promise<ApiResponse<void>> {
    return this.request(`/estimates/${id}`, {
      method: "DELETE",
    })
  }

  async sendEstimate(id: string, email?: string): Promise<ApiResponse<void>> {
    return this.request(`/estimates/${id}/send`, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async approveEstimate(id: string): Promise<ApiResponse<Estimate>> {
    return this.request(`/estimates/${id}/approve`, {
      method: "POST",
    })
  }

  // Invoice Management API
  async getInvoices(params?: {
    page?: number
    limit?: number
    status?: string
    customerId?: string
  }): Promise<ApiResponse<Invoice[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.status) queryParams.append("status", params.status)
    if (params?.customerId) queryParams.append("customerId", params.customerId)

    return this.request(`/invoices?${queryParams.toString()}`)
  }

  async getInvoice(id: string): Promise<ApiResponse<Invoice>> {
    return this.request(`/invoices/${id}`)
  }

  async createInvoice(invoiceData: CreateInvoiceRequest): Promise<ApiResponse<Invoice>> {
    return this.request("/invoices", {
      method: "POST",
      body: JSON.stringify(invoiceData),
    })
  }

  async updateInvoice(id: string, invoiceData: Partial<CreateInvoiceRequest>): Promise<ApiResponse<Invoice>> {
    return this.request(`/invoices/${id}`, {
      method: "PUT",
      body: JSON.stringify(invoiceData),
    })
  }

  async deleteInvoice(id: string): Promise<ApiResponse<void>> {
    return this.request(`/invoices/${id}`, {
      method: "DELETE",
    })
  }

  async sendInvoice(id: string, email?: string): Promise<ApiResponse<void>> {
    return this.request(`/invoices/${id}/send`, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  // Payment Management API
  async getPayments(params?: {
    page?: number
    limit?: number
    status?: string
    customerId?: string
    invoiceId?: string
  }): Promise<ApiResponse<Payment[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.status) queryParams.append("status", params.status)
    if (params?.customerId) queryParams.append("customerId", params.customerId)
    if (params?.invoiceId) queryParams.append("invoiceId", params.invoiceId)

    return this.request(`/payments?${queryParams.toString()}`)
  }

  async getPayment(id: string): Promise<ApiResponse<Payment>> {
    return this.request(`/payments/${id}`)
  }

  async createPayment(
    paymentData: Omit<Payment, "id" | "tenantId" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Payment>> {
    return this.request("/payments", {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  async processPayment(id: string): Promise<ApiResponse<Payment>> {
    return this.request(`/payments/${id}/process`, {
      method: "POST",
    })
  }

  async refundPayment(id: string, amount?: number): Promise<ApiResponse<Payment>> {
    return this.request(`/payments/${id}/refund`, {
      method: "POST",
      body: JSON.stringify({ amount }),
    })
  }

  // Employee Management API
  async getEmployees(params?: {
    page?: number
    limit?: number
    status?: string
    department?: string
  }): Promise<ApiResponse<Employee[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.status) queryParams.append("status", params.status)
    if (params?.department) queryParams.append("department", params.department)

    return this.request(`/employees?${queryParams.toString()}`)
  }

  async getEmployee(id: string): Promise<ApiResponse<Employee>> {
    return this.request(`/employees/${id}`)
  }

  async createEmployee(
    employeeData: Omit<Employee, "id" | "tenantId" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Employee>> {
    return this.request("/employees", {
      method: "POST",
      body: JSON.stringify(employeeData),
    })
  }

  async updateEmployee(id: string, employeeData: Partial<Employee>): Promise<ApiResponse<Employee>> {
    return this.request(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(employeeData),
    })
  }

  async deleteEmployee(id: string): Promise<ApiResponse<void>> {
    return this.request(`/employees/${id}`, {
      method: "DELETE",
    })
  }

  // Inventory Management API
  async getInventoryItems(params?: {
    page?: number
    limit?: number
    category?: string
    lowStock?: boolean
  }): Promise<ApiResponse<InventoryItem[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.category) queryParams.append("category", params.category)
    if (params?.lowStock) queryParams.append("lowStock", "true")

    return this.request(`/inventory?${queryParams.toString()}`)
  }

  async getInventoryItem(id: string): Promise<ApiResponse<InventoryItem>> {
    return this.request(`/inventory/${id}`)
  }

  async createInventoryItem(
    itemData: Omit<InventoryItem, "id" | "tenantId" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<InventoryItem>> {
    return this.request("/inventory", {
      method: "POST",
      body: JSON.stringify(itemData),
    })
  }

  async updateInventoryItem(id: string, itemData: Partial<InventoryItem>): Promise<ApiResponse<InventoryItem>> {
    return this.request(`/inventory/${id}`, {
      method: "PUT",
      body: JSON.stringify(itemData),
    })
  }

  async deleteInventoryItem(id: string): Promise<ApiResponse<void>> {
    return this.request(`/inventory/${id}`, {
      method: "DELETE",
    })
  }

  async adjustStock(id: string, quantity: number, reason: string): Promise<ApiResponse<InventoryItem>> {
    return this.request(`/inventory/${id}/adjust`, {
      method: "POST",
      body: JSON.stringify({ quantity, reason }),
    })
  }

  // Time Tracking API
  async getTimeEntries(params?: {
    page?: number
    limit?: number
    employeeId?: string
    jobId?: string
    startDate?: string
    endDate?: string
  }): Promise<ApiResponse<TimeEntry[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.employeeId) queryParams.append("employeeId", params.employeeId)
    if (params?.jobId) queryParams.append("jobId", params.jobId)
    if (params?.startDate) queryParams.append("startDate", params.startDate)
    if (params?.endDate) queryParams.append("endDate", params.endDate)

    return this.request(`/time-entries?${queryParams.toString()}`)
  }

  async getTimeEntry(id: string): Promise<ApiResponse<TimeEntry>> {
    return this.request(`/time-entries/${id}`)
  }

  async createTimeEntry(
    entryData: Omit<TimeEntry, "id" | "tenantId" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<TimeEntry>> {
    return this.request("/time-entries", {
      method: "POST",
      body: JSON.stringify(entryData),
    })
  }

  async updateTimeEntry(id: string, entryData: Partial<TimeEntry>): Promise<ApiResponse<TimeEntry>> {
    return this.request(`/time-entries/${id}`, {
      method: "PUT",
      body: JSON.stringify(entryData),
    })
  }

  async deleteTimeEntry(id: string): Promise<ApiResponse<void>> {
    return this.request(`/time-entries/${id}`, {
      method: "DELETE",
    })
  }

  async startTimer(employeeId: string, jobId?: string, description?: string): Promise<ApiResponse<TimeEntry>> {
    return this.request("/time-entries/start", {
      method: "POST",
      body: JSON.stringify({ employeeId, jobId, description }),
    })
  }

  async stopTimer(id: string): Promise<ApiResponse<TimeEntry>> {
    return this.request(`/time-entries/${id}/stop`, {
      method: "POST",
    })
  }

  // Document Management API
  async getDocuments(params?: {
    page?: number
    limit?: number
    category?: string
    relatedType?: string
    relatedId?: string
  }): Promise<ApiResponse<Document[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.category) queryParams.append("category", params.category)
    if (params?.relatedType) queryParams.append("relatedType", params.relatedType)
    if (params?.relatedId) queryParams.append("relatedId", params.relatedId)

    return this.request(`/documents?${queryParams.toString()}`)
  }

  async getDocument(id: string): Promise<ApiResponse<Document>> {
    return this.request(`/documents/${id}`)
  }

  async uploadDocument(file: File, metadata: Partial<Document>): Promise<ApiResponse<Document>> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("metadata", JSON.stringify(metadata))

    return this.request("/documents/upload", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    })
  }

  async deleteDocument(id: string): Promise<ApiResponse<void>> {
    return this.request(`/documents/${id}`, {
      method: "DELETE",
    })
  }

  // Reports API
  async getReports(type: string, params?: Record<string, any>): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request(`/reports/${type}?${queryParams.toString()}`)
  }

  // Notifications API
  async getNotifications(params?: {
    page?: number
    limit?: number
    unread?: boolean
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.unread) queryParams.append("unread", "true")

    return this.request(`/notifications?${queryParams.toString()}`)
  }

  async markNotificationRead(id: string): Promise<ApiResponse<void>> {
    return this.request(`/notifications/${id}/read`, {
      method: "POST",
    })
  }

  // Integration API
  async getIntegrations(): Promise<ApiResponse<any[]>> {
    return this.request("/integrations")
  }

  async getAvailableIntegrations(): Promise<ApiResponse<any[]>> {
    return this.request("/integrations/available")
  }

  async getConnectedIntegrations(): Promise<ApiResponse<any[]>> {
    return this.request("/integrations/connected")
  }

  async connectIntegration(provider: string, config: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/${provider}/connect`, {
      method: "POST",
      body: JSON.stringify(config),
    })
  }

  async disconnectIntegration(provider: string): Promise<ApiResponse<void>> {
    return this.request(`/integrations/${provider}/disconnect`, {
      method: "POST",
    })
  }

  async configureIntegration(provider: string, config: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/${provider}/configure`, {
      method: "PUT",
      body: JSON.stringify(config),
    })
  }

  async testIntegration(provider: string): Promise<ApiResponse<any>> {
    return this.request(`/integrations/${provider}/test`, {
      method: "POST",
    })
  }

  async syncIntegration(provider: string, options?: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/${provider}/sync`, {
      method: "POST",
      body: JSON.stringify(options || {}),
    })
  }

  async getIntegrationLogs(provider: string, params?: { page?: number; limit?: number }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    return this.request(`/integrations/${provider}/logs?${queryParams.toString()}`)
  }

  // QuickBooks Integration API
  async getQuickBooksOAuthUrl(): Promise<ApiResponse<{ authUrl: string }>> {
    return this.request("/integrations/quickbooks/oauth-url")
  }

  async connectQuickBooks(code: string, state: string): Promise<ApiResponse<any>> {
    return this.request("/integrations/quickbooks/callback", {
      method: "POST",
      body: JSON.stringify({ code, state }),
    })
  }

  async disconnectQuickBooks(): Promise<ApiResponse<void>> {
    return this.request("/integrations/quickbooks/disconnect", {
      method: "POST",
    })
  }

  async refreshQuickBooksToken(): Promise<ApiResponse<any>> {
    return this.request("/integrations/quickbooks/refresh-token", {
      method: "POST",
    })
  }

  async getQuickBooksCompanyInfo(): Promise<ApiResponse<any>> {
    return this.request("/integrations/quickbooks/company-info")
  }

  async getQuickBooksCustomers(params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    return this.request(`/integrations/quickbooks/customers?${queryParams.toString()}`)
  }

  async syncQuickBooksCustomers(): Promise<ApiResponse<any>> {
    return this.request("/integrations/quickbooks/sync/customers", {
      method: "POST",
    })
  }

  async getQuickBooksInvoices(params?: {
    page?: number
    limit?: number
    customerId?: string
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.customerId) queryParams.append("customerId", params.customerId)

    return this.request(`/integrations/quickbooks/invoices?${queryParams.toString()}`)
  }

  async syncQuickBooksInvoices(): Promise<ApiResponse<any>> {
    return this.request("/integrations/quickbooks/sync/invoices", {
      method: "POST",
    })
  }

  async getQuickBooksPayments(params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    return this.request(`/integrations/quickbooks/payments?${queryParams.toString()}`)
  }

  async syncQuickBooksPayments(): Promise<ApiResponse<any>> {
    return this.request("/integrations/quickbooks/sync/payments", {
      method: "POST",
    })
  }

  async syncAllQuickBooksData(): Promise<ApiResponse<any>> {
    return this.request("/integrations/quickbooks/sync/all", {
      method: "POST",
    })
  }

  async getQuickBooksSyncStatus(): Promise<ApiResponse<any>> {
    return this.request("/integrations/quickbooks/sync/status")
  }

  // Accounting Platform Integration API
  async getAccountingProviders(): Promise<ApiResponse<any[]>> {
    return this.request("/integrations/accounting/providers")
  }

  async connectAccountingPlatform(provider: string, credentials: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/accounting/${provider}/connect`, {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async syncAccountingData(provider: string, entityType: string): Promise<ApiResponse<any>> {
    return this.request(`/integrations/accounting/${provider}/sync`, {
      method: "POST",
      body: JSON.stringify({ entityType }),
    })
  }

  // CRM Integration API
  async getCRMProviders(): Promise<ApiResponse<any[]>> {
    return this.request("/integrations/crm/providers")
  }

  async connectCRM(provider: string, credentials: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/crm/${provider}/connect`, {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async syncCRMContacts(provider: string): Promise<ApiResponse<any>> {
    return this.request(`/integrations/crm/${provider}/sync`, {
      method: "POST",
      body: JSON.stringify({ entityType: "contacts" }),
    })
  }

  async getCRMContacts(provider: string, params?: { page?: number; limit?: number }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    return this.request(`/integrations/crm/${provider}/contacts?${queryParams.toString()}`)
  }

  // Marketing Integration API
  async getMarketingProviders(): Promise<ApiResponse<any[]>> {
    return this.request("/integrations/marketing/providers")
  }

  async connectMarketing(provider: string, credentials: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/marketing/${provider}/connect`, {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async syncMarketingContacts(provider: string): Promise<ApiResponse<any>> {
    return this.request(`/integrations/marketing/${provider}/sync`, {
      method: "POST",
      body: JSON.stringify({ entityType: "contacts" }),
    })
  }

  async getMarketingLists(provider: string, params?: { page?: number; limit?: number }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    return this.request(`/integrations/marketing/${provider}/lists?${queryParams.toString()}`)
  }

  // Payment Integration API
  async getPaymentProviders(): Promise<ApiResponse<any[]>> {
    return this.request("/integrations/payments/providers")
  }

  async connectPaymentProvider(provider: string, credentials: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/payments/${provider}/connect`, {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async processPaymentViaIntegration(provider: string, paymentData: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/payments/${provider}/process`, {
      method: "POST",
      body: JSON.stringify(paymentData),
    })
  }

  // Sync Jobs API
  async getSyncJobs(params?: {
    page?: number
    limit?: number
    integrationId?: string
    status?: string
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())
    if (params?.integrationId) queryParams.append("integrationId", params.integrationId)
    if (params?.status) queryParams.append("status", params.status)

    return this.request(`/integrations/sync-jobs?${queryParams.toString()}`)
  }

  async getSyncJob(id: string): Promise<ApiResponse<any>> {
    return this.request(`/integrations/sync-jobs/${id}`)
  }

  async cancelSyncJob(id: string): Promise<ApiResponse<void>> {
    return this.request(`/integrations/sync-jobs/${id}/cancel`, {
      method: "POST",
    })
  }

  async retrySyncJob(id: string): Promise<ApiResponse<any>> {
    return this.request(`/integrations/sync-jobs/${id}/retry`, {
      method: "POST",
    })
  }

  // Integration Mappings API
  async getIntegrationMappings(integrationId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/integrations/mappings?integrationId=${integrationId}`)
  }

  async createIntegrationMapping(mappingData: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request("/integrations/mappings", {
      method: "POST",
      body: JSON.stringify(mappingData),
    })
  }

  async updateIntegrationMapping(id: string, mappingData: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request(`/integrations/mappings/${id}`, {
      method: "PUT",
      body: JSON.stringify(mappingData),
    })
  }

  async deleteIntegrationMapping(id: string): Promise<ApiResponse<void>> {
    return this.request(`/integrations/mappings/${id}`, {
      method: "DELETE",
    })
  }

  // AI & Automation API
  async getAIInsights(params?: {
    type?: string
    timeframe?: string
    context?: string
  }): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams()
    if (params?.type) queryParams.append("type", params.type)
    if (params?.timeframe) queryParams.append("timeframe", params.timeframe)
    if (params?.context) queryParams.append("context", params.context)

    return this.request(`/ai/insights?${queryParams.toString()}`)
  }

  async generateDocument(templateId: string, data: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request("/ai/documents/generate", {
      method: "POST",
      body: JSON.stringify({ templateId, data }),
    })
  }

  async getJobRecommendations(params?: {
    customerId?: string
    budget?: number
    timeline?: string
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams()
    if (params?.customerId) queryParams.append("customerId", params.customerId)
    if (params?.budget) queryParams.append("budget", params.budget.toString())
    if (params?.timeline) queryParams.append("timeline", params.timeline)

    return this.request(`/ai/recommendations/jobs?${queryParams.toString()}`)
  }

  async optimizeRoute(employeeIds: string[], date: string): Promise<ApiResponse<any>> {
    return this.request("/ai/optimize/routes", {
      method: "POST",
      body: JSON.stringify({ employeeIds, date }),
    })
  }

  async predictProjectCompletion(jobId: string): Promise<ApiResponse<any>> {
    return this.request(`/ai/predict/completion/${jobId}`)
  }

  async analyzeCustomerSentiment(customerId: string): Promise<ApiResponse<any>> {
    return this.request(`/ai/analyze/sentiment/${customerId}`)
  }

  async getAutomationWorkflows(): Promise<ApiResponse<any[]>> {
    return this.request("/automation/workflows")
  }

  async createWorkflow(workflowData: Record<string, any>): Promise<ApiResponse<any>> {
    return this.request("/automation/workflows", {
      method: "POST",
      body: JSON.stringify(workflowData),
    })
  }

  async toggleWorkflow(workflowId: string, enabled: boolean): Promise<ApiResponse<any>> {
    return this.request(`/automation/workflows/${workflowId}/toggle`, {
      method: "POST",
      body: JSON.stringify({ enabled }),
    })
  }

  async getCustomerJourney(customerId: string): Promise<ApiResponse<any>> {
    return this.request(`/ai/customer-journey/${customerId}`)
  }

  async triggerAutomatedFollowup(customerId: string, triggerType: string): Promise<ApiResponse<any>> {
    return this.request("/automation/followup/trigger", {
      method: "POST",
      body: JSON.stringify({ customerId, triggerType }),
    })
  }
}

// Export singleton instance
export const apiService = new ApiService()
export default apiService
