import { faker } from "@faker-js/faker"
import { BaseFactory } from "./baseFactory"
import type { Job, JobStatus, Address } from "@/types/backend"

export class JobFactory extends BaseFactory<Job> {
  protected build(overrides: Record<string, any> = {}): Job {
    const startDate = faker.date.future({ days: 30 })
    const endDate = faker.date.future({ days: 60, refDate: startDate })
    const estimatedHours = faker.number.int({ min: 4, max: 80 })
    const actualHours = faker.number.int({ min: 0, max: estimatedHours + 20 })
    const budget = faker.number.int({ min: 500, max: 50000 })

    return {
      id: this.generateId(),
      tenantId: overrides.tenantId || this.generateId(),
      customerId: overrides.customerId || this.generateId(),
      name: this.generateJobName(),
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement([
        "Plumbing",
        "Electrical",
        "HVAC",
        "Roofing",
        "Flooring",
        "Painting",
        "Landscaping",
        "Kitchen Remodel",
        "Bathroom Remodel",
        "General Repair",
        "Emergency Service",
      ]),
      status: faker.helpers.arrayElement([
        "draft",
        "quoted",
        "approved",
        "scheduled",
        "in_progress",
        "completed",
      ] as JobStatus[]),
      priority: faker.helpers.arrayElement(["low", "medium", "high", "urgent"]),
      startDate,
      endDate,
      estimatedHours,
      actualHours,
      budget,
      actualCost: faker.number.int({ min: budget * 0.8, max: budget * 1.2 }),
      assignedTo: [this.generateId(), this.generateId()],
      location: this.generateAddress(),
      requirements: faker.helpers.arrayElements(
        [
          "Licensed electrician required",
          "Permit needed",
          "Customer will be present",
          "Pet-friendly approach",
          "Noise restrictions after 6 PM",
          "Parking available on-site",
          "Materials provided by customer",
          "Clean-up required",
        ],
        { min: 1, max: 4 },
      ),
      attachments: this.generateAttachments(),
      customFields: {
        equipmentNeeded: faker.helpers.arrayElements(
          ["Ladder", "Power Tools", "Safety Equipment", "Specialized Tools"],
          { min: 1, max: 3 },
        ),
        weatherDependent: faker.datatype.boolean(),
        followUpRequired: faker.datatype.boolean(),
      },
      createdAt: this.generateTimestamp(60),
      updatedAt: this.generateTimestamp(5),
      createdBy: this.generateId(),
      ...overrides,
    }
  }

  private generateJobName(): string {
    const jobTypes = [
      "Kitchen Renovation",
      "Bathroom Remodel",
      "Roof Repair",
      "HVAC Installation",
      "Electrical Upgrade",
      "Plumbing Repair",
      "Flooring Installation",
      "Painting Project",
      "Deck Construction",
      "Window Replacement",
      "Driveway Repair",
      "Fence Installation",
    ]
    return faker.helpers.arrayElement(jobTypes)
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

  private generateAttachments() {
    return faker.helpers.arrayElements(
      [
        {
          id: this.generateId(),
          name: "site-photo-1.jpg",
          url: faker.image.url(),
          size: faker.number.int({ min: 100000, max: 5000000 }),
          mimeType: "image/jpeg",
          uploadedAt: this.generateTimestamp(10),
          uploadedBy: this.generateId(),
        },
        {
          id: this.generateId(),
          name: "blueprint.pdf",
          url: faker.internet.url(),
          size: faker.number.int({ min: 500000, max: 10000000 }),
          mimeType: "application/pdf",
          uploadedAt: this.generateTimestamp(15),
          uploadedBy: this.generateId(),
        },
      ],
      { min: 0, max: 2 },
    )
  }

  protected getTraitOverrides(traits: string[]): Record<string, any> {
    const overrides: Record<string, any> = {}

    traits.forEach((trait) => {
      switch (trait) {
        case "emergency":
          overrides.priority = "urgent"
          overrides.type = "Emergency Service"
          overrides.name = "Emergency Repair"
          overrides.startDate = faker.date.soon({ days: 1 })
          break
        case "scheduled":
          overrides.status = "scheduled"
          overrides.startDate = faker.date.future({ days: 7 })
          break
        case "in_progress":
          overrides.status = "in_progress"
          overrides.startDate = faker.date.past({ days: 3 })
          overrides.actualHours = faker.number.int({ min: 1, max: 20 })
          break
        case "completed":
          overrides.status = "completed"
          overrides.startDate = faker.date.past({ days: 30 })
          overrides.endDate = faker.date.past({ days: 20 })
          overrides.actualHours = overrides.estimatedHours || faker.number.int({ min: 4, max: 80 })
          break
        case "high_value":
          overrides.budget = faker.number.int({ min: 25000, max: 100000 })
          overrides.priority = "high"
          break
        case "quick_job":
          overrides.estimatedHours = faker.number.int({ min: 1, max: 4 })
          overrides.budget = faker.number.int({ min: 100, max: 1000 })
          break
        default:
          break
      }
    })

    return overrides
  }
}

export const jobFactory = new JobFactory()
