# Testing Guide

This project uses Jest and React Testing Library for comprehensive testing.

## Test Structure

\`\`\`
src/
├── test/
│   ├── setup.ts           # Test setup and global mocks
│   ├── utils.tsx          # Testing utilities and custom render
│   ├── mocks/             # Mock implementations
│   └── README.md          # This file
├── components/
│   └── __tests__/         # Component tests
├── hooks/
│   └── __tests__/         # Hook tests
├── services/
│   └── __tests__/         # Service tests
└── utils/
    └── __tests__/         # Utility tests
\`\`\`

## Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
\`\`\`

## Writing Tests

### Component Tests

\`\`\`typescript
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<MyComponent onClick={handleClick} />)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
\`\`\`

### Hook Tests

\`\`\`typescript
import { renderHook, act } from '@testing-library/react'
import { useMyHook } from '../useMyHook'

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current.value).toBe(0)
  })

  it('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.value).toBe(1)
  })
})
\`\`\`

### Service Tests

\`\`\`typescript
import { apiService } from '../api'

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('makes correct API calls', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] })
    })
    global.fetch = mockFetch

    await apiService.getCustomers()

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/customers'),
      expect.any(Object)
    )
  })
})
\`\`\`

## Best Practices

1. **Use descriptive test names** that explain what is being tested
2. **Follow the AAA pattern** (Arrange, Act, Assert)
3. **Mock external dependencies** to isolate units under test
4. **Test user interactions** rather than implementation details
5. **Use custom render** from test utils for consistent provider setup
6. **Clean up after tests** with proper beforeEach/afterEach hooks
7. **Test error states** and edge cases
8. **Maintain good test coverage** but focus on critical paths

## Mocking

### API Service
\`\`\`typescript
import { mockApiService } from '@/test/mocks/apiService'

// Mock is automatically applied
// Customize behavior as needed
mockApiService.getCustomers.mockResolvedValue(mockApiResponse([]))
\`\`\`

### Local Storage
\`\`\`typescript
// Already mocked globally in setup.ts
localStorage.getItem.mockReturnValue('mock-value')
\`\`\`

### React Router
\`\`\`typescript
// Use custom render from test utils which includes BrowserRouter
import { render } from '@/test/utils'
\`\`\`

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

Focus on testing critical business logic and user interactions rather than achieving 100% coverage.
