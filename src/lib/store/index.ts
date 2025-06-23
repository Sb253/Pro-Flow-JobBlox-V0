// Modern state management with Zustand
import { create } from "zustand"
import { devtools, persist, subscribeWithSelector } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import type { AppState, User, Tenant, LoadingState, ErrorState } from "@/types"

interface AppStore extends AppState {
  // Loading state
  loading: LoadingState
  setLoading: (loading: Partial<LoadingState>) => void

  // Error state
  error: ErrorState
  setError: (error: Partial<ErrorState>) => void
  clearError: () => void

  // User management
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void

  // Tenant management
  setTenant: (tenant: Tenant | null) => void
  updateTenant: (updates: Partial<Tenant>) => void

  // App state
  setAppState: (state: Partial<AppState>) => void
  reset: () => void
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  user: null,
  tenant: null,
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          ...initialState,
          loading: { isLoading: false },
          error: { hasError: false },

          setLoading: (loading) =>
            set((state) => {
              state.loading = { ...state.loading, ...loading }
              state.isLoading = loading.isLoading ?? state.isLoading
            }),

          setError: (error) =>
            set((state) => {
              state.error = { ...state.error, ...error }
              state.error = error.error?.message || state.error
            }),

          clearError: () =>
            set((state) => {
              state.error = { hasError: false }
              state.error = null
            }),

          setUser: (user) =>
            set((state) => {
              state.user = user
            }),

          updateUser: (updates) =>
            set((state) => {
              if (state.user) {
                Object.assign(state.user, updates)
              }
            }),

          setTenant: (tenant) =>
            set((state) => {
              state.tenant = tenant
            }),

          updateTenant: (updates) =>
            set((state) => {
              if (state.tenant) {
                Object.assign(state.tenant, updates)
              }
            }),

          setAppState: (appState) =>
            set((state) => {
              Object.assign(state, appState)
            }),

          reset: () =>
            set((state) => {
              Object.assign(state, initialState)
              state.loading = { isLoading: false }
              state.error = { hasError: false }
            }),
        })),
      ),
      {
        name: "jobblox-app-store",
        partialize: (state) => ({
          user: state.user,
          tenant: state.tenant,
        }),
      },
    ),
    { name: "AppStore" },
  ),
)

// Selectors
export const useUser = () => useAppStore((state) => state.user)
export const useTenant = () => useAppStore((state) => state.tenant)
export const useLoading = () => useAppStore((state) => state.loading)
export const useError = () => useAppStore((state) => state.error)
export const useIsAuthenticated = () => useAppStore((state) => !!state.user)
