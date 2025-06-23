import { apiService } from "../api"

// Mock fetch globally
const mockFetch = jest.fn()
global.fetch = mockFetch

describe("ApiService", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  describe("Authentication", () => {
    it("should login successfully", async () => {
      const mockResponse = {
        success: true,
        data: {
          user: { id: "1", email: "test@example.com" },
          token: "mock-token",
          tenantId: "tenant-1",
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiService.login("test@example.com", "password")

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/auth/login"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            email: "test@example.com",
            password: "password",
          }),
        }),
      )

      expect(result).toEqual(mockResponse)
    })

    it("should handle login failure", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: "Invalid credentials" }),
      })

      await expect(apiService.login("test@example.com", "wrongpassword")).rejects.toThrow("Invalid credentials")
    })

    it("should set auth token", () => {
      apiService.setAuthToken("test-token")
      expect(localStorage.getItem("auth_token")).toBe("test-token")
    })

    it("should clear auth", () => {
      localStorage.setItem("auth_token", "test-token")
      localStorage.setItem("tenant_id", "tenant-1")

      apiService.clearAuth()

      expect(localStorage.getItem("auth_token")).toBeNull()
      expect(localStorage.getItem("tenant_id")).toBeNull()
    })
  })

  describe("Customer Management", () => {
    it("should get customers", async () => {
      const mockResponse = {
        success: true,
        data: [{ id: "1", name: "John Doe" }],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiService.getCustomers()

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/customers"), expect.any(Object))

      expect(result).toEqual(mockResponse)
    })

    it("should create customer", async () => {
      const customerData = {
        name: "Jane Smith",
        email: "jane@example.com",
        type: "residential" as const,
      }

      const mockResponse = {
        success: true,
        data: { id: "2", ...customerData },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiService.createCustomer(customerData)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/customers"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(customerData),
        }),
      )

      expect(result).toEqual(mockResponse)
    })
  })

  describe("Error Handling", () => {
    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"))

      await expect(apiService.getCustomers()).rejects.toThrow("Network error")
    })

    it("should handle 404 errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: "Not found" }),
      })

      await expect(apiService.getCustomer("999")).rejects.toThrow("Resource not found")
    })

    it("should handle 500 errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server error" }),
      })

      await expect(apiService.getCustomers()).rejects.toThrow("Server error - please try again later")
    })
  })

  describe("Request Headers", () => {
    it("should include auth token in headers", async () => {
      apiService.setAuthToken("test-token")

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] }),
      })

      await apiService.getCustomers()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer test-token",
          }),
        }),
      )
    })

    it("should include tenant ID in headers", async () => {
      apiService.setTenantId("tenant-1")

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] }),
      })

      await apiService.getCustomers()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "X-Tenant-ID": "tenant-1",
          }),
        }),
      )
    })
  })
})
