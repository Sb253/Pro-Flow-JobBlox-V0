import { faker } from "@faker-js/faker"
import { BaseFactory } from "./baseFactory"
import type { Estimate, EstimateStatus, EstimateItem } from "@/types/backend"

export class EstimateFactory extends BaseFactory<Estimate> {
  protected build(overrides: Record<string, any> = {}): Estimate {
    const validUntil = faker.date.future({ days: 30 })
    const items = this.generateEstimateItems()
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const tax = subtotal * 0.08
    const discount = faker.number.int({ min: 0, max: subtotal * 0.05 })
    const total = subtotal + tax - discount

    return {
      id: this.generateId(),
      tenantId: overrides.tenantId || this.generateId(),
      customerId: overrides.customerId || this.generateId(),
      jobId: overrides.jobId,
      estimateNumber: this.generateEstimateNumber(),
      title: faker.helpers.arrayElement([
        "Project Estimate",
        "Service Quote",
        "Repair Estimate",
        "Installation Quote",
        "Maintenance Agreement",
      ]),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement([
        "draft",
        "sent",
        "viewed",
        "approved",
        "rejected",
        "expired",
      ] as EstimateStatus[]),
      validUntil,
      items,
      subtotal,
      tax,
      discount,
      total,
      terms: faker.lorem.paragraph(),
      notes: faker.lorem.sentence(),
      attachments: [],
      createdAt: this.generateTimestamp(30),
      updatedAt: this.generateTimestamp(5),
      createdBy: this.generateId(),
      approvedAt: faker.datatype.boolean() ? faker.date.recent({ days: 10 }) : undefined,
      approvedBy: faker.datatype.boolean() ? this.generateId() : undefined,
      ...overrides,
    }
  }

  private generateEstimateNumber(): string {
    const year = new Date().getFullYear()
    const sequence = faker.number.int({ min: 1000, max: 9999 })
    return `EST-${year}-${sequence}`
  }

  private generateEstimateItems(): EstimateItem[] {
    const itemCount = faker.number.int({ min: 2, max: 6 })
    return Array.from({ length: itemCount }, () => this.generateEstimateItem())
  }

  private generateEstimateItem(): EstimateItem {
    const quantity = faker.number.int({ min: 1, max: 20 })
    const unitPrice = faker.number.int({ min: 15, max: 300 })

    return {
      id: this.generateId(),
      description: faker.helpers.arrayElement([
        "Labor - Installation",
        "Materials - Premium Grade",
        "Equipment Rental",
        "Permit and Inspection",
        "Site Preparation",
        "Cleanup and Disposal",
        "Project Management",
        "Warranty Coverage",
      ]),
      quantity,
      unit: faker.helpers.arrayElement(["hours", "each", "sq ft", "linear ft", "days", "lots"]),
      unitPrice,
      total: quantity * unitPrice,
      category: faker.helpers.arrayElement(["Labor", "Materials", "Equipment", "Permits", "Other"]),
      notes: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
    }
  }

  protected getTraitOverrides(traits: string[]): Record<string, any> {
    const overrides: Record<string, any> = {}

    traits.forEach((trait) => {
      switch (trait) {
        case "approved":
          overrides.status = "approved"
          overrides.approvedAt = faker.date.recent({ days: 5 })
          overrides.approvedBy = this.generateId()
          break
        case "rejected":
          overrides.status = "rejected"
          break
        case "expired":
          overrides.status = "expired"
          overrides.validUntil = faker.date.past({ days: 10 })
          break
        case "high_value":
          overrides.items = Array.from({ length: faker.number.int({ min: 4, max: 10 }) }, () => ({
            ...this.generateEstimateItem(),
            unitPrice: faker.number.int({ min: 100, max: 1000 }),
          }))
          break
        case "quick_quote":
          overrides.items = [this.generateEstimateItem()]
          overrides.title = "Quick Service Quote"
          break
        default:
          break
      }
    })

    return overrides
  }
}

export const estimateFactory = new EstimateFactory()
