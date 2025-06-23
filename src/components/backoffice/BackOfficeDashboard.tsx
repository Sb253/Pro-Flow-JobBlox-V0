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
  Wrench,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  User,
  Bot,
  Brain,
  Wand2,
  BarChart3,
  Shield,
  Database,
  Activity,
  CreditCard,
  UserPlus,
  Globe,
  Zap,
  Target,
  Award,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface BackOfficeStats {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
}

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
}

interface RecentActivity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "user" | "system" | "security" | "data";
}

const BackOfficeDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  const backOfficeStats: BackOfficeStats[] = [
    {
      title: "Total Revenue",
      value: "$247,830",
      change: "+12% from last month",
      trend: "up",
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Active Tenants",
      value: "189",
      change: "+8% from last month",
      trend: "up",
      icon: <Building className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "Last 30 days uptime",
      trend: "neutral",
      icon: <Activity className="h-6 w-6" />,
      color: "bg-cyan-500",
    },
    {
      title: "Support Tickets",
      value: "23",
      change: "-15% from last week",
      trend: "down",
      icon: <AlertCircle className="h-6 w-6" />,
      color: "bg-orange-500",
    },
    {
      title: "New Signups",
      value: "47",
      change: "+23% from last week",
      trend: "up",
      icon: <UserPlus className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Data Storage",
      value: "2.4TB",
      change: "78% of capacity",
      trend: "neutral",
      icon: <Database className="h-6 w-6" />,
      color: "bg-red-500",
    },
  ];

  const systemMetrics: SystemMetric[] = [
    {
      name: "CPU Usage",
      value: 45,
      max: 100,
      unit: "%",
      status: "healthy",
    },
    {
      name: "Memory Usage",
      value: 68,
      max: 100,
      unit: "%",
      status: "healthy",
    },
    {
      name: "Disk Usage",
      value: 82,
      max: 100,
      unit: "%",
      status: "warning",
    },
    {
      name: "Network I/O",
      value: 34,
      max: 100,
      unit: "Mbps",
      status: "healthy",
    },
    {
      name: "Database Connections",
      value: 156,
      max: 200,
      unit: "conn",
      status: "healthy",
    },
    {
      name: "API Response Time",
      value: 245,
      max: 1000,
      unit: "ms",
      status: "healthy",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      action: "New tenant registration",
      user: "System",
      timestamp: "2 minutes ago",
      type: "user",
    },
    {
      id: "2",
      action: "Database backup completed",
      user: "System",
      timestamp: "15 minutes ago",
      type: "system",
    },
    {
      id: "3",
      action: "Security scan completed",
      user: "Security Bot",
      timestamp: "32 minutes ago",
      type: "security",
    },
    {
      id: "4",
      action: "Data export requested",
      user: "Admin User",
      timestamp: "1 hour ago",
      type: "data",
    },
    {
      id: "5",
      action: "System maintenance scheduled",
      user: "System",
      timestamp: "2 hours ago",
      type: "system",
    },
  ];

  const getMetricColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "system":
        return <Settings className="h-4 w-4 text-green-500" />;
      case "security":
        return <Shield className="h-4 w-4 text-red-500" />;
      case "data":
        return <Database className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default:
        return <TrendingUp className="h-3 w-3 text-gray-500" />;
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
                  Back Office Dashboard
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  System administration and monitoring
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin")}
            >
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {user?.role || "Admin"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
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
          <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-slate-800">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backOfficeStats.map((stat, index) => (
                <Card key={index} className="bg-white dark:bg-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                          {stat.value}
                        </p>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {stat.title}
                        </p>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(stat.trend)}
                          <p className="text-xs text-slate-500">
                            {stat.change}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${stat.color} text-white`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* System Metrics & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>System Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {metric.name}
                        </span>
                        <span
                          className={`text-sm font-medium ${getMetricColor(metric.status)}`}
                        >
                          {metric.value}
                          {metric.unit}
                        </span>
                      </div>
                      <Progress
                        value={(metric.value / metric.max) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700"
                        >
                          {getActivityIcon(activity.type)}
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {activity.action}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              by {activity.user} • {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks and system operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 bg-blue-500 hover:bg-blue-600 flex flex-col items-center justify-center space-y-2">
                    <Database className="h-6 w-6" />
                    <span className="text-sm">Backup System</span>
                  </Button>
                  <Button className="h-20 bg-green-500 hover:bg-green-600 flex flex-col items-center justify-center space-y-2">
                    <RefreshCw className="h-6 w-6" />
                    <span className="text-sm">Restart Services</span>
                  </Button>
                  <Button className="h-20 bg-purple-500 hover:bg-purple-600 flex flex-col items-center justify-center space-y-2">
                    <Download className="h-6 w-6" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                  <Button className="h-20 bg-orange-500 hover:bg-orange-600 flex flex-col items-center justify-center space-y-2">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Security Scan</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Server Status</CardTitle>
                  <CardDescription>
                    Real-time server performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        99.9%
                      </div>
                      <div className="text-sm text-green-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        245ms
                      </div>
                      <div className="text-sm text-blue-600">Response Time</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Load Average</span>
                      <Badge className="bg-green-100 text-green-800">
                        Normal
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Disk I/O</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Moderate
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Network Traffic</span>
                      <Badge className="bg-green-100 text-green-800">Low</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Database Status</CardTitle>
                  <CardDescription>
                    Database performance and health metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        156
                      </div>
                      <div className="text-sm text-blue-600">Connections</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        2.4TB
                      </div>
                      <div className="text-sm text-purple-600">
                        Storage Used
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Query Performance</span>
                      <Badge className="bg-green-100 text-green-800">
                        Optimal
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Replication Lag</span>
                      <Badge className="bg-green-100 text-green-800">0ms</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Backup Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        Current
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage system users and access permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    User management interface would be implemented here
                  </p>
                  <Button className="mt-4">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Security Center</CardTitle>
                <CardDescription>
                  Monitor security events and manage access controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Security management interface would be implemented here
                  </p>
                  <Button className="mt-4">
                    <Shield className="mr-2 h-4 w-4" />
                    Run Security Scan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>
                  Generate and view system reports and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Reports and analytics interface would be implemented here
                  </p>
                  <Button className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    System settings interface would be implemented here
                  </p>
                  <Button className="mt-4">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Settings
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

export default BackOfficeDashboard;
