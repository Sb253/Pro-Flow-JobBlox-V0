import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Download,
  Upload,
  Calendar,
  CreditCard,
  Receipt,
  PieChart,
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Building,
  User,
  Wallet,
  Target,
  Activity,
  Camera,
  Scan,
  Send,
  RefreshCw,
  Settings,
  Calculator,
  Percent,
  Banknote,
  CreditCard as CreditCardIcon,
  Smartphone,
  Globe,
  Zap,
  Bell,
  Archive,
  Trash2,
  Copy,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Flag,
  Shield,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Users,
  Crown,
  Award,
  TrendingDown as TrendingDownIcon,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  projectId?: string;
  projectName?: string;
  clientId?: string;
  clientName?: string;
  paymentMethod: string;
  reference: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
  amount: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Budget {
  id: string;
  name: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: "monthly" | "quarterly" | "yearly";
  startDate: string;
  endDate: string;
  status: "on_track" | "over_budget" | "under_budget";
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  subcategory: string;
  date: string;
  receipt?: ReceiptData;
  status: "draft" | "pending_approval" | "approved" | "rejected";
  approver?: string;
  notes?: string;
  tags: string[];
  projectId?: string;
  projectName?: string;
  vendor: string;
  paymentMethod: string;
  taxAmount: number;
  taxRate: number;
  isRecurring: boolean;
  recurringFrequency?: "weekly" | "monthly" | "quarterly" | "yearly";
}

interface ReceiptData {
  id: string;
  filename: string;
  url: string;
  uploadDate: string;
  extractedData?: {
    vendor: string;
    amount: number;
    date: string;
    items: string[];
    taxAmount?: number;
  };
}

interface TaxReport {
  id: string;
  period: string;
  quarter: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  taxableIncome: number;
  taxOwed: number;
  deductions: number;
  status: "draft" | "filed" | "paid";
  dueDate: string;
  filedDate?: string;
  paidDate?: string;
}

interface PaymentGateway {
  id: string;
  name: string;
  type: "stripe" | "paypal" | "square" | "authorize_net" | "bank_transfer";
  isActive: boolean;
  fees: {
    percentage: number;
    fixed: number;
  };
  supportedMethods: string[];
  configuration: Record<string, any>;
}

interface ProfitAnalysis {
  jobId: string;
  jobName: string;
  clientName: string;
  totalRevenue: number;
  totalCosts: number;
  grossProfit: number;
  profitMargin: number;
  laborCosts: number;
  materialCosts: number;
  overheadCosts: number;
  duration: number;
  profitPerHour: number;
  status: "completed" | "in_progress" | "planned";
  startDate: string;
  endDate?: string;
}

const FinancialManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isExpenseSheetOpen, setIsExpenseSheetOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isReceiptUploadOpen, setIsReceiptUploadOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("current_quarter");

  const transactions: Transaction[] = [
    {
      id: "txn_001",
      type: "income",
      category: "Project Payment",
      description: "Payment for Office Building Construction",
      amount: 50000,
      date: "2024-01-30",
      status: "completed",
      projectId: "proj_001",
      projectName: "Office Building Construction",
      clientId: "client_001",
      clientName: "ABC Corporation",
      paymentMethod: "Bank Transfer",
      reference: "INV-2024-001",
    },
    {
      id: "txn_002",
      type: "expense",
      category: "Materials",
      description: "Concrete and Steel Purchase",
      amount: 15000,
      date: "2024-01-28",
      status: "completed",
      projectId: "proj_001",
      projectName: "Office Building Construction",
      paymentMethod: "Credit Card",
      reference: "PO-2024-015",
    },
    {
      id: "txn_003",
      type: "expense",
      category: "Labor",
      description: "Weekly Payroll",
      amount: 8500,
      date: "2024-01-26",
      status: "completed",
      paymentMethod: "Direct Deposit",
      reference: "PAY-2024-004",
    },
    {
      id: "txn_004",
      type: "income",
      category: "Milestone Payment",
      description: "Foundation Completion Payment",
      amount: 25000,
      date: "2024-01-25",
      status: "pending",
      projectId: "proj_002",
      projectName: "Residential Complex",
      clientId: "client_002",
      clientName: "XYZ Developers",
      paymentMethod: "Check",
      reference: "INV-2024-002",
    },
  ];

  const invoices: Invoice[] = [
    {
      id: "inv_001",
      invoiceNumber: "INV-2024-001",
      clientId: "client_001",
      clientName: "ABC Corporation",
      projectId: "proj_001",
      projectName: "Office Building Construction",
      amount: 50000,
      tax: 4000,
      total: 54000,
      status: "paid",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      paidDate: "2024-01-30",
      items: [
        {
          id: "item_001",
          description: "Foundation Work",
          quantity: 1,
          rate: 30000,
          amount: 30000,
        },
        {
          id: "item_002",
          description: "Structural Framework",
          quantity: 1,
          rate: 20000,
          amount: 20000,
        },
      ],
    },
    {
      id: "inv_002",
      invoiceNumber: "INV-2024-002",
      clientId: "client_002",
      clientName: "XYZ Developers",
      projectId: "proj_002",
      projectName: "Residential Complex",
      amount: 25000,
      tax: 2000,
      total: 27000,
      status: "sent",
      issueDate: "2024-01-20",
      dueDate: "2024-02-20",
      items: [
        {
          id: "item_003",
          description: "Foundation Completion",
          quantity: 1,
          rate: 25000,
          amount: 25000,
        },
      ],
    },
  ];

  const budgets: Budget[] = [
    {
      id: "budget_001",
      name: "Materials Budget Q1",
      category: "Materials",
      allocated: 100000,
      spent: 65000,
      remaining: 35000,
      period: "quarterly",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "on_track",
    },
    {
      id: "budget_002",
      name: "Labor Budget Q1",
      category: "Labor",
      allocated: 150000,
      spent: 85000,
      remaining: 65000,
      period: "quarterly",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "on_track",
    },
    {
      id: "budget_003",
      name: "Equipment Rental",
      category: "Equipment",
      allocated: 30000,
      spent: 32000,
      remaining: -2000,
      period: "quarterly",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "over_budget",
    },
  ];

  const expenses: Expense[] = [
    {
      id: "exp_001",
      description: "Office Supplies - Stationery and Equipment",
      amount: 450.75,
      category: "Office Expenses",
      subcategory: "Supplies",
      date: "2024-01-30",
      status: "approved",
      approver: "John Manager",
      notes: "Monthly office supply restock",
      tags: ["office", "supplies", "monthly"],
      vendor: "Office Depot",
      paymentMethod: "Company Credit Card",
      taxAmount: 36.06,
      taxRate: 0.08,
      isRecurring: true,
      recurringFrequency: "monthly",
      receipt: {
        id: "receipt_001",
        filename: "office_supplies_jan_2024.pdf",
        url: "/receipts/office_supplies_jan_2024.pdf",
        uploadDate: "2024-01-30",
        extractedData: {
          vendor: "Office Depot",
          amount: 450.75,
          date: "2024-01-30",
          items: ["Paper", "Pens", "Folders", "Printer Ink"],
          taxAmount: 36.06,
        },
      },
    },
    {
      id: "exp_002",
      description: "Fuel for Company Vehicles",
      amount: 280.5,
      category: "Transportation",
      subcategory: "Fuel",
      date: "2024-01-29",
      status: "pending_approval",
      notes: "Weekly fuel expenses for project sites",
      tags: ["fuel", "transportation", "vehicles"],
      vendor: "Shell Gas Station",
      paymentMethod: "Fleet Card",
      taxAmount: 22.44,
      taxRate: 0.08,
      isRecurring: false,
      projectId: "proj_001",
      projectName: "Office Building Construction",
    },
    {
      id: "exp_003",
      description: "Software Subscription - Project Management",
      amount: 199.99,
      category: "Software & Technology",
      subcategory: "Subscriptions",
      date: "2024-01-28",
      status: "approved",
      approver: "Sarah Admin",
      notes: "Monthly subscription for project management software",
      tags: ["software", "subscription", "project-management"],
      vendor: "ProjectPro Software",
      paymentMethod: "Auto-pay Credit Card",
      taxAmount: 16.0,
      taxRate: 0.08,
      isRecurring: true,
      recurringFrequency: "monthly",
    },
  ];

  const taxReports: TaxReport[] = [
    {
      id: "tax_2024_q1",
      period: "Q1 2024",
      quarter: 1,
      year: 2024,
      totalIncome: 275000,
      totalExpenses: 185000,
      taxableIncome: 90000,
      taxOwed: 22500,
      deductions: 15000,
      status: "draft",
      dueDate: "2024-04-15",
    },
    {
      id: "tax_2023_q4",
      period: "Q4 2023",
      quarter: 4,
      year: 2023,
      totalIncome: 320000,
      totalExpenses: 210000,
      taxableIncome: 110000,
      taxOwed: 27500,
      deductions: 18000,
      status: "paid",
      dueDate: "2024-01-15",
      filedDate: "2024-01-10",
      paidDate: "2024-01-12",
    },
  ];

  const paymentGateways: PaymentGateway[] = [
    {
      id: "stripe_001",
      name: "Stripe",
      type: "stripe",
      isActive: true,
      fees: { percentage: 2.9, fixed: 0.3 },
      supportedMethods: [
        "Credit Card",
        "Debit Card",
        "ACH",
        "Apple Pay",
        "Google Pay",
      ],
      configuration: { publishableKey: "pk_***", secretKey: "sk_***" },
    },
    {
      id: "paypal_001",
      name: "PayPal",
      type: "paypal",
      isActive: true,
      fees: { percentage: 3.49, fixed: 0.49 },
      supportedMethods: ["PayPal", "Credit Card", "Debit Card"],
      configuration: { clientId: "***", clientSecret: "***" },
    },
    {
      id: "square_001",
      name: "Square",
      type: "square",
      isActive: false,
      fees: { percentage: 2.6, fixed: 0.1 },
      supportedMethods: ["Credit Card", "Debit Card", "Contactless"],
      configuration: { applicationId: "***", accessToken: "***" },
    },
  ];

  const profitAnalysis: ProfitAnalysis[] = [
    {
      jobId: "job_001",
      jobName: "Kitchen Renovation - Smith Residence",
      clientName: "Smith Family",
      totalRevenue: 25000,
      totalCosts: 18500,
      grossProfit: 6500,
      profitMargin: 26.0,
      laborCosts: 8000,
      materialCosts: 9500,
      overheadCosts: 1000,
      duration: 14,
      profitPerHour: 32.14,
      status: "completed",
      startDate: "2024-01-15",
      endDate: "2024-01-29",
    },
    {
      jobId: "job_002",
      jobName: "Bathroom Remodel - Johnson Home",
      clientName: "Johnson Family",
      totalRevenue: 18000,
      totalCosts: 12800,
      grossProfit: 5200,
      profitMargin: 28.9,
      laborCosts: 6000,
      materialCosts: 6200,
      overheadCosts: 600,
      duration: 10,
      profitPerHour: 36.11,
      status: "completed",
      startDate: "2024-01-20",
      endDate: "2024-01-30",
    },
    {
      jobId: "job_003",
      jobName: "Office Building - Phase 1",
      clientName: "ABC Corporation",
      totalRevenue: 150000,
      totalCosts: 125000,
      grossProfit: 25000,
      profitMargin: 16.7,
      laborCosts: 65000,
      materialCosts: 55000,
      overheadCosts: 5000,
      duration: 45,
      profitPerHour: 38.58,
      status: "in_progress",
      startDate: "2024-01-10",
    },
  ];

  const financialStats = {
    totalRevenue: transactions
      .filter((t) => t.type === "income" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions
      .filter((t) => t.type === "expense" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0),
    pendingInvoices: invoices.filter((i) => i.status === "sent").length,
    overdueInvoices: invoices.filter((i) => i.status === "overdue").length,
    totalBudgetAllocated: budgets.reduce((sum, b) => sum + b.allocated, 0),
    totalBudgetSpent: budgets.reduce((sum, b) => sum + b.spent, 0),
  };

  const netProfit = financialStats.totalRevenue - financialStats.totalExpenses;
  const profitMargin =
    financialStats.totalRevenue > 0
      ? (netProfit / financialStats.totalRevenue) * 100
      : 0;

  const getStatusBadge = (
    status: string,
    type: "transaction" | "invoice" | "budget",
  ) => {
    if (type === "transaction") {
      switch (status) {
        case "completed":
          return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <CheckCircle className="mr-1 h-3 w-3" />
              Completed
            </Badge>
          );
        case "pending":
          return (
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
              <Clock className="mr-1 h-3 w-3" />
              Pending
            </Badge>
          );
        case "failed":
          return (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              <AlertCircle className="mr-1 h-3 w-3" />
              Failed
            </Badge>
          );
      }
    } else if (type === "invoice") {
      switch (status) {
        case "paid":
          return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <CheckCircle className="mr-1 h-3 w-3" />
              Paid
            </Badge>
          );
        case "sent":
          return (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              <Clock className="mr-1 h-3 w-3" />
              Sent
            </Badge>
          );
        case "overdue":
          return (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              <AlertCircle className="mr-1 h-3 w-3" />
              Overdue
            </Badge>
          );
        case "draft":
          return (
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              Draft
            </Badge>
          );
      }
    } else if (type === "budget") {
      switch (status) {
        case "on_track":
          return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <Target className="mr-1 h-3 w-3" />
              On Track
            </Badge>
          );
        case "over_budget":
          return (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              <AlertCircle className="mr-1 h-3 w-3" />
              Over Budget
            </Badge>
          );
        case "under_budget":
          return (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              <TrendingDown className="mr-1 h-3 w-3" />
              Under Budget
            </Badge>
          );
      }
    }
    return <Badge>{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return type === "income" ? (
      <Badge className="bg-green-100 text-green-800">
        <TrendingUp className="mr-1 h-3 w-3" />
        Income
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">
        <TrendingDown className="mr-1 h-3 w-3" />
        Expense
      </Badge>
    );
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.clientName &&
        transaction.clientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Financial Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Track revenue, expenses, invoices, and budgets
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ${financialStats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    ${financialStats.totalExpenses.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Expenses
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    ${netProfit.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p
                    className={`text-xs ${profitMargin >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {profitMargin.toFixed(1)}% margin
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {financialStats.pendingInvoices}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pending Invoices
                  </p>
                  {financialStats.overdueInvoices > 0 && (
                    <p className="text-xs text-red-600">
                      {financialStats.overdueInvoices} overdue
                    </p>
                  )}
                </div>
                <Receipt className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="tax">Tax & Reports</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Expenses</CardTitle>
                  <CardDescription>
                    Monthly comparison of income and expenses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Revenue vs Expenses chart would appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                  <CardDescription>
                    Distribution of expenses by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Expense breakdown chart would appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.slice(0, 5).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.category}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              transaction.type === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {transaction.type === "income" ? "+" : "-"}$
                            {transaction.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.status, "transaction")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Expense Management
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Track expenses, capture receipts, and manage approvals
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Scan Receipt
                </Button>
                <Sheet
                  open={isExpenseSheetOpen}
                  onOpenChange={setIsExpenseSheetOpen}
                >
                  <SheetTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Expense
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[600px] sm:w-[800px]">
                    <SheetHeader>
                      <SheetTitle>Add New Expense</SheetTitle>
                      <SheetDescription>
                        Create a new expense entry with receipt capture and
                        categorization
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 py-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Description
                          </label>
                          <Input placeholder="Enter expense description" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Amount</label>
                          <Input type="number" placeholder="0.00" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Category
                          </label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="office">
                                Office Expenses
                              </SelectItem>
                              <SelectItem value="transportation">
                                Transportation
                              </SelectItem>
                              <SelectItem value="materials">
                                Materials
                              </SelectItem>
                              <SelectItem value="software">
                                Software & Technology
                              </SelectItem>
                              <SelectItem value="meals">
                                Meals & Entertainment
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Vendor</label>
                          <Input placeholder="Vendor name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Receipt Upload
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-600">
                            Drop receipt here or click to upload
                          </p>
                          <Button variant="outline" className="mt-2">
                            <Camera className="mr-2 h-4 w-4" />
                            Take Photo
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea placeholder="Additional notes or comments" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="recurring" />
                        <label
                          htmlFor="recurring"
                          className="text-sm font-medium"
                        >
                          This is a recurring expense
                        </label>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsExpenseSheetOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button>Save Expense</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Expense Tracking</CardTitle>
                <CardDescription>
                  Manage and approve expense submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search expenses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending_approval">
                        Pending Approval
                      </SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>
                          {new Date(expense.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            {expense.projectName && (
                              <p className="text-sm text-muted-foreground">
                                Project: {expense.projectName}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{expense.category}</Badge>
                        </TableCell>
                        <TableCell>{expense.vendor}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${expense.amount.toFixed(2)}
                            </p>
                            {expense.taxAmount > 0 && (
                              <p className="text-xs text-muted-foreground">
                                +${expense.taxAmount.toFixed(2)} tax
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {expense.status === "approved" && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Approved
                            </Badge>
                          )}
                          {expense.status === "pending_approval" && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                          {expense.status === "rejected" && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              Rejected
                            </Badge>
                          )}
                          {expense.status === "draft" && (
                            <Badge className="bg-gray-100 text-gray-800">
                              Draft
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {expense.receipt ? (
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" disabled>
                              <Upload className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {expense.status === "pending_approval" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Management</CardTitle>
                <CardDescription>
                  Track all income and expense transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transactions Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {transaction.description}
                            </p>
                            {transaction.projectName && (
                              <p className="text-sm text-muted-foreground">
                                Project: {transaction.projectName}
                              </p>
                            )}
                            {transaction.clientName && (
                              <p className="text-sm text-muted-foreground">
                                Client: {transaction.clientName}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                          >
                            {transaction.type === "income" ? "+" : "-"}$
                            {transaction.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.status, "transaction")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Management</CardTitle>
                <CardDescription>
                  Create and manage client invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <p className="font-medium">{invoice.invoiceNumber}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4" />
                            <span>{invoice.clientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.projectName}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${invoice.total.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              +${invoice.tax.toLocaleString()} tax
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(invoice.status, "invoice")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Management</CardTitle>
                <CardDescription>
                  Track and manage project and operational budgets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgets.map((budget) => (
                    <div key={budget.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{budget.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {budget.category} • {budget.period}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          {getStatusBadge(budget.status, "budget")}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            ${budget.allocated.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Allocated
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">
                            ${budget.spent.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Spent</p>
                        </div>
                        <div className="text-center">
                          <p
                            className={`text-2xl font-bold ${budget.remaining >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            ${Math.abs(budget.remaining).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {budget.remaining >= 0
                              ? "Remaining"
                              : "Over Budget"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Budget Usage</span>
                          <span>
                            {((budget.spent / budget.allocated) * 100).toFixed(
                              1,
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(budget.spent / budget.allocated) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>
                          {new Date(budget.startDate).toLocaleDateString()}
                        </span>
                        <span>
                          {new Date(budget.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Tax & Financial Reporting
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Automated tax calculations and quarterly reports
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current_quarter">
                      Current Quarter
                    </SelectItem>
                    <SelectItem value="last_quarter">Last Quarter</SelectItem>
                    <SelectItem value="current_year">Current Year</SelectItem>
                    <SelectItem value="last_year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Calculator className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        $90,000
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Taxable Income
                      </p>
                    </div>
                    <Calculator className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        $22,500
                      </p>
                      <p className="text-sm text-muted-foreground">Tax Owed</p>
                    </div>
                    <Percent className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        $15,000
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Deductions
                      </p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tax Reports</CardTitle>
                <CardDescription>
                  Quarterly and annual tax reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Total Income</TableHead>
                      <TableHead>Total Expenses</TableHead>
                      <TableHead>Taxable Income</TableHead>
                      <TableHead>Tax Owed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="font-medium">{report.period}</div>
                        </TableCell>
                        <TableCell>
                          ${report.totalIncome.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${report.totalExpenses.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${report.taxableIncome.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-orange-600">
                            ${report.taxOwed.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          {report.status === "paid" && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Paid
                            </Badge>
                          )}
                          {report.status === "filed" && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <FileText className="mr-1 h-3 w-3" />
                              Filed
                            </Badge>
                          )}
                          {report.status === "draft" && (
                            <Badge className="bg-gray-100 text-gray-800">
                              Draft
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(report.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            {report.status === "draft" && (
                              <Button variant="ghost" size="sm">
                                <Send className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Payment Processing
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage payment gateways and processing settings
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Gateway
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentGateways.map((gateway) => (
                <Card
                  key={gateway.id}
                  className={
                    gateway.isActive ? "border-green-200" : "border-gray-200"
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        {gateway.type === "stripe" && (
                          <CreditCardIcon className="h-5 w-5" />
                        )}
                        {gateway.type === "paypal" && (
                          <Wallet className="h-5 w-5" />
                        )}
                        {gateway.type === "square" && (
                          <Smartphone className="h-5 w-5" />
                        )}
                        <span>{gateway.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {gateway.isActive ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Processing Fees
                        </p>
                        <p className="text-lg font-bold">
                          {gateway.fees.percentage}% + ${gateway.fees.fixed}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Supported Methods
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {gateway.supportedMethods
                            .slice(0, 3)
                            .map((method) => (
                              <Badge
                                key={method}
                                variant="outline"
                                className="text-xs"
                              >
                                {method}
                              </Badge>
                            ))}
                          {gateway.supportedMethods.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{gateway.supportedMethods.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </Button>
                        <Button
                          variant={gateway.isActive ? "outline" : "default"}
                          size="sm"
                          className="flex-1"
                        >
                          {gateway.isActive ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure automatic invoicing and payment processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Automatic Invoicing</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-invoice" defaultChecked />
                          <label htmlFor="auto-invoice" className="text-sm">
                            Send invoices automatically upon project completion
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="payment-reminders" defaultChecked />
                          <label
                            htmlFor="payment-reminders"
                            className="text-sm"
                          >
                            Send payment reminders for overdue invoices
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="recurring-billing" />
                          <label
                            htmlFor="recurring-billing"
                            className="text-sm"
                          >
                            Enable recurring billing for maintenance contracts
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Payment Terms</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">
                            Default Payment Terms
                          </label>
                          <Select defaultValue="net30">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="due_on_receipt">
                                Due on Receipt
                              </SelectItem>
                              <SelectItem value="net15">Net 15</SelectItem>
                              <SelectItem value="net30">Net 30</SelectItem>
                              <SelectItem value="net60">Net 60</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Late Fee
                          </label>
                          <div className="flex space-x-2">
                            <Input placeholder="5" className="w-20" />
                            <span className="text-sm text-gray-500 self-center">
                              % after
                            </span>
                            <Input placeholder="30" className="w-20" />
                            <span className="text-sm text-gray-500 self-center">
                              days
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Profit Margin Analysis
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Job profitability and trend analysis
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Analysis
                </Button>
                <Button>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Data
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">23.5%</p>
                      <p className="text-sm text-muted-foreground">
                        Avg Profit Margin
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        $36,700
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total Profit
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        $35.61
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Profit per Hour
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">3</p>
                      <p className="text-sm text-muted-foreground">
                        Active Jobs
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Job Profitability Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of profit margins by job
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Costs</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>$/Hour</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profitAnalysis.map((job) => (
                      <TableRow key={job.jobId}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{job.jobName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(job.startDate).toLocaleDateString()}
                              {job.endDate &&
                                ` - ${new Date(job.endDate).toLocaleDateString()}`}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{job.clientName}</TableCell>
                        <TableCell>
                          <span className="font-medium text-green-600">
                            ${job.totalRevenue.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${job.totalCosts.toLocaleString()}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              L: ${job.laborCosts.toLocaleString()} | M: $
                              {job.materialCosts.toLocaleString()} | O: $
                              {job.overheadCosts.toLocaleString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-blue-600">
                            ${job.grossProfit.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`font-medium ${
                                job.profitMargin >= 25
                                  ? "text-green-600"
                                  : job.profitMargin >= 15
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {job.profitMargin.toFixed(1)}%
                            </span>
                            {job.profitMargin >= 25 && (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            )}
                            {job.profitMargin < 15 && (
                              <TrendingDownIcon className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{job.duration} days</TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${job.profitPerHour.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {job.status === "completed" && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </Badge>
                          )}
                          {job.status === "in_progress" && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <Activity className="mr-1 h-3 w-3" />
                              In Progress
                            </Badge>
                          )}
                          {job.status === "planned" && (
                            <Badge className="bg-gray-100 text-gray-800">
                              <Calendar className="mr-1 h-3 w-3" />
                              Planned
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profit Trend Analysis</CardTitle>
                  <CardDescription>
                    Monthly profit margin trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Profit trend chart would appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                  <CardDescription>
                    Distribution of costs across categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Cost breakdown chart would appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* View Transaction Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Complete information for transaction{" "}
                {selectedTransaction?.reference}
              </DialogDescription>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Transaction Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>Type: {getTypeBadge(selectedTransaction.type)}</div>
                      <div>
                        Category:{" "}
                        <Badge variant="outline">
                          {selectedTransaction.category}
                        </Badge>
                      </div>
                      <div>
                        Amount:{" "}
                        <span
                          className={
                            selectedTransaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {selectedTransaction.type === "income" ? "+" : "-"}$
                          {selectedTransaction.amount.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        Date:{" "}
                        {new Date(
                          selectedTransaction.date,
                        ).toLocaleDateString()}
                      </div>
                      <div>
                        Status:{" "}
                        {getStatusBadge(
                          selectedTransaction.status,
                          "transaction",
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Additional Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        Payment Method: {selectedTransaction.paymentMethod}
                      </div>
                      <div>Reference: {selectedTransaction.reference}</div>
                      {selectedTransaction.projectName && (
                        <div>Project: {selectedTransaction.projectName}</div>
                      )}
                      {selectedTransaction.clientName && (
                        <div>Client: {selectedTransaction.clientName}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedTransaction.description}
                  </p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              <Button>Edit Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FinancialManagement;
