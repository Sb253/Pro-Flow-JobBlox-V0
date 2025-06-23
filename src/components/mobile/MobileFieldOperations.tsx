import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  Camera,
  MapPin,
  Clock,
  Upload,
  Download,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  FileText,
  Signature,
  Image,
  Scan,
  Users,
  Briefcase,
  Calendar,
  Phone,
  Mail,
  Navigation,
  Battery,
  Signal,
  Smartphone,
  Tablet,
  Monitor,
  RefreshCw,
  Save,
  Send,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  Star,
  Flag,
  Tag,
  Filter,
  Search,
  Settings,
  User,
  Building,
  Wrench,
  HardHat,
  Truck,
  Package,
  ClipboardList,
  Timer,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Shield,
  Lock,
  Unlock,
  Key,
  Database,
  Cloud,
  CloudOff,
  Sync,
  SyncOff,
  Globe,
  Compass,
  Route,
  Car,
  Home,
  Office,
  Factory,
  Store,
  Warehouse,
} from "lucide-react";

interface JobSite {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  status: "active" | "completed" | "pending" | "on-hold";
  priority: "high" | "medium" | "low";
  assignedWorkers: string[];
  estimatedCompletion: string;
  progress: number;
  lastUpdate: string;
  photos: Photo[];
  documents: Document[];
  tasks: Task[];
}

interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  timestamp: string;
  location: { lat: number; lng: number };
  description: string;
  tags: string[];
  uploadedBy: string;
  synced: boolean;
}

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "signature" | "scan";
  url: string;
  timestamp: string;
  size: number;
  synced: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "high" | "medium" | "low";
  assignedTo: string;
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
  photos: string[];
  notes: string;
}

interface Worker {
  id: string;
  name: string;
  role: "field_worker" | "sales_rep" | "subcontractor" | "supervisor";
  avatar: string;
  status: "online" | "offline" | "on-site" | "traveling";
  currentLocation?: { lat: number; lng: number };
  assignedJobs: string[];
  skills: string[];
  rating: number;
  completedTasks: number;
}

