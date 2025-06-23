import { testScenarios } from "./scenarios"
import type { TestScenario } from "./scenarios"

/**
 * Database seeding utilities for tests
 */
export class TestDatabase {
  private data: Map<string, any> = new Map()

  /**
   * Seed database with a specific scenario
   */
  async seedScenario(scenarioName: keyof typeof testScenarios): Promise<TestScenario> {
    const scenario = testScenarios[scenarioName]()

    // Store scenario data
    this.data.set("currentScenario", scenario)
    this.data.set("users", scenario.data.users)
    this.data.set("customers", scenario.data.customers)
    this.data.set("jobs", scenario.data.jobs)
    this.data.set("invoices", scenario.data.invoices)
    this.data.set("estimates", scenario.data.estimates)

    return scenario
  }

  /**
   * Get data by type
   */
  getData<T>(type: string): T[] {
    return this.data.get(type) || []
  }

  /**
   * Get single item by ID
   */
  getById<T>(type: string, id: string): T | undefined {
    const items = this.getData<any>(type)
    return items.find((item: any) => item.id === id)
  }

  /**
   * Add item to database
   */
  add<T>(type: string, item: T): void {
    const items = this.getData<T>(type)
    items.push(item)
    this.data.set(type, items)
  }

  /**
   * Update item in database
   */
  update<T extends { id: string }>(type: string, id: string, updates: Partial<T>): T | undefined {
    const items = this.getData<T>(type)
    const index = items.findIndex((item: any) => item.id === id)

    if (index !== -1) {
      items[index] = { ...items[index], ...updates }
      this.data.set(type, items)
      return items[index]
    }

    return undefined
  }

  /**
   * Delete item from database
   */
  delete(type: string, id: string): boolean {
    const items = this.getData<any>(type)
    const index = items.findIndex((item: any) => item.id === id)

    if (index !== -1) {
      items.splice(index, 1)
      this.data.set(type, items)
      return true
    }

    return false
  }

  /**
   * Clear all data
   */
  clear(): void {
    this.data.clear()
  }

  /**
   * Get current scenario
   */
  getCurrentScenario(): TestScenario | undefined {
    return this.data.get("currentScenario")
  }

  /**
   * Query data with filters
   */
  query<T>(type: string, filters: Record<string, any>): T[] {
    const items = this.getData<any>(type)

    return items.filter((item: any) => {
      return Object.entries(filters).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.includes(item[key])
        }
        return item[key] === value
      })
    })
  }

  /**
   * Get statistics about current data
   */
  getStats() {
    return {
      users: this.getData("users").length,
      customers: this.getData("customers").length,
      jobs: this.getData("jobs").length,
      invoices: this.getData("invoices").length,
      estimates: this.getData("estimates").length,
      scenario: this.getCurrentScenario()?.name || "None",
    }
  }
}

// Global test database instance
export const testDb = new TestDatabase()

/**
 * Helper to setup test database for specific test suites
 */
export const setupTestDatabase = async (scenarioName: keyof typeof testScenarios) => {
  await testDb.seedScenario(scenarioName)
  return testDb
}

/**
 * Helper to clean up test database
 */
export const cleanupTestDatabase = () => {
  testDb.clear()
}
