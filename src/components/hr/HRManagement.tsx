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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  DollarSign,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  FileText,
  Download,
  Upload,
  Navigation,
  MapIcon,
  Route,
  Timer,
  Building2,
  CreditCard,
  Target,
  BarChart3,
  Settings,
  Shield,
  Truck,
  Wrench,
  HardHat,
  Calculator,
  PieChart,
  Activity,
  Zap,
  Globe,
  Wifi,
  Smartphone,
  UserCheck,
  ClipboardList,
  BookOpen,
  Gauge,
  TrendingDown,
} from "lucide-react";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  role:
    | "owner"
    | "admin"
    | "manager"
    | "field_worker"
    | "sales_rep"
    | "subcontractor";
  status: "active" | "inactive" | "on_leave" | "terminated";
  hireDate: string;
  salary: number;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  skills: string[];
  certifications: string[];
  performanceRating: number;
  avatar?: string;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "vacation" | "sick" | "personal" | "maternity" | "paternity";
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
  reason: string;
  submittedDate: string;
}

interface Subcontractor {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  status: "active" | "inactive" | "pending";
  contractType: "hourly" | "project" | "retainer";
  hourlyRate?: number;
  address: string;
  licenseNumber?: string;
  insuranceExpiry: string;
  totalProjects: number;
  totalPaid: number;
  lastPayment: string;
  paymentTerms: string;
  documents: string[];
}

interface LocationTracking {
  employeeId: string;
  employeeName: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  lastUpdate: string;
  status: "on_site" | "traveling" | "break" | "offline";
  assignedSite?: string;
  hoursToday: number;
  distanceTraveled: number;
  geofenceStatus: "inside" | "outside" | "unknown";
}

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriod: string;
  regularHours: number;
  overtimeHours: number;
  regularRate: number;
  overtimeRate: number;
  grossPay: number;
  deductions: {
    taxes: number;
    insurance: number;
    retirement: number;
    other: number;
  };
  netPay: number;
  status: "draft" | "processed" | "paid";
  payDate: string;
}

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewPeriod: string;
  reviewer: string;
  overallRating: number;
  categories: {
    technical: number;
    communication: number;
    teamwork: number;
    leadership: number;
    punctuality: number;
  };
  goals: string[];
  achievements: string[];
  areasForImprovement: string[];
  comments: string;
  status: "draft" | "completed" | "acknowledged";
  reviewDate: string;
}

