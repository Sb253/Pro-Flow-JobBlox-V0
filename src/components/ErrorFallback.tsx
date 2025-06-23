"use client"

import type React from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 text-destructive">
            <AlertTriangle className="h-full w-full" />
          </div>
          <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
          <CardDescription className="text-base">
            We encountered an unexpected error. Don't worry, this has been logged and we're working on it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {import.meta.env.DEV && (
            <div className="rounded-md bg-muted p-4 text-sm">
              <p className="font-medium text-destructive mb-2">Error Details (Development Mode):</p>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                {error.message}
                {error.stack && `\n\nStack trace:\n${error.stack}`}
              </pre>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={resetError} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={handleGoHome} className="flex-1">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>

          <Button variant="ghost" onClick={handleReload} className="w-full">
            Reload Page
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            If this problem persists, please contact support.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ErrorFallback
