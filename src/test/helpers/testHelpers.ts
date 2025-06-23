import { setupTestDatabase, cleanupTestDatabase, testDb } from "../fixtures/database"
import { createMockApiResponses } from "../fixtures/mockApiResponses"
import type { testScenarios } from "../fixtures/scenarios"
import { expect, jest } from "@jest/globals"

/**
 * Setup test environment with specific scenario
 */
export const setupTestEnvironment = async (scenarioName: keyof typeof testScenarios) => {
  // Clean up any existing data
  cleanupTestDatabase()

  // Setup new scenario
  const scenario = await setupTestDatabase(scenarioName)

  // Create mock API responses
  const mockApi = createMockApiResponses()

  return {
    scenario,
    testDb,
    mockApi,
    cleanup: cleanupTestDatabase,
  }
}

/**
 * Create test user session
 */
export const createTestSession = (userId?: string) => {
  const users = testDb.getData("users")
  const user = userId ? testDb.getById("users", userId) : users[0]

  if (!user) {
    throw new Error("No user found for test session")
  }

  return {
    user,
    token: `test-token-${user.id}`,
    tenantId: user.tenantId,
  }
}

/**
 * Wait for async operations in tests
 */
export const waitFor = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Generate test data on demand
 */
export const generateTestData = {
  customer: (overrides = {}) => {
    const { customerFactory } = require("../factories")
    return customerFactory.create(overrides)
  },

  job: (overrides = {}) => {
    const { jobFactory } = require("../factories")
    return jobFactory.create(overrides)
  },

  invoice: (overrides = {}) => {
    const { invoiceFactory } = require("../factories")
    return invoiceFactory.create(overrides)
  },

  user: (overrides = {}) => {
    const { userFactory } = require("../factories")
    return userFactory.create(overrides)
  },
}

/**
 * Assert helpers for common test patterns
 */
export const assertHelpers = {
  hasRequiredFields: (obj: any, fields: string[]) => {
    fields.forEach((field) => {
      expect(obj).toHaveProperty(field)
      expect(obj[field]).toBeDefined()
    })
  },

  isValidDate: (date: any) => {
    expect(date).toBeInstanceOf(Date)
    expect(date.getTime()).not.toBeNaN()
  },

  isValidId: (id: any) => {
    expect(typeof id).toBe("string")
    expect(id.length).toBeGreaterThan(0)
  },

  hasValidTimestamps: (obj: any) => {
    assertHelpers.hasRequiredFields(obj, ["createdAt", "updatedAt"])
    assertHelpers.isValidDate(obj.createdAt)
    assertHelpers.isValidDate(obj.updatedAt)
  },
}

/**
 * Mock localStorage for tests
 */
export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach((key) => delete store[key])
    }),
  }
}

/**
 * Mock window.location for tests
 */
export const mockLocation = (url = "http://localhost:3000") => {
  delete (window as any).location
  window.location = new URL(url) as any
}
