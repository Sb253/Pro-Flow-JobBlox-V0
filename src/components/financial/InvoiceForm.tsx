import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Calendar as CalendarIcon,
  DollarSign,
  Plus,
  Trash2,
  Save,
  Send,
  Calculator,
  Settings,
  Clock,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  Copy,
  Download,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  total: z.number(),
  category: z.string().min(1, "Category is required"),
  taxable: z.boolean().default(true),
  notes: z.string().optional(),
});

const invoiceFormSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  jobId: z.string().optional(),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  title: z.string().min(1, "Invoice title is required"),
  issueDate: z.date(),
  dueDate: z.date(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  subtotal: z.number(),
  tax: z.number().min(0, "Tax must be positive"),
  discount: z.number().min(0, "Discount must be positive"),
  total: z.number(),
  terms: z.string().min(1, "Payment terms are required"),
  notes: z.string().optional(),
  paymentTerms: z.object({
    net: z.number().default(30),
    lateFee: z.number().default(0),
    discountPercent: z.number().default(0),
    discountDays: z.number().default(0),
  }),
  automation: z.object({
    sendReminders: z.boolean().default(true),
    reminderDays: z.array(z.number()).default([7, 3, 1]),
    autoLateFee: z.boolean().default(false),
    recurringInvoice: z.boolean().default(false),
    recurringInterval: z
      .enum(["weekly", "monthly", "quarterly", "yearly"])
      .default("monthly"),
  }),
});

type InvoiceFormData = z.infer<typeof invoiceFormSchema>;

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  taxExempt: boolean;
}

interface Job {
  id: string;
  name: string;
  customerId: string;
  status: string;
  totalValue: number;
}

