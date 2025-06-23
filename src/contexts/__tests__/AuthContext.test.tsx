"use client"

import type React from "react"

import { renderHook, act } from "@testing-library/react"
import { AuthProvider, useAuth } from "../AuthContext"
import { mockApiService } from "@/test/mocks/apiService"
import { mockUser } from "@/test/utils"

const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it("should provide initial auth state", () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  it("should login successfully", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      const success = await result.current.login("test@example.com", "password")
      expect(success).toBe(true)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(mockApiService.setAuthToken).toHaveBeenCalledWith("mock-token")
    expect(mockApiService.setTenantId).toHaveBeenCalledWith("tenant-1")
  })

  it("should handle login failure", async () => {
    mockApiService.login.mockRejectedValueOnce(new Error("Invalid credentials"))

    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      const success = await result.current.login("test@example.com", "wrongpassword")
      expect(success).toBe(false)
    })

    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
  })

  it("should logout successfully", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    // First login
    await act(async () => {
      await result.current.login("test@example.com", "password")
    })

    expect(result.current.isAuthenticated).toBe(true)

    // Then logout
    await act(async () => {
      await result.current.logout()
    })

    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
    expect(mockApiService.clearAuth).toHaveBeenCalled()
  })

  it("should set bypass auth", () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    act(() => {
      result.current.setBypassAuth(true)
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(localStorage.getItem("bypass_auth")).toBe("true")
  })

  it("should restore bypass auth from localStorage", () => {
    localStorage.setItem("bypass_auth", "true")

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.isAuthenticated).toBe(true)
  })

  it("should handle token refresh", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.refreshToken()
    })

    expect(mockApiService.refreshToken).toHaveBeenCalled()
    expect(mockApiService.setAuthToken).toHaveBeenCalledWith("new-token")
  })
})
