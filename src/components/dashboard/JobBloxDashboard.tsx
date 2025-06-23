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
} from "lucide-react";
import AIChatAssistant from "@/components/ai/AIChatAssistant";
import SmartDocumentGenerator from "@/components/ai/SmartDocumentGenerator";
import PredictiveAnalyticsDashboard from "@/components/ai/PredictiveAnalyticsDashboard";

interface KeyStat {
  title: string;
  value: string;
  change: string;
  color: string;
  icon: React.ReactNode;
}

interface Appointment {
  id: string;
  title: string;
  time: string;
  type: "consultation" | "renovation" | "inspection" | "meeting";
}

interface Job {
  id: string;
  title: string;
  client: string;
  date: string;
  status: "scheduled" | "in-progress" | "completed";
  location: string;
}

interface Customer {
  id: string;
  name: string;
  type: "total" | "new" | "pending";
  count: number;
  color: string;
}

const JobBloxDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAIChat, setShowAIChat] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [activeAIFeature, setActiveAIFeature] = useState<string | null>(null);

  const keyStats: KeyStat[] = [
    {
      title: "Total Jobs",
      value: "24",
      change: "+12% from last month",
      color: "bg-pink-500",
      icon: <Briefcase className="h-6 w-6 text-white" />,
    },
    {
      title: "Active Customers",
      value: "156",
      change: "+8% from last month",
      color: "bg-blue-500",
      icon: <Users className="h-6 w-6 text-white" />,
    },
    {
      title: "Monthly Revenue",
      value: "$45,230",
      change: "+15% from last month",
      color: "bg-green-500",
      icon: <DollarSign className="h-6 w-6 text-white" />,
    },
    {
      title: "Completed Jobs",
      value: "89",
      change: "+5% from last month",
      color: "bg-purple-500",
      icon: <CheckCircle className="h-6 w-6 text-white" />,
    },
  ];

  const todaySchedule: Appointment[] = [
    {
      id: "1",
      title: "Kitchen Renovation",
      time: "2:00 PM",
      type: "renovation",
    },
  ];

  const upcomingAppointments: Appointment[] = [
    {
      id: "1",
      title: "Consultation Appointment",
      time: "Friday 3:00 PM",
      type: "consultation",
    },
  ];

  const customers: Customer[] = [
    {
      id: "1",
      name: "Total Customers",
      type: "total",
      count: 156,
      color: "bg-blue-500",
    },
    {
      id: "2",
      name: "New This Month",
      type: "new",
      count: 23,
      color: "bg-green-500",
    },
    {
      id: "3",
      name: "Pending Quotes",
      type: "pending",
      count: 12,
      color: "bg-purple-500",
    },
  ];

  const recentJobs: Job[] = [
    {
      id: "1",
      title: "Kitchen Renovation",
      client: "John Smith",
      date: "Today 2:00 PM",
      status: "scheduled",
      location: "123 Main St",
    },
    {
      id: "2",
      title: "Bathroom Repair",
      client: "Sarah Johnson",
      date: "Tomorrow 9:00 AM",
      status: "scheduled",
      location: "456 Oak Ave",
    },
    {
      id: "3",
      title: "Consultation Appointment",
      client: "Mike Wilson",
      date: "Friday 3:00 PM",
      status: "scheduled",
      location: "789 Pine St",
    },
    {
      id: "4",
      title: "Follow-up Meeting",
      client: "Lisa Davis",
      date: "Yesterday 1:00 PM",
      status: "completed",
      location: "321 Elm St",
    },
  ];

  const quickActions = [
    {
      title: "Create Invoice",
      description: "Generate new invoice",
      color: "bg-blue-500",
      icon: <FileText className="h-6 w-6 text-white" />,
    },
    {
      title: "Schedule Job",
      description: "Book new appointment",
      color: "bg-green-500",
      icon: <Calendar className="h-6 w-6 text-white" />,
    },
    {
      title: "Add Customer",
      description: "Create customer profile",
      color: "bg-purple-500",
      icon: <User className="h-6 w-6 text-white" />,
    },
    {
      title: "Send Quote",
      description: "Email project estimate",
      color: "bg-orange-500",
      icon: <Mail className="h-6 w-6 text-white" />,
    },
  ];

  const generalActions = [
    {
      title: "Customer Database",
      description: "Manage all customers",
      color: "bg-teal-500",
      icon: <Users className="h-6 w-6 text-white" />,
    },
    {
      title: "Job Scheduling",
      description: "View and edit schedule",
      color: "bg-red-500",
      icon: <Calendar className="h-6 w-6 text-white" />,
    },
    {
      title: "Financial Reports",
      description: "Revenue and expenses",
      color: "bg-blue-500",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
    },
    {
      title: "Inventory Management",
      description: "Track materials and tools",
      color: "bg-yellow-500",
      icon: <Wrench className="h-6 w-6 text-white" />,
    },
  ];

  const aiFeatures = [
    {
      id: "chat",
      title: "AI Assistant",
      description: "Smart chat support",
      color: "bg-purple-500",
      icon: <Bot className="h-6 w-6 text-white" />,
    },
    {
      id: "documents",
      title: "Smart Documents",
      description: "AI-powered generation",
      color: "bg-indigo-500",
      icon: <Wand2 className="h-6 w-6 text-white" />,
    },
    {
      id: "analytics",
      title: "Predictive Analytics",
      description: "AI insights & forecasts",
      color: "bg-cyan-500",
      icon: <Brain className="h-6 w-6 text-white" />,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 text-white dark:text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">JobBlox</span>
          </div>

          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start bg-purple-600 text-white hover:bg-purple-700"
            >
              <Home className="mr-3 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Users className="mr-3 h-4 w-4" />
              Customer Management
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Briefcase className="mr-3 h-4 w-4" />
              Projects
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Calendar className="mr-3 h-4 w-4" />
              Scheduling
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <FileText className="mr-3 h-4 w-4" />
              Invoicing
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <DollarSign className="mr-3 h-4 w-4" />
              Financial Management
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Users className="mr-3 h-4 w-4" />
              Team Management
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <MapPin className="mr-3 h-4 w-4" />
              GPS Tracking
            </Button>

            <Separator className="bg-gray-600 my-4" />

            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                AI Features
              </p>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => {
                setActiveAIFeature("chat");
                setShowAIChat(true);
                setIsChatMinimized(false);
              }}
            >
              <Bot className="mr-3 h-4 w-4" />
              AI Assistant
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setActiveAIFeature("documents")}
            >
              <Wand2 className="mr-3 h-4 w-4" />
              Smart Documents
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setActiveAIFeature("analytics")}
            >
              <Brain className="mr-3 h-4 w-4" />
              Predictive Analytics
            </Button>

            <Separator className="bg-gray-600 my-4" />

            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Bell className="mr-3 h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Good afternoon, John!</h1>
              <p className="text-gray-400">Tuesday, June 17, 2025 at 4:37 PM</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Live Data
              </Button>
              <Button variant="outline" size="sm">
                Edit Dashboard
              </Button>
              <Button variant="outline" size="sm">
                Customize Dashboard
              </Button>
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Key Statistics */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {keyStats.map((stat, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-400">{stat.title}</p>
                        <p className="text-xs text-gray-500">{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Calendar & Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Calendar & Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Today's Schedule
                    </h4>
                    {todaySchedule.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-white">
                            {appointment.title}
                          </span>
                        </div>
                        <span className="text-gray-400">
                          {appointment.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator className="bg-gray-600" />
                  <div>
                    <h4 className="font-medium text-white mb-2">
                      Upcoming Appointments
                    </h4>
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-white">
                            {appointment.title}
                          </span>
                        </div>
                        <span className="text-gray-400">
                          {appointment.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Customer Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-3">
                      Customer Overview
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {customers.map((customer) => (
                        <div
                          key={customer.id}
                          className={`p-4 rounded-lg ${customer.color} text-center`}
                        >
                          <div className="text-2xl font-bold text-white">
                            {customer.count}
                          </div>
                          <div className="text-xs text-white opacity-90">
                            {customer.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Jobs & Locations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Recent Jobs & Locations
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-white">Recent Jobs</h4>
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="text-white font-medium">
                            {job.title}
                          </div>
                          <div className="text-sm text-gray-400">
                            {job.client} • {job.date}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(job.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Live Location Map
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Live Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">
                      Interactive map would appear here
                    </p>
                    <p className="text-sm text-gray-500">
                      Showing team locations and job sites
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-white">Mike Johnson</span>
                    </div>
                    <span className="text-gray-400">On Route</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-white">Sarah Davis</span>
                    </div>
                    <span className="text-gray-400">At Job Site</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-white">Tom Wilson</span>
                    </div>
                    <span className="text-gray-400">Returning to Base</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  className={`h-20 ${action.color} hover:opacity-90 flex flex-col items-center justify-center space-y-2`}
                >
                  {action.icon}
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-90">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            <h3 className="text-lg font-medium mb-4 text-white">
              AI-Powered Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {aiFeatures.map((feature, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (feature.id === "chat") {
                      setShowAIChat(true);
                      setIsChatMinimized(false);
                    }
                    setActiveAIFeature(feature.id);
                  }}
                  className={`h-20 ${feature.color} hover:opacity-90 flex flex-col items-center justify-center space-y-2`}
                >
                  {feature.icon}
                  <div className="text-center">
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-xs opacity-90">
                      {feature.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            <h3 className="text-lg font-medium mb-4 text-white">
              General Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {generalActions.map((action, index) => (
                <Button
                  key={index}
                  className={`h-20 ${action.color} hover:opacity-90 flex flex-col items-center justify-center space-y-2`}
                >
                  {action.icon}
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-90">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* AI Features Overlay */}
      {activeAIFeature && activeAIFeature !== "chat" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">
                {activeAIFeature === "documents" && "Smart Document Generator"}
                {activeAIFeature === "analytics" &&
                  "Predictive Analytics Dashboard"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveAIFeature(null)}
              >
                ×
              </Button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-80px)]">
              {activeAIFeature === "documents" && <SmartDocumentGenerator />}
              {activeAIFeature === "analytics" && (
                <PredictiveAnalyticsDashboard />
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Assistant */}
      {showAIChat && (
        <AIChatAssistant
          isMinimized={isChatMinimized}
          onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
          onClose={() => setShowAIChat(false)}
          currentContext="dashboard"
        />
      )}
    </div>
  );
};

export default JobBloxDashboard;
