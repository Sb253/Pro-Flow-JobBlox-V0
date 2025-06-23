"use client"

import { useState } from "react"
import { Settings, Bug, Database, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { APP_CONFIG } from "@/config/app"

export function DevTools() {
  const [isOpen, setIsOpen] = useState(false)

  if (!APP_CONFIG.isDevelopment) {
    return null
  }

  return (
    <>
      {/* Dev Tools Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <Button size="sm" variant="outline" onClick={() => setIsOpen(!isOpen)} className="shadow-lg">
          <Settings className="h-4 w-4 mr-2" />
          Dev Tools
        </Button>
      </div>

      {/* Dev Tools Panel */}
      {isOpen && (
        <div className="fixed bottom-16 left-4 z-50 w-80">
          <Card className="shadow-xl border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Development Tools</CardTitle>
                <Badge variant="secondary">v{APP_CONFIG.version}</Badge>
              </div>
              <CardDescription>Development utilities and debugging tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" className="justify-start">
                  <Bug className="h-4 w-4 mr-2" />
                  Debug
                </Button>
                <Button size="sm" variant="outline" className="justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  API
                </Button>
                <Button size="sm" variant="outline" className="justify-start">
                  <Zap className="h-4 w-4 mr-2" />
                  Performance
                </Button>
                <Button size="sm" variant="outline" className="justify-start" onClick={() => window.location.reload()}>
                  🔄 Reload
                </Button>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <div>Environment: {import.meta.env.MODE}</div>
                <div>API URL: {APP_CONFIG.apiUrl}</div>
                <div>Base Path: {APP_CONFIG.basePath}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
