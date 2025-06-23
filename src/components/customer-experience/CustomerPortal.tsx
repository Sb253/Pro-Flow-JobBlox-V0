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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  MapPin,
  Plus,
  Search,
  Bell,
  Settings,
  Home,
  Briefcase,
  FileText,
  Phone,
  Mail,
  Building,
  CheckCircle,
  AlertCircle,
  User,
  Download,
  Upload,
  MessageSquare,
  Star,
  Filter,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Target,
  TrendingUp,
  BarChart3,
  Shield,
  Globe,
  Zap,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: "planning" | "in-progress" | "completed" | "on-hold";
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  manager: string;
  description: string;
}

interface Document {
  id: string;
  name: string;
  type: "contract" | "blueprint" | "invoice" | "report" | "photo";
  size: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
}

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: "info" | "update" | "question" | "alert";
}

interface Invoice {
  id: string;
  number: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  description: string;
}

const CustomerPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      name: "Kitchen Renovation",
      status: "in-progress",
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      budget: 25000,
      spent: 16250,
      manager: "John Smith",
      description:
        "Complete kitchen renovation including cabinets, countertops, and appliances",
    },
    {
      id: "2",
      name: "Bathroom Remodel",
      status: "planning",
      progress: 15,
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      budget: 15000,
      spent: 2250,
      manager: "Sarah Johnson",
      description: "Master bathroom renovation with new fixtures and tiling",
    },
    {
      id: "3",
      name: "Deck Construction",
      status: "completed",
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2023-12-15",
      budget: 8000,
      spent: 7800,
      manager: "Mike Wilson",
      description: "New outdoor deck with composite materials and railings",
    },
  ];

  const documents: Document[] = [
    {
      id: "1",
      name: "Kitchen Contract.pdf",
      type: "contract",
      size: "2.4 MB",
      uploadDate: "2024-01-10",
      status: "approved",
    },
    {
      id: "2",
      name: "Kitchen Blueprint.dwg",
      type: "blueprint",
      size: "5.1 MB",
      uploadDate: "2024-01-12",
      status: "approved",
    },
    {
      id: "3",
      name: "Progress Photos.zip",
      type: "photo",
      size: "12.3 MB",
      uploadDate: "2024-02-01",
      status: "pending",
    },
    {
      id: "4",
      name: "Invoice #001.pdf",
      type: "invoice",
      size: "1.2 MB",
      uploadDate: "2024-01-20",
      status: "approved",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "John Smith",
      message:
        "Kitchen cabinets have been installed. Please review and approve the next phase.",
      timestamp: "2 hours ago",
      type: "update",
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      message: "Bathroom permits have been approved. We can start next week.",
      timestamp: "1 day ago",
      type: "info",
    },
    {
      id: "3",
      sender: "System",
      message: "New invoice #002 is ready for review.",
      timestamp: "2 days ago",
      type: "alert",
    },
  ];

  const invoices: Invoice[] = [
    {
      id: "1",
      number: "INV-001",
      amount: 12500,
      dueDate: "2024-02-15",
      status: "paid",
      description: "Kitchen renovation - Phase 1",
    },
    {
      id: "2",
      number: "INV-002",
      amount: 8750,
      dueDate: "2024-03-01",
      status: "pending",
      description: "Kitchen renovation - Phase 2",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return <Badge className="bg-blue-500">Planning</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "on-hold":
        return <Badge className="bg-red-500">On Hold</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "blueprint":
        return <Building className="h-5 w-5 text-purple-500" />;
      case "invoice":
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case "photo":
        return <Eye className="h-5 w-5 text-orange-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "update":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case "info":
        return <Bell className="h-4 w-4 text-green-500" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Customer Portal
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Welcome back, John Doe
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-slate-800">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex items-center space-x-2"
            >
              <Briefcase className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger
              value="invoices"
              className="flex items-center space-x-2"
            >
              <DollarSign className="h-4 w-4" />
              <span>Invoices</span>
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Messages</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {projects.length}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Active Projects
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500 text-white">
                      <Briefcase className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        $48,000
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Total Budget
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500 text-white">
                      <DollarSign className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {documents.length}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Documents
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500 text-white">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {messages.length}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        New Messages
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500 text-white">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {project.name}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700"
                        >
                          {getMessageIcon(message.type)}
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {message.sender}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {message.message}
                            </p>
                            <p className="text-xs text-slate-500">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white dark:bg-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-900 dark:text-white">
                          {project.name}
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Start Date
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {project.startDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          End Date
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {project.endDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Budget
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          ${project.budget.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Spent
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          ${project.spent.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Documents</CardTitle>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700"
                    >
                      <div className="flex items-center space-x-3">
                        {getDocumentIcon(document.type)}
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {document.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {document.size} • {document.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            document.status === "approved"
                              ? "bg-green-500"
                              : document.status === "rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }
                        >
                          {document.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Invoices & Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700"
                    >
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {invoice.number}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {invoice.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900 dark:text-white">
                          ${invoice.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Due: {invoice.dueDate}
                        </p>
                        <Badge
                          className={
                            invoice.status === "paid"
                              ? "bg-green-500"
                              : invoice.status === "overdue"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Communication Center</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className="flex items-start space-x-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-700"
                      >
                        {getMessageIcon(message.type)}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-slate-900 dark:text-white">
                              {message.sender}
                            </p>
                            <p className="text-xs text-slate-500">
                              {message.timestamp}
                            </p>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400">
                            {message.message}
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm">
                              Mark as Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerPortal;
