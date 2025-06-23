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
import { Separator } from "@/components/ui/separator";
import {
  Users,
  DollarSign,
  Building,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Shield,
  Database,
  Activity,
  CreditCard,
  UserPlus,
  Bell,
  BarChart3,
  Globe,
  Zap,
} from "lucide-react";
import SubscriptionManagement from "./SubscriptionManagement";
import TenantManagement from "./TenantManagement";
import AccountSetupOnboarding from "./AccountSetupOnboarding";
import DemoMode from "./DemoMode";

interface AdminStat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
}

interface SystemAlert {
  id: string;
  type: "warning" | "error" | "info" | "success";
  title: string;
  message: string;
  timestamp: string;
}

const SaasAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const adminStats: AdminStat[] = [
    {
      title: "Total Tenants",
      value: "247",
      change: "+12% from last month",
      trend: "up",
      icon: <Building className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Active Subscriptions",
      value: "189",
      change: "+8% from last month",
      trend: "up",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Monthly Revenue",
      value: "$47,230",
      change: "+15% from last month",
      trend: "up",
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Demo Users",
      value: "89",
      change: "+23% from last month",
      trend: "up",
      icon: <Users className="h-6 w-6" />,
      color: "bg-orange-500",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "Last 30 days",
      trend: "neutral",
      icon: <Activity className="h-6 w-6" />,
      color: "bg-cyan-500",
    },
    {
      title: "Support Tickets",
      value: "23",
      change: "-5% from last month",
      trend: "down",
      icon: <AlertCircle className="h-6 w-6" />,
      color: "bg-red-500",
    },
  ];

  const systemAlerts: SystemAlert[] = [
    {
      id: "1",
      type: "warning",
      title: "High CPU Usage",
      message: "Server cluster experiencing 85% CPU usage",
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      type: "info",
      title: "Scheduled Maintenance",
      message: "Database maintenance scheduled for tonight at 2 AM EST",
      timestamp: "1 hour ago",
    },
    {
      id: "3",
      type: "success",
      title: "Backup Completed",
      message: "Daily backup completed successfully",
      timestamp: "3 hours ago",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      action: "New tenant registered",
      tenant: "ABC Construction Co.",
      timestamp: "5 minutes ago",
      type: "tenant",
    },
    {
      id: "2",
      action: "Subscription upgraded",
      tenant: "XYZ Builders",
      timestamp: "15 minutes ago",
      type: "subscription",
    },
    {
      id: "3",
      action: "Demo trial started",
      tenant: "Demo User #1247",
      timestamp: "32 minutes ago",
      type: "demo",
    },
    {
      id: "4",
      action: "Payment processed",
      tenant: "Smith Contractors",
      timestamp: "1 hour ago",
      type: "payment",
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "tenant":
        return <Building className="h-4 w-4 text-blue-500" />;
      case "subscription":
        return <CreditCard className="h-4 w-4 text-green-500" />;
      case "demo":
        return <Users className="h-4 w-4 text-orange-500" />;
      case "payment":
        return <DollarSign className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              SaaS Administration Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Monitor and manage your multi-tenant CRM platform
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </Button>
            <Button variant="outline" size="sm">
              <Database className="mr-2 h-4 w-4" />
              Backup
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
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-slate-800">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="tenants"
              className="flex items-center space-x-2"
            >
              <Building className="h-4 w-4" />
              <span>Tenants</span>
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="flex items-center space-x-2"
            >
              <CreditCard className="h-4 w-4" />
              <span>Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger
              value="onboarding"
              className="flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Onboarding</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Demo Mode</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminStats.map((stat, index) => (
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
                          <TrendingUp
                            className={`h-3 w-3 ${
                              stat.trend === "up"
                                ? "text-green-500"
                                : stat.trend === "down"
                                  ? "text-red-500"
                                  : "text-slate-500"
                            }`}
                          />
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

            {/* System Health & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>System Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700"
                    >
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {alert.title}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {alert.message}
                        </p>
                        <p className="text-xs text-slate-500">
                          {alert.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700"
                    >
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {activity.tenant}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Revenue & Growth Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Monthly Revenue Growth</CardTitle>
                  <CardDescription>
                    Revenue trends over the last 12 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Revenue chart would appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Tenant Growth</CardTitle>
                  <CardDescription>
                    New tenant registrations and churn rate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>New Tenants This Month</span>
                        <span className="font-medium">32</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Churn Rate</span>
                        <span className="font-medium">2.1%</span>
                      </div>
                      <Progress value={21} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Demo to Paid Conversion</span>
                        <span className="font-medium">18.5%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tenants">
            <TenantManagement />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionManagement />
          </TabsContent>

          <TabsContent value="onboarding">
            <AccountSetupOnboarding />
          </TabsContent>

          <TabsContent value="demo">
            <DemoMode />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SaasAdminDashboard;
