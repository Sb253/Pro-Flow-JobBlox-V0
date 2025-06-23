// UI-related types
export interface Theme {
  name: string
  colors: ThemeColors
  fonts: ThemeFonts
  spacing: ThemeSpacing
  breakpoints: ThemeBreakpoints
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  error: string
  warning: string
  success: string
  info: string
}

export interface ThemeFonts {
  primary: string
  secondary: string
  mono: string
}

export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
}

export interface ThemeBreakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  xxl: string
}

export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
}

export interface ErrorState {
  hasError: boolean
  error?: Error
  errorInfo?: any
}

export interface ToastMessage {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}
