// Business domain types
export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  type: CustomerType
  status: CustomerStatus
  address?: Address
  notes?: string
  tags: string[]
  customFields: Record<string, any>
  tenantId: string
  createdAt: string
  updatedAt: string
}

export type CustomerType = "residential" | "commercial" | "industrial"
export type CustomerStatus = "active" | "inactive" | "prospect" | "archived"

export interface Job {
  id: string
  title: string
  description?: string
  customerId: string
  customer?: Customer
  type: JobType
  status: JobStatus
  priority: JobPriority
  scheduledDate?: string
  startDate?: string
  endDate?: string
  estimatedHours?: number
  actualHours?: number
  assignedTo: string[]
  assignees?: Employee[]
  location?: Address
  materials: JobMaterial[]
  notes?: string
  tags: string[]
  customFields: Record<string, any>
  tenantId: string
  createdAt: string
  updatedAt: string
}

export type JobType = "installation" | "repair" | "maintenance" | "consultation" | "emergency"
export type JobStatus = "draft" | "scheduled" | "in_progress" | "completed" | "cancelled" | "on_hold"
export type JobPriority = "low" | "medium" | "high" | "urgent"

export interface JobMaterial {
  id: string
  name: string
  quantity: number
  unit: string
  unitCost: number
  totalCost: number
  category: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Employee {
  id: string
  userId: string
  user?: User
  employeeNumber: string
  department: string
  position: string
  hourlyRate: number
  skills: string[]
  certifications: string[]
  availability: EmployeeAvailability
  tenantId: string
  createdAt: string
  updatedAt: string
}

export interface EmployeeAvailability {
  monday: TimeSlot[]
  tuesday: TimeSlot[]
  wednesday: TimeSlot[]
  thursday: TimeSlot[]
  friday: TimeSlot[]
  saturday: TimeSlot[]
  sunday: TimeSlot[]
}

export interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Invoice {
  id: string
  number: string
  customerId: string
  customer?: Customer
  jobId?: string
  job?: Job
  items: InvoiceItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  paidDate?: string
  notes?: string
  terms: string
  tenantId: string
  createdAt: string
  updatedAt: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
  taxable: boolean
}

export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled"
