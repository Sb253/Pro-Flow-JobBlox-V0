import { testDb } from "./database"
import { mockApiResponse, mockApiError } from "../utils"
import { jest } from "@jest/globals"

/**
 * Mock API responses based on test database
 */
export const createMockApiResponses = () => {
  return {
    // Customer endpoints
    getCustomers: jest.fn().mockImplementation(() => {
      const customers = testDb.getData("customers")
      return Promise.resolve(mockApiResponse(customers))
    }),

    getCustomer: jest.fn().mockImplementation((id: string) => {
      const customer = testDb.getById("customers", id)
      if (customer) {
        return Promise.resolve(mockApiResponse(customer))
      }
      return Promise.reject(mockApiError("Customer not found"))
    }),

    createCustomer: jest.fn().mockImplementation((data: any) => {
      const newCustomer = { ...data, id: `customer-${Date.now()}` }
      testDb.add("customers", newCustomer)
      return Promise.resolve(mockApiResponse(newCustomer))
    }),

    updateCustomer: jest.fn().mockImplementation((id: string, updates: any) => {
      const updated = testDb.update("customers", id, updates)
      if (updated) {
        return Promise.resolve(mockApiResponse(updated))
      }
      return Promise.reject(mockApiError("Customer not found"))
    }),

    deleteCustomer: jest.fn().mockImplementation((id: string) => {
      const deleted = testDb.delete("customers", id)
      if (deleted) {
        return Promise.resolve(mockApiResponse(undefined))
      }
      return Promise.reject(mockApiError("Customer not found"))
    }),

    // Job endpoints
    getJobs: jest.fn().mockImplementation((filters?: any) => {
      let jobs = testDb.getData("jobs")
      if (filters) {
        jobs = testDb.query("jobs", filters)
      }
      return Promise.resolve(mockApiResponse(jobs))
    }),

    getJob: jest.fn().mockImplementation((id: string) => {
      const job = testDb.getById("jobs", id)
      if (job) {
        return Promise.resolve(mockApiResponse(job))
      }
      return Promise.reject(mockApiError("Job not found"))
    }),

    createJob: jest.fn().mockImplementation((data: any) => {
      const newJob = { ...data, id: `job-${Date.now()}` }
      testDb.add("jobs", newJob)
      return Promise.resolve(mockApiResponse(newJob))
    }),

    updateJob: jest.fn().mockImplementation((id: string, updates: any) => {
      const updated = testDb.update("jobs", id, updates)
      if (updated) {
        return Promise.resolve(mockApiResponse(updated))
      }
      return Promise.reject(mockApiError("Job not found"))
    }),

    // Invoice endpoints
    getInvoices: jest.fn().mockImplementation((filters?: any) => {
      let invoices = testDb.getData("invoices")
      if (filters) {
        invoices = testDb.query("invoices", filters)
      }
      return Promise.resolve(mockApiResponse(invoices))
    }),

    getInvoice: jest.fn().mockImplementation((id: string) => {
      const invoice = testDb.getById("invoices", id)
      if (invoice) {
        return Promise.resolve(mockApiResponse(invoice))
      }
      return Promise.reject(mockApiError("Invoice not found"))
    }),

    createInvoice: jest.fn().mockImplementation((data: any) => {
      const newInvoice = { ...data, id: `invoice-${Date.now()}` }
      testDb.add("invoices", newInvoice)
      return Promise.resolve(mockApiResponse(newInvoice))
    }),

    // Estimate endpoints
    getEstimates: jest.fn().mockImplementation((filters?: any) => {
      let estimates = testDb.getData("estimates")
      if (filters) {
        estimates = testDb.query("estimates", filters)
      }
      return Promise.resolve(mockApiResponse(estimates))
    }),

    getEstimate: jest.fn().mockImplementation((id: string) => {
      const estimate = testDb.getById("estimates", id)
      if (estimate) {
        return Promise.resolve(mockApiResponse(estimate))
      }
      return Promise.reject(mockApiError("Estimate not found"))
    }),

    createEstimate: jest.fn().mockImplementation((data: any) => {
      const newEstimate = { ...data, id: `estimate-${Date.now()}` }
      testDb.add("estimates", newEstimate)
      return Promise.resolve(mockApiResponse(newEstimate))
    }),

    // User endpoints
    getUsers: jest.fn().mockImplementation(() => {
      const users = testDb.getData("users")
      return Promise.resolve(mockApiResponse(users))
    }),

    getCurrentUser: jest.fn().mockImplementation(() => {
      const users = testDb.getData("users")
      const currentUser = users[0] // Return first user as current
      return Promise.resolve(mockApiResponse(currentUser))
    }),
  }
}
