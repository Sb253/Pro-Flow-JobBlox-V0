import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plug,
  Search,
  Star,
  ExternalLink,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Users,
  Calendar,
  FileText,
  DollarSign,
  Camera,
  Cloud,
  Database,
  Mail,
  Phone,
  MessageSquare,
  BarChart3,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Headphones,
  CreditCard,
  Package,
  Truck,
  Building,
  MapPin,
  Target,
  TrendingUp,
  Activity,
  Link,
  Plus,
  Minus,
  RefreshCw,
  Download,
  Upload,
  Filter,
  SortAsc,
  Grid,
  List,
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
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Power,
  PowerOff,
  PlayCircle,
  PauseCircle,
  StopCircle,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  Repeat,
  Shuffle,
  Heart,
  HeartOff,
  ThumbsUp,
  ThumbsDown,
  Share,
  Share2,
  Copy,
  Cut,
  Paste,
  Scissors,
  Edit,
  Edit2,
  Edit3,
  Save,
  SaveAll,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  File,
  FilePlus,
  FileMinus,
  FileX,
  FileEdit,
  FileText2,
  FileImage,
  FileVideo,
  FileAudio,
  FilePdf,
  FileSpreadsheet,
  Calculator,
  Briefcase,
  ShoppingCart,
  Layers,
  Code,
  Server,
  Webhook,
  Terminal,
  GitBranch,
  Workflow,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Play,
  Pause,
  Square,
  AlertTriangle,
  Info,
  HelpCircle,
  BookOpen,
  Lightbulb,
  Sparkles,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "connected" | "available" | "coming-soon" | "error";
  icon: React.ReactNode;
  color: string;
  features: string[];
  pricing?: string;
  popularity: number;
  setupComplexity: "easy" | "medium" | "advanced";
  lastSync?: string;
  syncStatus?: "syncing" | "synced" | "error" | "never";
  recordCount?: number;
  errorCount?: number;
  webhookUrl?: string;
  apiVersion?: string;
  rateLimits?: {
    current: number;
    limit: number;
    resetTime: string;
  };
}

interface SyncJob {
  id: string;
  integrationId: string;
  type: "full" | "incremental" | "manual";
  status: "pending" | "running" | "completed" | "failed";
  entityType: string;
  recordsProcessed: number;
  recordsSucceeded: number;
  recordsFailed: number;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  errors: string[];
}

interface QuickBooksData {
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  customers: number;
  invoices: number;
  payments: number;
  items: number;
  lastSync: string;
  syncInProgress: boolean;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  provider: string;
  permissions: string[];
  lastUsed?: string;
  createdAt: string;
  expiresAt?: string;
  status: "active" | "inactive" | "expired";
}

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  provider: string;
  events: string[];
  secret: string;
  status: "active" | "inactive" | "error";
  lastTriggered?: string;
  successCount: number;
  failureCount: number;
  createdAt: string;
}

