"use client"

import { useState } from "react"

// Performance optimization utilities
import { useCallback, useRef, useMemo } from "react"

// Debounce hook
export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    }) as T,
    [callback, delay],
  )
}

// Throttle hook
export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const lastCallRef = useRef<number>(0)

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now
        callback(...args)
      }
    }) as T,
    [callback, delay],
  )
}

// Memoization with deep comparison
export function useDeepMemo<T>(factory: () => T, deps: any[]): T {
  const ref = useRef<{ deps: any[]; value: T }>()

  if (!ref.current || !deepEqual(ref.current.deps, deps)) {
    ref.current = {
      deps,
      value: factory(),
    }
  }

  return ref.current.value
}

// Deep equality check
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (a == null || b == null) return false

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    for (const key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
        return false
      }
    }
    return true
  }

  return false
}

// Virtual scrolling hook
export function useVirtualScroll<T>(items: T[], itemHeight: number, containerHeight: number) {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight)
    const bufferSize = Math.min(5, Math.floor(visibleCount / 2))

    return {
      visibleCount,
      bufferSize,
      totalHeight: items.length * itemHeight,
    }
  }, [items.length, itemHeight, containerHeight])
}

// Intersection Observer hook
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {},
) {
  const observerRef = useRef<IntersectionObserver>()

  const observe = useCallback(
    (element: Element) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver(callback, options)
      observerRef.current.observe(element)
    },
    [callback, options],
  )

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
  }, [])

  return { observe, disconnect }
}

// Image lazy loading
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || "")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { observe } = useIntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        const img = new Image()
        img.onload = () => {
          setImageSrc(src)
          setIsLoaded(true)
        }
        img.onerror = () => {
          setIsError(true)
        }
        img.src = src
      }
    },
    { threshold: 0.1 },
  )

  return {
    imageSrc,
    isLoaded,
    isError,
    observe,
  }
}