const MobileFieldOperations: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [pendingUploads, setPendingUploads] = useState(0);
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockJobs: JobSite[] = [
    {
      id: "1",
      name: "Downtown Office Renovation",
      address: "123 Business Ave, Downtown",
      coordinates: { lat: 40.7128, lng: -74.006 },
      status: "active",
      priority: "high",
      assignedWorkers: ["worker1", "worker2"],
      estimatedCompletion: "2024-02-15",
      progress: 65,
      lastUpdate: "2 hours ago",
      photos: [],
      documents: [],
      tasks: [
        {
          id: "t1",
          title: "Install new flooring",
          description: "Replace carpet with hardwood in main office area",
          status: "in-progress",
          priority: "high",
          assignedTo: "worker1",
          dueDate: "2024-01-20",
          estimatedHours: 16,
          actualHours: 8,
          photos: [],
          notes: "Materials delivered, started installation",
        },
      ],
    },
    {
      id: "2",
      name: "Residential Kitchen Remodel",
      address: "456 Maple Street, Suburbs",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      status: "pending",
      priority: "medium",
      assignedWorkers: ["worker3"],
      estimatedCompletion: "2024-03-01",
      progress: 25,
      lastUpdate: "1 day ago",
      photos: [],
      documents: [],
      tasks: [],
    },
    {
      id: "3",
      name: "Warehouse Expansion",
      address: "789 Industrial Blvd, Industrial District",
      coordinates: { lat: 40.6892, lng: -74.0445 },
      status: "completed",
      priority: "low",
      assignedWorkers: ["worker2", "worker4"],
      estimatedCompletion: "2024-01-10",
      progress: 100,
      lastUpdate: "3 days ago",
      photos: [],
      documents: [],
      tasks: [],
    },
  ];

  const mockWorkers: Worker[] = [
    {
      id: "worker1",
      name: "Mike Johnson",
      role: "field_worker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      status: "on-site",
      currentLocation: { lat: 40.7128, lng: -74.006 },
      assignedJobs: ["1"],
      skills: ["Flooring", "Electrical", "Plumbing"],
      rating: 4.8,
      completedTasks: 127,
    },
    {
      id: "worker2",
      name: "Sarah Davis",
      role: "supervisor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      status: "online",
      assignedJobs: ["1", "3"],
      skills: ["Project Management", "Quality Control"],
      rating: 4.9,
      completedTasks: 89,
    },
    {
      id: "worker3",
      name: "Tom Wilson",
      role: "sales_rep",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom",
      status: "traveling",
      assignedJobs: ["2"],
      skills: ["Sales", "Customer Relations", "Estimates"],
      rating: 4.7,
      completedTasks: 156,
    },
  ];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Get current location
    if (navigator.geolocation && gpsEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [gpsEnabled]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraOpen(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        // Convert to blob and save
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const photo: Photo = {
                id: Date.now().toString(),
                url,
                thumbnail: url,
                timestamp: new Date().toISOString(),
                location: currentLocation || { lat: 0, lng: 0 },
                description: "",
                tags: [],
                uploadedBy: "current-user",
                synced: isOnline,
              };

              // Add to pending uploads if offline
              if (!isOnline) {
                setPendingUploads((prev) => prev + 1);
              }

              console.log("Photo captured:", photo);
            }
          },
          "image/jpeg",
          0.8,
        );

        stopCamera();
      }
    }
  };

  const syncData = async () => {
    if (!isOnline) return;

    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPendingUploads(0);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-500", label: "Active" },
      pending: { color: "bg-yellow-500", label: "Pending" },
      completed: { color: "bg-blue-500", label: "Completed" },
      "on-hold": { color: "bg-red-500", label: "On Hold" },
      "in-progress": { color: "bg-orange-500", label: "In Progress" },
      blocked: { color: "bg-red-600", label: "Blocked" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: "bg-red-500", label: "High" },
      medium: { color: "bg-yellow-500", label: "Medium" },
      low: { color: "bg-green-500", label: "Low" },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "field_worker":
        return <HardHat className="h-4 w-4" />;
      case "sales_rep":
        return <Briefcase className="h-4 w-4" />;
      case "subcontractor":
        return <Wrench className="h-4 w-4" />;
      case "supervisor":
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Smartphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Field Operations</h1>
              <p className="text-xs text-muted-foreground">
                Mobile Command Center
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Connection Status */}
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                isOnline
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isOnline ? (
                <Wifi className="h-3 w-3" />
              ) : (
                <WifiOff className="h-3 w-3" />
              )}
              <span>{isOnline ? "Online" : "Offline"}</span>
            </div>

            {/* Sync Status */}
            {pendingUploads > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={syncData}
                disabled={!isOnline}
                className="text-xs"
              >
                <Upload className="h-3 w-3 mr-1" />
                {pendingUploads}
              </Button>
            )}

            {/* GPS Status */}
            <Button
              size="sm"
              variant={gpsEnabled ? "default" : "outline"}
              onClick={() => setGpsEnabled(!gpsEnabled)}
            >
              <MapPin className="h-3 w-3" />
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
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="dashboard" className="text-xs">
              <Home className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="jobs" className="text-xs">
              <Briefcase className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="camera" className="text-xs">
              <Camera className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="team" className="text-xs">
              <Users className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="sync" className="text-xs">
              <Database className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Active Jobs</p>
                      <p className="text-2xl font-bold">
                        {mockJobs.filter((j) => j.status === "active").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Completed</p>
                      <p className="text-2xl font-bold">
                        {
                          mockJobs.filter((j) => j.status === "completed")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Location */}
            {currentLocation && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Current Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Lat: {currentLocation.lat.toFixed(6)}, Lng:{" "}
                    {currentLocation.lng.toFixed(6)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Photo uploaded</p>
                      <p className="text-xs text-muted-foreground">
                        Downtown Office - 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Task completed</p>
                      <p className="text-xs text-muted-foreground">
                        Flooring installation - 4 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New job assigned</p>
                      <p className="text-xs text-muted-foreground">
                        Kitchen Remodel - 1 day ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Job Sites</h2>
              <Button size="sm" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-3">
              {mockJobs.map((job) => (
                <Card
                  key={job.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() =>
                    setSelectedJob(selectedJob === job.id ? null : job.id)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{job.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.address}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {getStatusBadge(job.status)}
                        {getPriorityBadge(job.priority)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progress: {job.progress}%</span>
                      <span>{job.lastUpdate}</span>
                    </div>

                    <Progress value={job.progress} className="h-1 mt-2" />

                    {selectedJob === job.id && (
                      <div className="mt-4 pt-4 border-t border-border space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            <Camera className="h-3 w-3 mr-1" />
                            Photos
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Documents
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            <ClipboardList className="h-3 w-3 mr-1" />
                            Tasks
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Navigate
                          </Button>
                        </div>

                        {job.tasks.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Active Tasks
                            </h4>
                            {job.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="p-2 bg-muted rounded-lg"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">
                                    {task.title}
                                  </span>
                                  {getStatusBadge(task.status)}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {task.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Camera Tab */}
          <TabsContent value="camera" className="space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">
                Photo Documentation
              </h2>

              {!cameraOpen ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={startCamera}
                      className="h-20 flex flex-col items-center justify-center"
                    >
                      <Camera className="h-8 w-8 mb-2" />
                      <span className="text-sm">Take Photo</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 mb-2" />
                      <span className="text-sm">Upload</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                    >
                      <Scan className="h-8 w-8 mb-2" />
                      <span className="text-sm">Scan Document</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                    >
                      <Signature className="h-8 w-8 mb-2" />
                      <span className="text-sm">Signature</span>
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      console.log("Files selected:", files);
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-64 object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={capturePhoto}
                      size="lg"
                      className="rounded-full w-16 h-16"
                    >
                      <Camera className="h-8 w-8" />
                    </Button>
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      size="lg"
                      className="rounded-full w-16 h-16"
                    >
                      <X className="h-8 w-8" />
                    </Button>
                  </div>

                  {currentLocation && (
                    <div className="text-xs text-muted-foreground">
                      <p>
                        GPS: {currentLocation.lat.toFixed(6)},{" "}
                        {currentLocation.lng.toFixed(6)}
                      </p>
                      <p>Timestamp: {new Date().toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Team Members</h2>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call All
              </Button>
            </div>

            <div className="space-y-3">
              {mockWorkers.map((worker) => (
                <Card key={worker.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                            worker.status === "online"
                              ? "bg-green-500"
                              : worker.status === "on-site"
                                ? "bg-blue-500"
                                : worker.status === "traveling"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                          }`}
                        ></div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-sm">{worker.name}</h3>
                          {getRoleIcon(worker.role)}
                        </div>
                        <p className="text-xs text-muted-foreground capitalize">
                          {worker.role.replace("_", " ")}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs">{worker.rating}</span>
                          <span className="text-xs text-muted-foreground">
                            • {worker.completedTasks} tasks
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <Mail className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {worker.assignedJobs.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs font-medium mb-1">
                          Assigned Jobs:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {worker.assignedJobs.map((jobId) => {
                            const job = mockJobs.find((j) => j.id === jobId);
                            return job ? (
                              <Badge
                                key={jobId}
                                variant="outline"
                                className="text-xs"
                              >
                                {job.name.split(" ")[0]}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sync Tab */}
          <TabsContent value="sync" className="space-y-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">
                Data Synchronization
              </h2>

              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {isOnline ? (
                        <Cloud className="h-5 w-5 text-green-500" />
                      ) : (
                        <CloudOff className="h-5 w-5 text-red-500" />
                      )}
                      <span className="font-medium">
                        {isOnline ? "Connected" : "Offline Mode"}
                      </span>
                    </div>
                    <Badge className={isOnline ? "bg-green-500" : "bg-red-500"}>
                      {isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>

                  {pendingUploads > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        {pendingUploads} items pending sync
                      </p>
                      <Button
                        onClick={syncData}
                        disabled={!isOnline}
                        className="w-full"
                      >
                        <Sync className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium">Photos</p>
                      <p className="text-muted-foreground">0 pending</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Documents</p>
                      <p className="text-muted-foreground">0 pending</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Tasks</p>
                      <p className="text-muted-foreground">0 pending</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Reports</p>
                      <p className="text-muted-foreground">0 pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Offline Data
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Sync Settings
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileFieldOperations;
