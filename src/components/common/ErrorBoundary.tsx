"use client"

// Enhanced error boundary with better error reporting
import type React from "react"
import { Component, type ErrorInfo, type ReactNode } from "react"
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Props {
  children: ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  level?: "page" | "component" | "global"
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  errorId?: string
}

export interface ErrorFallbackProps {
  error: Error
  errorInfo?: ErrorInfo
  resetError: () => void
  level: string
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.group("🚨 Error Boundary Caught Error")
      console.error("Error:", error)
      console.error("Error Info:", errorInfo)
      console.error("Component Stack:", errorInfo.componentStack)
      console.groupEnd()
    }

    // Report error to external service in production
    if (process.env.NODE_ENV === "production") {
      this.reportError(error, errorInfo)
    }

    // Call custom error handler
    this.props.onError?.(error, errorInfo)
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // TODO: Integrate with error reporting service (Sentry, Bugsnag, etc.)
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: localStorage.getItem("user_id"),
      tenantId: localStorage.getItem("tenant_id"),
    }

    console.error("Error Report:", errorReport)

    // Send to error reporting service
    // errorReportingService.captureException(error, errorReport)
  }

  private resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = "/"
  }

  private handleReportBug = () => {
    const { error, errorInfo, errorId } = this.state
    const subject = `Bug Report: ${error?.message || "Unknown Error"}`
    const body = `
Error ID: ${errorId}
Error Message: ${error?.message}
Stack Trace: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}
URL: ${window.location.href}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}

Please describe what you were doing when this error occurred:
[Your description here]
    `.trim()

    const mailtoUrl = `mailto:support@jobblox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoUrl)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent
          error={this.state.error!}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
          level={this.props.level || "component"}
        />
      )
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, errorInfo, resetError, level }) => {
  const isGlobalError = level === "global"
  const isPageError = level === "page"

  if (level === "component") {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
        <div className="flex items-center space-x-2 text-red-800 mb-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-medium">Component Error</span>
        </div>
        <p className="text-sm text-red-700 mb-3">This component encountered an error and couldn't render properly.</p>
        <Button size="sm" variant="outline" onClick={resetError}>
          <RefreshCw className="mr-2 h-3 w-3" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`${isGlobalError ? "min-h-screen" : "min-h-96"} bg-background flex items-center justify-center p-4`}
    >
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 text-destructive">
            <AlertTriangle className="h-full w-full" />
          </div>
          <CardTitle className="text-2xl">{isGlobalError ? "Application Error" : "Page Error"}</CardTitle>
          <CardDescription className="text-base">
            {isGlobalError
              ? "The application encountered an unexpected error."
              : "This page encountered an error and cannot be displayed."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline">{error.name}</Badge>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-muted p-4 text-sm">
              <p className="font-medium text-destructive mb-2">Development Error Details:</p>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                {error.message}
                {error.stack && `\n\nStack trace:\n${error.stack}`}
                {errorInfo?.componentStack && `\n\nComponent stack:\n${errorInfo.componentStack}`}
              </pre>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={resetError} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            {isPageError && (
              <Button variant="outline" onClick={() => (window.location.href = "/")} className="flex-1">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>

          {isGlobalError && (
            <Button variant="ghost" onClick={() => window.location.reload()} className="w-full">
              Reload Application
            </Button>
          )}

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const subject = `Bug Report: ${error.message}`
                const body = `Error: ${error.message}\nStack: ${error.stack}`
                window.open(
                  `mailto:support@jobblox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
                )
              }}
            >
              <Bug className="mr-2 h-3 w-3" />
              Report Bug
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            If this problem persists, please contact our support team.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ErrorBoundary
