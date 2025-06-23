// Modern API client with better error handling and caching
import { type ApiResponse, ApiError, type RequestConfig } from "@/types"
import { apiConfig, authConfig } from "@/config/app"

class ApiClient {
  private baseUrl: string
  private defaultConfig: RequestConfig
  private cache = new Map<string, { data: any; timestamp: number }>()
  private requestQueue = new Map<string, Promise<any>>()

  constructor() {
    this.baseUrl = `${apiConfig.baseUrl}/${apiConfig.version}`
    this.defaultConfig = {
      timeout: apiConfig.timeout,
      retries: apiConfig.retries,
      cache: false,
      headers: {
        "Content-Type": "application/json",
      },
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem(authConfig.tokenKey)
    const tenantId = localStorage.getItem(authConfig.tenantKey)

    const headers: Record<string, string> = {}

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    if (tenantId) {
      headers["X-Tenant-ID"] = tenantId
    }

    return headers
  }

  private getCacheKey(url: string, options: RequestInit): string {
    return `${url}:${JSON.stringify(options)}`
  }

  private isValidCacheEntry(timestamp: number, maxAge = 5 * 60 * 1000): boolean {
    return Date.now() - timestamp < maxAge
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error: ApiError = {
        code: response.status.toString(),
        message: response.statusText,
        timestamp: new Date().toISOString(),
      }

      try {
        const errorData = await response.json()
        error.message = errorData.message || error.message
        error.details = errorData.details
      } catch {
        // Use default error message if JSON parsing fails
      }

      throw error
    }

    try {
      const data = await response.json()
      return data
    } catch {
      throw new Error("Invalid JSON response")
    }
  }

  private async retryRequest<T>(url: string, options: RequestInit, retries: number): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, options)
      return this.handleResponse<T>(response)
    } catch (error) {
      if (retries > 0 && this.shouldRetry(error)) {
        await this.delay(1000 * (apiConfig.retries - retries + 1))
        return this.retryRequest<T>(url, options, retries - 1)
      }
      throw error
    }
  }

  private shouldRetry(error: any): boolean {
    if (error instanceof ApiError) {
      const retryableCodes = ["500", "502", "503", "504", "408", "429"]
      return retryableCodes.includes(error.code)
    }
    return false
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async request<T = any>(endpoint: string, config: RequestConfig & RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const mergedConfig = { ...this.defaultConfig, ...config }

    const options: RequestInit = {
      ...mergedConfig,
      headers: {
        ...this.defaultConfig.headers,
        ...this.getAuthHeaders(),
        ...config.headers,
      },
    }

    // Handle caching
    if (mergedConfig.cache && options.method === "GET") {
      const cacheKey = this.getCacheKey(url, options)
      const cached = this.cache.get(cacheKey)

      if (cached && this.isValidCacheEntry(cached.timestamp)) {
        return cached.data
      }
    }

    // Handle request deduplication
    const requestKey = this.getCacheKey(url, options)
    if (this.requestQueue.has(requestKey)) {
      return this.requestQueue.get(requestKey)!
    }

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), mergedConfig.timeout)

    options.signal = controller.signal

    const requestPromise = this.retryRequest<T>(url, options, mergedConfig.retries || 0).finally(() => {
      clearTimeout(timeoutId)
      this.requestQueue.delete(requestKey)
    })

    this.requestQueue.set(requestKey, requestPromise)

    try {
      const result = await requestPromise

      // Cache successful GET requests
      if (mergedConfig.cache && options.method === "GET") {
        const cacheKey = this.getCacheKey(url, options)
        this.cache.set(cacheKey, {
          data: result,
          timestamp: Date.now(),
        })
      }

      return result
    } catch (error) {
      if (error instanceof ApiError && error.code === "401") {
        // Handle authentication error
        this.clearAuth()
        window.location.href = "/login"
      }
      throw error
    }
  }

  // HTTP method helpers
  get<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" })
  }

  post<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  put<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  patch<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  delete<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" })
  }

  // Authentication helpers
  setAuthToken(token: string): void {
    localStorage.setItem(authConfig.tokenKey, token)
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(authConfig.refreshTokenKey, token)
  }

  setTenantId(tenantId: string): void {
    localStorage.setItem(authConfig.tenantKey, tenantId)
  }

  clearAuth(): void {
    localStorage.removeItem(authConfig.tokenKey)
    localStorage.removeItem(authConfig.refreshTokenKey)
    localStorage.removeItem(authConfig.tenantKey)
    this.cache.clear()
  }

  // Cache management
  clearCache(): void {
    this.cache.clear()
  }

  invalidateCache(pattern?: string): void {
    if (!pattern) {
      this.clearCache()
      return
    }

    const regex = new RegExp(pattern)
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }
  }
}

export const apiClient = new ApiClient()
export default apiClient
