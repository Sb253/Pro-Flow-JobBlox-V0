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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  DollarSign,
  FileText,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Plus,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: "residential" | "commercial" | "industrial";
  status: "active" | "inactive" | "prospect" | "archived";
  createdDate: string;
  lastContact: string;
  totalProjects: number;
  totalRevenue: number;
  averageProjectValue: number;
  lifetimeValue: number;
  rating: number;
  notes: string;
  tags: string[];
  contactPerson?: string;
  companySize?: string;
  industry?: string;
  referralSource: string;
  avatar?: string;
}

interface Project {
  id: string;
  customerId: string;
  name: string;
  type: string;
  status: "planning" | "in-progress" | "completed" | "on-hold";
  startDate: string;
  endDate: string;
  value: number;
  description: string;
}

const CustomerManagement = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const customers: Customer[] = [
    {
      id: "cust_001",
      name: "Johnson Family",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Oak Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      type: "residential",
      status: "active",
      createdDate: "2023-01-15",
      lastContact: "2024-01-25",
      totalProjects: 3,
      totalRevenue: 45000,
      averageProjectValue: 15000,
      lifetimeValue: 52000,
      rating: 4.8,
      notes:
        "Excellent customer, always pays on time. Interested in future bathroom renovation.",
      tags: ["High Value", "Referral Source", "Repeat Customer"],
      referralSource: "Google Search",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Johnson",
    },
    {
      id: "cust_002",
      name: "ABC Construction LLC",
      email: "contact@abcconstruction.com",
      phone: "+1 (555) 987-6543",
      address: "456 Business Park Drive",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      type: "commercial",
      status: "active",
      createdDate: "2022-08-20",
      lastContact: "2024-01-20",
      totalProjects: 8,
      totalRevenue: 180000,
      averageProjectValue: 22500,
      lifetimeValue: 220000,
      rating: 4.5,
      notes:
        "Large commercial client. Requires detailed project management and regular updates.",
      tags: ["Commercial", "High Volume", "Contract Customer"],
      contactPerson: "Mike Thompson",
      companySize: "50-100 employees",
      industry: "Construction",
      referralSource: "Industry Network",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ABC",
    },
    {
      id: "cust_003",
      name: "Smith Residence",
      email: "john.smith@email.com",
      phone: "+1 (555) 456-7890",
      address: "789 Maple Avenue",
      city: "Peoria",
      state: "IL",
      zipCode: "61602",
      type: "residential",
      status: "prospect",
      createdDate: "2024-01-10",
      lastContact: "2024-01-28",
      totalProjects: 0,
      totalRevenue: 0,
      averageProjectValue: 0,
      lifetimeValue: 0,
      rating: 0,
      notes:
        "Interested in kitchen renovation. Waiting for final quote approval.",
      tags: ["New Lead", "Kitchen Renovation"],
      referralSource: "Facebook Ad",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith",
    },
    {
      id: "cust_004",
      name: "Industrial Solutions Inc",
      email: "projects@industrialsolutions.com",
      phone: "+1 (555) 321-0987",
      address: "321 Industrial Blvd",
      city: "Rockford",
      state: "IL",
      zipCode: "61101",
      type: "industrial",
      status: "active",
      createdDate: "2023-05-12",
      lastContact: "2024-01-15",
      totalProjects: 5,
      totalRevenue: 350000,
      averageProjectValue: 70000,
      lifetimeValue: 420000,
      rating: 4.9,
      notes:
        "Premium industrial client. Requires specialized equipment and certified workers.",
      tags: ["Industrial", "Premium", "Specialized"],
      contactPerson: "Jennifer Davis",
      companySize: "200+ employees",
      industry: "Manufacturing",
      referralSource: "Trade Show",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Industrial",
    },
  ];

  const projects: Project[] = [
    {
      id: "proj_001",
      customerId: "cust_001",
      name: "Kitchen Renovation",
      type: "Renovation",
      status: "completed",
      startDate: "2023-03-01",
      endDate: "2023-03-15",
      value: 18000,
      description:
        "Complete kitchen renovation including cabinets, countertops, and appliances.",
    },
    {
      id: "proj_002",
      customerId: "cust_002",
      name: "Office Building Renovation",
      type: "Commercial",
      status: "in-progress",
      startDate: "2024-01-15",
      endDate: "2024-03-30",
      value: 85000,
      description: "Complete office space renovation for 3rd floor.",
    },
  ];

  const customerStats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter((c) => c.status === "active").length,
    prospects: customers.filter((c) => c.status === "prospect").length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalRevenue, 0),
    averageLifetimeValue:
      customers.reduce((sum, c) => sum + c.lifetimeValue, 0) / customers.length,
    averageRating:
      customers
        .filter((c) => c.rating > 0)
        .reduce((sum, c) => sum + c.rating, 0) /
      customers.filter((c) => c.rating > 0).length,
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
      case "prospect":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Eye className="mr-1 h-3 w-3" />
            Prospect
          </Badge>
        );
      case "archived":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Archived
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      residential: { color: "bg-blue-500", label: "Residential" },
      commercial: { color: "bg-purple-500", label: "Commercial" },
      industrial: { color: "bg-orange-500", label: "Industrial" },
    };
    const config =
      typeConfig[type as keyof typeof typeConfig] || typeConfig.residential;
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    const matchesType = typeFilter === "all" || customer.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Customer Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage customer relationships and track project history
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>
        </div>

        {/* Customer Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {customerStats.totalCustomers}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Total Customers
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {customerStats.activeCustomers}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Active
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {customerStats.prospects}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Prospects
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${(customerStats.totalRevenue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Total Revenue
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <DollarSign className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${(customerStats.averageLifetimeValue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Avg LTV
                  </p>
                </div>
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                  <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {customerStats.averageRating.toFixed(1)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Avg Rating
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
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
          <div className="bg-white dark:bg-slate-800 rounded-xl p-2 shadow-lg border border-slate-200 dark:border-slate-700">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-700">
              <TabsTrigger
                value="customers"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
              >
                Customers
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="customers" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-t-xl">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  Customer Directory
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Manage customer information and relationships
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Filters */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                      />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-44 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-44 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Customers Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                        <TableHead className="font-semibold text-slate-900 dark:text-white">
                          Customer
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-white">
                          Type
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-white">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-white">
                          Projects
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-white">
                          Revenue
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-white">
                          Rating
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-white">
                          Last Contact
                        </TableHead>
                        <TableHead className="font-semibold text-slate-900 dark:text-white">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow
                          key={customer.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-600">
                                <AvatarImage src={customer.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                                  {customer.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                  {customer.name}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {customer.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getTypeBadge(customer.type)}</TableCell>
                          <TableCell>
                            {getStatusBadge(customer.status)}
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <p className="font-semibold text-lg text-slate-900 dark:text-white">
                                {customer.totalProjects}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                projects
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              ${customer.totalRevenue.toLocaleString()}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium text-slate-900 dark:text-white">
                                {customer.rating || "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-slate-700 dark:text-slate-300">
                              {new Date(
                                customer.lastContact,
                              ).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setIsViewDialogOpen(true);
                                }}
                                className="hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setIsEditDialogOpen(true);
                                }}
                                className="hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-t-xl">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  Customer Projects
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Track projects and their relationship to customers
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => {
                      const customer = customers.find(
                        (c) => c.id === project.customerId,
                      );
                      return (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{project.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {project.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{customer?.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{project.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                project.status === "completed"
                                  ? "bg-green-500 text-white"
                                  : project.status === "in-progress"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-500 text-white"
                              }
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            ${project.value.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>
                                {new Date(
                                  project.startDate,
                                ).toLocaleDateString()}
                              </div>
                              <div className="text-muted-foreground">
                                to{" "}
                                {new Date(project.endDate).toLocaleDateString()}
                              </div>
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
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-t-xl">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  Customer Analytics
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Insights and trends from your customer data
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-16">
                  <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <FileText className="h-10 w-10 text-slate-500 dark:text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Customer analytics dashboard with insights, trends, and
                    performance metrics would be implemented here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Customer Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedCustomer?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedCustomer && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedCustomer.avatar} />
                        <AvatarFallback>
                          {selectedCustomer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {selectedCustomer.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusBadge(selectedCustomer.status)}
                          {getTypeBadge(selectedCustomer.type)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {selectedCustomer.address}, {selectedCustomer.city},{" "}
                            {selectedCustomer.state} {selectedCustomer.zipCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedCustomer.totalProjects}
                        </p>
                        <p className="text-sm text-blue-600">Total Projects</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          ${selectedCustomer.totalRevenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-600">Total Revenue</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Business Details</h4>
                      <div className="space-y-2 text-sm">
                        {selectedCustomer.contactPerson && (
                          <div>
                            <span className="font-medium">
                              Contact Person:{" "}
                            </span>
                            {selectedCustomer.contactPerson}
                          </div>
                        )}
                        {selectedCustomer.industry && (
                          <div>
                            <span className="font-medium">Industry: </span>
                            {selectedCustomer.industry}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Referral Source: </span>
                          {selectedCustomer.referralSource}
                        </div>
                        <div>
                          <span className="font-medium">Customer Since: </span>
                          {new Date(
                            selectedCustomer.createdDate,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCustomer.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {selectedCustomer.notes}
                    </p>
                  </div>
                )}

                {selectedCustomer.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
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
                Edit Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerManagement;
