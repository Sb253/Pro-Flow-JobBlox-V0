import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  Calendar as CalendarIcon,
  Users,
  Package,
  MapPin,
  DollarSign,
  Clock,
  Plus,
  X,
  Save,
  FileText,
  Settings,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const jobFormSchema = z.object({
  name: z.string().min(2, "Job name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  customerId: z.string().min(1, "Customer is required"),
  type: z.string().min(1, "Job type is required"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  status: z.enum([
    "draft",
    "quoted",
    "approved",
    "scheduled",
    "in_progress",
    "on_hold",
    "completed",
    "cancelled",
  ]),
  startDate: z.date(),
  endDate: z.date(),
  estimatedHours: z.number().min(0, "Estimated hours must be positive"),
  budget: z.number().min(0, "Budget must be positive"),
  location: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  }),
  assignedTo: z
    .array(z.string())
    .min(1, "At least one team member must be assigned"),
  materials: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
        unitCost: z.number(),
        totalCost: z.number(),
      }),
    )
    .default([]),
  requirements: z.array(z.string()).default([]),
  customFields: z.record(z.any()).default({}),
});

type JobFormData = z.infer<typeof jobFormSchema>;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  hourlyRate: number;
  skills: string[];
  availability: "available" | "busy" | "unavailable";
}

interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  unitCost: number;
  inStock: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface JobFormProps {
  initialData?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);

  // Mock data - in real app, these would come from API
  const customers: Customer[] = [
    {
      id: "cust_001",
      name: "Johnson Family",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Oak Street, Springfield, IL 62701",
    },
    {
      id: "cust_002",
      name: "ABC Construction LLC",
      email: "contact@abcconstruction.com",
      phone: "+1 (555) 987-6543",
      address: "456 Business Park Drive, Chicago, IL 60601",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "emp_001",
      name: "John Smith",
      role: "Project Manager",
      hourlyRate: 75,
      skills: ["Project Management", "Construction", "Scheduling"],
      availability: "available",
    },
    {
      id: "emp_002",
      name: "Mike Johnson",
      role: "Lead Carpenter",
      hourlyRate: 45,
      skills: ["Carpentry", "Framing", "Finishing"],
      availability: "available",
    },
    {
      id: "emp_003",
      name: "Sarah Davis",
      role: "Electrician",
      hourlyRate: 55,
      skills: ["Electrical", "Wiring", "Safety"],
      availability: "busy",
    },
  ];

  const availableMaterials: Material[] = [
    {
      id: "mat_001",
      name: "2x4 Lumber",
      category: "Lumber",
      unit: "piece",
      unitCost: 8.5,
      inStock: 150,
    },
    {
      id: "mat_002",
      name: "Drywall Sheet",
      category: "Drywall",
      unit: "sheet",
      unitCost: 12.0,
      inStock: 75,
    },
    {
      id: "mat_003",
      name: "Paint Gallon",
      category: "Paint",
      unit: "gallon",
      unitCost: 35.0,
      inStock: 25,
    },
  ];

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      name: "",
      description: "",
      customerId: "",
      type: "",
      priority: "medium",
      status: "draft",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      estimatedHours: 0,
      budget: 0,
      location: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      assignedTo: [],
      materials: [],
      requirements: [],
      customFields: {},
      ...initialData,
    },
  });

  const watchedRequirements = form.watch("requirements");
  const watchedAssignedTo = form.watch("assignedTo");
  const watchedMaterials = form.watch("materials");

  const addRequirement = () => {
    if (
      currentRequirement.trim() &&
      !watchedRequirements.includes(currentRequirement.trim())
    ) {
      form.setValue("requirements", [
        ...watchedRequirements,
        currentRequirement.trim(),
      ]);
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (requirementToRemove: string) => {
    form.setValue(
      "requirements",
      watchedRequirements.filter((req) => req !== requirementToRemove),
    );
  };

  const toggleTeamMember = (memberId: string) => {
    const currentAssigned = watchedAssignedTo;
    if (currentAssigned.includes(memberId)) {
      form.setValue(
        "assignedTo",
        currentAssigned.filter((id) => id !== memberId),
      );
    } else {
      form.setValue("assignedTo", [...currentAssigned, memberId]);
    }
  };

  const addMaterial = (material: Material, quantity: number) => {
    const totalCost = material.unitCost * quantity;
    const newMaterial = {
      id: material.id,
      name: material.name,
      quantity,
      unit: material.unit,
      unitCost: material.unitCost,
      totalCost,
    };

    const currentMaterials = watchedMaterials;
    const existingIndex = currentMaterials.findIndex(
      (m) => m.id === material.id,
    );

    if (existingIndex >= 0) {
      const updatedMaterials = [...currentMaterials];
      updatedMaterials[existingIndex] = newMaterial;
      form.setValue("materials", updatedMaterials);
    } else {
      form.setValue("materials", [...currentMaterials, newMaterial]);
    }
  };

  const removeMaterial = (materialId: string) => {
    form.setValue(
      "materials",
      watchedMaterials.filter((m) => m.id !== materialId),
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: "bg-gray-500", label: "Low" },
      medium: { color: "bg-blue-500", label: "Medium" },
      high: { color: "bg-orange-500", label: "High" },
      urgent: { color: "bg-red-500", label: "Urgent" },
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getAvailabilityBadge = (availability: string) => {
    const availabilityConfig = {
      available: { color: "bg-green-500", label: "Available" },
      busy: { color: "bg-yellow-500", label: "Busy" },
      unavailable: { color: "bg-red-500", label: "Unavailable" },
    };
    const config =
      availabilityConfig[availability as keyof typeof availabilityConfig];
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const totalMaterialCost = watchedMaterials.reduce(
    (sum, material) => sum + material.totalCost,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {isEditing ? "Edit Job" : "New Job"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {isEditing
                ? "Update job details, scheduling, and team assignments"
                : "Create detailed job with scheduling, materials, and team assignment"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Job" : "Create Job"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="team">Team & Materials</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Form {...form}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Job Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5" />
                      <span>Job Information</span>
                    </CardTitle>
                    <CardDescription>
                      Basic details about the job
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter job name" {...field} />
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
                                  {customer.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="renovation">
                                  Renovation
                                </SelectItem>
                                <SelectItem value="new_construction">
                                  New Construction
                                </SelectItem>
                                <SelectItem value="repair">Repair</SelectItem>
                                <SelectItem value="maintenance">
                                  Maintenance
                                </SelectItem>
                                <SelectItem value="inspection">
                                  Inspection
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detailed description of the job..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Budget and Estimates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Budget & Estimates</span>
                    </CardTitle>
                    <CardDescription>
                      Financial planning for the job
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Total budget allocated for this job
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estimatedHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Hours *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Total estimated hours to complete the job
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Cost Breakdown
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Materials:</span>
                          <span>${totalMaterialCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Labor (Est.):</span>
                          <span>
                            ${(form.watch("estimatedHours") * 50).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-1">
                          <span>Total Estimate:</span>
                          <span>
                            $
                            {(
                              totalMaterialCost +
                              form.watch("estimatedHours") * 50
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Location Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Job Location</span>
                  </CardTitle>
                  <CardDescription>
                    Where the work will be performed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="location.street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address *</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main Street" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Springfield" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input placeholder="IL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code *</FormLabel>
                          <FormControl>
                            <Input placeholder="62701" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </Form>
          </TabsContent>

          <TabsContent value="scheduling" className="space-y-6">
            <Form {...form}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Job Scheduling</span>
                  </CardTitle>
                  <CardDescription>
                    Set start and end dates for the job
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date *</FormLabel>
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
                                  date <
                                  new Date(new Date().setHours(0, 0, 0, 0))
                                }
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
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date *</FormLabel>
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
                                  date < form.watch("startDate")
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

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        Schedule Summary
                      </span>
                    </div>
                    <div className="text-sm text-yellow-700">
                      <p>
                        Duration:{" "}
                        {form.watch("startDate") && form.watch("endDate")
                          ? Math.ceil(
                              (form.watch("endDate").getTime() -
                                form.watch("startDate").getTime()) /
                                (1000 * 60 * 60 * 24),
                            )
                          : 0}{" "}
                        days
                      </p>
                      <p>
                        Estimated Hours: {form.watch("estimatedHours")} hours
                      </p>
                      <p>
                        Daily Hours:{" "}
                        {form.watch("startDate") &&
                        form.watch("endDate") &&
                        form.watch("estimatedHours")
                          ? (
                              form.watch("estimatedHours") /
                              Math.ceil(
                                (form.watch("endDate").getTime() -
                                  form.watch("startDate").getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )
                            ).toFixed(1)
                          : 0}{" "}
                        hours/day
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Form>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Team Assignment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Team Assignment</span>
                  </CardTitle>
                  <CardDescription>
                    Select team members for this job
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={watchedAssignedTo.includes(member.id)}
                            onCheckedChange={() => toggleTeamMember(member.id)}
                          />
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.role} • ${member.hourlyRate}/hr
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {member.skills.slice(0, 2).map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>{getAvailabilityBadge(member.availability)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Materials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Materials</span>
                  </CardTitle>
                  <CardDescription>
                    Add materials needed for this job
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Selected Materials */}
                    {watchedMaterials.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Selected Materials</h4>
                        {watchedMaterials.map((material) => (
                          <div
                            key={material.id}
                            className="flex items-center justify-between p-2 bg-blue-50 rounded"
                          >
                            <div>
                              <p className="font-medium">{material.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {material.quantity} {material.unit} × $
                                {material.unitCost} = $
                                {material.totalCost.toFixed(2)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMaterial(material.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="text-right font-medium">
                          Total: ${totalMaterialCost.toFixed(2)}
                        </div>
                      </div>
                    )}

                    {/* Available Materials */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Available Materials</h4>
                      {availableMaterials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-2 border rounded"
                        >
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${material.unitCost}/{material.unit} •{" "}
                              {material.inStock} in stock
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              placeholder="Qty"
                              className="w-20"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  const quantity = parseInt(
                                    (e.target as HTMLInputElement).value,
                                  );
                                  if (quantity > 0) {
                                    addMaterial(material, quantity);
                                    (e.target as HTMLInputElement).value = "";
                                  }
                                }
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                const input = e.currentTarget
                                  .previousElementSibling as HTMLInputElement;
                                const quantity = parseInt(input.value);
                                if (quantity > 0) {
                                  addMaterial(material, quantity);
                                  input.value = "";
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Job Requirements</span>
                </CardTitle>
                <CardDescription>
                  Special requirements and notes for this job
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a requirement"
                    value={currentRequirement}
                    onChange={(e) => setCurrentRequirement(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addRequirement();
                      }
                    }}
                  />
                  <Button type="button" onClick={addRequirement}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {watchedRequirements.map((requirement, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span>{requirement}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRequirement(requirement)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {watchedRequirements.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                    <p>No requirements added yet</p>
                    <p className="text-sm">
                      Add specific requirements or notes for this job
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobForm;
