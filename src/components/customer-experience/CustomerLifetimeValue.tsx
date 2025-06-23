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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  Eye,
  Plus,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Bell,
  Settings,
  BarChart3,
  TrendingUp,
  AlertCircle,
  XCircle,
  Activity,
  Clipboard,
  Camera,
  Video,
  Phone,
  Mail,
  MessageSquare,
  Star,
  Target,
  Award,
  Zap,
  RefreshCw,
} from "lucide-react";

interface SafetyIncident {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved" | "closed";
  reportedBy: string;
  reportedDate: string;
  location: string;
  category: string;
  assignedTo?: string;
}

interface QualityInspection {
  id: string;
  projectName: string;
  inspectionType: string;
  inspector: string;
  date: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  score: number;
  issues: number;
  location: string;
}

interface WeatherAlert {
  id: string;
  type: "rain" | "wind" | "temperature" | "storm" | "fog";
  severity: "low" | "medium" | "high";
  message: string;
  startTime: string;
  endTime: string;
  affectedAreas: string[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  category: "safety" | "quality" | "compliance" | "training";
  uploadedBy: string;
  uploadedDate: string;
  size: string;
  status: "active" | "archived" | "expired";
}

const SafetyQualityDashboard = () => {
  const [activeTab, setActiveTab] = useState("safety");
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);

  const safetyIncidents: SafetyIncident[] = [
    {
      id: "INC-001",
      title: "Slip and Fall on Wet Surface",
      description:
        "Worker slipped on wet concrete surface near building entrance",
      severity: "medium",
      status: "investigating",
      reportedBy: "John Smith",
      reportedDate: "2024-01-15",
      location: "Building A - Main Entrance",
      category: "Workplace Accident",
      assignedTo: "Safety Manager",
    },
    {
      id: "INC-002",
      title: "Equipment Malfunction",
      description: "Crane hydraulic system failure during lifting operation",
      severity: "high",
      status: "open",
      reportedBy: "Mike Johnson",
      reportedDate: "2024-01-14",
      location: "Construction Site B",
      category: "Equipment Failure",
    },
    {
      id: "INC-003",
      title: "Near Miss - Falling Object",
      description: "Tool fell from scaffolding, no injuries reported",
      severity: "low",
      status: "resolved",
      reportedBy: "Sarah Wilson",
      reportedDate: "2024-01-13",
      location: "Building C - Floor 3",
      category: "Near Miss",
    },
  ];

  const qualityInspections: QualityInspection[] = [
    {
      id: "QI-001",
      projectName: "Downtown Office Complex",
      inspectionType: "Structural Inspection",
      inspector: "Emily Davis",
      date: "2024-01-15",
      status: "completed",
      score: 92,
      issues: 2,
      location: "Building A",
    },
    {
      id: "QI-002",
      projectName: "Residential Tower",
      inspectionType: "Electrical Systems",
      inspector: "Robert Brown",
      date: "2024-01-14",
      status: "in-progress",
      score: 0,
      issues: 0,
      location: "Tower B - Floors 5-10",
    },
    {
      id: "QI-003",
      projectName: "Shopping Center",
      inspectionType: "Fire Safety",
      inspector: "Lisa Anderson",
      date: "2024-01-13",
      status: "failed",
      score: 68,
      issues: 8,
      location: "Main Building",
    },
  ];

  const weatherAlerts: WeatherAlert[] = [
    {
      id: "WA-001",
      type: "rain",
      severity: "high",
      message: "Heavy rainfall expected. Outdoor work may be affected.",
      startTime: "2024-01-16 14:00",
      endTime: "2024-01-16 18:00",
      affectedAreas: ["Site A", "Site B", "Site C"],
    },
    {
      id: "WA-002",
      type: "wind",
      severity: "medium",
      message: "Strong winds up to 45 mph. Crane operations suspended.",
      startTime: "2024-01-17 08:00",
      endTime: "2024-01-17 16:00",
      affectedAreas: ["Construction Site B"],
    },
  ];

