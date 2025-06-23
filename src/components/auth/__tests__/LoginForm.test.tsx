import { render, screen, waitFor } from "@/test/utils"
import userEvent from "@testing-library/user-event"
import LoginForm from "../LoginForm"

// Mock the useAuth hook
const mockLogin = jest.fn()
const mockSetBypassAuth = jest.fn()

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    setBypassAuth: mockSetBypassAuth,
    user: null,
    isAuthenticated: false,
    loading: false,
  }),
}))

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock window.location.href
    delete (window as any).location
    window.location = { href: "" } as any
  })

  it("renders login form correctly", () => {
    render(<LoginForm />)

    expect(screen.getByText("Welcome to JobBlox")).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("renders admin portal when loginType is admin", () => {
    render(<LoginForm loginType="admin" />)

    expect(screen.getByText("Admin Portal")).toBeInTheDocument()
    expect(screen.getByText(/sign in to your tenant management dashboard/i)).toBeInTheDocument()
  })

  it("handles form submission with valid credentials", async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValue(true)

    render(<LoginForm />)

    await user.type(screen.getByLabelText(/email address/i), "test@example.com")
    await user.type(screen.getByLabelText(/password/i), "password123")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123")
    })
  })

  it("shows loading state during submission", async () => {
    const user = userEvent.setup()
    mockLogin.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    render(<LoginForm />)

    await user.type(screen.getByLabelText(/email address/i), "test@example.com")
    await user.type(screen.getByLabelText(/password/i), "password123")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    expect(screen.getByText("Signing In...")).toBeInTheDocument()
  })

  it("handles login failure", async () => {
    const user = userEvent.setup()
    mockLogin.mockRejectedValue(new Error("Invalid credentials"))

    render(<LoginForm />)

    await user.type(screen.getByLabelText(/email address/i), "test@example.com")
    await user.type(screen.getByLabelText(/password/i), "wrongpassword")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText("Login failed. Please try again.")).toBeInTheDocument()
    })
  })

  it("handles skip login in development mode", async () => {
    const user = userEvent.setup()

    render(<LoginForm />)

    await user.click(screen.getByRole("button", { name: /skip login/i }))

    expect(mockSetBypassAuth).toHaveBeenCalledWith(true)
    expect(window.location.href).toBe("/backoffice")
  })

  it("redirects to admin when loginType is admin", async () => {
    const user = userEvent.setup()

    render(<LoginForm loginType="admin" />)

    await user.click(screen.getByRole("button", { name: /skip login/i }))

    expect(window.location.href).toBe("/admin")
  })

  it("calls onLoginSuccess callback when provided", async () => {
    const onLoginSuccess = jest.fn()
    const user = userEvent.setup()
    mockLogin.mockResolvedValue(true)

    render(<LoginForm onLoginSuccess={onLoginSuccess} />)

    await user.type(screen.getByLabelText(/email address/i), "test@example.com")
    await user.type(screen.getByLabelText(/password/i), "password123")
    await user.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalled()
    })
  })

  it("validates required fields", async () => {
    const user = userEvent.setup()

    render(<LoginForm />)

    await user.click(screen.getByRole("button", { name: /sign in/i }))

    // HTML5 validation should prevent submission
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)

    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })
})
