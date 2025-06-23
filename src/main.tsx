import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { ErrorBoundary } from "react-error-boundary"
import { Toaster } from "sonner"

import App from "./App"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import { ErrorFallback } from "./components/common/ErrorFallback"
import { APP_CONFIG } from "./config/app"

import "./index.css"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404) return false
        return failureCount < 3
      },
    },
    mutations: {
      retry: 1,
    },
  },
})

// Enable React Query DevTools in development
const isDevelopment = import.meta.env.DEV

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error("Application Error:", error, errorInfo)
        // In production, send to error reporting service
        if (!isDevelopment) {
          // Example: Sentry.captureException(error)
        }
      }}
    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={APP_CONFIG.basePath}>
            <ThemeProvider>
              <AuthProvider>
                <App />
                <Toaster position="top-right" expand={true} richColors closeButton />
              </AuthProvider>
            </ThemeProvider>
          </BrowserRouter>
          {isDevelopment && <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />}
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
