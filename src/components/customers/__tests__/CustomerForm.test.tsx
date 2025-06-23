"use client"

import { render, screen, waitFor } from "@/test/utils"
import userEvent from "@testing-library/user-event"
import CustomerForm from "../CustomerForm"

describe("CustomerForm", () => {
  const mockOnSubmit = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders customer form correctly", () => {
    render(<CustomerForm onSubmit={mockOnSubmit} />)

    expect(screen.getByText("New Customer")).toBeInTheDocument()
    expect(screen.getByLabelText(/customer name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
  })

  it("renders edit mode correctly", () => {
    const initialData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "555-0123",
      type: "residential" as const,
      status: "active" as const,
    }

    render(<CustomerForm onSubmit={mockOnSubmit} initialData={initialData} isEditing={true} />)

    expect(screen.getByText("Edit Customer")).toBeInTheDocument()
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument()
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument()
  })

  it("handles form submission with valid data", async () => {
    const user = userEvent.setup()

    render(<CustomerForm onSubmit={mockOnSubmit} />)

    // Fill out required fields
    await user.type(screen.getByLabelText(/customer name/i), "Jane Smith")
    await user.type(screen.getByLabelText(/email/i), "jane@example.com")
    await user.type(screen.getByLabelText(/phone/i), "555-0124")

    // Select customer type
    await user.click(screen.getByRole("combobox", { name: /customer type/i }))
    await user.click(screen.getByText("Commercial"))

    // Fill address
    await user.type(screen.getByLabelText(/street address/i), "123 Main St")
    await user.type(screen.getByLabelText(/city/i), "Springfield")
    await user.type(screen.getByLabelText(/state/i), "IL")
    await user.type(screen.getByLabelText(/zip code/i), "62701")

    // Select referral source
    await user.click(screen.getByRole("combobox", { name: /referral source/i }))
    await user.click(screen.getByText("Google Search"))

    // Submit form
    await user.click(screen.getByRole("button", { name: /create customer/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "555-0124",
          type: "commercial",
          referralSource: "Google Search",
          address: expect.objectContaining({
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
          }),
        }),
      )
    })
  })

  it("shows validation errors for required fields", async () => {
    const user = userEvent.setup()

    render(<CustomerForm onSubmit={mockOnSubmit} />)

    // Try to submit without filling required fields
    await user.click(screen.getByRole("button", { name: /create customer/i }))

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument()
      expect(screen.getByText("Referral source is required")).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it("handles tag addition and removal", async () => {
    const user = userEvent.setup()

    render(<CustomerForm onSubmit={mockOnSubmit} />)

    // Navigate to the tags section
    const tagInput = screen.getByPlaceholderText("Add a tag")

    // Add a tag
    await user.type(tagInput, "VIP Customer")
    await user.click(screen.getByRole("button", { name: /add tag/i }))

    expect(screen.getByText("VIP Customer")).toBeInTheDocument()

    // Remove the tag
    await user.click(screen.getByRole("button", { name: /remove tag/i }))

    expect(screen.queryByText("VIP Customer")).not.toBeInTheDocument()
  })

  it("handles cancel action", async () => {
    const user = userEvent.setup()

    render(<CustomerForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    await user.click(screen.getByRole("button", { name: /cancel/i }))

    expect(mockOnCancel).toHaveBeenCalled()
  })

  it("displays service history in edit mode", () => {
    const initialData = {
      name: "John Doe",
      email: "john@example.com",
    }

    render(<CustomerForm onSubmit={mockOnSubmit} initialData={initialData} isEditing={true} />)

    // Click on Service History tab
    const serviceHistoryTab = screen.getByRole("tab", { name: /service history/i })
    expect(serviceHistoryTab).toBeInTheDocument()
  })

  it("validates email format", async () => {
    const user = userEvent.setup()

    render(<CustomerForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByLabelText(/customer name/i), "John Doe")
    await user.type(screen.getByLabelText(/email/i), "invalid-email")

    await user.click(screen.getByRole("button", { name: /create customer/i }))

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument()
    })
  })

  it("validates phone number format", async () => {
    const user = userEvent.setup()

    render(<CustomerForm onSubmit={mockOnSubmit} />)

    await user.type(screen.getByLabelText(/customer name/i), "John Doe")
    await user.type(screen.getByLabelText(/phone/i), "invalid-phone")

    await user.click(screen.getByRole("button", { name: /create customer/i }))

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid phone number")).toBeInTheDocument()
    })
  })
})
