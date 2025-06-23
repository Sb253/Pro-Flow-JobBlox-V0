import { mockUser, mockCustomer, mockJob, mockApiResponse } from "../utils"

// Create a mock API service
export const mockApiService = {
  // Auth methods
  login: jest.fn().mockResolvedValue(
    mockApiResponse({
      user: mockUser,
      token: "mock-token",
      tenantId: "tenant-1",
    }),
  ),
  register: jest.fn().mockResolvedValue(
    mockApiResponse({
      user: mockUser,
      token: "mock-token",
      tenantId: "tenant-1",
    }),
  ),
  logout: jest.fn().mockResolvedValue(mockApiResponse(undefined)),
  refreshToken: jest.fn().mockResolvedValue(mockApiResponse({ token: "new-token" })),

  // Customer methods
  getCustomers: jest.fn().mockResolvedValue(mockApiResponse([mockCustomer])),
  getCustomer: jest.fn().mockResolvedValue(mockApiResponse(mockCustomer)),
  createCustomer: jest.fn().mockResolvedValue(mockApiResponse(mockCustomer)),
  updateCustomer: jest.fn().mockResolvedValue(mockApiResponse(mockCustomer)),
  deleteCustomer: jest.fn().mockResolvedValue(mockApiResponse(undefined)),

  // Job methods
  getJobs: jest.fn().mockResolvedValue(mockApiResponse([mockJob])),
  getJob: jest.fn().mockResolvedValue(mockApiResponse(mockJob)),
  createJob: jest.fn().mockResolvedValue(mockApiResponse(mockJob)),
  updateJob: jest.fn().mockResolvedValue(mockApiResponse(mockJob)),
  deleteJob: jest.fn().mockResolvedValue(mockApiResponse(undefined)),

  // Auth helper methods
  setAuthToken: jest.fn(),
  setTenantId: jest.fn(),
  clearAuth: jest.fn(),
}

// Mock the API service module
jest.mock("@/services/api", () => ({
  apiService: mockApiService,
  default: mockApiService,
}))

export default mockApiService
