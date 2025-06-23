import { userFactory, customerFactory, jobFactory, invoiceFactory, estimateFactory } from "../factories"
import type { User, Customer, Job, Invoice, Estimate } from "@/types/backend"

export interface TestScenario {
  name: string
  description: string
  data: {
    users: User[]
    customers: Customer[]
    jobs: Job[]
    invoices: Invoice[]
    estimates: Estimate[]
  }
}

/**
 * Complete customer journey scenario
 */
export const customerJourneyScenario = (): TestScenario => {
  const tenantId = "tenant-123"
  const adminUser = userFactory.createWithTraits(["admin"], { tenantId })
  const fieldWorker = userFactory.createWithTraits(["field_worker"], { tenantId })

  const customer = customerFactory.createWithTraits(["residential"], { tenantId })

  const estimate = estimateFactory.create({
    tenantId,
    customerId: customer.id,
    status: "approved",
  })

  const job = jobFactory.createWithTraits(["scheduled"], {
    tenantId,
    customerId: customer.id,
    assignedTo: [fieldWorker.id],
  })

  const invoice = invoiceFactory.create({
    tenantId,
    customerId: customer.id,
    jobId: job.id,
    estimateId: estimate.id,
    status: "sent",
  })

  return {
    name: "Customer Journey",
    description: "Complete customer journey from estimate to invoice",
    data: {
      users: [adminUser, fieldWorker],
      customers: [customer],
      jobs: [job],
      invoices: [invoice],
      estimates: [estimate],
    },
  }
}

/**
 * Emergency service scenario
 */
export const emergencyServiceScenario = (): TestScenario => {
  const tenantId = "tenant-456"
  const manager = userFactory.createWithTraits(["manager"], { tenantId })
  const fieldWorker = userFactory.createWithTraits(["field_worker"], { tenantId })

  const customer = customerFactory.createWithTraits(["vip"], { tenantId })

  const emergencyJob = jobFactory.createWithTraits(["emergency", "in_progress"], {
    tenantId,
    customerId: customer.id,
    assignedTo: [fieldWorker.id],
    createdBy: manager.id,
  })

  const emergencyInvoice = invoiceFactory.createWithTraits(["emergency"], {
    tenantId,
    customerId: customer.id,
    jobId: emergencyJob.id,
    status: "sent",
  })

  return {
    name: "Emergency Service",
    description: "Urgent emergency service call scenario",
    data: {
      users: [manager, fieldWorker],
      customers: [customer],
      jobs: [emergencyJob],
      invoices: [emergencyInvoice],
      estimates: [],
    },
  }
}

/**
 * Commercial project scenario
 */
export const commercialProjectScenario = (): TestScenario => {
  const tenantId = "tenant-789"
  const admin = userFactory.createWithTraits(["admin"], { tenantId })
  const salesRep = userFactory.create({ role: "sales_rep", tenantId })
  const projectManager = userFactory.createWithTraits(["manager"], { tenantId })
  const fieldWorkers = userFactory.createList(3, { role: "field_worker", tenantId })

  const commercialCustomer = customerFactory.createWithTraits(["commercial", "with_history"], { tenantId })

  const highValueEstimate = estimateFactory.createWithTraits(["high_value", "approved"], {
    tenantId,
    customerId: commercialCustomer.id,
    createdBy: salesRep.id,
  })

  const largeJob = jobFactory.createWithTraits(["high_value", "in_progress"], {
    tenantId,
    customerId: commercialCustomer.id,
    assignedTo: fieldWorkers.map((w) => w.id),
    createdBy: projectManager.id,
  })

  const progressInvoice = invoiceFactory.createWithTraits(["high_value"], {
    tenantId,
    customerId: commercialCustomer.id,
    jobId: largeJob.id,
    estimateId: highValueEstimate.id,
    status: "partial",
  })

  return {
    name: "Commercial Project",
    description: "Large commercial project with multiple workers",
    data: {
      users: [admin, salesRep, projectManager, ...fieldWorkers],
      customers: [commercialCustomer],
      jobs: [largeJob],
      invoices: [progressInvoice],
      estimates: [highValueEstimate],
    },
  }
}

/**
 * Overdue payments scenario
 */
export const overduePaymentsScenario = (): TestScenario => {
  const tenantId = "tenant-overdue"
  const admin = userFactory.createWithTraits(["admin"], { tenantId })

  const customers = customerFactory.createList(3, { tenantId })

  const completedJobs = customers.map((customer) =>
    jobFactory.createWithTraits(["completed"], {
      tenantId,
      customerId: customer.id,
    }),
  )

  const overdueInvoices = completedJobs.map((job, index) =>
    invoiceFactory.createWithTraits(["overdue"], {
      tenantId,
      customerId: customers[index].id,
      jobId: job.id,
    }),
  )

  return {
    name: "Overdue Payments",
    description: "Multiple customers with overdue invoices",
    data: {
      users: [admin],
      customers,
      jobs: completedJobs,
      invoices: overdueInvoices,
      estimates: [],
    },
  }
}

/**
 * New business scenario
 */
export const newBusinessScenario = (): TestScenario => {
  const tenantId = "tenant-new"
  const owner = userFactory.create({ role: "owner", tenantId })

  const prospects = customerFactory.createList(5, {
    tenantId,
    status: "prospect",
  })

  const quotes = prospects.map((prospect) =>
    estimateFactory.create({
      tenantId,
      customerId: prospect.id,
      status: "sent",
    }),
  )

  return {
    name: "New Business",
    description: "Multiple prospects with pending quotes",
    data: {
      users: [owner],
      customers: prospects,
      jobs: [],
      invoices: [],
      estimates: quotes,
    },
  }
}

// Export all scenarios
export const testScenarios = {
  customerJourney: customerJourneyScenario,
  emergencyService: emergencyServiceScenario,
  commercialProject: commercialProjectScenario,
  overduePayments: overduePaymentsScenario,
  newBusiness: newBusinessScenario,
}