interface InvoiceFormProps {
  initialData?: Partial<InvoiceFormData>;
  onSubmit: (data: InvoiceFormData) => void;
  onSave?: (data: InvoiceFormData) => void;
  onSend?: (data: InvoiceFormData) => void;
  onPreview?: (data: InvoiceFormData) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  onSubmit,
  onSave,
  onSend,
  onPreview,
  onCancel,
  isEditing = false,
}) => {
  const [taxRate, setTaxRate] = useState(8.5); // Default tax rate
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState("INV-2024-001");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Mock data - in real app, these would come from API
  const customers: Customer[] = [
    {
      id: "cust_001",
      name: "Johnson Family",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Oak Street, Springfield, IL 62701",
      taxExempt: false,
    },
    {
      id: "cust_002",
      name: "ABC Construction LLC",
      email: "contact@abcconstruction.com",
      phone: "+1 (555) 987-6543",
      address: "456 Business Park Drive, Chicago, IL 60601",
      taxExempt: true,
    },
    {
      id: "cust_003",
      name: "Smith Residence",
      email: "mike.smith@email.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine Avenue, Riverside, CA 92501",
      taxExempt: false,
    },
  ];

  const jobs: Job[] = [
    {
      id: "job_001",
      name: "Kitchen Renovation",
      customerId: "cust_001",
      status: "completed",
      totalValue: 18000,
    },
    {
      id: "job_002",
      name: "Office Building Renovation",
      customerId: "cust_002",
      status: "in_progress",
      totalValue: 45000,
    },
    {
      id: "job_003",
      name: "Bathroom Remodel",
      customerId: "cust_001",
      status: "completed",
      totalValue: 12000,
    },
  ];

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      customerId: "",
      jobId: "",
      invoiceNumber: nextInvoiceNumber,
      title: "",
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      items: [
        {
          description: "",
          quantity: 1,
          unit: "each",
          unitPrice: 0,
          total: 0,
          category: "Labor",
          taxable: true,
          notes: "",
        },
      ],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      terms:
        "Net 30 - Payment due within 30 days of invoice date. Late payments subject to 1.5% monthly service charge.",
      notes: "",
      paymentTerms: {
        net: 30,
        lateFee: 1.5,
        discountPercent: 2,
        discountDays: 10,
      },
      automation: {
        sendReminders: true,
        reminderDays: [7, 3, 1],
        autoLateFee: false,
        recurringInvoice: false,
        recurringInterval: "monthly",
      },
      ...initialData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchedItems = form.watch("items");
  const watchedCustomerId = form.watch("customerId");
  const watchedDiscount = form.watch("discount");
  const watchedJobId = form.watch("jobId");

  // Calculate totals whenever items change
  useEffect(() => {
    const subtotal = watchedItems.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unitPrice;
      form.setValue(`items.${watchedItems.indexOf(item)}.total`, itemTotal);
      return sum + itemTotal;
    }, 0);

    const selectedCustomer = customers.find((c) => c.id === watchedCustomerId);
    const taxableAmount = watchedItems.reduce((sum, item) => {
      return sum + (item.taxable ? item.quantity * item.unitPrice : 0);
    }, 0);

    const tax = selectedCustomer?.taxExempt
      ? 0
      : (taxableAmount * taxRate) / 100;
    const total = subtotal + tax - watchedDiscount;

    form.setValue("subtotal", subtotal);
    form.setValue("tax", tax);
    form.setValue("total", Math.max(0, total));
  }, [watchedItems, watchedCustomerId, watchedDiscount, taxRate, form]);

  // Auto-populate invoice title when job is selected
  useEffect(() => {
    if (watchedJobId) {
      const selectedJob = jobs.find((job) => job.id === watchedJobId);
      if (selectedJob && !form.getValues("title")) {
        form.setValue("title", `Invoice for ${selectedJob.name}`);
      }
    }
  }, [watchedJobId, form]);

  const addItem = () => {
    append({
      description: "",
      quantity: 1,
      unit: "each",
      unitPrice: 0,
      total: 0,
      category: "Labor",
      taxable: true,
      notes: "",
    });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const duplicateItem = (index: number) => {
    const itemToDuplicate = watchedItems[index];
    append({
      ...itemToDuplicate,
      description: `${itemToDuplicate.description} (Copy)`,
    });
  };

  const getAvailableJobs = () => {
    return jobs.filter((job) => job.customerId === watchedCustomerId);
  };

  const selectedCustomer = customers.find((c) => c.id === watchedCustomerId);
  const selectedJob = jobs.find((job) => job.id === watchedJobId);

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const newNumber = `INV-${year}${month}-${random}`;
    form.setValue("invoiceNumber", newNumber);
  };

  const loadJobItems = () => {
    if (selectedJob) {
      // Mock job items - in real app, this would come from API
      const jobItems = [
        {
          description: "Labor - Project Management",
          quantity: 40,
          unit: "hour",
          unitPrice: 75,
          total: 3000,
          category: "Labor",
          taxable: true,
          notes: "Project oversight and coordination",
        },
        {
          description: "Materials - Premium Fixtures",
          quantity: 1,
          unit: "lot",
          unitPrice: 2500,
          total: 2500,
          category: "Materials",
          taxable: true,
          notes: "High-end bathroom fixtures and fittings",
        },
      ];

      // Clear existing items and add job items
      form.setValue("items", jobItems);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {isEditing ? "Edit Invoice" : "New Invoice"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {isEditing
                ? "Update invoice details and line items"
                : "Create detailed invoice with line items, tax calculations, and payment terms"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            {onPreview && (
              <Button
                variant="outline"
                onClick={() => onPreview(form.getValues())}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
            )}
            {onSave && (
              <Button
                variant="outline"
                onClick={() => onSave(form.getValues())}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
            )}
            {onSend && (
              <Button
                variant="outline"
                onClick={() => onSend(form.getValues())}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Invoice
              </Button>
            )}
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
            >
              <FileText className="mr-2 h-4 w-4" />
              {isEditing ? "Update Invoice" : "Create Invoice"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Invoice Details</TabsTrigger>
            <TabsTrigger value="items">Line Items</TabsTrigger>
            <TabsTrigger value="terms">Payment Terms</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Form {...form}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Invoice Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Invoice Information</span>
                    </CardTitle>
                    <CardDescription>
                      Basic invoice details and customer information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Invoice Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="INV-2024-001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateInvoiceNumber}
                        >
                          Generate
                        </Button>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invoice Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Invoice for services rendered"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select customer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {customers.map((customer) => (
                                <SelectItem
                                  key={customer.id}
                                  value={customer.id}
                                >
                                  <div className="flex items-center space-x-2">
                                    <span>{customer.name}</span>
                                    {customer.taxExempt && (
                                      <Badge variant="outline">
                                        Tax Exempt
                                      </Badge>
                                    )}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="jobId"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Related Job (Optional)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select job" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="">No related job</SelectItem>
                                {getAvailableJobs().map((job) => (
                                  <SelectItem key={job.id} value={job.id}>
                                    <div>
                                      <p className="font-medium">{job.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        ${job.totalValue.toLocaleString()} •{" "}
                                        {job.status}
                                      </p>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {selectedJob && (
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={loadJobItems}
                          >
                            Load Items
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Customer Details</span>
                    </CardTitle>
                    <CardDescription>
                      Selected customer information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedCustomer ? (
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-lg">
                            {selectedCustomer.name}
                          </p>
                          {selectedCustomer.taxExempt && (
                            <Badge variant="outline" className="mt-1">
                              Tax Exempt
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>{selectedCustomer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{selectedCustomer.phone}</span>
                          </div>
                          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5" />
                            <span>{selectedCustomer.address}</span>
                          </div>
                        </div>
                        {selectedJob && (
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="font-medium text-blue-900">
                              Related Job
                            </p>
                            <p className="text-sm text-blue-700">
                              {selectedJob.name}
                            </p>
                            <p className="text-xs text-blue-600">
                              Value: ${selectedJob.totalValue.toLocaleString()}{" "}
                              • Status: {selectedJob.status}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Building className="h-8 w-8 mx-auto mb-2" />
                        <p>Select a customer to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Dates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Invoice Dates</span>
                  </CardTitle>
                  <CardDescription>
                    Issue date and payment due date
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="issueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Issue Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Due Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < form.watch("issueDate")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        Payment Timeline
                      </span>
                    </div>
                    <div className="text-sm text-yellow-700">
                      <p>
                        Days until due:{" "}
                        {form.watch("issueDate") && form.watch("dueDate")
                          ? Math.ceil(
                              (form.watch("dueDate").getTime() -
                                form.watch("issueDate").getTime()) /
                                (1000 * 60 * 60 * 24),
                            )
                          : 0}{" "}
                        days
                      </p>
                      <p>Payment terms: {form.watch("terms") || "Net 30"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Form>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>Line Items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-muted-foreground">
                      Tax Rate: {taxRate}%
                    </div>
                    <Button onClick={addItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Add items, services, and materials to the invoice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <Card
                        key={field.id}
                        className="p-4 border-l-4 border-l-blue-500"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Item description"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quantity *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`items.${index}.unit`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Unit *</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="each">Each</SelectItem>
                                    <SelectItem value="hour">Hour</SelectItem>
                                    <SelectItem value="day">Day</SelectItem>
                                    <SelectItem value="sqft">Sq Ft</SelectItem>
                                    <SelectItem value="linear_ft">
                                      Linear Ft
                                    </SelectItem>
                                    <SelectItem value="lot">Lot</SelectItem>
                                    <SelectItem value="gallon">
                                      Gallon
                                    </SelectItem>
                                    <SelectItem value="pound">Pound</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`items.${index}.unitPrice`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Unit Price *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-end space-x-2">
                            <div className="flex-1">
                              <FormLabel>Total</FormLabel>
                              <div className="h-10 px-3 py-2 border rounded-md bg-muted flex items-center font-medium">
                                $
                                {(
                                  watchedItems[index]?.quantity *
                                    watchedItems[index]?.unitPrice || 0
                                ).toFixed(2)}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => duplicateItem(index)}
                                title="Duplicate item"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeItem(index)}
                                disabled={fields.length === 1}
                                title="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                          <FormField
                            control={form.control}
                            name={`items.${index}.category`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Category *</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Labor">Labor</SelectItem>
                                    <SelectItem value="Materials">
                                      Materials
                                    </SelectItem>
                                    <SelectItem value="Equipment">
                                      Equipment
                                    </SelectItem>
                                    <SelectItem value="Permits">
                                      Permits
                                    </SelectItem>
                                    <SelectItem value="Subcontractor">
                                      Subcontractor
                                    </SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`items.${index}.taxable`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-sm font-medium">
                                    Taxable
                                  </FormLabel>
                                  <FormDescription className="text-xs">
                                    Apply tax to this item
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.notes`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Notes (Optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Additional notes"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Invoice Totals */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5" />
                        <span>Invoice Totals</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Discount Amount</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormDescription>
                                  Fixed discount amount to subtract from total
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">
                              Tax Rate:
                            </label>
                            <Input
                              type="number"
                              step="0.1"
                              value={taxRate}
                              onChange={(e) =>
                                setTaxRate(parseFloat(e.target.value) || 0)
                              }
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">
                              %
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>${form.watch("subtotal").toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Tax ({taxRate}%):</span>
                            <span>${form.watch("tax").toFixed(2)}</span>
                          </div>
                          {form.watch("discount") > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Discount:</span>
                              <span>-${form.watch("discount").toFixed(2)}</span>
                            </div>
                          )}
                          <Separator />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>${form.watch("total").toFixed(2)}</span>
                          </div>
                          {selectedCustomer?.taxExempt && (
                            <div className="text-xs text-muted-foreground">
                              * Customer is tax exempt
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="space-y-6">
            <Form {...form}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Payment Terms</span>
                    </CardTitle>
                    <CardDescription>
                      Configure payment terms and conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentTerms.net"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Net Payment Days</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="15">Net 15</SelectItem>
                              <SelectItem value="30">Net 30</SelectItem>
                              <SelectItem value="45">Net 45</SelectItem>
                              <SelectItem value="60">Net 60</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Number of days customer has to pay
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="paymentTerms.lateFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Late Fee (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Monthly late fee percentage
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="paymentTerms.discountPercent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Early Pay Discount (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="paymentTerms.discountDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount Days</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Terms & Conditions</CardTitle>
                    <CardDescription>
                      Payment terms and additional notes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Terms *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter payment terms and conditions..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional notes or instructions..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Payment Summary
                      </h4>
                      <div className="space-y-1 text-sm text-blue-700">
                        <p>
                          Payment due: {form.watch("paymentTerms.net")} days
                          from invoice date
                        </p>
                        {form.watch("paymentTerms.discountPercent") > 0 && (
                          <p>
                            Early payment discount:{" "}
                            {form.watch("paymentTerms.discountPercent")}% if
                            paid within{" "}
                            {form.watch("paymentTerms.discountDays")} days
                          </p>
                        )}
                        {form.watch("paymentTerms.lateFee") > 0 && (
                          <p>
                            Late fee: {form.watch("paymentTerms.lateFee")}% per
                            month on overdue amounts
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Form>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Form {...form}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Payment Reminders</span>
                    </CardTitle>
                    <CardDescription>
                      Automated reminder settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="automation.sendReminders"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Send Payment Reminders
                            </FormLabel>
                            <FormDescription>
                              Automatically send reminder emails before due date
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("automation.sendReminders") && (
                      <div className="space-y-2">
                        <FormLabel>
                          Reminder Schedule (days before due date)
                        </FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {[1, 3, 7, 14, 30].map((days) => (
                            <FormField
                              key={days}
                              control={form.control}
                              name="automation.reminderDays"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(days)}
                                      onCheckedChange={(checked) => {
                                        const currentDays = field.value || [];
                                        if (checked) {
                                          field.onChange(
                                            [...currentDays, days].sort(
                                              (a, b) => b - a,
                                            ),
                                          );
                                        } else {
                                          field.onChange(
                                            currentDays.filter(
                                              (d) => d !== days,
                                            ),
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {days} day{days !== 1 ? "s" : ""}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="automation.autoLateFee"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Auto-Apply Late Fees
                            </FormLabel>
                            <FormDescription>
                              Automatically apply late fees to overdue invoices
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5" />
                      <span>Recurring Invoice</span>
                    </CardTitle>
                    <CardDescription>
                      Set up recurring billing for this invoice
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="automation.recurringInvoice"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable Recurring Billing
                            </FormLabel>
                            <FormDescription>
                              Automatically generate this invoice on a schedule
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("automation.recurringInvoice") && (
                      <FormField
                        control={form.control}
                        name="automation.recurringInterval"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Billing Frequency</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">
                                  Quarterly
                                </SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How often to generate this invoice
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          Automation Summary
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-green-700">
                        <p>
                          • Reminders:{" "}
                          {form.watch("automation.sendReminders")
                            ? "Enabled"
                            : "Disabled"}
                        </p>
                        {form.watch("automation.sendReminders") && (
                          <p>
                            • Reminder days:{" "}
                            {form.watch("automation.reminderDays")?.join(", ")}{" "}
                            days before due
                          </p>
                        )}
                        <p>
                          • Late fees:{" "}
                          {form.watch("automation.autoLateFee")
                            ? "Auto-applied"
                            : "Manual"}
                        </p>
                        <p>
                          • Recurring:{" "}
                          {form.watch("automation.recurringInvoice")
                            ? `${form.watch("automation.recurringInterval")} billing`
                            : "One-time invoice"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvoiceForm;
