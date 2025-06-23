"use client"

import { useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

interface ErrorHandlerOptions {
  showToast?: boolean
  logError?: boolean
  fallbackMessage?: string
}

export const useErrorHandler = () => {
    const { toast } = useToast()

    const handleError = useCallback(
      (error: Error | string, options: ErrorHandlerOptions = {}) => {
        const { showToast = true, logError = true, fallbackMessage = "An unexpected error occurred" } = options

        const errorMessage = typeof error === "string" ? error : error.message || fallbackMessage

        if (logError) {
          console.error("Error handled:", error)
        }

        if (showToast) {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          })
        }

        return errorMessage
      },
      [toast],
    )

    const handleAsyncError = useCallback(
    async <T>(\
      asyncFn: () => Promise<T>,
      options: ErrorHandlerOptions = {}
    ): Promise<T | null> => {
    try {
      return await asyncFn()
    } catch (error) {
      handleError(error as Error, options)
      return null
    }
  },
  [handleError]
)

return { handleError, handleAsyncError }
}
