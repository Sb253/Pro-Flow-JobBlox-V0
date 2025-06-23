"use client"

// Enhanced routing with better protection and lazy loading
import type React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { routes } from "@/config/routes"
import ProtectedRoute from "./ProtectedRoute"
import { useAuth } from "@/lib/hooks/useAuth"

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {routes.map((route) => {
        const RouteComponent = route.component

        if (route.protected) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute requiredRoles={route.roles} redirectTo="/login">
                  <RouteComponent />
                </ProtectedRoute>
              }
            />
          )
        }

        // Public routes
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              // Redirect to dashboard if already authenticated and trying to access login
              route.path === "/login" && isAuthenticated ? <Navigate to="/" replace /> : <RouteComponent />
            }
          />
        )
      })}
    </Routes>
  )
}

export default AppRoutes
