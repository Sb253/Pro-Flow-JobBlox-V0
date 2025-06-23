"use client"

import { useRoutes } from "react-router-dom"
import { useEffect, useState } from "react"

const SafeTempoRoutes = () => {
  const [routes, setRoutes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTempoRoutes = async () => {
      try {
        if (import.meta.env.VITE_TEMPO === "true") {
          const tempoModule = await import("tempo-routes")
          setRoutes(tempoModule.default || [])
        }
      } catch (error) {
        console.warn("Tempo routes not available:", error)
        setRoutes([])
      } finally {
        setLoading(false)
      }
    }

    loadTempoRoutes()
  }, [])

  const element = useRoutes(routes)

  if (loading) {
    return null
  }

  return element
}

export default SafeTempoRoutes
