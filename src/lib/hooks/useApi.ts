"use client"

// Enhanced API hooks with better error handling and caching
import { useState, useEffect, useCallback, useRef } from "react"
import type { ApiResponse, ApiError } from "@/types"
import { useAppStore } from "@/lib/store"

interface UseApiOptions {
  immediate?: boolean
  cache?: boolean
  retries?: number
  timeout?: number
  onSuccess?: (data: any) => void
  onError?: (error: ApiError) => void
}

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
  execute: (...args: any[]) => Promise<T | null>
  reset: () => void
  cancel: () => void
}

export function useApi<T = any>(
  apiCall: (...args: any[]) => Promise<ApiResponse<T>>,
  dependencies: any[] = [],
  options: UseApiOptions = {},
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const { setLoading: setGlobalLoading, setError: setGlobalError } = useAppStore()
  const abortControllerRef = useRef<AbortController | null>(null)
  const mountedRef = useRef(true)

  const { immediate = true, cache = false, onSuccess, onError } = options

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      try {
        setLoading(true)
        setError(null)
        setGlobalLoading({ isLoading: true })

        const response = await apiCall(...args)

        if (!mountedRef.current) return null

        if (response.success && response.data) {
          setData(response.data)
          onSuccess?.(response.data)
          return response.data
        } else {
          const apiError: ApiError = {
            code: "API_ERROR",
            message: response.error || "Unknown error occurred",
            timestamp: new Date().toISOString(),
          }
          throw apiError
        }
      } catch (err) {
        if (!mountedRef.current) return null

        const apiError = err as ApiError
        setError(apiError)
        setGlobalError({ hasError: true, error: new Error(apiError.message) })
        onError?.(apiError)
        return null
      } finally {
        if (mountedRef.current) {
          setLoading(false)
          setGlobalLoading({ isLoading: false })
        }
      }
    },
    [apiCall, onSuccess, onError, setGlobalLoading, setGlobalError],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, dependencies)

  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
    cancel,
  }
}

// Specialized hooks for common patterns
export function usePaginatedApi<T>(
  apiCall: (params: { page: number; limit: number; [key: string]: any }) => Promise<ApiResponse<T[]>>,
  initialParams: Record<string, any> = {},
  options: UseApiOptions = {},
) {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [params, setParams] = useState(initialParams)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)

  const { data, loading, error, execute } = useApi(() => apiCall({ page, limit, ...params }), [page, limit, params], {
    ...options,
    onSuccess: (response) => {
      if (response.pagination) {
        setTotalPages(response.pagination.totalPages)
        setTotal(response.pagination.total)
      }
      options.onSuccess?.(response)
    },
  })

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }, [page, totalPages])

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage)
      }
    },
    [totalPages],
  )

  const updateParams = useCallback((newParams: Record<string, any>) => {
    setParams(newParams)
    setPage(1) // Reset to first page when params change
  }, [])

  return {
    data: data || [],
    loading,
    error,
    page,
    limit,
    totalPages,
    total,
    params,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
    updateParams,
    refetch: execute,
  }
}

export function useMutation<T, P = any>(
  mutationFn: (params: P) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {},
) {
  const { data, loading, error, execute, reset } = useApi(mutationFn, [], { ...options, immediate: false })

  const mutate = useCallback(
    async (params: P): Promise<T | null> => {
      return execute(params)
    },
    [execute],
  )

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  }
}
