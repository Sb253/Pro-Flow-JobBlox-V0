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
import { Progress } from "@/components/ui/progress";
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
  UserPlus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  Building,
  Calendar,
  Users,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Send,
  Eye,
  Edit,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

interface OnboardingTenant {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: "pending" | "in_progress" | "completed" | "stalled";
  progress: number;
  currentStep: string;
  startDate: string;
  completionDate?: string;
  assignedTo: string;
  plan: "starter" | "professional" | "enterprise";
  steps: OnboardingStep[];
}

const AccountSetupOnboarding = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState<OnboardingTenant | null>(
    null,
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  const onboardingTenants: OnboardingTenant[] = [
    {
      id: "onb_001",
      companyName: "Future Builders Inc.",
      contactName: "Alex Thompson",
      email: "alex@futurebuilders.com",
      phone: "+1 (555) 111-2222",
      status: "in_progress",
      progress: 65,
      currentStep: "Team Setup",
      startDate: "2024-01-28",
      assignedTo: "Sarah Johnson",
      plan: "professional",
      steps: [
        {
          id: "step_1",
          title: "Account Creation",
          description: "Create tenant account and initial setup",
          completed: true,
          required: true,
        },
        {
          id: "step_2",
          title: "Company Profile",
          description: "Complete company information and branding",
          completed: true,
          required: true,
        },
        {
          id: "step_3",
          title: "Team Setup",
          description: "Add team members and assign roles",
          completed: false,
          required: true,
        },
        {
          id: "step_4",
          title: "Project Configuration",
          description: "Set up project templates and workflows",
          completed: false,
          required: true,
        },
        {
          id: "step_5",
          title: "Integration Setup",
          description: "Connect third-party tools and services",
          completed: false,
          required: false,
        },
        {
          id: "step_6",
          title: "Training & Go-Live",
          description: "Complete training and launch platform",
          completed: false,
          required: true,
        },
      ],
    },
    {
      id: "onb_002",
      companyName: "Green Valley Construction",
      contactName: "Maria Rodriguez",
      email: "maria@greenvalley.com",
      phone: "+1 (555) 333-4444",
      status: "pending",
      progress: 0,
      currentStep: "Account Creation",
      startDate: "2024-01-30",
      assignedTo: "Mike Wilson",
      plan: "enterprise",
      steps: [
        {
          id: "step_1",
          title: "Account Creation",
          description: "Create tenant account and initial setup",
          completed: false,
          required: true,
        },
        {
          id: "step_2",
          title: "Company Profile",
          description: "Complete company information and branding",
          completed: false,
          required: true,
        },
        {
          id: "step_3",
          title: "Team Setup",
          description: "Add team members and assign roles",
          completed: false,
          required: true,
        },
        {
          id: "step_4",
          title: "Project Configuration",
          description: "Set up project templates and workflows",
          completed: false,
          required: true,
        },
        {
          id: "step_5",
          title: "Integration Setup",
          description: "Connect third-party tools and services",
          completed: false,
          required: false,
        },
        {
          id: "step_6",
          title: "Training & Go-Live",
          description: "Complete training and launch platform",
          completed: false,
          required: true,
        },
      ],
    },
    {
      id: "onb_003",
      companyName: "Precision Contractors",
      contactName: "David Lee",
      email: "david@precision.com",
      phone: "+1 (555) 555-6666",
      status: "completed",
      progress: 100,
      currentStep: "Completed",
      startDate: "2024-01-15",
      completionDate: "2024-01-25",
      assignedTo: "Lisa Davis",
      plan: "professional",
      steps: [
        {
          id: "step_1",
          title: "Account Creation",
          description: "Create tenant account and initial setup",
          completed: true,
          required: true,
        },
        {
          id: "step_2",
          title: "Company Profile",
          description: "Complete company information and branding",
          completed: true,
          required: true,
        },
        {
          id: "step_3",
          title: "Team Setup",
          description: "Add team members and assign roles",
          completed: true,
          required: true,
        },
        {
          id: "step_4",
          title: "Project Configuration",
          description: "Set up project templates and workflows",
          completed: true,
          required: true,
        },
        {
          id: "step_5",
          title: "Integration Setup",
          description: "Connect third-party tools and services",
          completed: true,
          required: false,
        },
        {
          id: "step_6",
          title: "Training & Go-Live",
          description: "Complete training and launch platform",
          completed: true,
          required: true,
        },
      ],
    },
    {
      id: "onb_004",
      companyName: "Urban Development Co.",
      contactName: "Jennifer White",
      email: "jennifer@urbandevelopment.com",
      phone: "+1 (555) 777-8888",
      status: "stalled",
      progress: 35,
      currentStep: "Company Profile",
      startDate: "2024-01-20",
      assignedTo: "Tom Brown",
      plan: "starter",
      steps: [
        {
          id: "step_1",
          title: "Account Creation",
          description: "Create tenant account and initial setup",
          completed: true,
          required: true,
        },
        {
          id: "step_2",
          title: "Company Profile",
          description: "Complete company information and branding",
          completed: false,
          required: true,
        },
        {
          id: "step_3",
          title: "Team Setup",
          description: "Add team members and assign roles",
          completed: false,
          required: true,
        },
        {
          id: "step_4",
          title: "Project Configuration",
          description: "Set up project templates and workflows",
          completed: false,
          required: true,
        },
        {
          id: "step_5",
          title: "Integration Setup",
          description: "Connect third-party tools and services",
          completed: false,
          required: false,
        },
        {
          id: "step_6",
          title: "Training & Go-Live",
          description: "Complete training and launch platform",
          completed: false,
          required: true,
        },
      ],
    },
  ];

  const onboardingStats = {
    total: onboardingTenants.length,
    pending: onboardingTenants.filter((t) => t.status === "pending").length,
    inProgress: onboardingTenants.filter((t) => t.status === "in_progress")
      .length,
    completed: onboardingTenants.filter((t) => t.status === "completed").length,
    stalled: onboardingTenants.filter((t) => t.status === "stalled").length,
    avgCompletionTime: 8.5, // days
    successRate: 92, // percentage
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Play className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "stalled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Stalled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "starter":
        return <Badge variant="outline">Starter</Badge>;
      case "professional":
        return (
          <Badge className="bg-blue-100 text-blue-800">Professional</Badge>
        );
      case "enterprise":
        return (
          <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>
        );
      default:
        return <Badge>{plan}</Badge>;
    }
  };

  const filteredTenants = onboardingTenants.filter((tenant) => {
    const matchesSearch =
      tenant.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tenant.status === statusFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" &&
        ["pending", "in_progress"].includes(tenant.status)) ||
      (activeTab === "completed" && tenant.status === "completed") ||
      (activeTab === "stalled" && tenant.status === "stalled");
    return matchesSearch && matchesStatus && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Onboarding Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {onboardingStats.inProgress}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <Play className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {onboardingStats.completed}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {onboardingStats.avgCompletionTime}
                </p>
                <p className="text-sm text-muted-foreground">Avg. Days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {onboardingStats.successRate}%
                </p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Account Setup & Onboarding</CardTitle>
              <CardDescription>
                Manage tenant onboarding process and track progress
              </CardDescription>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Start Onboarding
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="active">
                Active ({onboardingStats.pending + onboardingStats.inProgress})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({onboardingStats.completed})
              </TabsTrigger>
              <TabsTrigger value="stalled">
                Stalled ({onboardingStats.stalled})
              </TabsTrigger>
              <TabsTrigger value="all">
                All ({onboardingStats.total})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search onboarding tenants..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="stalled">Stalled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Onboarding Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Current Step</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tenant.companyName}</p>
                          <div className="flex items-center space-x-2">
                            {getPlanBadge(tenant.plan)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tenant.contactName}</p>
                          <p className="text-sm text-muted-foreground">
                            {tenant.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{tenant.progress}%</span>
                          </div>
                          <Progress value={tenant.progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{tenant.currentStep}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {tenant.assignedTo}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(tenant.startDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedTenant(tenant);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Onboarding Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Onboarding Progress</DialogTitle>
            <DialogDescription>
              Detailed onboarding progress for {selectedTenant?.companyName}
            </DialogDescription>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Company Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      {selectedTenant.companyName}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedTenant.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedTenant.phone}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Progress Overview</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Progress</span>
                      <span className="font-medium">
                        {selectedTenant.progress}%
                      </span>
                    </div>
                    <Progress value={selectedTenant.progress} className="h-3" />
                    <div className="text-sm text-muted-foreground">
                      Current Step: {selectedTenant.currentStep}
                    </div>
                  </div>
                </div>
              </div>

              {/* Onboarding Steps */}
              <div>
                <h4 className="font-medium mb-4">Onboarding Steps</h4>
                <div className="space-y-3">
                  {selectedTenant.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        step.completed
                          ? "bg-green-50 border border-green-200"
                          : selectedTenant.currentStep === step.title
                            ? "bg-blue-50 border border-blue-200"
                            : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : selectedTenant.currentStep === step.title ? (
                          <Clock className="h-5 w-5 text-blue-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{step.title}</p>
                          {step.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Step {index + 1}
                      </div>
                    </div>
                  ))}
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
            <Button>Update Progress</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountSetupOnboarding;
