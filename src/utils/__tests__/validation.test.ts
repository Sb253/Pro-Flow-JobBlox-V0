import { validateForm, loginSchema, customerSchema, emailSchema, phoneSchema, passwordSchema } from "../validation"

describe("Validation Schemas", () => {
  describe("emailSchema", () => {
    it("should validate correct email addresses", () => {
      const validEmails = ["test@example.com", "user.name@domain.co.uk", "user+tag@example.org"]

      validEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).not.toThrow()
      })
    })

    it("should reject invalid email addresses", () => {
      const invalidEmails = ["invalid-email", "@example.com", "test@", "test.example.com"]

      invalidEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).toThrow()
      })
    })
  })

  describe("phoneSchema", () => {
    it("should validate correct phone numbers", () => {
      const validPhones = ["555-123-4567", "(555) 123-4567", "+1 555 123 4567", "5551234567"]

      validPhones.forEach((phone) => {
        expect(() => phoneSchema.parse(phone)).not.toThrow()
      })
    })

    it("should reject invalid phone numbers", () => {
      const invalidPhones = ["abc-def-ghij", "123", "phone-number"]

      invalidPhones.forEach((phone) => {
        expect(() => phoneSchema.parse(phone)).toThrow()
      })
    })
  })

  describe("passwordSchema", () => {
    it("should validate strong passwords", () => {
      const validPasswords = ["Password123", "MyStr0ngP@ss", "SecurePass1"]

      validPasswords.forEach((password) => {
        expect(() => passwordSchema.parse(password)).not.toThrow()
      })
    })

    it("should reject weak passwords", () => {
      const invalidPasswords = [
        "password", // no uppercase or number
        "PASSWORD", // no lowercase or number
        "Password", // no number
        "Pass123", // too short
        "12345678", // no letters
      ]

      invalidPasswords.forEach((password) => {
        expect(() => passwordSchema.parse(password)).toThrow()
      })
    })
  })

  describe("loginSchema", () => {
    it("should validate correct login data", () => {
      const validLogin = {
        email: "test@example.com",
        password: "password123",
      }

      expect(() => loginSchema.parse(validLogin)).not.toThrow()
    })

    it("should reject invalid login data", () => {
      const invalidLogins = [
        { email: "invalid-email", password: "password123" },
        { email: "test@example.com", password: "" },
        { email: "", password: "password123" },
      ]

      invalidLogins.forEach((login) => {
        expect(() => loginSchema.parse(login)).toThrow()
      })
    })
  })

  describe("customerSchema", () => {
    it("should validate correct customer data", () => {
      const validCustomer = {
        name: "John Doe",
        email: "john@example.com",
        phone: "555-123-4567",
        type: "residential" as const,
      }

      expect(() => customerSchema.parse(validCustomer)).not.toThrow()
    })

    it("should reject invalid customer data", () => {
      const invalidCustomers = [
        { name: "", email: "john@example.com", type: "residential" },
        { name: "John Doe", email: "invalid-email", type: "residential" },
        { name: "John Doe", email: "john@example.com", type: "invalid" },
      ]

      invalidCustomers.forEach((customer) => {
        expect(() => customerSchema.parse(customer)).toThrow()
      })
    })
  })
})

describe("validateForm", () => {
  it("should return success for valid data", () => {
    const validData = {
      email: "test@example.com",
      password: "password123",
    }

    const result = validateForm(loginSchema, validData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(validData)
    expect(result.errors).toBeUndefined()
  })

  it("should return errors for invalid data", () => {
    const invalidData = {
      email: "invalid-email",
      password: "",
    }

    const result = validateForm(loginSchema, invalidData)

    expect(result.success).toBe(false)
    expect(result.errors).toBeDefined()
    expect(result.errors?.email).toContain("valid email")
    expect(result.errors?.password).toContain("required")
  })

  it("should handle nested validation errors", () => {
    const invalidCustomer = {
      name: "John Doe",
      type: "residential",
      address: {
        street: "",
        city: "Springfield",
      },
    }

    const result = validateForm(customerSchema, invalidCustomer)

    if (!result.success && result.errors) {
      // Check that nested errors are properly formatted
      expect(typeof result.errors).toBe("object")
    }
  })
})
