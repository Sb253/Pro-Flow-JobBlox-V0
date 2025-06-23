import { faker } from "@faker-js/faker"
import { BaseFactory } from "./baseFactory"
import type { User, UserRole } from "@/types/backend"

export class UserFactory extends BaseFactory<User> {
  protected build(overrides: Record<string, any> = {}): User {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
      id: this.generateId(),
      email: faker.internet.email({ firstName, lastName }),
      firstName,
      lastName,
      role: faker.helpers.arrayElement(["admin", "manager", "field_worker", "sales_rep"] as UserRole[]),
      tenantId: overrides.tenantId || this.generateId(),
      status: faker.helpers.arrayElement(["active", "inactive", "suspended"]),
      lastLogin: faker.date.recent({ days: 7 }),
      createdAt: this.generateTimestamp(30),
      updatedAt: this.generateTimestamp(1),
      avatar: faker.image.avatar(),
      phone: faker.phone.number(),
      preferences: {
        theme: faker.helpers.arrayElement(["light", "dark", "system"]),
        language: "en",
        timezone: faker.location.timeZone(),
        notifications: {
          email: faker.datatype.boolean(),
          sms: faker.datatype.boolean(),
          push: faker.datatype.boolean(),
          projectUpdates: faker.datatype.boolean(),
          invoiceReminders: faker.datatype.boolean(),
          systemAlerts: faker.datatype.boolean(),
        },
      },
      ...overrides,
    }
  }

  protected getTraitOverrides(traits: string[]): Record<string, any> {
    const overrides: Record<string, any> = {}

    traits.forEach((trait) => {
      switch (trait) {
        case "admin":
          overrides.role = "admin"
          break
        case "manager":
          overrides.role = "manager"
          break
        case "field_worker":
          overrides.role = "field_worker"
          break
        case "inactive":
          overrides.status = "inactive"
          overrides.lastLogin = null
          break
        case "new":
          overrides.createdAt = faker.date.recent({ days: 1 })
          overrides.lastLogin = null
          break
        case "with_avatar":
          overrides.avatar = faker.image.avatar()
          break
        default:
          break
      }
    })

    return overrides
  }
}

export const userFactory = new UserFactory()