  const documents: Document[] = [
    {
      id: "DOC-001",
      name: "Safety Training Manual 2024",
      type: "PDF",
      category: "safety",
      uploadedBy: "HR Department",
      uploadedDate: "2024-01-10",
      size: "2.5 MB",
      status: "active",
    },
    {
      id: "DOC-002",
      name: "Quality Control Checklist",
      type: "XLSX",
      category: "quality",
      uploadedBy: "Quality Manager",
      uploadedDate: "2024-01-08",
      size: "1.2 MB",
      status: "active",
    },
    {
      id: "DOC-003",
      name: "OSHA Compliance Report",
      type: "PDF",
      category: "compliance",
      uploadedBy: "Safety Officer",
      uploadedDate: "2024-01-05",
      size: "3.8 MB",
      status: "active",
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-600">Critical</Badge>;
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-red-500">Open</Badge>;
      case "investigating":
        return <Badge className="bg-yellow-500">Investigating</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "closed":
        return <Badge className="bg-gray-500">Closed</Badge>;
      case "pending":
        return <Badge className="bg-gray-500">Pending</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getWeatherIcon = (type: string) => {
    switch (type) {
      case "rain":
        return <CloudRain className="h-5 w-5" />;
      case "wind":
        return <Wind className="h-5 w-5" />;
      case "temperature":
        return <Thermometer className="h-5 w-5" />;
      case "storm":
        return <Cloud className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Safety & Quality
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Comprehensive safety management and quality control
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Meetings</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span>Maps</span>
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
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
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800">
            <TabsTrigger value="safety" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Safety</span>
            </TabsTrigger>
            <TabsTrigger
              value="quality"
              className="flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Quality</span>
            </TabsTrigger>
            <TabsTrigger
              value="weather"
              className="flex items-center space-x-2"
            >
              <Cloud className="h-4 w-4" />
              <span>Weather</span>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="safety" className="space-y-6">
            {/* Safety Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        23
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Total Incidents
                      </p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                        <p className="text-xs text-red-500">
                          +2 from last month
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500 text-white">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        156
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Days Without Incident
                      </p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <p className="text-xs text-green-500">
                          +12 from last period
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        94%
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Safety Compliance
                      </p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <p className="text-xs text-green-500">
                          +3% from last month
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        8
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Open Incidents
                      </p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-yellow-500" />
                        <p className="text-xs text-yellow-500">
                          Same as last week
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500 text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Safety Incidents */}
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Safety Incidents</CardTitle>
                    <CardDescription>
                      Recent safety incidents and their status
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isIncidentDialogOpen}
                    onOpenChange={setIsIncidentDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Report Incident
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Report Safety Incident</DialogTitle>
                        <DialogDescription>
                          Provide details about the safety incident
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="incident-title">
                              Incident Title
                            </Label>
                            <Input
                              id="incident-title"
                              placeholder="Brief description"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="incident-severity">Severity</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select severity" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="critical">
                                  Critical
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="incident-description">
                            Description
                          </Label>
                          <Textarea
                            id="incident-description"
                            placeholder="Detailed description of the incident"
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="incident-location">Location</Label>
                            <Input
                              id="incident-location"
                              placeholder="Where did it occur?"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="incident-category">Category</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="accident">
                                  Workplace Accident
                                </SelectItem>
                                <SelectItem value="near-miss">
                                  Near Miss
                                </SelectItem>
                                <SelectItem value="equipment">
                                  Equipment Failure
                                </SelectItem>
                                <SelectItem value="environmental">
                                  Environmental
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsIncidentDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => setIsIncidentDialogOpen(false)}
                          >
                            Submit Report
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safetyIncidents.map((incident) => (
                    <Card
                      key={incident.id}
                      className="bg-slate-50 dark:bg-slate-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              {incident.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {incident.id} • Reported by {incident.reportedBy}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getSeverityBadge(incident.severity)}
                            {getStatusBadge(incident.status)}
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                          {incident.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Location</p>
                            <p className="font-medium">{incident.location}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Category</p>
                            <p className="font-medium">{incident.category}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Date</p>
                            <p className="font-medium">
                              {incident.reportedDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500">Assigned To</p>
                            <p className="font-medium">
                              {incident.assignedTo || "Unassigned"}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            {/* Quality Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        87%
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Quality Score
                      </p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <p className="text-xs text-green-500">
                          +5% from last month
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500 text-white">
                      <Star className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        12
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Active Inspections
                      </p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-blue-500" />
                        <p className="text-xs text-blue-500">+3 this week</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500 text-white">
                      <Clipboard className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        3
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Failed Inspections
                      </p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                        <p className="text-xs text-red-500">
                          -2 from last week
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500 text-white">
                      <XCircle className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        45
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Issues Resolved
                      </p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <p className="text-xs text-green-500">+8 this month</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quality Inspections */}
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quality Inspections</CardTitle>
                    <CardDescription>
                      Recent quality control inspections and results
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isInspectionDialogOpen}
                    onOpenChange={setIsInspectionDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Inspection
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Schedule Quality Inspection</DialogTitle>
                        <DialogDescription>
                          Create a new quality control inspection
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="project-name">Project Name</Label>
                            <Input
                              id="project-name"
                              placeholder="Enter project name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="inspection-type">
                              Inspection Type
                            </Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="structural">
                                  Structural
                                </SelectItem>
                                <SelectItem value="electrical">
                                  Electrical
                                </SelectItem>
                                <SelectItem value="plumbing">
                                  Plumbing
                                </SelectItem>
                                <SelectItem value="fire-safety">
                                  Fire Safety
                                </SelectItem>
                                <SelectItem value="hvac">HVAC</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="inspector">Inspector</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select inspector" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="emily">
                                  Emily Davis
                                </SelectItem>
                                <SelectItem value="robert">
                                  Robert Brown
                                </SelectItem>
                                <SelectItem value="lisa">
                                  Lisa Anderson
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="inspection-date">Date</Label>
                            <Input id="inspection-date" type="date" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            placeholder="Inspection location"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsInspectionDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => setIsInspectionDialogOpen(false)}
                          >
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Issues</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qualityInspections.map((inspection) => (
                      <TableRow key={inspection.id}>
                        <TableCell className="font-medium">
                          {inspection.projectName}
                        </TableCell>
                        <TableCell>{inspection.inspectionType}</TableCell>
                        <TableCell>{inspection.inspector}</TableCell>
                        <TableCell>{inspection.date}</TableCell>
                        <TableCell>
                          {getStatusBadge(inspection.status)}
                        </TableCell>
                        <TableCell>
                          {inspection.status === "completed" ||
                          inspection.status === "failed" ? (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {inspection.score}%
                              </span>
                              <Progress
                                value={inspection.score}
                                className="w-16 h-2"
                              />
                            </div>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {inspection.issues > 0 ? (
                            <Badge className="bg-red-500">
                              {inspection.issues}
                            </Badge>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
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

          <TabsContent value="weather" className="space-y-6">
            {/* Weather Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        72°F
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Current Temperature
                      </p>
                      <p className="text-xs text-slate-500">Partly cloudy</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500 text-white">
                      <Sun className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        15 mph
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Wind Speed
                      </p>
                      <p className="text-xs text-slate-500">From the west</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500 text-white">
                      <Wind className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        2
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Active Alerts
                      </p>
                      <p className="text-xs text-slate-500">Next 24 hours</p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500 text-white">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weather Alerts */}
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Weather Alerts</CardTitle>
                <CardDescription>
                  Current and upcoming weather conditions affecting operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weatherAlerts.map((alert) => (
                    <Card
                      key={alert.id}
                      className={`border-l-4 ${
                        alert.severity === "high"
                          ? "border-l-red-500 bg-red-50 dark:bg-red-900/20"
                          : alert.severity === "medium"
                            ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                            : "border-l-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {getWeatherIcon(alert.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-slate-900 dark:text-white capitalize">
                                {alert.type} Alert
                              </h3>
                              {getSeverityBadge(alert.severity)}
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                              {alert.message}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-slate-500">Start Time</p>
                                <p className="font-medium">{alert.startTime}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">End Time</p>
                                <p className="font-medium">{alert.endTime}</p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-slate-500 text-sm mb-1">
                                Affected Areas
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {alert.affectedAreas.map((area, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Document Categories */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        45
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Safety Documents
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        32
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Quality Documents
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        28
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Compliance Documents
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500 text-white">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        19
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Training Materials
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500 text-white">
                      <Award className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Document Management */}
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Document Management</CardTitle>
                    <CardDescription>
                      Safety, quality, and compliance documentation
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          {doc.name}
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              doc.category === "safety"
                                ? "bg-red-500"
                                : doc.category === "quality"
                                  ? "bg-green-500"
                                  : doc.category === "compliance"
                                    ? "bg-blue-500"
                                    : "bg-purple-500"
                            }
                          >
                            {doc.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.uploadedBy}</TableCell>
                        <TableCell>{doc.uploadedDate}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
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
        </Tabs>
      </div>
    </div>
  );
};

export default SafetyQualityDashboard;
