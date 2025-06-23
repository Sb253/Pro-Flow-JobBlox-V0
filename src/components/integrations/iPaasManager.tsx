import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Zap,
  Plus,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  Copy,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Filter,
  Search,
  RefreshCw,
  Download,
  Upload,
  Link,
  Globe,
  Database,
  Mail,
  Calendar,
  FileText,
  Users,
  DollarSign,
  Building,
  Phone,
  MessageSquare,
  Camera,
  Cloud,
  Shield,
  Activity,
  TrendingUp,
  Target,
  Workflow,
  GitBranch,
  Layers,
  Code,
  Server,
  Webhook,
  Api,
  Terminal,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Watch,
  Headphones,
  Mic,
  Speaker,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Bluetooth,
  Usb,
  HardDrive,
  Cpu,
  MemoryStick,
  Battery,
  BatteryLow,
  Power,
  PowerOff,
  Lightbulb,
  Sun,
  Moon,
  Star,
  Heart,
  ThumbsUp,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  UserCheck,
  UserPlus,
  UserX,
  Bell,
  BellOff,
  Bookmark,
  BookmarkPlus,
  Flag,
  Tag,
  Hash,
  AtSign,
  Percent,
  CreditCard,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "connected" | "available" | "coming-soon";
  icon: React.ReactNode;
  color: string;
  popularity: number;
  lastUsed?: string;
  setupComplexity: "easy" | "medium" | "advanced";
  pricing: "free" | "paid" | "freemium";
  features: string[];
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: "active" | "paused" | "draft";
  lastRun?: string;
  runs: number;
  successRate: number;
  category: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  uses: number;
  rating: number;
  tags: string[];
}

const iPaasManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState("integrations");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [integrationStates, setIntegrationStates] = useState<
    Record<string, Integration["status"]>
  >({});
  const [workflowStates, setWorkflowStates] = useState<
    Record<string, Workflow["status"]>
  >({});

  const integrations: Integration[] = [
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect your apps and automate workflows",
      category: "automation",
      status: "connected",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-orange-500",
      popularity: 95,
      lastUsed: "2 hours ago",
      setupComplexity: "easy",
      pricing: "freemium",
      features: [
        "Multi-step workflows",
        "Real-time triggers",
        "Error handling",
      ],
    },
    {
      id: "slack",
      name: "Slack",
      description: "Team communication and collaboration",
      category: "communication",
      status: "connected",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-purple-500",
      popularity: 88,
      lastUsed: "1 hour ago",
      setupComplexity: "easy",
      pricing: "freemium",
      features: ["Channel notifications", "Direct messages", "File sharing"],
    },
    {
      id: "google-sheets",
      name: "Google Sheets",
      description: "Spreadsheet data management and analysis",
      category: "productivity",
      status: "connected",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-green-500",
      popularity: 92,
      lastUsed: "30 minutes ago",
      setupComplexity: "easy",
      pricing: "free",
      features: ["Real-time sync", "Formula automation", "Data validation"],
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Customer relationship management",
      category: "crm",
      status: "available",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-500",
      popularity: 85,
      setupComplexity: "medium",
      pricing: "paid",
      features: ["Lead management", "Opportunity tracking", "Custom fields"],
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Payment processing and billing",
      category: "finance",
      status: "available",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-indigo-500",
      popularity: 78,
      setupComplexity: "medium",
      pricing: "paid",
      features: [
        "Payment webhooks",
        "Subscription billing",
        "Refund automation",
      ],
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Email marketing and automation",
      category: "marketing",
      status: "available",
      icon: <Mail className="h-6 w-6" />,
      color: "bg-yellow-500",
      popularity: 82,
      setupComplexity: "easy",
      pricing: "freemium",
      features: ["Email campaigns", "Audience segmentation", "A/B testing"],
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Inbound marketing and sales platform",
      category: "crm",
      status: "coming-soon",
      icon: <Target className="h-6 w-6" />,
      color: "bg-orange-600",
      popularity: 76,
      setupComplexity: "advanced",
      pricing: "freemium",
      features: ["Contact management", "Deal tracking", "Marketing automation"],
    },
    {
      id: "trello",
      name: "Trello",
      description: "Project management and task tracking",
      category: "productivity",
      status: "available",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-blue-600",
      popularity: 73,
      setupComplexity: "easy",
      pricing: "freemium",
      features: ["Board automation", "Card updates", "Due date reminders"],
    },
  ];

  const workflows: Workflow[] = [
    {
      id: "ai-client-onboarding",
      name: "AI-Powered Client Onboarding",
      description:
        "Intelligent client onboarding with AI-driven personalization, risk assessment, and automated resource allocation",
      trigger: "New client added to CRM + AI analysis complete",
      actions: [
        "AI client profile analysis",
        "Create personalized project folders",
        "Generate custom welcome package",
        "AI-optimized team assignment",
        "Automated contract generation",
        "Smart communication preferences setup",
        "Predictive project timeline creation",
        "Risk assessment and mitigation plan",
        "Add to AI-segmented customer groups",
        "Schedule AI-optimized kickoff meeting",
      ],
      status: "active",
      lastRun: "2 hours ago",
      runs: 47,
      successRate: 98,
      category: "ai-client-management",
    },
    {
      id: "intelligent-payment-workflow",
      name: "Intelligent Payment & Cash Flow Automation",
      description:
        "AI-driven payment processing with predictive analytics, automated follow-ups, and cash flow optimization",
      trigger:
        "Payment event detected (received/overdue/partial) + AI analysis",
      actions: [
        "AI payment pattern analysis",
        "Update invoice status with ML insights",
        "Predictive cash flow adjustment",
        "Automated payment reminder optimization",
        "Risk-based collection strategy",
        "AI-powered project milestone updates",
        "Smart notification routing",
        "Customer credit score update",
        "Automated accounting sync",
        "Predictive revenue forecasting",
      ],
      status: "active",
      lastRun: "1 hour ago",
      runs: 23,
      successRate: 100,
      category: "ai-finance",
    },
    {
      id: "predictive-project-management",
      name: "Predictive Project Management System",
      description:
        "AI-powered project monitoring with predictive alerts, resource optimization, and automated risk mitigation",
      trigger: "Continuous AI monitoring + threshold-based alerts",
      actions: [
        "AI project health analysis",
        "Predictive delay detection",
        "Automated resource reallocation",
        "Smart deadline adjustments",
        "Risk mitigation activation",
        "Stakeholder notification optimization",
        "Performance benchmark updates",
        "Quality assurance triggers",
        "Budget variance analysis",
        "Customer satisfaction prediction",
      ],
      status: "active",
      lastRun: "6 hours ago",
      runs: 156,
      successRate: 99,
      category: "ai-project-management",
    },
    {
      id: "ai-lead-intelligence",
      name: "AI Lead Intelligence & Conversion System",
      description:
        "Advanced lead qualification using ML algorithms, behavioral analysis, and automated nurturing sequences",
      trigger: "New lead detected + AI scoring complete",
      actions: [
        "AI lead scoring and analysis",
        "Behavioral pattern recognition",
        "Predictive conversion probability",
        "Smart sales rep assignment",
        "Personalized nurture campaign creation",
        "Optimal contact timing prediction",
        "Competitive analysis integration",
        "Custom proposal generation",
        "Follow-up sequence optimization",
        "ROI prediction and tracking",
      ],
      status: "active",
      lastRun: "30 minutes ago",
      runs: 89,
      successRate: 94,
      category: "ai-sales",
    },
    {
      id: "smart-customer-journey",
      name: "Smart Customer Journey Automation",
      description:
        "AI-driven customer journey orchestration with predictive engagement, satisfaction monitoring, and retention optimization",
      trigger: "Customer interaction + journey stage analysis",
      actions: [
        "AI journey stage identification",
        "Predictive satisfaction analysis",
        "Personalized communication triggers",
        "Optimal touchpoint scheduling",
        "Churn risk assessment",
        "Upselling opportunity detection",
        "Loyalty program optimization",
        "Referral potential analysis",
        "Feedback collection automation",
        "Lifetime value prediction",
      ],
      status: "active",
      lastRun: "4 hours ago",
      runs: 234,
      successRate: 97,
      category: "ai-customer-experience",
    },
    {
      id: "intelligent-resource-optimization",
      name: "Intelligent Resource & Workforce Optimization",
      description:
        "AI-powered resource allocation with predictive scheduling, skill matching, and performance optimization",
      trigger: "Resource demand detected + AI capacity analysis",
      actions: [
        "AI workforce capacity analysis",
        "Predictive skill requirement matching",
        "Optimal team composition",
        "Dynamic schedule optimization",
        "Performance-based task assignment",
        "Training need identification",
        "Equipment utilization optimization",
        "Cost efficiency analysis",
        "Productivity forecasting",
        "Automated performance reporting",
      ],
      status: "active",
      lastRun: "1 hour ago",
      runs: 178,
      successRate: 96,
      category: "ai-operations",
    },
    {
      id: "predictive-maintenance-system",
      name: "Predictive Maintenance & Quality Assurance",
      description:
        "AI-driven maintenance prediction with quality monitoring, preventive scheduling, and cost optimization",
      trigger: "Equipment/project data analysis + predictive thresholds",
      actions: [
        "AI maintenance need prediction",
        "Quality degradation analysis",
        "Optimal maintenance scheduling",
        "Cost-benefit optimization",
        "Preventive action triggers",
        "Warranty tracking automation",
        "Customer notification optimization",
        "Inventory management integration",
        "Performance impact analysis",
        "ROI tracking and reporting",
      ],
      status: "active",
      lastRun: "8 hours ago",
      runs: 67,
      successRate: 99,
      category: "ai-maintenance",
    },
    {
      id: "business-intelligence-automation",
      name: "Business Intelligence & Analytics Automation",
      description:
        "Comprehensive AI-powered business analytics with automated insights, forecasting, and strategic recommendations",
      trigger: "Scheduled analysis + significant data changes",
      actions: [
        "AI business performance analysis",
        "Predictive trend identification",
        "Automated insight generation",
        "Strategic recommendation engine",
        "Competitive analysis updates",
        "Market opportunity detection",
        "Risk assessment automation",
        "Performance benchmark tracking",
        "Executive dashboard updates",
        "Automated reporting distribution",
      ],
      status: "active",
      lastRun: "12 hours ago",
      runs: 45,
      successRate: 100,
      category: "ai-analytics",
    },
  ];

  const templates: Template[] = [
    {
      id: "crm-to-email",
      name: "CRM to Email Marketing Sync",
      description: "Sync new contacts from CRM to email marketing platform",
      category: "marketing",
      complexity: "beginner",
      estimatedTime: "5 minutes",
      uses: 1247,
      rating: 4.8,
      tags: ["CRM", "Email", "Marketing", "Automation"],
    },
    {
      id: "project-status-updates",
      name: "Automated Project Status Updates",
      description: "Send weekly project status updates to stakeholders",
      category: "project-management",
      complexity: "intermediate",
      estimatedTime: "15 minutes",
      uses: 892,
      rating: 4.6,
      tags: ["Projects", "Communication", "Reporting"],
    },
    {
      id: "expense-tracking",
      name: "Expense Tracking Automation",
      description: "Automatically categorize and track business expenses",
      category: "finance",
      complexity: "advanced",
      estimatedTime: "30 minutes",
      uses: 634,
      rating: 4.9,
      tags: ["Finance", "Expenses", "Accounting"],
    },
  ];

  const categories = [
    { id: "all", name: "All Categories", count: integrations.length },
    {
      id: "automation",
      name: "Automation",
      count: integrations.filter((i) => i.category === "automation").length,
    },
    {
      id: "communication",
      name: "Communication",
      count: integrations.filter((i) => i.category === "communication").length,
    },
    {
      id: "productivity",
      name: "Productivity",
      count: integrations.filter((i) => i.category === "productivity").length,
    },
    {
      id: "crm",
      name: "CRM",
      count: integrations.filter((i) => i.category === "crm").length,
    },
    {
      id: "finance",
      name: "Finance",
      count: integrations.filter((i) => i.category === "finance").length,
    },
    {
      id: "marketing",
      name: "Marketing",
      count: integrations.filter((i) => i.category === "marketing").length,
    },
  ];

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500 text-white">Connected</Badge>;
      case "available":
        return <Badge className="bg-blue-500 text-white">Available</Badge>;
      case "coming-soon":
        return <Badge className="bg-gray-500 text-white">Coming Soon</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getWorkflowStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case "paused":
        return <Badge className="bg-yellow-500 text-white">Paused</Badge>;
      case "draft":
        return <Badge className="bg-gray-500 text-white">Draft</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case "easy":
        return <Badge className="bg-green-500 text-white">Easy</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>;
      case "advanced":
        return <Badge className="bg-red-500 text-white">Advanced</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleConnectIntegration = async (integrationId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIntegrationStates((prev) => ({
        ...prev,
        [integrationId]: "connected",
      }));
      setNotifications((prev) => [
        ...prev,
        `Successfully connected ${integrations.find((i) => i.id === integrationId)?.name}`,
      ]);
    } catch (error) {
      setNotifications((prev) => [...prev, `Failed to connect integration`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectIntegration = async (integrationId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIntegrationStates((prev) => ({
        ...prev,
        [integrationId]: "available",
      }));
      setNotifications((prev) => [
        ...prev,
        `Disconnected ${integrations.find((i) => i.id === integrationId)?.name}`,
      ]);
    } catch (error) {
      setNotifications((prev) => [...prev, `Failed to disconnect integration`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWorkflow = async (
    workflowId: string,
    currentStatus: string,
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newStatus = currentStatus === "active" ? "paused" : "active";
      setWorkflowStates((prev) => ({
        ...prev,
        [workflowId]: newStatus as Workflow["status"],
      }));
      setNotifications((prev) => [
        ...prev,
        `Workflow ${newStatus === "active" ? "activated" : "paused"}`,
      ]);
    } catch (error) {
      setNotifications((prev) => [...prev, `Failed to update workflow`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicateWorkflow = (workflowId: string) => {
    const workflow = workflows.find((w) => w.id === workflowId);
    if (workflow) {
      setNotifications((prev) => [
        ...prev,
        `Duplicated workflow: ${workflow.name}`,
      ]);
    }
  };

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setNotifications((prev) => [
        ...prev,
        `Created workflow from template: ${template.name}`,
      ]);
      setActiveTab("workflows");
    }
  };

  const getIntegrationStatus = (integration: Integration) => {
    return integrationStates[integration.id] || integration.status;
  };

  const getWorkflowStatus = (workflow: Workflow) => {
    return workflowStates[workflow.id] || workflow.status;
  };

  // Clear notifications after 5 seconds
  React.useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                Integration Platform
              </h1>
              <p className="text-gray-600 mt-2">
                Connect your tools and automate your workflows with our powerful
                iPaaS solution
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setActiveTab("workflows")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="mt-4 space-y-2">
              {notifications.slice(0, 3).map((notification, index) => (
                <div
                  key={index}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {notification}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Connected Apps
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      integrations.filter((i) => i.status === "connected")
                        .length
                    }
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Link className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Workflows
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {workflows.filter((w) => w.status === "active").length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Runs
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {workflows.reduce((sum, w) => sum + w.runs, 0)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card
                  key={integration.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${integration.color}`}>
                          {integration.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {integration.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(getIntegrationStatus(integration))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Popularity</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={integration.popularity}
                            className="w-16 h-2"
                          />
                          <span className="font-medium">
                            {integration.popularity}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Setup</span>
                        {getComplexityBadge(integration.setupComplexity)}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Pricing</span>
                        <Badge variant="outline">
                          {integration.pricing.charAt(0).toUpperCase() +
                            integration.pricing.slice(1)}
                        </Badge>
                      </div>

                      {integration.lastUsed && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Last used</span>
                          <span className="text-gray-900">
                            {integration.lastUsed}
                          </span>
                        </div>
                      )}

                      <div className="pt-2">
                        <p className="text-xs text-gray-600 mb-2">
                          Key Features:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {integration.features
                            .slice(0, 2)
                            .map((feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          {integration.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{integration.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {getIntegrationStatus(integration) === "connected" ? (
                        <>
                          <Button size="sm" className="flex-1">
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleDisconnectIntegration(integration.id)
                            }
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              "Disconnect"
                            )}
                          </Button>
                        </>
                      ) : getIntegrationStatus(integration) === "available" ? (
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() =>
                            handleConnectIntegration(integration.id)
                          }
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="mr-2 h-4 w-4" />
                          )}
                          {isLoading ? "Connecting..." : "Connect"}
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1" disabled>
                          <Clock className="mr-2 h-4 w-4" />
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Workflows
              </h2>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() =>
                  setNotifications((prev) => [
                    ...prev,
                    "Workflow creation wizard opened",
                  ])
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Workflow
              </Button>
            </div>

            <div className="grid gap-6">
              {workflows.map((workflow) => (
                <Card
                  key={workflow.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {workflow.name}
                        </CardTitle>
                        <p className="text-gray-600 mt-1">
                          {workflow.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getWorkflowStatusBadge(getWorkflowStatus(workflow))}
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-sm">Trigger</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {workflow.trigger}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <ArrowRight className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-sm">Actions</span>
                        </div>
                        <div className="space-y-2">
                          {workflow.actions.map((action, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            {workflow.runs}
                          </p>
                          <p className="text-xs text-gray-600">Total Runs</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {workflow.successRate}%
                          </p>
                          <p className="text-xs text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">
                            {workflow.lastRun || "Never"}
                          </p>
                          <p className="text-xs text-gray-600">Last Run</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {getWorkflowStatus(workflow) === "active" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleToggleWorkflow(
                              workflow.id,
                              getWorkflowStatus(workflow),
                            )
                          }
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Pause className="mr-2 h-4 w-4" />
                          )}
                          Pause
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() =>
                            handleToggleWorkflow(
                              workflow.id,
                              getWorkflowStatus(workflow),
                            )
                          }
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Play className="mr-2 h-4 w-4" />
                          )}
                          Activate
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDuplicateWorkflow(workflow.id)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Workflow Templates
              </h2>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {template.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {template.rating}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Complexity</span>
                        <Badge
                          className={
                            template.complexity === "beginner"
                              ? "bg-green-500 text-white"
                              : template.complexity === "intermediate"
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                          }
                        >
                          {template.complexity.charAt(0).toUpperCase() +
                            template.complexity.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Setup Time</span>
                        <span className="font-medium">
                          {template.estimatedTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Used by</span>
                        <span className="font-medium">
                          {template.uses.toLocaleString()} teams
                        </span>
                      </div>

                      <div className="pt-2">
                        <p className="text-xs text-gray-600 mb-2">Tags:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {template.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Analytics Dashboard
              </h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Workflow Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflows
                      .filter((w) => w.status === "active")
                      .map((workflow) => (
                        <div
                          key={workflow.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {workflow.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {workflow.runs} runs
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={workflow.successRate}
                              className="w-16 h-2"
                            />
                            <span className="text-sm font-medium">
                              {workflow.successRate}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Integration Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations
                      .filter((i) => i.status === "connected")
                      .map((integration) => (
                        <div
                          key={integration.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${integration.color}`}>
                              {integration.icon}
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {integration.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {integration.lastUsed}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={integration.popularity}
                              className="w-16 h-2"
                            />
                            <span className="text-sm font-medium">
                              {integration.popularity}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New Client Onboarding completed
                        </p>
                        <p className="text-xs text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Slack integration updated
                        </p>
                        <p className="text-xs text-gray-600">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Project Deadline Alert triggered
                        </p>
                        <p className="text-xs text-gray-600">6 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New workflow template created
                        </p>
                        <p className="text-xs text-gray-600">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                    Usage Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Total Workflows
                      </span>
                      <span className="font-bold text-lg">
                        {workflows.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Active Integrations
                      </span>
                      <span className="font-bold text-lg">
                        {
                          integrations.filter((i) => i.status === "connected")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Monthly Executions
                      </span>
                      <span className="font-bold text-lg">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="font-bold text-lg text-green-600">
                        0.2%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default iPaasManager;
