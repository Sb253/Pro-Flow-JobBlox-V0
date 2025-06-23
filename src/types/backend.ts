// Core Backend Types for Multi-Tenant CRM

// Authentication & User Management
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId: string;
  status: "active" | "inactive" | "suspended";
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
  phone?: string;
  preferences: UserPreferences;
}

export type UserRole =
  | "owner"
  | "admin"
  | "manager"
  | "field_worker"
  | "sales_rep"
  | "subcontractor"
  | "client";

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  projectUpdates: boolean;
  invoiceReminders: boolean;
  systemAlerts: boolean;
}

// Tenant Management
export interface Tenant {
  id: string;
  name: string;
  domain: string;
  plan: SubscriptionPlan;
  status: "active" | "suspended" | "trial" | "cancelled";
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  billingInfo: BillingInfo;
}

export interface TenantSettings {
  companyInfo: CompanyInfo;
  branding: BrandingSettings;
  features: FeatureFlags;
  integrations: IntegrationSettings;
}

export interface CompanyInfo {
  name: string;
  address: Address;
  phone: string;
  email: string;
  website?: string;
  taxId?: string;
  license?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BrandingSettings {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface FeatureFlags {
  aiAssistant: boolean;
  advancedReporting: boolean;
  customFields: boolean;
  apiAccess: boolean;
  whiteLabel: boolean;
}

// Customer Management
export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  type: "residential" | "commercial" | "industrial";
  status: "active" | "inactive" | "prospect" | "archived";
  contactPerson?: string;
  companySize?: string;
  industry?: string;
  referralSource: string;
  tags: string[];
  notes: string;
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Job/Project Management
export interface Job {
  id: string;
  tenantId: string;
  customerId: string;
  name: string;
  description: string;
  type: string;
  status: JobStatus;
  priority: "low" | "medium" | "high" | "urgent";
  startDate: Date;
  endDate: Date;
  estimatedHours: number;
  actualHours: number;
  budget: number;
  actualCost: number;
  assignedTo: string[];
  location: Address;
  requirements: string[];
  attachments: Attachment[];
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type JobStatus =
  | "draft"
  | "quoted"
  | "approved"
  | "scheduled"
  | "in_progress"
  | "on_hold"
  | "completed"
  | "cancelled";

// Estimates/Quotes
export interface Estimate {
  id: string;
  tenantId: string;
  customerId: string;
  jobId?: string;
  estimateNumber: string;
  title: string;
  description: string;
  status: EstimateStatus;
  validUntil: Date;
  items: EstimateItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  terms: string;
  notes: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  approvedAt?: Date;
  approvedBy?: string;
}

export type EstimateStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "approved"
  | "rejected"
  | "expired";

export interface EstimateItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  category: string;
  notes?: string;
}

// Invoicing
export interface Invoice {
  id: string;
  tenantId: string;
  customerId: string;
  jobId?: string;
  estimateId?: string;
  invoiceNumber: string;
  title: string;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  balanceDue: number;
  terms: string;
  notes: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  sentAt?: Date;
  paidAt?: Date;
}

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "partial"
  | "paid"
  | "overdue"
  | "cancelled";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  category: string;
  taxable: boolean;
  notes?: string;
}

// Payments
export interface Payment {
  id: string;
  tenantId: string;
  customerId: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  reference: string;
  notes: string;
  processedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type PaymentMethod =
  | "cash"
  | "check"
  | "credit_card"
  | "debit_card"
  | "bank_transfer"
  | "online";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

// Employee Management
export interface Employee {
  id: string;
  tenantId: string;
  userId: string;
  employeeNumber: string;
  department: string;
  position: string;
  hireDate: Date;
  salary: number;
  hourlyRate: number;
  status: "active" | "inactive" | "on_leave" | "terminated";
  skills: string[];
  certifications: Certification[];
  emergencyContact: EmergencyContact;
  address: Address;
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  issuedDate: Date;
  expiryDate?: Date;
  certificateNumber?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

// Inventory Management
export interface InventoryItem {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitCost: number;
  sellingPrice: number;
  supplier: string;
  location: string;
  status: "active" | "inactive" | "discontinued";
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMovement {
  id: string;
  tenantId: string;
  itemId: string;
  type: "in" | "out" | "adjustment";
  quantity: number;
  reason: string;
  reference?: string;
  jobId?: string;
  cost: number;
  createdAt: Date;
  createdBy: string;
}

// Time Tracking
export interface TimeEntry {
  id: string;
  tenantId: string;
  employeeId: string;
  jobId?: string;
  taskId?: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  hourlyRate: number;
  cost: number;
  status: "active" | "paused" | "completed";
  billable: boolean;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  tenantId: string;
  jobId: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string[];
  estimatedHours: number;
  actualHours: number;
  startDate: Date;
  dueDate: Date;
  completedAt?: Date;
  dependencies: string[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export type TaskStatus =
  | "todo"
  | "in_progress"
  | "review"
  | "completed"
  | "cancelled";

// Document Management
export interface Document {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  type: string;
  category: string;
  size: number;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  tags: string[];
  relatedTo: DocumentRelation[];
  permissions: DocumentPermission[];
  version: number;
  isLatest: boolean;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentRelation {
  type: "customer" | "job" | "invoice" | "estimate" | "employee";
  id: string;
}

export interface DocumentPermission {
  userId: string;
  permission: "view" | "edit" | "delete" | "share";
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: Date;
  uploadedBy: string;
}

// Subscription & Billing
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  limits: PlanLimits;
  isActive: boolean;
}

export interface PlanLimits {
  users: number;
  customers: number;
  projects: number;
  storage: number; // in GB
  apiCalls: number;
}

export interface BillingInfo {
  customerId: string;
  subscriptionId: string;
  plan: SubscriptionPlan;
  status: "active" | "past_due" | "cancelled" | "trialing";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialEnd?: Date;
  paymentMethod: PaymentMethodInfo;
}

export interface PaymentMethodInfo {
  id: string;
  type: "card" | "bank_account";
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

// Integration Settings
export interface IntegrationSettings {
  accounting: AccountingIntegration;
  email: EmailIntegration;
  calendar: CalendarIntegration;
  storage: StorageIntegration;
  payment: PaymentIntegration;
  crm: CRMIntegration;
  marketing: MarketingIntegration;
  communication: CommunicationIntegration;
  project: ProjectIntegration;
  hr: HRIntegration;
}

export interface AccountingIntegration {
  provider:
    | "quickbooks"
    | "xero"
    | "sage"
    | "freshbooks"
    | "wave"
    | "zoho"
    | null;
  enabled: boolean;
  settings: Record<string, any>;
  syncSettings: AccountingSyncSettings;
}

export interface AccountingSyncSettings {
  syncCustomers: boolean;
  syncInvoices: boolean;
  syncPayments: boolean;
  syncExpenses: boolean;
  syncItems: boolean;
  syncTaxRates: boolean;
  autoSync: boolean;
  syncFrequency: "realtime" | "hourly" | "daily" | "weekly";
  lastSync?: Date;
}

export interface EmailIntegration {
  provider:
    | "gmail"
    | "outlook"
    | "sendgrid"
    | "mailchimp"
    | "constant_contact"
    | null;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface CalendarIntegration {
  provider: "google" | "outlook" | "apple" | "calendly" | null;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface StorageIntegration {
  provider: "aws" | "google" | "dropbox" | "onedrive" | "box" | null;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface PaymentIntegration {
  provider:
    | "stripe"
    | "square"
    | "paypal"
    | "authorize_net"
    | "braintree"
    | null;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface CRMIntegration {
  provider:
    | "salesforce"
    | "hubspot"
    | "pipedrive"
    | "zoho_crm"
    | "monday"
    | null;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface MarketingIntegration {
  provider:
    | "mailchimp"
    | "constant_contact"
    | "hubspot"
    | "marketo"
    | "pardot"
    | null;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface CommunicationIntegration {
  provider: "slack" | "teams" | "discord" | "telegram" | "whatsapp" | null;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface ProjectIntegration {
  provider: "asana" | "trello" | "monday" | "jira" | "basecamp" | null;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface HRIntegration {
  provider: "bamboohr" | "workday" | "adp" | "gusto" | "paychex" | null;
  enabled: boolean;
  settings: Record<string, any>;
}

// QuickBooks Specific Types
export interface QuickBooksConnection {
  id: string;
  tenantId: string;
  companyId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiry: Date;
  realmId: string;
  baseUrl: string;
  status: "connected" | "expired" | "error";
  lastSync: Date;
  syncSettings: AccountingSyncSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuickBooksCustomer {
  id: string;
  name: string;
  companyName?: string;
  email?: string;
  phone?: string;
  address?: QuickBooksAddress;
  balance: number;
  active: boolean;
  taxable: boolean;
  taxExemptionReasonId?: string;
  notes?: string;
  customFields?: Record<string, any>;
  syncId: string;
  lastModified: Date;
}

export interface QuickBooksAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface QuickBooksItem {
  id: string;
  name: string;
  description?: string;
  type: "Service" | "Inventory" | "NonInventory";
  unitPrice: number;
  incomeAccountRef: string;
  expenseAccountRef?: string;
  assetAccountRef?: string;
  taxable: boolean;
  salesTaxCodeRef?: string;
  purchaseTaxCodeRef?: string;
  active: boolean;
  syncId: string;
  lastModified: Date;
}

export interface QuickBooksInvoice {
  id: string;
  docNumber: string;
  customerId: string;
  customerRef: QuickBooksRef;
  txnDate: Date;
  dueDate?: Date;
  totalAmt: number;
  balance: number;
  status: "Draft" | "Pending" | "Sent" | "Paid" | "Overdue" | "Cancelled";
  lines: QuickBooksInvoiceLine[];
  billAddr?: QuickBooksAddress;
  shipAddr?: QuickBooksAddress;
  emailStatus?: "NotSet" | "NeedToSend" | "EmailSent";
  deliveryInfo?: QuickBooksDeliveryInfo;
  syncId: string;
  lastModified: Date;
}

export interface QuickBooksInvoiceLine {
  id: string;
  lineNum: number;
  amount: number;
  detailType: "SalesItemLineDetail" | "DescriptionOnly";
  salesItemLineDetail?: {
    itemRef: QuickBooksRef;
    unitPrice: number;
    qty: number;
    taxCodeRef?: QuickBooksRef;
  };
  description?: string;
}

export interface QuickBooksRef {
  value: string;
  name?: string;
}

export interface QuickBooksDeliveryInfo {
  deliveryType: "Email" | "Print";
  deliveryTime: Date;
}

export interface QuickBooksPayment {
  id: string;
  customerId: string;
  customerRef: QuickBooksRef;
  txnDate: Date;
  totalAmt: number;
  unappliedAmt: number;
  processedAt?: Date;
  paymentMethodRef?: QuickBooksRef;
  depositToAccountRef?: QuickBooksRef;
  lines: QuickBooksPaymentLine[];
  syncId: string;
  lastModified: Date;
}

export interface QuickBooksPaymentLine {
  amount: number;
  linkedTxn: QuickBooksLinkedTransaction[];
}

export interface QuickBooksLinkedTransaction {
  txnId: string;
  txnType: "Invoice" | "CreditMemo" | "Estimate";
  txnLineId?: string;
}

// API Integration Types
export interface APIIntegration {
  id: string;
  tenantId: string;
  name: string;
  provider: string;
  category: IntegrationCategory;
  status: "active" | "inactive" | "error" | "pending";
  config: APIIntegrationConfig;
  credentials: APICredentials;
  webhooks: WebhookConfig[];
  rateLimits: RateLimitConfig;
  lastActivity: Date;
  errorCount: number;
  successCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type IntegrationCategory =
  | "accounting"
  | "crm"
  | "marketing"
  | "payment"
  | "communication"
  | "storage"
  | "project"
  | "hr"
  | "analytics"
  | "ecommerce";

export interface APIIntegrationConfig {
  baseUrl: string;
  version: string;
  timeout: number;
  retryAttempts: number;
  syncFrequency: "realtime" | "hourly" | "daily" | "weekly" | "manual";
  dataMapping: Record<string, string>;
  customFields: Record<string, any>;
  filters: Record<string, any>;
}

export interface APICredentials {
  type: "oauth2" | "api_key" | "basic" | "bearer";
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  apiKey?: string;
  username?: string;
  password?: string;
  tokenExpiry?: Date;
  scopes?: string[];
}

export interface WebhookConfig {
  id: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
  lastTriggered?: Date;
  failureCount: number;
}

export interface RateLimitConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  requestsPerDay: number;
  burstLimit: number;
  currentUsage: number;
  resetTime: Date;
}

// Integration Sync Types
export interface SyncJob {
  id: string;
  tenantId: string;
  integrationId: string;
  type: "full" | "incremental" | "manual";
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  direction: "import" | "export" | "bidirectional";
  entityType: string;
  recordsProcessed: number;
  recordsSucceeded: number;
  recordsFailed: number;
  errors: SyncError[];
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  triggeredBy: string;
  metadata: Record<string, any>;
}

export interface SyncError {
  recordId: string;
  error: string;
  details: string;
  timestamp: Date;
  retryCount: number;
}

export interface SyncMapping {
  id: string;
  tenantId: string;
  integrationId: string;
  sourceEntity: string;
  targetEntity: string;
  fieldMappings: FieldMapping[];
  transformations: DataTransformation[];
  filters: SyncFilter[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  required: boolean;
  dataType: "string" | "number" | "boolean" | "date" | "object";
  defaultValue?: any;
  transformation?: string;
}

export interface DataTransformation {
  field: string;
  type: "format" | "calculate" | "lookup" | "conditional";
  config: Record<string, any>;
}

export interface SyncFilter {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in";
  value: any;
  condition: "and" | "or";
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// API Request Types
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  sendInvite?: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  phone?: string;
  status?: "active" | "inactive" | "suspended";
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
  address: Address;
  type: "residential" | "commercial" | "industrial";
  contactPerson?: string;
  companySize?: string;
  industry?: string;
  referralSource: string;
  tags?: string[];
  notes?: string;
  customFields?: Record<string, any>;
}

export interface CreateJobRequest {
  customerId: string;
  name: string;
  description: string;
  type: string;
  priority: "low" | "medium" | "high" | "urgent";
  startDate: Date;
  endDate: Date;
  estimatedHours: number;
  budget: number;
  assignedTo: string[];
  location: Address;
  requirements?: string[];
  customFields?: Record<string, any>;
}

export interface CreateEstimateRequest {
  customerId: string;
  jobId?: string;
  title: string;
  description: string;
  validUntil: Date;
  items: Omit<EstimateItem, "id">[];
  tax: number;
  discount: number;
  terms: string;
  notes?: string;
}

export interface CreateInvoiceRequest {
  customerId: string;
  jobId?: string;
  estimateId?: string;
  title: string;
  dueDate: Date;
  items: Omit<InvoiceItem, "id">[];
  tax: number;
  discount: number;
  terms: string;
  notes?: string;
}

// Webhook Types
export interface WebhookEvent {
  id: string;
  type: string;
  data: Record<string, any>;
  timestamp: Date;
  tenantId: string;
}

// Notification Types
export interface Notification {
  id: string;
  tenantId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, any>;
  read: boolean;
  createdAt: Date;
}

export type NotificationType =
  | "job_assigned"
  | "job_completed"
  | "invoice_sent"
  | "invoice_paid"
  | "payment_received"
  | "estimate_approved"
  | "deadline_approaching"
  | "system_alert";
