import {
  userFactory,
  customerFactory,
  jobFactory,
  invoiceFactory,
  setupTestEnvironment,
  generateTestData,
  assertHelpers,
} from "../"

describe("Factory Usage Examples", () => {
  describe("Basic Factory Usage", () => {
    it("creates a single user", () => {
      const user = userFactory.create()

      assertHelpers.hasRequiredFields(user, ["id", "email", "firstName", "lastName"])
      assertHelpers.hasValidTimestamps(user)
      expect(user.role).toBeDefined()
    })

    it("creates multiple users", () => {
      const users = userFactory.createList(3)

      expect(users).toHaveLength(3)
      users.forEach((user) => {
        assertHelpers.isValidId(user.id)
        expect(user.email).toContain("@")
      })
    })

    it("creates user with overrides", () => {
      const user = userFactory.create({
        firstName: "John",
        lastName: "Doe",
        role: "admin",
      })

      expect(user.firstName).toBe("John")
      expect(user.lastName).toBe("Doe")
      expect(user.role).toBe("admin")
    })
  })

  describe("Trait Usage", () => {
    it("creates admin user with traits", () => {
      const admin = userFactory.createWithTraits(["admin"])
      expect(admin.role).toBe("admin")
    })

    it("creates VIP customer with traits", () => {
      const vipCustomer = customerFactory.createWithTraits(["vip"])
      expect(vipCustomer.tags).toContain("VIP")
      expect(vipCustomer.status).toBe("active")
    })

    it("creates emergency job with traits", () => {
      const emergencyJob = jobFactory.createWithTraits(["emergency"])
      expect(emergencyJob.priority).toBe("urgent")
      expect(emergencyJob.type).toBe("Emergency Service")
    })
  })

  describe("Related Data Creation", () => {
    it("creates related customer and jobs", () => {
      const customer = customerFactory.create()
      const jobs = jobFactory.createList(3, { customerId: customer.id })

      jobs.forEach((job) => {
        expect(job.customerId).toBe(customer.id)
      })
    })

    it("creates complete invoice chain", () => {
      const customer = customerFactory.create()
      const job = jobFactory.create({ customerId: customer.id })
      const invoice = invoiceFactory.create({
        customerId: customer.id,
        jobId: job.id,
      })

      expect(invoice.customerId).toBe(customer.id)
      expect(invoice.jobId).toBe(job.id)
    })
  })

  describe("Scenario Testing", () => {
    it("sets up customer journey scenario", async () => {
      const { scenario, testDb, cleanup } = await setupTestEnvironment("customerJourney")

      expect(scenario.name).toBe("Customer Journey")
      expect(testDb.getData("users")).toHaveLength(2)
      expect(testDb.getData("customers")).toHaveLength(1)
      expect(testDb.getData("jobs")).toHaveLength(1)

      cleanup()
    })

    it("sets up emergency service scenario", async () => {
      const { scenario, testDb, cleanup } = await setupTestEnvironment("emergencyService")

      expect(scenario.name).toBe("Emergency Service")
      const jobs = testDb.getData("jobs")
      expect(jobs[0].priority).toBe("urgent")

      cleanup()
    })
  })

  describe("Dynamic Data Generation", () => {
    it("generates data on demand", () => {
      const customer = generateTestData.customer({ type: "commercial" })
      expect(customer.type).toBe("commercial")

      const job = generateTestData.job({ priority: "high" })
      expect(job.priority).toBe("high")
    })
  })
})