const HRManagement = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [selectedSubcontractor, setSelectedSubcontractor] =
    useState<Subcontractor | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubcontractorDialogOpen, setIsSubcontractorDialogOpen] =
    useState(false);
  const [isPayrollDialogOpen, setIsPayrollDialogOpen] = useState(false);
  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false);

  const employees: Employee[] = [
    {
      id: "emp_001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      position: "Project Manager",
      department: "Operations",
      role: "manager",
      status: "active",
      hireDate: "2023-01-15",
      salary: 75000,
      address: "123 Main St, New York, NY 10001",
      emergencyContact: {
        name: "Jane Smith",
        phone: "+1 (555) 987-6543",
        relationship: "Spouse",
      },
      skills: ["Project Management", "Leadership", "Construction"],
      certifications: ["PMP", "OSHA 30"],
      performanceRating: 4.5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "emp_002",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 234-5678",
      position: "Site Supervisor",
      department: "Operations",
      role: "field_worker",
      status: "active",
      hireDate: "2022-08-20",
      salary: 55000,
      address: "456 Oak Ave, Brooklyn, NY 11201",
      emergencyContact: {
        name: "Mike Johnson",
        phone: "+1 (555) 876-5432",
        relationship: "Brother",
      },
      skills: ["Site Management", "Safety", "Quality Control"],
      certifications: ["OSHA 10", "First Aid"],
      performanceRating: 4.2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "emp_003",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@company.com",
      phone: "+1 (555) 345-6789",
      position: "Sales Representative",
      department: "Sales",
      role: "sales_rep",
      status: "active",
      hireDate: "2023-03-10",
      salary: 50000,
      address: "789 Pine St, Queens, NY 11375",
      emergencyContact: {
        name: "Lisa Brown",
        phone: "+1 (555) 765-4321",
        relationship: "Wife",
      },
      skills: ["Sales", "Customer Relations", "Negotiation"],
      certifications: ["Sales Certification"],
      performanceRating: 4.0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      id: "emp_004",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@company.com",
      phone: "+1 (555) 456-7890",
      position: "HR Coordinator",
      department: "Human Resources",
      role: "admin",
      status: "on_leave",
      hireDate: "2022-11-05",
      salary: 48000,
      address: "321 Elm St, Manhattan, NY 10002",
      emergencyContact: {
        name: "Robert Davis",
        phone: "+1 (555) 654-3210",
        relationship: "Father",
      },
      skills: ["HR Management", "Recruitment", "Employee Relations"],
      certifications: ["SHRM-CP", "PHR"],
      performanceRating: 4.3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  ];

  const subcontractors: Subcontractor[] = [
    {
      id: "sub_001",
      companyName: "Elite Electrical Services",
      contactPerson: "David Wilson",
      email: "david@eliteelectrical.com",
      phone: "+1 (555) 111-2222",
      specialties: ["Electrical", "Solar Installation", "Smart Home"],
      rating: 4.8,
      status: "active",
      contractType: "hourly",
      hourlyRate: 85,
      address: "789 Industrial Blvd, Brooklyn, NY 11232",
      licenseNumber: "EL-2023-4567",
      insuranceExpiry: "2024-12-31",
      totalProjects: 24,
      totalPaid: 125000,
      lastPayment: "2024-01-15",
      paymentTerms: "Net 30",
      documents: ["License", "Insurance", "W9", "Contract"],
    },
    {
      id: "sub_002",
      companyName: "Premier Plumbing Co",
      contactPerson: "Maria Rodriguez",
      email: "maria@premierplumbing.com",
      phone: "+1 (555) 333-4444",
      specialties: ["Plumbing", "HVAC", "Water Heaters"],
      rating: 4.6,
      status: "active",
      contractType: "project",
      address: "456 Service Ave, Queens, NY 11375",
      licenseNumber: "PL-2023-8901",
      insuranceExpiry: "2024-10-15",
      totalProjects: 18,
      totalPaid: 89000,
      lastPayment: "2024-01-20",
      paymentTerms: "Net 15",
      documents: ["License", "Insurance", "W9"],
    },
    {
      id: "sub_003",
      companyName: "Roofing Masters LLC",
      contactPerson: "James Thompson",
      email: "james@roofingmasters.com",
      phone: "+1 (555) 555-6666",
      specialties: ["Roofing", "Gutters", "Siding"],
      rating: 4.4,
      status: "pending",
      contractType: "project",
      address: "123 Construction Way, Bronx, NY 10451",
      licenseNumber: "RF-2023-1234",
      insuranceExpiry: "2024-08-30",
      totalProjects: 12,
      totalPaid: 67000,
      lastPayment: "2024-01-10",
      paymentTerms: "Net 30",
      documents: ["License", "Insurance"],
    },
  ];

  const locationData: LocationTracking[] = [
    {
      employeeId: "emp_001",
      employeeName: "John Smith",
      currentLocation: {
        lat: 40.7128,
        lng: -74.006,
        address: "Downtown Construction Site, NYC",
      },
      lastUpdate: "2024-02-01T14:30:00Z",
      status: "on_site",
      assignedSite: "Project Alpha - 123 Main St",
      hoursToday: 6.5,
      distanceTraveled: 12.3,
      geofenceStatus: "inside",
    },
    {
      employeeId: "emp_002",
      employeeName: "Sarah Johnson",
      currentLocation: {
        lat: 40.6782,
        lng: -73.9442,
        address: "Brooklyn Heights Project Site",
      },
      lastUpdate: "2024-02-01T14:25:00Z",
      status: "on_site",
      assignedSite: "Project Beta - 456 Oak Ave",
      hoursToday: 7.0,
      distanceTraveled: 8.7,
      geofenceStatus: "inside",
    },
    {
      employeeId: "emp_003",
      employeeName: "Michael Brown",
      currentLocation: {
        lat: 40.7589,
        lng: -73.9851,
        address: "Client Meeting - Midtown Office",
      },
      lastUpdate: "2024-02-01T14:20:00Z",
      status: "traveling",
      assignedSite: "Sales Visit - 789 Pine St",
      hoursToday: 5.5,
      distanceTraveled: 15.2,
      geofenceStatus: "outside",
    },
  ];

  const payrollRecords: PayrollRecord[] = [
    {
      id: "pay_001",
      employeeId: "emp_001",
      employeeName: "John Smith",
      payPeriod: "2024-01-16 to 2024-01-31",
      regularHours: 80,
      overtimeHours: 8,
      regularRate: 36.06,
      overtimeRate: 54.09,
      grossPay: 3317.52,
      deductions: {
        taxes: 829.38,
        insurance: 150.0,
        retirement: 165.88,
        other: 50.0,
      },
      netPay: 2122.26,
      status: "paid",
      payDate: "2024-02-01",
    },
    {
      id: "pay_002",
      employeeId: "emp_002",
      employeeName: "Sarah Johnson",
      payPeriod: "2024-01-16 to 2024-01-31",
      regularHours: 80,
      overtimeHours: 4,
      regularRate: 26.44,
      overtimeRate: 39.66,
      grossPay: 2273.84,
      deductions: {
        taxes: 568.46,
        insurance: 125.0,
        retirement: 113.69,
        other: 25.0,
      },
      netPay: 1441.69,
      status: "processed",
      payDate: "2024-02-01",
    },
  ];

  const performanceReviews: PerformanceReview[] = [
    {
      id: "perf_001",
      employeeId: "emp_001",
      employeeName: "John Smith",
      reviewPeriod: "Q4 2023",
      reviewer: "Management Team",
      overallRating: 4.5,
      categories: {
        technical: 4.5,
        communication: 4.8,
        teamwork: 4.3,
        leadership: 4.7,
        punctuality: 4.2,
      },
      goals: [
        "Complete PMP certification",
        "Lead 3 major projects",
        "Mentor junior staff",
      ],
      achievements: [
        "Successfully delivered Project Alpha on time",
        "Improved team efficiency by 15%",
        "Completed safety training certification",
      ],
      areasForImprovement: [
        "Time management during peak periods",
        "Documentation consistency",
      ],
      comments:
        "Excellent performance overall. Strong leadership skills and technical expertise.",
      status: "completed",
      reviewDate: "2024-01-15",
    },
  ];

  const leaveRequests: LeaveRequest[] = [
    {
      id: "leave_001",
      employeeId: "emp_002",
      employeeName: "Sarah Johnson",
      type: "vacation",
      startDate: "2024-02-15",
      endDate: "2024-02-20",
      days: 5,
      status: "pending",
      reason: "Family vacation",
      submittedDate: "2024-01-30",
    },
    {
      id: "leave_002",
      employeeId: "emp_003",
      employeeName: "Michael Brown",
      type: "sick",
      startDate: "2024-02-01",
      endDate: "2024-02-03",
      days: 3,
      status: "approved",
      reason: "Medical appointment and recovery",
      submittedDate: "2024-01-28",
    },
    {
      id: "leave_003",
      employeeId: "emp_004",
      employeeName: "Emily Davis",
      type: "maternity",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      days: 90,
      status: "approved",
      reason: "Maternity leave",
      submittedDate: "2023-12-15",
    },
  ];

  const hrStats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter((e) => e.status === "active").length,
    onLeave: employees.filter((e) => e.status === "on_leave").length,
    pendingLeaveRequests: leaveRequests.filter((r) => r.status === "pending")
      .length,
    avgSalary:
      employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length,
    avgPerformance:
      employees.reduce((sum, emp) => sum + emp.performanceRating, 0) /
      employees.length,
    totalSubcontractors: subcontractors.length,
    activeSubcontractors: subcontractors.filter((s) => s.status === "active")
      .length,
    totalSubcontractorSpend: subcontractors.reduce(
      (sum, sub) => sum + sub.totalPaid,
      0,
    ),
    employeesOnSite: locationData.filter((l) => l.status === "on_site").length,
    avgHoursToday:
      locationData.reduce((sum, l) => sum + l.hoursToday, 0) /
      locationData.length,
    pendingPayroll: payrollRecords.filter((p) => p.status === "draft").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Clock className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        );
      case "on_leave":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Calendar className="mr-1 h-3 w-3" />
            On Leave
          </Badge>
        );
      case "terminated":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Terminated
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getLeaveStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      owner: "bg-purple-100 text-purple-800",
      admin: "bg-blue-100 text-blue-800",
      manager: "bg-green-100 text-green-800",
      field_worker: "bg-orange-100 text-orange-800",
      sales_rep: "bg-pink-100 text-pink-800",
      subcontractor: "bg-gray-100 text-gray-800",
    };
    return (
      <Badge
        className={
          roleColors[role as keyof typeof roleColors] ||
          "bg-gray-100 text-gray-800"
        }
      >
        {role.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </Badge>
    );
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || employee.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Human Resources Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage employees, leave requests, and HR operations
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* HR Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{hrStats.totalEmployees}</p>
                  <p className="text-sm text-muted-foreground">
                    Total Employees
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {hrStats.activeEmployees}
                  </p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {hrStats.totalSubcontractors}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Subcontractors
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {hrStats.employeesOnSite}
                  </p>
                  <p className="text-sm text-muted-foreground">On Site</p>
                </div>
                <MapPin className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    ${Math.round(hrStats.totalSubcontractorSpend / 1000)}K
                  </p>
                  <p className="text-sm text-muted-foreground">Sub Spend</p>
                </div>
                <CreditCard className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {hrStats.avgHoursToday.toFixed(1)}h
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Hours</p>
                </div>
                <Clock className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{hrStats.pendingPayroll}</p>
                  <p className="text-sm text-muted-foreground">Pending Pay</p>
                </div>
                <Calculator className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {hrStats.avgPerformance.toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
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
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="subcontractors">Subcontractors</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="leave">Leave</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>
                  Manage employee information, roles, and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Human Resources">HR</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Employees Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Hire Date</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>
                                {employee.firstName.charAt(0)}
                                {employee.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {employee.firstName} {employee.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {employee.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{getRoleBadge(employee.role)}</TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell>
                          {new Date(employee.hireDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{employee.performanceRating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="subcontractors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subcontractor Management</CardTitle>
                <CardDescription>
                  Manage vendor relationships, contracts, and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search subcontractors..."
                        className="pl-10 w-80"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <Building2 className="mr-2 h-4 w-4" />
                    Add Subcontractor
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Specialties</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Paid</TableHead>
                      <TableHead>Last Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subcontractors.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{sub.companyName}</p>
                            <p className="text-sm text-muted-foreground">
                              {sub.licenseNumber}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{sub.contactPerson}</p>
                            <p className="text-sm text-muted-foreground">
                              {sub.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {sub.specialties
                              .slice(0, 2)
                              .map((specialty, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {specialty}
                                </Badge>
                              ))}
                            {sub.specialties.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{sub.specialties.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{sub.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              sub.status === "active"
                                ? "bg-green-100 text-green-800"
                                : sub.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {sub.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${sub.totalPaid.toLocaleString()}</TableCell>
                        <TableCell>
                          {new Date(sub.lastPayment).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedSubcontractor(sub);
                                setIsSubcontractorDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <CreditCard className="h-4 w-4" />
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

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Location Tracking</CardTitle>
                <CardDescription>
                  Real-time GPS tracking, geofencing, and route optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Live Locations</h3>
                    <div className="space-y-3">
                      {locationData.map((location) => (
                        <Card key={location.employeeId}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                      {location.employeeName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div
                                    className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                                      location.status === "on_site"
                                        ? "bg-green-500"
                                        : location.status === "traveling"
                                          ? "bg-blue-500"
                                          : location.status === "break"
                                            ? "bg-yellow-500"
                                            : "bg-gray-500"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {location.employeeName}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {location.currentLocation.address}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge
                                  className={
                                    location.geofenceStatus === "inside"
                                      ? "bg-green-100 text-green-800"
                                      : location.geofenceStatus === "outside"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                  }
                                >
                                  {location.geofenceStatus === "inside"
                                    ? "In Zone"
                                    : location.geofenceStatus === "outside"
                                      ? "Out Zone"
                                      : "Unknown"}
                                </Badge>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {location.hoursToday}h today
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                              <span>
                                Distance: {location.distanceTraveled} miles
                              </span>
                              <span>
                                Updated:{" "}
                                {new Date(
                                  location.lastUpdate,
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Location Analytics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold">85%</p>
                              <p className="text-sm text-muted-foreground">
                                On-Site Time
                              </p>
                            </div>
                            <Target className="h-8 w-8 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold">12.1</p>
                              <p className="text-sm text-muted-foreground">
                                Avg Miles
                              </p>
                            </div>
                            <Route className="h-8 w-8 text-blue-500" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold">6.3h</p>
                              <p className="text-sm text-muted-foreground">
                                Avg Hours
                              </p>
                            </div>
                            <Timer className="h-8 w-8 text-purple-500" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold">98%</p>
                              <p className="text-sm text-muted-foreground">
                                Geofence
                              </p>
                            </div>
                            <Shield className="h-8 w-8 text-orange-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Route Optimization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Fuel Savings</span>
                            <span className="text-sm font-medium text-green-600">
                              $234/week
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Time Savings</span>
                            <span className="text-sm font-medium text-blue-600">
                              2.3h/day
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Efficiency Score</span>
                            <span className="text-sm font-medium text-purple-600">
                              92%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Management</CardTitle>
                <CardDescription>
                  Process payroll, manage deductions, and track payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Pay Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Period</SelectItem>
                        <SelectItem value="previous">
                          Previous Period
                        </SelectItem>
                        <SelectItem value="all">All Periods</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="processed">Processed</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button>
                      <Calculator className="mr-2 h-4 w-4" />
                      Process Payroll
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Pay Period</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Gross Pay</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <p className="font-medium">{record.employeeName}</p>
                        </TableCell>
                        <TableCell>{record.payPeriod}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Regular: {record.regularHours}h</div>
                            <div className="text-muted-foreground">
                              OT: {record.overtimeHours}h
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          ${record.grossPay.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Taxes: ${record.deductions.taxes}</div>
                            <div className="text-muted-foreground">
                              Other: $
                              {record.deductions.insurance +
                                record.deductions.retirement +
                                record.deductions.other}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${record.netPay.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              record.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : record.status === "processed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {record.status}
                          </Badge>
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

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Management</CardTitle>
                <CardDescription>
                  Track employee performance, reviews, and development goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Review Period</TableHead>
                          <TableHead>Overall Rating</TableHead>
                          <TableHead>Reviewer</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {performanceReviews.map((review) => (
                          <TableRow key={review.id}>
                            <TableCell>
                              <p className="font-medium">
                                {review.employeeName}
                              </p>
                            </TableCell>
                            <TableCell>{review.reviewPeriod}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="font-medium">
                                  {review.overallRating}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{review.reviewer}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  review.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : review.status === "acknowledged"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {review.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
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
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Performance Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Avg Rating</span>
                            <span className="text-sm font-medium">4.2/5.0</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Reviews Due</span>
                            <span className="text-sm font-medium text-orange-600">
                              3
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Top Performers</span>
                            <span className="text-sm font-medium text-green-600">
                              8
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Improvement Plans</span>
                            <span className="text-sm font-medium text-blue-600">
                              2
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Skills Development
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Certifications</span>
                            <span className="text-sm font-medium">
                              12 active
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Training Hours</span>
                            <span className="text-sm font-medium">
                              156h YTD
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Skill Gaps</span>
                            <span className="text-sm font-medium text-red-600">
                              4 identified
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leave" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests</CardTitle>
                <CardDescription>
                  Manage employee leave requests and approvals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <p className="font-medium">{request.employeeName}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {request.type
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              {new Date(request.startDate).toLocaleDateString()}
                            </div>
                            <div className="text-muted-foreground">
                              to{" "}
                              {new Date(request.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{request.days} days</TableCell>
                        <TableCell>
                          {getLeaveStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(request.submittedDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {request.status === "pending" && (
                              <>
                                <Button variant="ghost" size="sm">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <AlertCircle className="h-4 w-4 text-red-600" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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

          <TabsContent value="scheduling" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Scheduling</CardTitle>
                <CardDescription>
                  Manage work schedules, shifts, and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          Weekly Schedule
                        </h3>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Previous Week
                          </Button>
                          <Button variant="outline" size="sm">
                            Next Week
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-8 gap-2 text-sm">
                        <div className="font-medium p-2">Employee</div>
                        <div className="font-medium p-2 text-center">Mon</div>
                        <div className="font-medium p-2 text-center">Tue</div>
                        <div className="font-medium p-2 text-center">Wed</div>
                        <div className="font-medium p-2 text-center">Thu</div>
                        <div className="font-medium p-2 text-center">Fri</div>
                        <div className="font-medium p-2 text-center">Sat</div>
                        <div className="font-medium p-2 text-center">Sun</div>

                        {employees.slice(0, 4).map((employee) => (
                          <React.Fragment key={employee.id}>
                            <div className="p-2 font-medium">
                              {employee.firstName} {employee.lastName}
                            </div>
                            {[...Array(7)].map((_, dayIndex) => (
                              <div
                                key={dayIndex}
                                className="p-2 text-center border rounded"
                              >
                                <div className="text-xs text-green-600">
                                  8:00-17:00
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Site A
                                </div>
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Schedule Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Total Hours</span>
                            <span className="text-sm font-medium">320h</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Overtime</span>
                            <span className="text-sm font-medium text-orange-600">
                              24h
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Coverage</span>
                            <span className="text-sm font-medium text-green-600">
                              98%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Conflicts</span>
                            <span className="text-sm font-medium text-red-600">
                              2
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Create Shift
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Assign Team
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Time Off Request
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                          >
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Resolve Conflicts
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>HR Reports</CardTitle>
                <CardDescription>
                  Generate and view HR analytics and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    HR reports interface would be implemented here
                  </p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Subcontractor Details Dialog */}
        <Dialog
          open={isSubcontractorDialogOpen}
          onOpenChange={setIsSubcontractorDialogOpen}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Subcontractor Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedSubcontractor?.companyName}
              </DialogDescription>
            </DialogHeader>
            {selectedSubcontractor && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {selectedSubcontractor.companyName}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedSubcontractor.contactPerson}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          className={
                            selectedSubcontractor.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {selectedSubcontractor.status}
                        </Badge>
                        <Badge variant="outline">
                          {selectedSubcontractor.contractType}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{selectedSubcontractor.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{selectedSubcontractor.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedSubcontractor.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubcontractor.specialties.map(
                          (specialty, index) => (
                            <Badge key={index} variant="outline">
                              {specialty}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Business Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>License Number:</span>
                          <span className="font-medium">
                            {selectedSubcontractor.licenseNumber}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Insurance Expiry:</span>
                          <span className="font-medium">
                            {new Date(
                              selectedSubcontractor.insuranceExpiry,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">
                              {selectedSubcontractor.rating}
                            </span>
                          </div>
                        </div>
                        {selectedSubcontractor.hourlyRate && (
                          <div className="flex items-center justify-between">
                            <span>Hourly Rate:</span>
                            <span className="font-medium">
                              ${selectedSubcontractor.hourlyRate}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Financial Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Total Projects:</span>
                          <span className="font-medium">
                            {selectedSubcontractor.totalProjects}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Total Paid:</span>
                          <span className="font-medium">
                            ${selectedSubcontractor.totalPaid.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Last Payment:</span>
                          <span className="font-medium">
                            {new Date(
                              selectedSubcontractor.lastPayment,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Payment Terms:</span>
                          <span className="font-medium">
                            {selectedSubcontractor.paymentTerms}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Documents</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubcontractor.documents.map((doc, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-100 text-blue-800"
                          >
                            <FileText className="mr-1 h-3 w-3" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsSubcontractorDialogOpen(false)}
              >
                Close
              </Button>
              <Button>Edit Subcontractor</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Employee Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Employee Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedEmployee?.firstName}{" "}
                {selectedEmployee?.lastName}
              </DialogDescription>
            </DialogHeader>
            {selectedEmployee && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedEmployee.avatar} />
                        <AvatarFallback>
                          {selectedEmployee.firstName.charAt(0)}
                          {selectedEmployee.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {selectedEmployee.firstName}{" "}
                          {selectedEmployee.lastName}
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedEmployee.position}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusBadge(selectedEmployee.status)}
                          {getRoleBadge(selectedEmployee.role)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{selectedEmployee.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{selectedEmployee.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedEmployee.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Emergency Contact</h4>
                      <div className="space-y-2 text-sm">
                        <div>{selectedEmployee.emergencyContact.name}</div>
                        <div>{selectedEmployee.emergencyContact.phone}</div>
                        <div className="text-muted-foreground">
                          {selectedEmployee.emergencyContact.relationship}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Employment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{selectedEmployee.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Hired:{" "}
                            {new Date(
                              selectedEmployee.hireDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            ${selectedEmployee.salary.toLocaleString()}/year
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4" />
                          <span>
                            Rating: {selectedEmployee.performanceRating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-100 text-blue-800"
                          >
                            <GraduationCap className="mr-1 h-3 w-3" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
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
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  setIsEditDialogOpen(true);
                }}
              >
                Edit Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HRManagement;
