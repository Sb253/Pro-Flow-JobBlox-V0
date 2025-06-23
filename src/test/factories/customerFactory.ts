import { faker } from "@faker-js/faker"
import { BaseFactory } from "./baseFactory"
import type { Customer, Address } from "@/types/backend"

export class CustomerFactory extends BaseFactory<Customer> {
  protected build(overrides: Record<string, any> = {}): Customer {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const isCommercial = faker.datatype.boolean({ probability: 0.3 })

    return {
      id: this.generateId(),
      tenantId: overrides.tenantId || this.generateId(),
      name: isCommercial ? faker.company.name() : `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      address: this.generateAddress(),
      type: isCommercial ? "commercial" : faker.helpers.arrayElement(["residential", "industrial"]),
      status: faker.helpers.arrayElement(["active", "inactive", "prospect", "archived"]),
      contactPerson: isCommercial ? `${firstName} ${lastName}` : undefined,
      companySize: isCommercial ? faker.helpers.arrayElement(["1-10", "11-50", "51-200", "200+"]) : undefined,
      industry: isCommercial ? faker.company.buzzNoun() : undefined,
      referralSource: faker.helpers.arrayElement([
        "Google Search",
        "Facebook",
        "Referral",
        "Yellow Pages",
        "Website",
        "Cold Call",
        "Trade Show",
      ]),
      tags: faker.helpers.arrayElements(
        [
          "VIP",
          "High Value",
          "Repeat Customer",
          "Price Sensitive",
          "Quick Pay",
          "Difficult",
          "Seasonal",
          "Emergency Service",
        ],
        { min: 0, max: 3 },
      ),
      notes: faker.lorem.paragraph(),
      customFields: {
        preferredContactTime: faker.helpers.arrayElement(["Morning", "Afternoon", "Evening"]),
        serviceArea: faker.location.city(),
        customerSince: faker.date.past({ years: 5 }).toISOString(),
      },
      createdAt: this.generateTimestamp(365),
      updatedAt: this.generateTimestamp(30),
      createdBy: this.generateId(),
      ...overrides,
    }
  }

  private generateAddress(): Address {
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      country: "US",
    }
  }

  protected getTraitOverrides(traits: string[]): Record<string, any> {
    const overrides: Record<string, any> = {}

    traits.forEach((trait) => {
      switch (trait) {
        case "residential":
          overrides.type = "residential"
          overrides.contactPerson = undefined
          overrides.companySize = undefined
          overrides.industry = undefined
          break
        case "commercial":
          overrides.type = "commercial"
          overrides.name = faker.company.name()
          overrides.contactPerson = faker.person.fullName()
          overrides.companySize = faker.helpers.arrayElement(["1-10", "11-50", "51-200", "200+"])
          overrides.industry = faker.company.buzzNoun()
          break
        case "vip":
          overrides.tags = ["VIP", "High Value"]
          overrides.status = "active"
          break
        case "prospect":
          overrides.status = "prospect"
          overrides.tags = ["Prospect"]
          break
        case "inactive":
          overrides.status = "inactive"
          break
        case "with_history":
          overrides.customFields = {
            ...overrides.customFields,
            totalJobs: faker.number.int({ min: 5, max: 50 }),
            totalRevenue: faker.number.int({ min: 5000, max: 100000 }),
            lastServiceDate: faker.date.recent({ days: 90 }).toISOString(),
          }
          break
        default:
          break
      }
    })

    return overrides
  }
}

export const customerFactory = new CustomerFactory()
