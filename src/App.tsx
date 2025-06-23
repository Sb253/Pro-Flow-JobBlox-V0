"use client"

import React, { Suspense } from "react"
import { Helmet } from "react-helmet-async"
import { useAuth } from "./contexts/AuthContext"
import { useTheme } from "./contexts/ThemeContext"
import { AppRoutes } from "./components/routing/AppRoutes"
import { LoadingSpinner } from "./components/common/LoadingSpinner"
import { DevTools } from "./components/DevTools"
import { APP_CONFIG } from "./config/app"

// Development tools - only load in development
const SafeTempoRoutes = React.lazy(() =>
  import("./components/SafeTempoRoutes").then((module) => ({
    default: module.SafeTempoRoutes,
  })),
)

function App() {
  const { theme } = useTheme()
  const { isLoading } = useAuth()
  const isDevelopment = import.meta.env.DEV

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{APP_CONFIG.name}</title>
        <meta name="description" content={APP_CONFIG.description} />
        <meta name="theme-color" content={theme === "dark" ? "#0f172a" : "#ffffff"} />
      </Helmet>

      <div className={`min-h-screen bg-background text-foreground ${theme}`}>
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <AppRoutes />
        </Suspense>

        {/* Development Tools */}
        {isDevelopment && (
          <Suspense fallback={null}>
            <DevTools />
            <SafeTempoRoutes />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default App
