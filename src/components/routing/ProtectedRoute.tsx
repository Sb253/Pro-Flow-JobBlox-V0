"use client"

// Enhanced protected route with role-based access
import type React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/hooks/useAuth"
import { useRole } from "@/lib/hooks/useRole"
import LoadingSpinner from "@/components/common/LoadingSpinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  redirectTo?: string
  fallback?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  redirectTo = "/login",
  fallback,
}) => {
  const { isAuthenticated, isLoading } = useAuth()
  const { userRole, hasAnyRole } = useRole()
  const location = useLocation()

  // Show loading while checking authentication
  if (isLoading) {
    return fallback || <LoadingSpinner size="lg" message="Checking authentication..." />
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // Check role-based access
  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
          <p className="text-sm text-muted-foreground">Required roles: {requiredRoles.join(", ")}</p>
          <p className="text-sm text-muted-foreground">Your role: {userRole}</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