const IntegrationsHub = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConnected, setShowConnected] = useState(false);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([]);
  const [quickBooksData, setQuickBooksData] = useState<QuickBooksData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("integrations");
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([]);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);
  const [newApiKey, setNewApiKey] = useState({
    name: "",
    provider: "",
    permissions: [] as string[],
  });
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    provider: "",
    events: [] as string[],
  });

  const integrations: Integration[] = [
    // Sales, CRM & Lead Management
    {
      id: "salesrabbit",
      name: "SalesRabbit",
      description: "Door-to-door sales management and lead tracking platform",
      category: "sales-crm",
      status: "available",
      icon: <Users className="h-6 w-6" />,
      color: "bg-green-600",
      features: [
        "Lead management",
        "Route optimization",
        "Sales tracking",
        "Team management",
        "Mobile app",
      ],
      pricing: "Paid",
      popularity: 78,
      setupComplexity: "medium",
      apiVersion: "v2",
    },
    {
      id: "thumbtack",
      name: "Thumbtack",
      description: "Local service marketplace for lead generation",
      category: "sales-crm",
      status: "available",
      icon: <Target className="h-6 w-6" />,
      color: "bg-blue-600",
      features: [
        "Lead generation",
        "Customer matching",
        "Quote management",
        "Review system",
        "Payment processing",
      ],
      pricing: "Commission-based",
      popularity: 85,
      setupComplexity: "easy",
      apiVersion: "v1",
    },
    {
      id: "angi",
      name: "Angi",
      description: "Home services marketplace and lead generation",
      category: "sales-crm",
      status: "available",
      icon: <Building className="h-6 w-6" />,
      color: "bg-orange-600",
      features: [
        "Lead generation",
        "Customer reviews",
        "Project matching",
        "Background checks",
        "Insurance verification",
      ],
      pricing: "Subscription + Leads",
      popularity: 82,
      setupComplexity: "medium",
      apiVersion: "v2",
    },
    {
      id: "facebook-lead-ads",
      name: "Facebook Lead Ads",
      description: "Social media lead generation and advertising platform",
      category: "sales-crm",
      status: "connected",
      icon: <Share2 className="h-6 w-6" />,
      color: "bg-blue-700",
      features: [
        "Lead capture forms",
        "Audience targeting",
        "Campaign management",
        "Real-time sync",
        "Custom audiences",
      ],
      pricing: "Pay-per-click",
      popularity: 91,
      setupComplexity: "medium",
      lastSync: "15 minutes ago",
      syncStatus: "synced",
      recordCount: 1247,
      errorCount: 0,
      apiVersion: "v18.0",
      rateLimits: { current: 45, limit: 200, resetTime: "1 hour" },
    },
    {
      id: "google-local-services",
      name: "Google Local Services Ads",
      description: "Google's local service provider advertising platform",
      category: "sales-crm",
      status: "connected",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-red-500",
      features: [
        "Local lead generation",
        "Google guarantee",
        "Background checks",
        "Customer reviews",
        "Pay-per-lead",
      ],
      pricing: "Pay-per-lead",
      popularity: 88,
      setupComplexity: "medium",
      lastSync: "10 minutes ago",
      syncStatus: "synced",
      recordCount: 892,
      errorCount: 1,
      apiVersion: "v1",
      rateLimits: { current: 23, limit: 100, resetTime: "1 hour" },
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Inbound marketing, sales, and service platform",
      category: "sales-crm",
      status: "connected",
      icon: <Target className="h-6 w-6" />,
      color: "bg-orange-600",
      features: [
        "Contact management",
        "Deal pipeline",
        "Marketing automation",
        "Service tickets",
        "Analytics",
      ],
      pricing: "Freemium",
      popularity: 79,
      setupComplexity: "medium",
      lastSync: "1 hour ago",
      syncStatus: "synced",
      recordCount: 2156,
      errorCount: 0,
      apiVersion: "v3",
      rateLimits: { current: 78, limit: 1000, resetTime: "10 minutes" },
    },
    {
      id: "mysalesman",
      name: "mySalesman",
      description: "Construction industry CRM and sales management",
      category: "sales-crm",
      status: "available",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-purple-600",
      features: [
        "Construction CRM",
        "Lead tracking",
        "Proposal management",
        "Project tracking",
        "Mobile access",
      ],
      pricing: "Subscription",
      popularity: 72,
      setupComplexity: "medium",
      apiVersion: "v1",
    },

    // Project & Field Management
    {
      id: "companycam",
      name: "CompanyCam",
      description: "Photo documentation and project management for contractors",
      category: "project-field",
      status: "connected",
      icon: <Camera className="h-6 w-6" />,
      color: "bg-blue-500",
      features: [
        "Photo documentation",
        "Project tracking",
        "Team collaboration",
        "GPS tagging",
        "Time-stamped photos",
      ],
      pricing: "Subscription",
      popularity: 86,
      setupComplexity: "easy",
      lastSync: "5 minutes ago",
      syncStatus: "synced",
      recordCount: 3421,
      errorCount: 0,
      apiVersion: "v2",
      rateLimits: { current: 67, limit: 500, resetTime: "1 hour" },
    },
    {
      id: "eagleview",
      name: "EagleView",
      description: "Aerial imagery and property measurement technology",
      category: "project-field",
      status: "available",
      icon: <Eye className="h-6 w-6" />,
      color: "bg-teal-600",
      features: [
        "Aerial measurements",
        "Roof reports",
        "Property analytics",
        "3D modeling",
        "Insurance integration",
      ],
      pricing: "Per-report",
      popularity: 81,
      setupComplexity: "medium",
      apiVersion: "v3",
    },
    {
      id: "roofr",
      name: "Roofr",
      description: "Roofing contractor management and estimation platform",
      category: "project-field",
      status: "available",
      icon: <Building className="h-6 w-6" />,
      color: "bg-red-600",
      features: [
        "Roof measurements",
        "Instant estimates",
        "Material calculations",
        "Customer proposals",
        "Project management",
      ],
      pricing: "Subscription",
      popularity: 75,
      setupComplexity: "medium",
      apiVersion: "v2",
    },
    {
      id: "photo-id-uscope",
      name: "PHOTO iD by U Scope",
      description: "Construction photo documentation and project tracking",
      category: "project-field",
      status: "available",
      icon: <Camera className="h-6 w-6" />,
      color: "bg-green-700",
      features: [
        "Photo documentation",
        "Project timeline",
        "Quality control",
        "Progress tracking",
        "Client communication",
      ],
      pricing: "Subscription",
      popularity: 68,
      setupComplexity: "easy",
      apiVersion: "v1",
    },
    {
      id: "beacon-pro",
      name: "Beacon PRO+",
      description: "Roofing material estimation and ordering platform",
      category: "project-field",
      status: "available",
      icon: <Package className="h-6 w-6" />,
      color: "bg-orange-700",
      features: [
        "Material estimation",
        "Ordering system",
        "Inventory management",
        "Pricing tools",
        "Delivery tracking",
      ],
      pricing: "Free",
      popularity: 79,
      setupComplexity: "medium",
      apiVersion: "v2",
    },
    {
      id: "qxo-beacon",
      name: "QXO (formerly Beacon)",
      description:
        "Building materials distribution and supply chain management",
      category: "project-field",
      status: "available",
      icon: <Truck className="h-6 w-6" />,
      color: "bg-gray-700",
      features: [
        "Material ordering",
        "Supply chain management",
        "Inventory tracking",
        "Delivery scheduling",
        "Pricing management",
      ],
      pricing: "B2B Platform",
      popularity: 73,
      setupComplexity: "advanced",
      apiVersion: "v3",
    },
    {
      id: "roof-hub-srs",
      name: "Roof Hub by SRS Distribution",
      description: "Roofing materials and supply chain platform",
      category: "project-field",
      status: "available",
      icon: <Building className="h-6 w-6" />,
      color: "bg-blue-800",
      features: [
        "Material sourcing",
        "Inventory management",
        "Order tracking",
        "Pricing tools",
        "Delivery coordination",
      ],
      pricing: "B2B Platform",
      popularity: 71,
      setupComplexity: "medium",
      apiVersion: "v2",
    },
    {
      id: "roofle",
      name: "Roofle",
      description: "Roofing project management and customer communication",
      category: "project-field",
      status: "available",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-indigo-600",
      features: [
        "Project management",
        "Customer communication",
        "Photo sharing",
        "Progress updates",
        "Document management",
      ],
      pricing: "Subscription",
      popularity: 69,
      setupComplexity: "easy",
      apiVersion: "v1",
    },
    {
      id: "hover",
      name: "Hover",
      description: "3D home modeling and measurement technology",
      category: "project-field",
      status: "available",
      icon: <Monitor className="h-6 w-6" />,
      color: "bg-purple-700",
      features: [
        "3D home models",
        "Accurate measurements",
        "Material calculations",
        "Visual estimates",
        "Insurance integration",
      ],
      pricing: "Per-model",
      popularity: 84,
      setupComplexity: "medium",
      apiVersion: "v2",
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Smart scheduling and calendar management",
      category: "project-field",
      status: "connected",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-green-500",
      features: [
        "Two-way sync",
        "Automated reminders",
        "Team calendars",
        "Meeting rooms",
        "Smart scheduling",
      ],
      pricing: "Free",
      popularity: 92,
      setupComplexity: "easy",
      lastSync: "Real-time",
      syncStatus: "synced",
      recordCount: 456,
      errorCount: 0,
      apiVersion: "v3",
    },
    {
      id: "google-maps",
      name: "Google Maps",
      description: "Location services and route optimization",
      category: "project-field",
      status: "connected",
      icon: <MapPin className="h-6 w-6" />,
      color: "bg-red-500",
      features: [
        "Location services",
        "Route optimization",
        "Distance calculations",
        "Geocoding",
        "Street view integration",
      ],
      pricing: "Pay-per-use",
      popularity: 95,
      setupComplexity: "easy",
      lastSync: "Real-time",
      syncStatus: "synced",
      recordCount: 0,
      errorCount: 0,
      apiVersion: "v3",
    },

    // Communication & Reviews
    {
      id: "gmail",
      name: "Gmail",
      description:
        "Google's email service with advanced integration capabilities",
      category: "communication",
      status: "connected",
      icon: <Mail className="h-6 w-6" />,
      color: "bg-red-600",
      features: [
        "Email automation",
        "Template management",
        "Contact sync",
        "Calendar integration",
        "Advanced search",
      ],
      pricing: "Free",
      popularity: 96,
      setupComplexity: "easy",
      lastSync: "Real-time",
      syncStatus: "synced",
      recordCount: 5432,
      errorCount: 0,
      apiVersion: "v1",
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Email marketing and automation platform",
      category: "communication",
      status: "connected",
      icon: <Mail className="h-6 w-6" />,
      color: "bg-yellow-500",
      features: [
        "Email campaigns",
        "Audience segmentation",
        "A/B testing",
        "Marketing automation",
        "Analytics",
      ],
      pricing: "Freemium",
      popularity: 82,
      setupComplexity: "easy",
      lastSync: "30 minutes ago",
      syncStatus: "synced",
      recordCount: 3421,
      errorCount: 1,
      apiVersion: "3.0",
      rateLimits: { current: 234, limit: 1000, resetTime: "1 hour" },
    },
    {
      id: "google-contacts",
      name: "Google Contacts",
      description: "Contact management and synchronization service",
      category: "communication",
      status: "connected",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-500",
      features: [
        "Contact sync",
        "Duplicate detection",
        "Group management",
        "Contact sharing",
        "Mobile sync",
      ],
      pricing: "Free",
      popularity: 89,
      setupComplexity: "easy",
      lastSync: "Real-time",
      syncStatus: "synced",
      recordCount: 2847,
      errorCount: 0,
      apiVersion: "v1",
    },
    {
      id: "openphone",
      name: "OpenPhone",
      description: "Business phone system with advanced features",
      category: "communication",
      status: "available",
      icon: <Phone className="h-6 w-6" />,
      color: "bg-green-600",
      features: [
        "Business phone numbers",
        "Call routing",
        "Voicemail transcription",
        "SMS messaging",
        "Team collaboration",
      ],
      pricing: "Subscription",
      popularity: 76,
      setupComplexity: "easy",
      apiVersion: "v2",
    },
    {
      id: "microsoft-outlook",
      name: "Microsoft Outlook",
      description: "Email, calendar, and contact management platform",
      category: "communication",
      status: "available",
      icon: <Mail className="h-6 w-6" />,
      color: "bg-blue-700",
      features: [
        "Email management",
        "Calendar integration",
        "Contact sync",
        "Task management",
        "Office integration",
      ],
      pricing: "Subscription",
      popularity: 84,
      setupComplexity: "medium",
      apiVersion: "v2.0",
    },

    // Document Management & Storage
    {
      id: "dropbox",
      name: "Dropbox",
      description: "Cloud storage and file synchronization service",
      category: "document-storage",
      status: "connected",
      icon: <Cloud className="h-6 w-6" />,
      color: "bg-blue-600",
      features: [
        "File sync",
        "Team collaboration",
        "Version control",
        "File sharing",
        "Advanced security",
      ],
      pricing: "Freemium",
      popularity: 87,
      setupComplexity: "easy",
      lastSync: "2 minutes ago",
      syncStatus: "synced",
      recordCount: 1892,
      errorCount: 0,
      apiVersion: "v2",
      rateLimits: { current: 45, limit: 1000, resetTime: "1 hour" },
    },
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Cloud storage and document collaboration platform",
      category: "document-storage",
      status: "connected",
      icon: <FolderOpen className="h-6 w-6" />,
      color: "bg-green-500",
      features: [
        "File storage",
        "Real-time collaboration",
        "Document editing",
        "Sharing controls",
        "Offline access",
      ],
      pricing: "Freemium",
      popularity: 93,
      setupComplexity: "easy",
      lastSync: "Real-time",
      syncStatus: "synced",
      recordCount: 3247,
      errorCount: 0,
      apiVersion: "v3",
    },
    {
      id: "docusign",
      name: "DocuSign",
      description: "Electronic signature and document management platform",
      category: "document-storage",
      status: "connected",
      icon: <FileEdit className="h-6 w-6" />,
      color: "bg-yellow-600",
      features: [
        "Electronic signatures",
        "Document templates",
        "Workflow automation",
        "Audit trails",
        "Mobile signing",
      ],
      pricing: "Subscription",
      popularity: 85,
      setupComplexity: "medium",
      lastSync: "1 hour ago",
      syncStatus: "synced",
      recordCount: 567,
      errorCount: 0,
      apiVersion: "v2.1",
      rateLimits: { current: 23, limit: 1000, resetTime: "1 hour" },
    },
    {
      id: "jotform",
      name: "Jotform",
      description: "Online form builder with advanced features",
      category: "document-storage",
      status: "available",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-orange-500",
      features: [
        "Form builder",
        "Payment integration",
        "Conditional logic",
        "Data collection",
        "Mobile optimization",
      ],
      pricing: "Freemium",
      popularity: 78,
      setupComplexity: "easy",
      apiVersion: "v1",
    },
    {
      id: "gravity-forms",
      name: "Gravity Forms",
      description: "WordPress form plugin with advanced capabilities",
      category: "document-storage",
      status: "available",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-purple-600",
      features: [
        "WordPress integration",
        "Advanced fields",
        "Conditional logic",
        "Payment processing",
        "User registration",
      ],
      pricing: "Paid",
      popularity: 81,
      setupComplexity: "medium",
      apiVersion: "v2",
    },
    {
      id: "wpforms",
      name: "WPForms",
      description: "User-friendly WordPress form builder",
      category: "document-storage",
      status: "available",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-blue-500",
      features: [
        "Drag-drop builder",
        "Pre-built templates",
        "Payment forms",
        "Email marketing",
        "Spam protection",
      ],
      pricing: "Freemium",
      popularity: 79,
      setupComplexity: "easy",
      apiVersion: "v1",
    },
    {
      id: "google-forms",
      name: "Google Forms",
      description: "Simple and free form creation tool",
      category: "document-storage",
      status: "connected",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-green-600",
      features: [
        "Form creation",
        "Response collection",
        "Real-time collaboration",
        "Data analysis",
        "Template library",
      ],
      pricing: "Free",
      popularity: 91,
      setupComplexity: "easy",
      lastSync: "Real-time",
      syncStatus: "synced",
      recordCount: 1234,
      errorCount: 0,
      apiVersion: "v1",
    },
    {
      id: "squarespace-forms",
      name: "Squarespace Forms",
      description: "Integrated form builder for Squarespace websites",
      category: "document-storage",
      status: "available",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-gray-800",
      features: [
        "Website integration",
        "Custom styling",
        "Email notifications",
        "Data export",
        "Mobile responsive",
      ],
      pricing: "Included with Squarespace",
      popularity: 72,
      setupComplexity: "easy",
      apiVersion: "v1",
    },
    {
      id: "wix-forms",
      name: "Wix Forms",
      description: "Form builder integrated with Wix websites",
      category: "document-storage",
      status: "available",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-blue-400",
      features: [
        "Website integration",
        "Custom design",
        "Database connection",
        "Email automation",
        "Mobile optimization",
      ],
      pricing: "Included with Wix",
      popularity: 74,
      setupComplexity: "easy",
      apiVersion: "v1",
    },
    {
      id: "calendly",
      name: "Calendly",
      description: "Automated scheduling and booking platform",
      category: "document-storage",
      status: "available",
      icon: <Clock className="h-6 w-6" />,
      color: "bg-blue-500",
      features: [
        "Online booking",
        "Buffer times",
        "Payment collection",
        "Team scheduling",
        "Integration ecosystem",
      ],
      pricing: "Freemium",
      popularity: 77,
      setupComplexity: "easy",
      apiVersion: "v2",
    },

    // Automation Platforms
    {
      id: "zapier",
      name: "Zapier",
      description: "Workflow automation platform connecting 5000+ apps",
      category: "automation",
      status: "connected",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-orange-500",
      features: [
        "Multi-step workflows",
        "Real-time triggers",
        "Error handling",
        "5000+ integrations",
        "Advanced filters",
      ],
      pricing: "Freemium",
      popularity: 95,
      setupComplexity: "easy",
      lastSync: "2 hours ago",
      syncStatus: "synced",
      recordCount: 0,
      errorCount: 0,
      apiVersion: "v1",
      rateLimits: { current: 145, limit: 1000, resetTime: "1 hour" },
    },
    {
      id: "leadsbridge",
      name: "LeadsBridge",
      description: "Marketing automation and lead management platform",
      category: "automation",
      status: "available",
      icon: <Link className="h-6 w-6" />,
      color: "bg-purple-600",
      features: [
        "Lead sync automation",
        "CRM integrations",
        "Marketing platforms",
        "Real-time sync",
        "Custom mappings",
      ],
      pricing: "Subscription",
      popularity: 73,
      setupComplexity: "medium",
      apiVersion: "v2",
    },

    // Other / Miscellaneous
    {
      id: "hailtrace",
      name: "HailTrace",
      description: "Weather tracking and hail damage assessment platform",
      category: "miscellaneous",
      status: "available",
      icon: <Cloud className="h-6 w-6" />,
      color: "bg-gray-600",
      features: [
        "Weather tracking",
        "Hail damage reports",
        "Storm mapping",
        "Insurance integration",
        "Historical data",
      ],
      pricing: "Subscription",
      popularity: 67,
      setupComplexity: "medium",
      apiVersion: "v1",
    },
    {
      id: "xero",
      name: "Xero",
      description: "Cloud-based accounting platform integration",
      category: "miscellaneous",
      status: "available",
      icon: <Calculator className="h-6 w-6" />,
      color: "bg-teal-500",
      features: [
        "Bank reconciliation",
        "Invoice management",
        "Expense tracking",
        "Financial reporting",
        "Multi-currency",
      ],
      pricing: "Subscription",
      popularity: 78,
      setupComplexity: "medium",
      apiVersion: "v2",
    },
  ];

  const categories = [
    { id: "all", name: "All Integrations", count: integrations.length },
    {
      id: "sales-crm",
      name: "Sales, CRM & Lead Management",
      count: integrations.filter((i) => i.category === "sales-crm").length,
    },
    {
      id: "project-field",
      name: "Project & Field Management",
      count: integrations.filter((i) => i.category === "project-field").length,
    },
    {
      id: "communication",
      name: "Communication & Reviews",
      count: integrations.filter((i) => i.category === "communication").length,
    },
    {
      id: "document-storage",
      name: "Document Management & Storage",
      count: integrations.filter((i) => i.category === "document-storage")
        .length,
    },
    {
      id: "automation",
      name: "Automation Platforms",
      count: integrations.filter((i) => i.category === "automation").length,
    },
    {
      id: "miscellaneous",
      name: "Other / Miscellaneous",
      count: integrations.filter((i) => i.category === "miscellaneous").length,
    },
  ];

  const syncJobsData: SyncJob[] = [
    {
      id: "sync-1",
      integrationId: "quickbooks",
      type: "incremental",
      status: "completed",
      entityType: "customers",
      recordsProcessed: 45,
      recordsSucceeded: 45,
      recordsFailed: 0,
      startedAt: "2024-01-15T10:30:00Z",
      completedAt: "2024-01-15T10:32:15Z",
      duration: 135,
      errors: [],
    },
    {
      id: "sync-2",
      integrationId: "stripe",
      type: "full",
      status: "running",
      entityType: "payments",
      recordsProcessed: 234,
      recordsSucceeded: 232,
      recordsFailed: 2,
      startedAt: "2024-01-15T11:00:00Z",
      duration: 0,
      errors: [
        "Payment ID 12345 missing customer reference",
        "Invalid currency code for payment 67890",
      ],
    },
    {
      id: "sync-3",
      integrationId: "hubspot",
      type: "manual",
      status: "failed",
      entityType: "contacts",
      recordsProcessed: 12,
      recordsSucceeded: 8,
      recordsFailed: 4,
      startedAt: "2024-01-15T09:15:00Z",
      completedAt: "2024-01-15T09:18:30Z",
      duration: 210,
      errors: [
        "API rate limit exceeded",
        "Invalid email format for contact",
        "Duplicate contact detected",
      ],
    },
  ];

  const quickBooksDataSample: QuickBooksData = {
    companyInfo: {
      name: "Construction Pro LLC",
      address: "123 Builder St, Construction City, CC 12345",
      phone: "(555) 123-4567",
      email: "info@constructionpro.com",
    },
    customers: 247,
    invoices: 1156,
    payments: 892,
    items: 89,
    lastSync: "2 minutes ago",
    syncInProgress: false,
  };

  const apiKeysData: APIKey[] = [
    {
      id: "api-1",
      name: "QuickBooks Production",
      key: "qb_prod_***************",
      provider: "quickbooks",
      permissions: ["read:customers", "write:invoices", "read:payments"],
      lastUsed: "2024-01-15T10:30:00Z",
      createdAt: "2024-01-01T00:00:00Z",
      status: "active",
    },
    {
      id: "api-2",
      name: "Stripe Live Key",
      key: "sk_live_***************",
      provider: "stripe",
      permissions: ["read:payments", "write:charges", "read:customers"],
      lastUsed: "2024-01-15T11:15:00Z",
      createdAt: "2024-01-05T00:00:00Z",
      status: "active",
    },
    {
      id: "api-3",
      name: "HubSpot API Key",
      key: "hs_***************",
      provider: "hubspot",
      permissions: ["read:contacts", "write:deals", "read:companies"],
      lastUsed: "2024-01-14T16:45:00Z",
      createdAt: "2024-01-10T00:00:00Z",
      status: "active",
    },
  ];

  const webhooksData: WebhookEndpoint[] = [
    {
      id: "webhook-1",
      name: "QuickBooks Customer Updates",
      url: "https://api.yourapp.com/webhooks/quickbooks/customers",
      provider: "quickbooks",
      events: ["customer.created", "customer.updated", "customer.deleted"],
      secret: "qb_webhook_secret_***",
      status: "active",
      lastTriggered: "2024-01-15T10:30:00Z",
      successCount: 1247,
      failureCount: 3,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "webhook-2",
      name: "Stripe Payment Events",
      url: "https://api.yourapp.com/webhooks/stripe/payments",
      provider: "stripe",
      events: [
        "payment_intent.succeeded",
        "payment_intent.payment_failed",
        "invoice.payment_succeeded",
      ],
      secret: "stripe_webhook_secret_***",
      status: "active",
      lastTriggered: "2024-01-15T11:00:00Z",
      successCount: 892,
      failureCount: 12,
      createdAt: "2024-01-05T00:00:00Z",
    },
    {
      id: "webhook-3",
      name: "HubSpot Contact Sync",
      url: "https://api.yourapp.com/webhooks/hubspot/contacts",
      provider: "hubspot",
      events: [
        "contact.propertyChange",
        "contact.creation",
        "contact.deletion",
      ],
      secret: "hs_webhook_secret_***",
      status: "error",
      lastTriggered: "2024-01-14T16:45:00Z",
      successCount: 2156,
      failureCount: 45,
      createdAt: "2024-01-10T00:00:00Z",
    },
  ];

  // Simulate API calls
  useEffect(() => {
    setSyncJobs(syncJobsData);
    setQuickBooksData(quickBooksDataSample);
    setApiKeys(apiKeysData);
    setWebhooks(webhooksData);
  }, []);

  const handleConnect = async (integrationId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
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

  const handleSync = async (integrationId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setNotifications((prev) => [
        ...prev,
        `Sync completed for ${integrations.find((i) => i.id === integrationId)?.name}`,
      ]);
    } catch (error) {
      setNotifications((prev) => [...prev, `Sync failed`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickBooksOAuth = () => {
    // Simulate OAuth flow
    const authUrl = "https://appcenter.intuit.com/connect/oauth2";
    window.open(authUrl, "quickbooks-auth", "width=600,height=700");
    setNotifications((prev) => [
      ...prev,
      "QuickBooks authorization window opened",
    ]);
  };

  const handleCreateApiKey = () => {
    if (newApiKey.name && newApiKey.provider) {
      const apiKey: APIKey = {
        id: `api-${Date.now()}`,
        name: newApiKey.name,
        key: `${newApiKey.provider}_***************`,
        provider: newApiKey.provider,
        permissions: newApiKey.permissions,
        createdAt: new Date().toISOString(),
        status: "active",
      };
      setApiKeys((prev) => [...prev, apiKey]);
      setNewApiKey({ name: "", provider: "", permissions: [] });
      setShowApiKeyDialog(false);
      setNotifications((prev) => [
        ...prev,
        `API key created for ${newApiKey.provider}`,
      ]);
    }
  };

  const handleCreateWebhook = () => {
    if (newWebhook.name && newWebhook.url && newWebhook.provider) {
      const webhook: WebhookEndpoint = {
        id: `webhook-${Date.now()}`,
        name: newWebhook.name,
        url: newWebhook.url,
        provider: newWebhook.provider,
        events: newWebhook.events,
        secret: `${newWebhook.provider}_webhook_secret_***`,
        status: "active",
        successCount: 0,
        failureCount: 0,
        createdAt: new Date().toISOString(),
      };
      setWebhooks((prev) => [...prev, webhook]);
      setNewWebhook({ name: "", url: "", provider: "", events: [] });
      setShowWebhookDialog(false);
      setNotifications((prev) => [
        ...prev,
        `Webhook created for ${newWebhook.provider}`,
      ]);
    }
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id));
    setNotifications((prev) => [...prev, "API key deleted"]);
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((webhook) => webhook.id !== id));
    setNotifications((prev) => [...prev, "Webhook deleted"]);
  };

  // Clear notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory =
      activeCategory === "all" || integration.category === activeCategory;
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !showConnected || integration.status === "connected";

    return matchesCategory && matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Plug className="h-8 w-8 text-white" />
                </div>
                Advanced Integrations & APIs
              </h1>
              <p className="text-gray-600 mt-2">
                Connect your business tools with powerful integrations and
                real-time synchronization
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Code className="mr-2 h-4 w-4" />
                API Documentation
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Integration
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
                  <p className="text-sm font-medium text-gray-600">Connected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      integrations.filter((i) => i.status === "connected")
                        .length
                    }
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      integrations.filter((i) => i.status === "available")
                        .length
                    }
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Plug className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Synced Records
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {integrations
                      .filter((i) => i.status === "connected")
                      .reduce((sum, i) => sum + (i.recordCount || 0), 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Sync Errors
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {integrations
                      .filter((i) => i.status === "connected")
                      .reduce((sum, i) => sum + (i.errorCount || 0), 0)}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="quickbooks">QuickBooks</TabsTrigger>
            <TabsTrigger value="sync-jobs">Sync Jobs</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={showConnected ? "default" : "outline"}
                  onClick={() => setShowConnected(!showConnected)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Connected Only
                </Button>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card
                  key={integration.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedIntegration(integration)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${integration.color}`}>
                          <div className="text-white">{integration.icon}</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {integration.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge
                          className={
                            integration.status === "connected"
                              ? "bg-green-500 text-white"
                              : integration.status === "available"
                                ? "bg-blue-500 text-white"
                                : integration.status === "error"
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-500 text-white"
                          }
                        >
                          {integration.status === "connected" && "Connected"}
                          {integration.status === "available" && "Available"}
                          {integration.status === "coming-soon" &&
                            "Coming Soon"}
                          {integration.status === "error" && "Error"}
                        </Badge>
                        {integration.syncStatus && (
                          <Badge
                            variant="outline"
                            className={
                              integration.syncStatus === "synced"
                                ? "border-green-500 text-green-700"
                                : integration.syncStatus === "syncing"
                                  ? "border-blue-500 text-blue-700"
                                  : "border-red-500 text-red-700"
                            }
                          >
                            {integration.syncStatus === "synced" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {integration.syncStatus === "syncing" && (
                              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                            )}
                            {integration.syncStatus === "error" && (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {integration.syncStatus}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {integration.status === "connected" && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Records</p>
                            <p className="font-semibold">
                              {integration.recordCount?.toLocaleString() || 0}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Last Sync</p>
                            <p className="font-semibold">
                              {integration.lastSync || "Never"}
                            </p>
                          </div>
                          {integration.errorCount !== undefined &&
                            integration.errorCount > 0 && (
                              <div className="col-span-2">
                                <p className="text-red-600 text-xs">
                                  {integration.errorCount} sync errors
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          Features
                        </h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            {integration.popularity}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {integration.features
                          .slice(0, 3)
                          .map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        {integration.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{integration.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            integration.setupComplexity === "easy"
                              ? "border-green-500 text-green-700"
                              : integration.setupComplexity === "medium"
                                ? "border-yellow-500 text-yellow-700"
                                : "border-red-500 text-red-700"
                          }
                        >
                          {integration.setupComplexity}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {integration.pricing}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {integration.status === "connected" ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSync(integration.id);
                              }}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Configure
                            </Button>
                          </>
                        ) : integration.status === "available" ? (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConnect(integration.id);
                            }}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Plus className="mr-2 h-4 w-4" />
                            )}
                            Connect
                          </Button>
                        ) : (
                          <Button size="sm" disabled>
                            <Clock className="mr-2 h-4 w-4" />
                            Coming Soon
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* QuickBooks Tab */}
          <TabsContent value="quickbooks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                QuickBooks Integration
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleQuickBooksOAuth}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Reconnect
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
              </div>
            </div>

            {quickBooksData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">
                          {quickBooksData.companyInfo?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {quickBooksData.companyInfo?.address}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Phone:</span>
                        <span className="text-sm font-medium">
                          {quickBooksData.companyInfo?.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Email:</span>
                        <span className="text-sm font-medium">
                          {quickBooksData.companyInfo?.email}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Sync Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {quickBooksData.customers}
                        </p>
                        <p className="text-sm text-gray-600">Customers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {quickBooksData.invoices}
                        </p>
                        <p className="text-sm text-gray-600">Invoices</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {quickBooksData.payments}
                        </p>
                        <p className="text-sm text-gray-600">Payments</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          {quickBooksData.items}
                        </p>
                        <p className="text-sm text-gray-600">Items</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Sync:</span>
                      <span className="text-sm font-medium">
                        {quickBooksData.lastSync}
                      </span>
                    </div>
                    {quickBooksData.syncInProgress && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Sync in progress...</span>
                        </div>
                        <Progress value={65} className="mt-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Sync Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Data Types to Sync</h4>
                    <div className="space-y-3">
                      {[
                        "Customers",
                        "Invoices",
                        "Payments",
                        "Items",
                        "Expenses",
                      ].map((type) => (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <Label htmlFor={type.toLowerCase()}>{type}</Label>
                          <Switch id={type.toLowerCase()} defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Sync Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="sync-frequency">Sync Frequency</Label>
                        <Select defaultValue="hourly">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-sync">Auto Sync</Label>
                        <Switch id="auto-sync" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="webhook-notifications">
                          Webhook Notifications
                        </Label>
                        <Switch id="webhook-notifications" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={() => handleSync("quickbooks")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Sync Now
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sync Jobs Tab */}
          <TabsContent value="sync-jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Sync Jobs</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {syncJobs.map((job) => {
                const integration = integrations.find(
                  (i) => i.id === job.integrationId,
                );
                return (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {integration && (
                            <div
                              className={`p-2 rounded-lg ${integration.color}`}
                            >
                              <div className="text-white">
                                {integration.icon}
                              </div>
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold">
                              {integration?.name} - {job.entityType}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {job.type} sync • Started{" "}
                              {new Date(job.startedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={
                            job.status === "completed"
                              ? "bg-green-500 text-white"
                              : job.status === "running"
                                ? "bg-blue-500 text-white"
                                : job.status === "failed"
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-500 text-white"
                          }
                        >
                          {job.status === "running" && (
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                          )}
                          {job.status === "completed" && (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          {job.status === "failed" && (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {job.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold">
                            {job.recordsProcessed}
                          </p>
                          <p className="text-sm text-gray-600">Processed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-green-600">
                            {job.recordsSucceeded}
                          </p>
                          <p className="text-sm text-gray-600">Succeeded</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-red-600">
                            {job.recordsFailed}
                          </p>
                          <p className="text-sm text-gray-600">Failed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold">
                            {job.duration
                              ? `${Math.round(job.duration / 1000)}s`
                              : "-"}
                          </p>
                          <p className="text-sm text-gray-600">Duration</p>
                        </div>
                      </div>

                      {job.recordsProcessed > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>
                              {Math.round(
                                (job.recordsSucceeded / job.recordsProcessed) *
                                  100,
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              (job.recordsSucceeded / job.recordsProcessed) *
                              100
                            }
                          />
                        </div>
                      )}

                      {job.errors.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-red-600 mb-2">
                            Errors ({job.errors.length})
                          </h4>
                          <div className="space-y-1">
                            {job.errors.slice(0, 3).map((error, index) => (
                              <p
                                key={index}
                                className="text-sm text-red-600 bg-red-50 p-2 rounded"
                              >
                                {error}
                              </p>
                            ))}
                            {job.errors.length > 3 && (
                              <p className="text-sm text-gray-600">
                                +{job.errors.length - 3} more errors
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 mt-4">
                        {job.status === "failed" && (
                          <Button size="sm" variant="outline">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Retry
                          </Button>
                        )}
                        {job.status === "running" && (
                          <Button size="sm" variant="outline">
                            <Square className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
              <Button onClick={() => setShowApiKeyDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create API Key
              </Button>
            </div>

            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Key className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{apiKey.name}</h3>
                          <p className="text-sm text-gray-600">
                            {apiKey.provider}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            apiKey.status === "active"
                              ? "bg-green-500 text-white"
                              : apiKey.status === "expired"
                                ? "bg-red-500 text-white"
                                : "bg-gray-500 text-white"
                          }
                        >
                          {apiKey.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteApiKey(apiKey.id)}
                        >
                          <FileX className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">API Key</span>
                        <Button size="sm" variant="ghost">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <code className="text-sm font-mono bg-white p-2 rounded border block">
                        {apiKey.key}
                      </code>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <p className="font-medium">
                          {new Date(apiKey.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Used:</span>
                        <p className="font-medium">
                          {apiKey.lastUsed
                            ? new Date(apiKey.lastUsed).toLocaleDateString()
                            : "Never"}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Permissions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {apiKey.permissions.map((permission, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Webhooks</h2>
              <Button onClick={() => setShowWebhookDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Webhook
              </Button>
            </div>

            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <Card key={webhook.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Webhook className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{webhook.name}</h3>
                          <p className="text-sm text-gray-600">
                            {webhook.provider}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            webhook.status === "active"
                              ? "bg-green-500 text-white"
                              : webhook.status === "error"
                                ? "bg-red-500 text-white"
                                : "bg-gray-500 text-white"
                          }
                        >
                          {webhook.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteWebhook(webhook.id)}
                        >
                          <FileX className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Endpoint URL:
                        </span>
                        <code className="block text-sm font-mono bg-gray-50 p-2 rounded border mt-1">
                          {webhook.url}
                        </code>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Events:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {webhook.events.map((event, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Created:</span>
                          <p className="font-medium">
                            {new Date(webhook.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Triggered:</span>
                          <p className="font-medium">
                            {webhook.lastTriggered
                              ? new Date(
                                  webhook.lastTriggered,
                                ).toLocaleDateString()
                              : "Never"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Success Count:</span>
                          <p className="font-medium text-green-600">
                            {webhook.successCount}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Failure Count:</span>
                          <p className="font-medium text-red-600">
                            {webhook.failureCount}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Play className="mr-2 h-4 w-4" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Logs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create API Key Dialog */}
        <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Generate a new API key for integration access.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="api-key-name">Name</Label>
                <Input
                  id="api-key-name"
                  value={newApiKey.name}
                  onChange={(e) =>
                    setNewApiKey((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter API key name"
                />
              </div>
              <div>
                <Label htmlFor="api-key-provider">Provider</Label>
                <Select
                  value={newApiKey.provider}
                  onValueChange={(value) =>
                    setNewApiKey((prev) => ({ ...prev, provider: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quickbooks">QuickBooks</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="hubspot">HubSpot</SelectItem>
                    <SelectItem value="mailchimp">Mailchimp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "read:customers",
                    "write:customers",
                    "read:invoices",
                    "write:invoices",
                    "read:payments",
                    "write:payments",
                  ].map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={permission}
                        checked={newApiKey.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewApiKey((prev) => ({
                              ...prev,
                              permissions: [...prev.permissions, permission],
                            }));
                          } else {
                            setNewApiKey((prev) => ({
                              ...prev,
                              permissions: prev.permissions.filter(
                                (p) => p !== permission,
                              ),
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={permission} className="text-sm">
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApiKeyDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateApiKey}>Create API Key</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Webhook Dialog */}
        <Dialog open={showWebhookDialog} onOpenChange={setShowWebhookDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Webhook</DialogTitle>
              <DialogDescription>
                Set up a new webhook endpoint for real-time notifications.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="webhook-name">Name</Label>
                <Input
                  id="webhook-name"
                  value={newWebhook.name}
                  onChange={(e) =>
                    setNewWebhook((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter webhook name"
                />
              </div>
              <div>
                <Label htmlFor="webhook-url">Endpoint URL</Label>
                <Input
                  id="webhook-url"
                  value={newWebhook.url}
                  onChange={(e) =>
                    setNewWebhook((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://your-app.com/webhooks/endpoint"
                />
              </div>
              <div>
                <Label htmlFor="webhook-provider">Provider</Label>
                <Select
                  value={newWebhook.provider}
                  onValueChange={(value) =>
                    setNewWebhook((prev) => ({ ...prev, provider: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quickbooks">QuickBooks</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="hubspot">HubSpot</SelectItem>
                    <SelectItem value="mailchimp">Mailchimp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Events</Label>
                <div className="grid grid-cols-1 gap-2 mt-2 max-h-32 overflow-y-auto">
                  {[
                    "customer.created",
                    "customer.updated",
                    "customer.deleted",
                    "invoice.created",
                    "invoice.updated",
                    "payment.succeeded",
                    "payment.failed",
                  ].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={event}
                        checked={newWebhook.events.includes(event)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewWebhook((prev) => ({
                              ...prev,
                              events: [...prev.events, event],
                            }));
                          } else {
                            setNewWebhook((prev) => ({
                              ...prev,
                              events: prev.events.filter((ev) => ev !== event),
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={event} className="text-sm">
                        {event}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowWebhookDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateWebhook}>Create Webhook</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default IntegrationsHub;
