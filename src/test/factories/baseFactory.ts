import { faker } from "@faker-js/faker"

export interface FactoryOptions {
  count?: number
  overrides?: Record<string, any>
  traits?: string[]
}

export abstract class BaseFactory<T> {
  protected abstract build(overrides?: Record<string, any>): T

  /**
   * Create a single instance
   */
  create(overrides?: Record<string, any>): T {
    return this.build(overrides)
  }

  /**
   * Create multiple instances
   */
  createList(count: number, overrides?: Record<string, any>): T[] {
    return Array.from({ length: count }, () => this.create(overrides))
  }

  /**
   * Create with traits (predefined configurations)
   */
  createWithTraits(traits: string[], overrides?: Record<string, any>): T {
    const traitOverrides = this.getTraitOverrides(traits)
    return this.create({ ...traitOverrides, ...overrides })
  }

  protected abstract getTraitOverrides(traits: string[]): Record<string, any>

  /**
   * Generate realistic IDs
   */
  protected generateId(): string {
    return faker.string.uuid()
  }

  /**
   * Generate realistic timestamps
   */
  protected generateTimestamp(daysAgo = 0): Date {
    return faker.date.recent({ days: daysAgo })
  }

  /**
   * Generate realistic future date
   */
  protected generateFutureDate(daysFromNow = 30): Date {
    return faker.date.future({ days: daysFromNow })
  }
}
