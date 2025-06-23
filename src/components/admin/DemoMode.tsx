import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Settings,
  Mail,
  Edit,
  Activity,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Timer,
  Target,
  TrendingUp,
  Search,
  Calendar,
  Award,
  Filter,
  Play,
} from "lucide-react";

const DemoMode = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const demoUsers = [
    {
      id: "demo_001",
      email: "demo@cityworks.com",
      companyName: "CityWorks Construction",
      contactName: "John Doe",
      status: "active",
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      daysRemaining: 10,
      usage: {
        projects: 1,
        users: 2,
        storage: 50,
        apiCalls: 123,
      },
      limits: {
        projects: 5,
        users: 10,
        storage: 1000,
        apiCalls: 5000,
      },
      plan: "starter",
      conversionProbability: 75,
      lastActivity: "2024-01-15T14:30:00Z",
    },
    {
      id: "demo_002",
      email: "demo2@cityworks.com",
      companyName: "CityWorks Construction",
      contactName: "Jane Smith",
      status: "expired",
      startDate: "2024-01-05",
      endDate: "2024-01-15",
      daysRemaining: -10,
      usage: {
        projects: 0,
        users: 0,
        storage: 0,
        apiCalls: 0,
      },
      limits: {
        projects: 5,
        users: 10,
        storage: 1000,
        apiCalls: 5000,
      },
      plan: "starter",
      conversionProbability: 50,
      lastActivity: "2024-01-20T09:00:00Z",
    },
    {
      id: "demo_003",
      email: "demo3@cityworks.com",
      companyName: "CityWorks Construction",
      contactName: "Emily Johnson",
      status: "converted",
      startDate: "2024-01-01",
      endDate: "2024-01-10",
      daysRemaining: 0,
      usage: {
        projects: 1,
        users: 2,
        storage: 50,
        apiCalls: 123,
      },
      limits: {
        projects: 5,
        users: 10,
        storage: 1000,
        apiCalls: 5000,
      },
      plan: "starter",
      conversionProbability: 85,
      lastActivity: "2024-01-15T14:30:00Z",
    },
    {
      id: "demo_004",
      email: "demo4@cityworks.com",
      companyName: "CityWorks Construction",
      contactName: "Michael Brown",
      status: "extended",
      startDate: "2024-01-15",
      endDate: "2024-02-05",
      daysRemaining: 6,
      usage: {
        projects: 2,
        users: 4,
        storage: 123,
        apiCalls: 890,
      },
      limits: {
        projects: 5,
        users: 10,
        storage: 1000,
        apiCalls: 5000,
      },
      plan: "professional",
      conversionProbability: 65,
      lastActivity: "2024-01-30T08:45:00Z",
    },
  ];

  const demoSettings = {
    trialDuration: 14,
    autoExtension: true,
    extensionDays: 7,
    conversionReminders: true,
    reminderDays: [7, 3, 1],
    features: {
      projectManagement: true,
      teamCollaboration: true,
      basicReports: true,
      advancedReports: false,
      integrations: false,
      customBranding: false,
      prioritySupport: false,
    },
  };

  const demoStats = {
    totalUsers: demoUsers.length,
    activeUsers: demoUsers.filter((u) => u.status === "active").length,
    expiredUsers: demoUsers.filter((u) => u.status === "expired").length,
    convertedUsers: demoUsers.filter((u) => u.status === "converted").length,
    extendedUsers: demoUsers.filter((u) => u.status === "extended").length,
    conversionRate: 28.5, // percentage
    avgTrialDuration: 12.3, // days
    avgConversionTime: 8.7, // days
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Expired
          </Badge>
        );
      case "converted":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CreditCard className="mr-1 h-3 w-3" />
            Converted
          </Badge>
        );
      case "extended":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Timer className="mr-1 h-3 w-3" />
            Extended
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

  const getUsageColor = (used: number, limit: number) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  const getConversionColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredUsers = demoUsers.filter((user) => {
    const matchesSearch =
      user.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Demo Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{demoStats.activeUsers}</p>
                <p className="text-sm text-muted-foreground">Active Trials</p>
              </div>
              <Play className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{demoStats.convertedUsers}</p>
                <p className="text-sm text-muted-foreground">Converted</p>
              </div>
              <Award className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {demoStats.conversionRate}%
                </p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {demoStats.avgTrialDuration}
                </p>
                <p className="text-sm text-muted-foreground">Avg. Trial Days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Demo Mode Management</CardTitle>
              <CardDescription>
                Manage trial users and demo settings for tenant acquisition
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsSettingsDialogOpen(true)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Demo Settings
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Demo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="users">
                Demo Users ({demoStats.totalUsers})
              </TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search demo users..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="extended">Extended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Demo Users Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Days Remaining</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Conversion</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.companyName}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{user.contactName}</p>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{getPlanBadge(user.plan)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span
                            className={`font-medium ${
                              user.daysRemaining < 0
                                ? "text-red-600"
                                : user.daysRemaining <= 3
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {user.daysRemaining < 0
                              ? `${Math.abs(user.daysRemaining)} overdue`
                              : `${user.daysRemaining} days`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-xs">
                            Projects: {user.usage.projects}/
                            {user.limits.projects}
                          </div>
                          <div className="text-xs">
                            Users: {user.usage.users}/{user.limits.users}
                          </div>
                          <div className="text-xs">
                            Storage: {user.usage.storage}MB/
                            {user.limits.storage}MB
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span
                            className={`font-medium ${getConversionColor(
                              user.conversionProbability,
                            )}`}
                          >
                            {user.conversionProbability}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Activity className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                    <CardDescription>
                      Track demo user progression through trial stages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Demo Signups</span>
                        <span className="font-medium">247</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span>Active Trials</span>
                        <span className="font-medium">89</span>
                      </div>
                      <Progress value={36} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span>Engaged Users</span>
                        <span className="font-medium">67</span>
                      </div>
                      <Progress value={27} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span>Conversions</span>
                        <span className="font-medium">23</span>
                      </div>
                      <Progress value={9} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Analytics</CardTitle>
                    <CardDescription>
                      Average usage patterns across demo users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Projects Created</span>
                          <span>3.2 avg</span>
                        </div>
                        <Progress value={64} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Team Members Added</span>
                          <span>5.8 avg</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage Usage</span>
                          <span>425MB avg</span>
                        </div>
                        <Progress value={43} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>API Calls</span>
                          <span>2.1K avg</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trial Configuration</CardTitle>
                    <CardDescription>
                      Configure demo trial settings and limitations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Trial Duration</p>
                        <p className="text-sm text-muted-foreground">
                          Default trial period in days
                        </p>
                      </div>
                      <Input
                        type="number"
                        value={demoSettings.trialDuration}
                        className="w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto Extension</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically extend trials for engaged users
                        </p>
                      </div>
                      <Switch checked={demoSettings.autoExtension} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Extension Days</p>
                        <p className="text-sm text-muted-foreground">
                          Additional days for auto-extension
                        </p>
                      </div>
                      <Input
                        type="number"
                        value={demoSettings.extensionDays}
                        className="w-20"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Conversion Reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Send automated conversion reminders
                        </p>
                      </div>
                      <Switch checked={demoSettings.conversionReminders} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feature Access</CardTitle>
                    <CardDescription>
                      Control which features are available in demo mode
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(demoSettings.features).map(
                      ([feature, enabled]) => (
                        <div
                          key={feature}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium capitalize">
                              {feature.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                          </div>
                          <Switch checked={enabled} />
                        </div>
                      ),
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Demo User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Demo User Details</DialogTitle>
            <DialogDescription>
              Detailed information and usage for {selectedUser?.companyName}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              {/* User Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Company Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>{selectedUser.companyName}</div>
                    <div>{selectedUser.contactName}</div>
                    <div>{selectedUser.email}</div>
                    <div>Plan: {getPlanBadge(selectedUser.plan)}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Trial Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>Status: {getStatusBadge(selectedUser.status)}</div>
                    <div>
                      Start:{" "}
                      {new Date(selectedUser.startDate).toLocaleDateString()}
                    </div>
                    <div>
                      End: {new Date(selectedUser.endDate).toLocaleDateString()}
                    </div>
                    <div>Days Remaining: {selectedUser.daysRemaining}</div>
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div>
                <h4 className="font-medium mb-4">Usage Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Projects</span>
                        <span>
                          {selectedUser.usage.projects}/
                          {selectedUser.limits.projects}
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedUser.usage.projects /
                            selectedUser.limits.projects) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Users</span>
                        <span>
                          {selectedUser.usage.users}/{selectedUser.limits.users}
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedUser.usage.users /
                            selectedUser.limits.users) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage</span>
                        <span>
                          {selectedUser.usage.storage}MB/
                          {selectedUser.limits.storage}MB
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedUser.usage.storage /
                            selectedUser.limits.storage) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Calls</span>
                        <span>
                          {selectedUser.usage.apiCalls.toLocaleString()}/
                          {selectedUser.limits.apiCalls.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={
                          (selectedUser.usage.apiCalls /
                            selectedUser.limits.apiCalls) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Probability */}
              <div>
                <h4 className="font-medium mb-2">Conversion Analysis</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Conversion Probability</span>
                      <span
                        className={`font-medium ${getConversionColor(selectedUser.conversionProbability)}`}
                      >
                        {selectedUser.conversionProbability}%
                      </span>
                    </div>
                    <Progress
                      value={selectedUser.conversionProbability}
                      className="h-3"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Last Activity:{" "}
                  {new Date(selectedUser.lastActivity).toLocaleString()}
                </p>
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
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Send Reminder
            </Button>
            <Button>
              <Timer className="mr-2 h-4 w-4" />
              Extend Trial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Demo Settings Dialog */}
      <Dialog
        open={isSettingsDialogOpen}
        onOpenChange={setIsSettingsDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Demo Mode Settings</DialogTitle>
            <DialogDescription>
              Configure global demo mode settings and trial parameters
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Default Trial Duration (days)
                </label>
                <Input
                  type="number"
                  value={demoSettings.trialDuration}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Auto Extension Days
                </label>
                <Input
                  type="number"
                  value={demoSettings.extensionDays}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Auto Extension</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically extend trials for highly engaged users
                  </p>
                </div>
                <Switch checked={demoSettings.autoExtension} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Conversion Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Send automated emails to encourage conversion
                  </p>
                </div>
                <Switch checked={demoSettings.conversionReminders} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSettingsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsSettingsDialogOpen(false)}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoMode;
