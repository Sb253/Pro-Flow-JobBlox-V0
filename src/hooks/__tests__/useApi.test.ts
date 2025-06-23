import { renderHook, waitFor } from "@testing-library/react"
import { useApi, useCustomers, useCreateCustomer } from "../useApi"
import { mockApiService } from "@/test/mocks/apiService"

describe("useApi", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should fetch data successfully", async () => {
    const mockData = [{ id: "1", name: "Test Customer" }]
    const mockApiCall = jest.fn().mockResolvedValue({
      success: true,
      data: mockData,
    })

    const { result } = renderHook(() => useApi(mockApiCall))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
    expect(mockApiCall).toHaveBeenCalledTimes(1)
  })

  it("should handle API errors", async () => {
    const mockApiCall = jest.fn().mockRejectedValue(new Error("API Error"))

    const { result } = renderHook(() => useApi(mockApiCall))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe("API Error")
  })

  it("should refetch data when refetch is called", async () => {
    const mockData = [{ id: "1", name: "Test Customer" }]
    const mockApiCall = jest.fn().mockResolvedValue({
      success: true,
      data: mockData,
    })

    const { result } = renderHook(() => useApi(mockApiCall))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockApiCall).toHaveBeenCalledTimes(1)

    // Call refetch
    result.current.refetch()

    await waitFor(() => {
      expect(mockApiCall).toHaveBeenCalledTimes(2)
    })
  })
})

describe("useCustomers", () => {
  it("should fetch customers", async () => {
    const { result } = renderHook(() => useCustomers())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockApiService.getCustomers).toHaveBeenCalled()
  })

  it("should pass parameters to API call", async () => {
    const params = { status: "active", type: "residential" }

    renderHook(() => useCustomers(params))

    await waitFor(() => {
      expect(mockApiService.getCustomers).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          limit: 10,
          ...params,
        }),
      )
    })
  })
})

describe("useCreateCustomer", () => {
  it("should create customer successfully", async () => {
    const { result } = renderHook(() => useCreateCustomer())

    const customerData = {
      name: "New Customer",
      email: "new@example.com",
      type: "residential" as const,
    }

    await result.current.mutate(customerData)

    expect(mockApiService.createCustomer).toHaveBeenCalledWith(customerData)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it("should handle creation errors", async () => {
    mockApiService.createCustomer.mockRejectedValueOnce(new Error("Creation failed"))

    const { result } = renderHook(() => useCreateCustomer())

    const customerData = {
      name: "New Customer",
      email: "new@example.com",
      type: "residential" as const,
    }

    await expect(result.current.mutate(customerData)).rejects.toThrow("Creation failed")
    expect(result.current.error).toBe("Creation failed")
  })
})
