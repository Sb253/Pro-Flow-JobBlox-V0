// Form-related types
export interface FormField<T = any> {
  name: string
  label: string
  type: FormFieldType
  value: T
  error?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  options?: FormFieldOption[]
  validation?: ValidationRule[]
}

export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "date"
  | "datetime"
  | "file"
  | "image"

export interface FormFieldOption {
  label: string
  value: any
  disabled?: boolean
}

export interface ValidationRule {
  type: "required" | "email" | "min" | "max" | "pattern" | "custom"
  value?: any
  message: string
}

export interface FormState<T = Record<string, any>> {
  values: T
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
}
