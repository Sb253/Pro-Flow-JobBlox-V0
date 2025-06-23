import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Smartphone,
  Tablet,
  Monitor,
  Users,
  MapPin,
  Camera,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Bell,
  Search,
  Filter,
  Plus,
  Menu,
  Home,
  Briefcase,
  Calendar,
  Phone,
  Mail,
  Navigation,
  Star,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Shield,
  Target,
  Award,
  Wrench,
  HardHat,
  Truck,
  Package,
  ClipboardList,
  Timer,
  Globe,
  Cloud,
  Database,
  Eye,
  Edit,
  Trash2,
  Save,
  Send,
  Share,
  Copy,
  Link,
  QrCode,
  Scan,
  Fingerprint,
  Lock,
  Unlock,
  Key,
  UserCheck,
  UserX,
  UserPlus,
  Users2,
  Building,
  Factory,
  Store,
  Warehouse,
  Office,
  Construction,
  Hammer,
  Drill,
  Ruler,
  PaintBucket,
  Scissors,
  Flashlight,
  Compass,
  Route,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Walk,
  Run,
  Flag,
  Tag,
  Bookmark,
  Heart,
  ThumbsUp,
  MessageCircle,
  Share2,
  Forward,
  Reply,
  Archive,
  Folder,
  File,
  Image,
  Video,
  Music,
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Laptop,
  Mouse,
  Keyboard,
  Printer,
  Scanner,
  Gamepad2,
  Joystick,
  Dices,
  Puzzle,
  Trophy,
  Medal,
  Crown,
  Gift,
  PartyPopper,
  Cake,
  Coffee,
  Pizza,
  Apple,
  Banana,
  Cherry,
  Grape,
  Orange,
  Strawberry,
  Carrot,
  Corn,
  Leaf,
  Tree,
  Flower,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Rainbow,
  Umbrella,
  Snowflake,
  Thermometer,
  Wind,
  Waves,
  Mountain,
  Volcano,
  Island,
  Desert,
  Forest,
  Park,
  Tent,
  Campfire,
  Backpack,
  Map,
  Binoculars,
  Film,
  Clapperboard,
  Megaphone,
  Speaker,
  Podcast,
  Rss,
  Bluetooth,
  Usb,
  HardDrive,
  Cpu,
  MemoryStick,
  SdCard,
  Disc,
  Disc2,
  Disc3,
  DiscAlbum,
  Cassette,
  Vinyl,
  Headset,
  Microphone,
  MicrophoneOff,
  VolumeUp,
  VolumeDown,
  VolumeMute,
  PlayCircle,
  PauseCircle,
  StopCircle,
  FastForward,
  Rewind,
  Repeat1,
  RepeatOnce,
  ListMusic,
  Music2,
  Music3,
  Music4,
  Drum,
  Guitar,
  Piano,
  Violin,
  Trumpet,
  Saxophone,
  Flute,
  Harp,
  Banjo,
  Accordion,
  Harmonica,
  Maracas,
  Tambourine,
  Triangle,
  Gong,
  Chimes,
  Metronome,
  TuningFork,
  MusicNote,
  MusicNotes,
  X,
} from "lucide-react";

interface MobileApp {
  id: string;
  name: string;
  description: string;
  platform: "ios" | "android" | "web";
  version: string;
  downloads: number;
  rating: number;
  features: string[];
  screenshots: string[];
  icon: React.ReactNode;
  color: string;
  status: "active" | "development" | "testing" | "deployed";
  lastUpdate: string;
}

interface DeviceInfo {
  type: "smartphone" | "tablet" | "desktop";
  os: string;
  version: string;
  battery: number;
  storage: { used: number; total: number };
  network: "wifi" | "4g" | "5g" | "offline";
  location: { lat: number; lng: number } | null;
  isOnline: boolean;
}

interface AppMetrics {
  totalUsers: number;
  activeUsers: number;
  dailyDownloads: number;
  crashRate: number;
  avgRating: number;
  totalReviews: number;
}

const MobileAppDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncProgress, setSyncProgress] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: "smartphone",
    os: "Android 14",
    version: "14.0",
    battery: 78,
    storage: { used: 45, total: 128 },
    network: "wifi",
    location: { lat: 40.7128, lng: -74.006 },
    isOnline: true,
  });

  const [appMetrics, setAppMetrics] = useState<AppMetrics>({
    totalUsers: 3210,
    activeUsers: 1847,
    dailyDownloads: 156,
    crashRate: 0.02,
    avgRating: 4.6,
    totalReviews: 892,
  });

  const mobileApps: MobileApp[] = [
    {
      id: "field-ops",
      name: "Field Operations",
      description:
        "Complete mobile solution for field workers with photo documentation, GPS tracking, and offline sync.",
      platform: "android",
      version: "2.1.0",
      downloads: 1250,
      rating: 4.8,
      status: "deployed",
      lastUpdate: "2 days ago",
      features: [
        "Photo Documentation with GPS",
        "Offline Data Sync",
        "Real-time Location Tracking",
        "Task Management",
        "Document Scanning",
        "Digital Signatures",
        "Team Communication",
      ],
      screenshots: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
      ],
      icon: <Smartphone className="h-8 w-8" />,
      color: "bg-blue-500",
    },
    {
      id: "sales-mobile",
      name: "Sales Mobile",
      description:
        "Mobile CRM for sales representatives with lead management, quote generation, and client communication.",
      platform: "ios",
      version: "1.8.2",
      downloads: 890,
      rating: 4.6,
      status: "active",
      lastUpdate: "1 week ago",
      features: [
        "Lead Management",
        "Quote Generation",
        "Client Communication",
        "Calendar Integration",
        "Expense Tracking",
        "Performance Analytics",
        "Offline Access",
      ],
      screenshots: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      ],
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-green-500",
    },
    {
      id: "contractor-hub",
      name: "Contractor Hub",
      description:
        "Specialized app for subcontractors with job scheduling, material tracking, and payment management.",
      platform: "android",
      version: "1.5.1",
      downloads: 650,
      rating: 4.4,
      status: "testing",
      lastUpdate: "3 days ago",
      features: [
        "Job Scheduling",
        "Material Tracking",
        "Payment Management",
        "Time Tracking",
        "Equipment Management",
        "Safety Compliance",
        "Progress Reporting",
      ],
      screenshots: [
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
      ],
      icon: <HardHat className="h-8 w-8" />,
      color: "bg-orange-500",
    },
    {
      id: "supervisor-pro",
      name: "Supervisor Pro",
      description:
        "Management app for supervisors with team oversight, quality control, and project coordination.",
      platform: "web",
      version: "3.0.0",
      downloads: 420,
      rating: 4.9,
      status: "development",
      lastUpdate: "5 days ago",
      features: [
        "Team Oversight",
        "Quality Control",
        "Project Coordination",
        "Resource Management",
        "Performance Monitoring",
        "Compliance Tracking",
        "Reporting Dashboard",
      ],
      screenshots: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80",
      ],
      icon: <Shield className="h-8 w-8" />,
      color: "bg-purple-500",
    },
  ];

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setDeviceInfo((prev) => ({ ...prev, isOnline: true }));
    };
    const handleOffline = () => {
      setIsOnline(false);
      setDeviceInfo((prev) => ({ ...prev, isOnline: false }));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "ios":
        return <Apple className="h-4 w-4" />;
      case "android":
        return <Smartphone className="h-4 w-4" />;
      case "web":
        return <Globe className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-500", label: "Active" },
      development: { color: "bg-blue-500", label: "Development" },
      testing: { color: "bg-yellow-500", label: "Testing" },
      deployed: { color: "bg-purple-500", label: "Deployed" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getNetworkIcon = (network: string) => {
    switch (network) {
      case "wifi":
        return <Wifi className="h-4 w-4 text-green-500" />;
      case "5g":
        return <Signal className="h-4 w-4 text-blue-500" />;
      case "4g":
        return <Signal className="h-4 w-4 text-orange-500" />;
      case "offline":
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return <Signal className="h-4 w-4" />;
    }
  };

  const syncData = async () => {
    if (!isOnline) return;

    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Smartphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Mobile App Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Construction Management Suite
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Device Status */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
              {getNetworkIcon(deviceInfo.network)}
              <Battery className="h-4 w-4" />
              <span className="text-sm">{deviceInfo.battery}%</span>
            </div>

            {/* Sync Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={syncData}
              disabled={!isOnline}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync
            </Button>

            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sync Progress */}
        {syncProgress > 0 && syncProgress < 100 && (
          <div className="px-4 pb-2">
            <Progress value={syncProgress} className="h-1" />
            <p className="text-xs text-muted-foreground mt-1">
              Syncing data... {syncProgress}%
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Total Users</p>
                      <p className="text-2xl font-bold">
                        {appMetrics.totalUsers.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Active Users</p>
                      <p className="text-2xl font-bold">
                        {appMetrics.activeUsers.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Download className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Daily Downloads</p>
                      <p className="text-2xl font-bold">
                        {appMetrics.dailyDownloads}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Avg Rating</p>
                      <p className="text-2xl font-bold">
                        {appMetrics.avgRating}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Field Operations v2.1.0 deployed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        New user registrations: +47
                      </p>
                      <p className="text-xs text-muted-foreground">
                        4 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Contractor Hub entered testing phase
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    <span className="text-sm">New App</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <Upload className="h-6 w-6 mb-2" />
                    <span className="text-sm">Deploy</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span className="text-sm">Analytics</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <Settings className="h-6 w-6 mb-2" />
                    <span className="text-sm">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Mobile Applications</h2>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New App
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileApps.map((app) => (
                <Card
                  key={app.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    setSelectedApp(selectedApp === app.id ? null : app.id)
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 ${app.color} rounded-lg text-white`}
                        >
                          {app.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{app.name}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            {getPlatformIcon(app.platform)}
                            <span className="ml-1 capitalize">
                              {app.platform}
                            </span>
                            <span className="ml-2">v{app.version}</span>
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {app.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div>
                        <p className="text-lg font-bold">
                          {app.downloads.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Downloads
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-bold flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {app.rating}
                        </p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          {app.features.length}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Features
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Updated {app.lastUpdate}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {selectedApp === app.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="text-sm font-medium mb-2">
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 gap-1">
                          {app.features.slice(0, 4).map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center text-xs"
                            >
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                              {feature}
                            </div>
                          ))}
                          {app.features.length > 4 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              +{app.features.length - 4} more features
                            </p>
                          )}
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" className="flex-1">
                            <Play className="h-3 w-3 mr-1" />
                            Launch
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
              <Select defaultValue="7d">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">App Performance</p>
                      <p className="text-2xl font-bold">98.2%</p>
                      <p className="text-xs text-green-600">
                        +2.1% from last week
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Crash Rate</p>
                      <p className="text-2xl font-bold">
                        {(appMetrics.crashRate * 100).toFixed(2)}%
                      </p>
                      <p className="text-xs text-green-600">
                        -0.5% from last week
                      </p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">User Retention</p>
                      <p className="text-2xl font-bold">87.5%</p>
                      <p className="text-xs text-green-600">
                        +3.2% from last week
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
                      <p className="text-sm font-medium">Session Duration</p>
                      <p className="text-2xl font-bold">12.4m</p>
                      <p className="text-xs text-green-600">
                        +1.8m from last week
                      </p>
                    </div>
                    <Timer className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>App Usage by Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <span className="text-sm">Android</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={65} className="w-20 h-2" />
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Apple className="h-4 w-4" />
                        <span className="text-sm">iOS</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={25} className="w-20 h-2" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">Web</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={10} className="w-20 h-2" />
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <span className="text-sm">Photo Documentation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={89} className="w-20 h-2" />
                        <span className="text-sm font-medium">89%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">GPS Tracking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={76} className="w-20 h-2" />
                        <span className="text-sm font-medium">76%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4" />
                        <span className="text-sm">Offline Sync</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={62} className="w-20 h-2" />
                        <span className="text-sm font-medium">62%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Device Management</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </div>

            {/* Current Device Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Current Device
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Device Information</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Type: {deviceInfo.type}</p>
                      <p>OS: {deviceInfo.os}</p>
                      <p>Version: {deviceInfo.version}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Status</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Battery</span>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={deviceInfo.battery}
                            className="w-16 h-2"
                          />
                          <span className="text-sm">{deviceInfo.battery}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Storage</span>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={
                              (deviceInfo.storage.used /
                                deviceInfo.storage.total) *
                              100
                            }
                            className="w-16 h-2"
                          />
                          <span className="text-sm">
                            {deviceInfo.storage.used}GB/
                            {deviceInfo.storage.total}GB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Connectivity</p>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getNetworkIcon(deviceInfo.network)}
                        <span className="text-sm capitalize">
                          {deviceInfo.network}
                        </span>
                        <Badge
                          className={isOnline ? "bg-green-500" : "bg-red-500"}
                        >
                          {isOnline ? "Online" : "Offline"}
                        </Badge>
                      </div>
                      {deviceInfo.location && (
                        <p className="text-xs text-muted-foreground">
                          Location: {deviceInfo.location.lat.toFixed(4)},{" "}
                          {deviceInfo.location.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Device Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <RefreshCw className="h-5 w-5 mb-1" />
                    <span className="text-sm">Sync Data</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <Download className="h-5 w-5 mb-1" />
                    <span className="text-sm">Download Logs</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <Shield className="h-5 w-5 mb-1" />
                    <span className="text-sm">Security Scan</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <Settings className="h-5 w-5 mb-1" />
                    <span className="text-sm">Configure</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* App Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-sync</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically sync data when online
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Enabled
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive app notifications
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Location Services</p>
                      <p className="text-sm text-muted-foreground">
                        Allow GPS tracking
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Biometric Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Use fingerprint or face unlock
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Fingerprint className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Encryption</p>
                      <p className="text-sm text-muted-foreground">
                        Encrypt local data storage
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Lock className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Remote Wipe</p>
                      <p className="text-sm text-muted-foreground">
                        Enable remote data deletion
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <Database className="h-5 w-5 mb-1" />
                    <span className="text-sm">Clear Cache</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <Download className="h-5 w-5 mb-1" />
                    <span className="text-sm">Export Data</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <Upload className="h-5 w-5 mb-1" />
                    <span className="text-sm">Import Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileAppDashboard;
