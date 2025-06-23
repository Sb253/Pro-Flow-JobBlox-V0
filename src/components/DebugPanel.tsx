"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Bug, ChevronDown, ChevronRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { user, isAuthenticated } = useAuth()

  const [debugInfo, setDebugInfo] = useState({
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    localStorage: {} as Record<string, string>,
    sessionStorage: {} as Record<string, string>,
    environment: {
      NODE_ENV: import.meta.env.MODE,
      VITE_API_URL: import.meta.env.VITE_API_URL,
      VITE_TEMPO: import.meta.env.VITE_TEMPO,
    },
  })

  useEffect(() => {
    // Update debug info
    const localStorage: Record<string, string> = {}
    const sessionStorage: Record<string, string> = {}

    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (key) {
        localStorage[key] = window.localStorage.getItem(key) || ""
      }
    }

    for (let i = 0; i < window.sessionStorage.length; i++) {
      const key = window.sessionStorage.key(i)
      if (key) {
        sessionStorage[key] = window.sessionStorage.getItem(key) || ""
      }
    }

    setDebugInfo((prev) => ({
      ...prev,
      localStorage,
      sessionStorage,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    }))
  }, [isOpen])

  const copyDebugInfo = async () => {
    const info = {
      ...debugInfo,
      auth: {
        isAuthenticated,
        user: user ? { id: user.id, email: user.email, role: user.role } : null,
      },
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(info, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy debug info:", err)
    }
  }

  // Only show in development
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Debug Panel
            </div>
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Card className="mt-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Debug Information</CardTitle>
                <Button size="sm" variant="ghost" onClick={copyDebugInfo} className="h-6 w-6 p-0">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <CardDescription className="text-xs">Current application state and environment</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              {/* Authentication Status */}
              <div>
                <div className="font-medium mb-1">Authentication</div>
                <div className="flex items-center gap-2">
                  <Badge variant={isAuthenticated ? "default" : "secondary"}>
                    {isAuthenticated ? "Authenticated" : "Not Authenticated"}
                  </Badge>
                  {user && <Badge variant="outline">{user.role}</Badge>}
                </div>
                {user && (
                  <div className="mt-1 text-muted-foreground">
                    {user.email} ({user.firstName} {user.lastName})
                  </div>
                )}
              </div>

              {/* Environment */}
              <div>
                <div className="font-medium mb-1">Environment</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>Mode: {debugInfo.environment.NODE_ENV}</div>
                  <div>API URL: {debugInfo.environment.VITE_API_URL || "Not set"}</div>
                  <div>Tempo: {debugInfo.environment.VITE_TEMPO || "false"}</div>
                </div>
              </div>

              {/* Current Route */}
              <div>
                <div className="font-medium mb-1">Current Route</div>
                <div className="text-muted-foreground break-all">{window.location.pathname}</div>
              </div>

              {/* Local Storage */}
              <div>
                <div className="font-medium mb-1">Local Storage</div>
                <div className="space-y-1">
                  {Object.keys(debugInfo.localStorage).length === 0 ? (
                    <div className="text-muted-foreground">Empty</div>
                  ) : (
                    Object.entries(debugInfo.localStorage).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="truncate">{key}:</span>
                        <span className="text-muted-foreground ml-2 truncate">
                          {value.length > 20 ? `${value.substring(0, 20)}...` : value}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Errors */}
              <div>
                <div className="font-medium mb-1">Console Errors</div>
                <div className="text-muted-foreground">Check browser console for detailed errors</div>
              </div>

              <div className="pt-2 border-t text-muted-foreground">
                Last updated: {new Date(debugInfo.timestamp).toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default DebugPanel
