import type React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  text?: string
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
      {text && <p className="text-sm text-muted-foreground animate-pulse">{text}</p>}
    </div>
  )
}

// Full page loading component
export const PageLoader: React.FC<{ message?: string }> = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <LoadingSpinner size="xl" text={message} />
    </div>
  </div>
)

// Inline loading component
export const InlineLoader: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex items-center justify-center py-8">
    <LoadingSpinner size="md" text={message} />
  </div>
)

// Button loading state
export const ButtonLoader: React.FC = () => <LoadingSpinner size="sm" className="mr-2" />
