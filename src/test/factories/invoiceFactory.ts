import { faker } from "@faker-js/faker"
import { BaseFactory } from "./baseFactory"
import type { Invoice, InvoiceStatus, InvoiceItem } from "@/types/backend"

export class InvoiceFactory extends BaseFactory<Invoice> {
  protected build(overrides: Record<string, any> = {}): Invoice {
    const issueDate = faker.date.recent({ days: 30 })
    const dueDate = faker.date.future({ days: 30, refDate: issueDate })
    const items = this.generateInvoiceItems()
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const tax = subtotal * 0.08 // 8% tax
    const discount = faker.number.int({ min: 0, max: subtotal * 0.1 })
    const total = subtotal + tax - discount
    const paidAmount = faker.number.int({ min: 0, max: total })

    return {
      id: this.generateId(),
      tenantId: overrides.tenantId || this.generateId(),
      customerId: overrides.customerId || this.generateId(),
      jobId: overrides.jobId,
      estimateId: overrides.estimateId,
      invoiceNumber: this.generateInvoiceNumber(),
      title: faker.helpers.arrayElement([
        "Service Invoice",
        "Project Completion Invoice",
        "Materials and Labor",
        "Emergency Service Call",
        "Monthly Service Agreement",
      ]),
      status: faker.helpers.arrayElement(["draft", "sent", "viewed", "partial", "paid", "overdue"] as InvoiceStatus[]),
      issueDate,
      dueDate,
      items,
      subtotal,
      tax,
      discount,
      total,
      paidAmount,
      balanceDue: total - paidAmount,
      terms: faker.helpers.arrayElement(["Net 30", "Net 15", "Due on Receipt", "Net 45", "2/10 Net 30"]),
      notes: faker.lorem.sentence(),
      attachments: [],
      createdAt: this.generateTimestamp(45),
      updatedAt: this.generateTimestamp(5),
      createdBy: this.generateId(),
      sentAt: faker.datatype.boolean() ? faker.date.recent({ days: 20 }) : undefined,
      paidAt: paidAmount === total ? faker.date.recent({ days: 10 }) : undefined,
      ...overrides,
    }
  }

  private generateInvoiceNumber(): string {
    const year = new Date().getFullYear()
    const sequence = faker.number.int({ min: 1000, max: 9999 })
    return `INV-${year}-${sequence}`
  }

  private generateInvoiceItems(): InvoiceItem[] {
    const itemCount = faker.number.int({ min: 1, max: 5 })
    return Array.from({ length: itemCount }, () => this.generateInvoiceItem())
  }

  private generateInvoiceItem(): InvoiceItem {
    const quantity = faker.number.int({ min: 1, max: 10 })
    const unitPrice = faker.number.int({ min: 25, max: 500 })

    return {
      id: this.generateId(),
      description: faker.helpers.arrayElement([
        "Labor - Plumbing Repair",
        "Materials - PVC Pipe",
        "Service Call Fee",
        "Equipment Rental",
        "Permit Fee",
        "Disposal Fee",
        "Travel Time",
        "Emergency Service Surcharge",
      ]),
      quantity,
      unit: faker.helpers.arrayElement(["hours", "each", "linear feet", "square feet", "days"]),
      unitPrice,
      total: quantity * unitPrice,
      category: faker.helpers.arrayElement(["Labor", "Materials", "Equipment", "Fees", "Other"]),
      taxable: faker.datatype.boolean({ probability: 0.8 }),
      notes: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
    }
  }

  protected getTraitOverrides(traits: string[]): Record<string, any> {
    const overrides: Record<string, any> = {}

    traits.forEach((trait) => {
      switch (trait) {
        case "paid":
          overrides.status = "paid"
          overrides.paidAmount = overrides.total
          overrides.balanceDue = 0
          overrides.paidAt = faker.date.recent({ days: 10 })
          break
        case "overdue":
          overrides.status = "overdue"
          overrides.dueDate = faker.date.past({ days: 15 })
          overrides.paidAmount = 0
          break
        case "draft":
          overrides.status = "draft"
          overrides.sentAt = undefined
          break
        case "high_value":
          overrides.items = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => ({
            ...this.generateInvoiceItem(),
            unitPrice: faker.number.int({ min: 200, max: 2000 }),
          }))
          break
        case "emergency":
          overrides.title = "Emergency Service Invoice"
          overrides.items = [
            {
              id: this.generateId(),
              description: "Emergency Service Call",
              quantity: 1,
              unit: "each",
              unitPrice: 150,
              total: 150,
              category: "Fees",
              taxable: true,
            },
            ...this.generateInvoiceItems(),
          ]
          break
        default:
          break
      }
    })

    return overrides
  }
}

export const invoiceFactory = new InvoiceFactory()
