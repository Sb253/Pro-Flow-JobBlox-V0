import { z } from "zod"

// Common validation schemas
export const emailSchema = z.string().email("Please enter a valid email address")
export const phoneSchema = z.string().regex(/^\+?[\d\s\-$$$$]+$/, "Please enter a valid phone number")
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")

// User validation schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
})

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    tenantName: z.string().min(1, "Company name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Customer validation schemas
export const customerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  email: emailSchema.optional().or(z.literal("")),
  phone: phoneSchema.optional().or(z.literal("")),
  type: z.enum(["residential", "commercial", "industrial"]),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  notes: z.string().optional(),
})

// Job validation schemas
export const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().optional(),
  customerId: z.string().min(1, "Customer is required"),
  assignedTo: z.string().optional(),
  scheduledDate: z.string().optional(),
  estimatedHours: z.number().min(0).optional(),
  status: z.enum(["draft", "scheduled", "in_progress", "completed", "cancelled", "on_hold"]),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  tags: z.array(z.string()).optional(),
})

// Invoice validation schemas
export const invoiceSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  jobId: z.string().optional(),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Item description is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        rate: z.number().min(0, "Rate must be positive"),
        amount: z.number().min(0, "Amount must be positive"),
      }),
    )
    .min(1, "At least one item is required"),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  taxRate: z.number().min(0).max(1).optional(),
})

// Validation helper functions\
export const validateForm =
  <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data: T; errors?: Record<string, string> } => {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        const path = err.path.join(".")
        errors[path] = err.message
      })
      return { success: false, errors }
    }
    return { success: false, errors: { general: "Validation failed" } }
  }
}

export const getFieldError = (errors: Record<string, string> | undefined, fieldName: string): string | undefined => {
  return errors?.[fieldName]
}
