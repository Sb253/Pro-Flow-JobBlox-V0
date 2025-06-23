import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
  Bell,
  BellOff,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Users,
  Calendar,
  DollarSign,
  Wrench,
  MessageSquare,
  Smartphone,
  Mail,
  Monitor,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  category: "project" | "payment" | "schedule" | "team" | "system";
  timestamp: string;
  isRead: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  actionUrl?: string;
}

interface NotificationRule {
  id: string;
  name: string;
  description: string;
  category: "project" | "payment" | "schedule" | "team" | "system";
  trigger: string;
  conditions: string[];
  channels: ("push" | "email" | "sms" | "desktop")[];
  isActive: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  recipients: string[];
}

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  desktopNotifications: boolean;
  soundEnabled: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  categories: {
    [key: string]: {
      enabled: boolean;
      priority: "low" | "medium" | "high" | "urgent";
    };
  };
}

const NotificationCenter = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState("");
  const [newRuleDescription, setNewRuleDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Payment Received",
      message:
        "Payment of $2,500 received from John Smith for Kitchen Renovation project",
      type: "success",
      category: "payment",
      timestamp: "5 minutes ago",
      isRead: false,
      priority: "medium",
    },
    {
      id: "2",
      title: "Appointment Reminder",
      message:
        "Site visit scheduled for tomorrow at 10:00 AM with Sarah Johnson",
      type: "info",
      category: "schedule",
      timestamp: "1 hour ago",
      isRead: false,
      priority: "high",
    },
    {
      id: "3",
      title: "Project Milestone",
      message: "Kitchen Renovation project has reached 75% completion",
      type: "success",
      category: "project",
      timestamp: "2 hours ago",
      isRead: true,
      priority: "medium",
    },
    {
      id: "4",
      title: "Team Update",
      message: "Mike Wilson has checked in at the Bathroom Remodel job site",
      type: "info",
      category: "team",
      timestamp: "3 hours ago",
      isRead: true,
      priority: "low",
    },
    {
      id: "5",
      title: "Overdue Invoice",
      message: "Invoice #INV-2024-001 is 5 days overdue. Follow-up required.",
      type: "warning",
      category: "payment",
      timestamp: "1 day ago",
      isRead: false,
      priority: "urgent",
    },
    {
      id: "6",
      title: "System Maintenance",
      message:
        "Scheduled system maintenance will occur tonight from 2:00 AM to 4:00 AM",
      type: "info",
      category: "system",
      timestamp: "2 days ago",
      isRead: true,
      priority: "low",
    },
  ]);

  const [notificationRules, setNotificationRules] = useState<
    NotificationRule[]
  >([
    {
      id: "1",
      name: "Payment Received",
      description: "Notify when payment is received from customers",
      category: "payment",
      trigger: "Payment status changes to 'Paid'",
      conditions: ["Amount > $100", "Customer is active"],
      channels: ["push", "email"],
      isActive: true,
      priority: "medium",
      recipients: ["admin", "accounting"],
    },
    {
      id: "2",
      name: "Appointment Reminders",
      description: "Send reminders for upcoming appointments",
      category: "schedule",
      trigger: "24 hours before appointment",
      conditions: [
        "Appointment is confirmed",
        "Customer has valid contact info",
      ],
      channels: ["push", "sms"],
      isActive: true,
      priority: "high",
      recipients: ["project_manager", "customer"],
    },
    {
      id: "3",
      name: "Project Milestones",
      description: "Notify when project reaches completion milestones",
      category: "project",
      trigger: "Project completion percentage changes",
      conditions: ["Milestone is 25%, 50%, 75%, or 100%"],
      channels: ["push", "email"],
      isActive: true,
      priority: "medium",
      recipients: ["project_manager", "customer"],
    },
    {
      id: "4",
      name: "Overdue Invoices",
      description: "Alert for overdue payments",
      category: "payment",
      trigger: "Invoice due date has passed",
      conditions: ["Invoice status is 'Unpaid'", "Due date + 3 days"],
      channels: ["push", "email", "sms"],
      isActive: true,
      priority: "urgent",
      recipients: ["admin", "accounting"],
    },
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    soundEnabled: true,
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00",
    },
    categories: {
      project: { enabled: true, priority: "medium" },
      payment: { enabled: true, priority: "high" },
      schedule: { enabled: true, priority: "high" },
      team: { enabled: true, priority: "low" },
      system: { enabled: false, priority: "low" },
    },
  });

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId),
    );
  };

  const toggleRule = (ruleId: string) => {
    setNotificationRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule,
      ),
    );
  };

  const handleCreateRule = () => {
    if (newRuleName.trim() && newRuleDescription.trim()) {
      const newRule: NotificationRule = {
        id: Date.now().toString(),
        name: newRuleName,
        description: newRuleDescription,
        category: "project",
        trigger: "Custom trigger",
        conditions: [],
        channels: ["push"],
        isActive: true,
        priority: "medium",
        recipients: ["admin"],
      };
      setNotificationRules((prev) => [...prev, newRule]);
      setNewRuleName("");
      setNewRuleDescription("");
      setIsCreateRuleOpen(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "project":
        return <Wrench className="h-4 w-4" />;
      case "payment":
        return <DollarSign className="h-4 w-4" />;
      case "schedule":
        return <Calendar className="h-4 w-4" />;
      case "team":
        return <Users className="h-4 w-4" />;
      case "system":
        return <Settings className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-blue-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-gray-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && !notification.isRead) ||
      (selectedFilter !== "all" &&
        selectedFilter !== "unread" &&
        notification.category === selectedFilter);

    const matchesSearch =
      searchQuery === "" ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Notification Center</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-500">{unreadCount} unread</Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="rules">Notification Rules</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>
                    Stay updated with important alerts and updates.
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Select
                    value={selectedFilter}
                    onValueChange={setSelectedFilter}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="project">Projects</SelectItem>
                      <SelectItem value="payment">Payments</SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-colors ${
                        !notification.isRead
                          ? "border-l-4 border-l-blue-500 bg-blue-50"
                          : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3
                                  className={`font-medium ${
                                    !notification.isRead ? "font-semibold" : ""
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {getPriorityBadge(notification.priority)}
                                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                                    {getCategoryIcon(notification.category)}
                                    <span className="capitalize">
                                      {notification.category}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {notification.timestamp}
                                </span>
                                <div className="flex space-x-1">
                                  {!notification.isRead && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No notifications found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Rules Tab */}
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Notification Rules</CardTitle>
                  <CardDescription>
                    Configure automated notification triggers and conditions.
                  </CardDescription>
                </div>
                <Dialog
                  open={isCreateRuleOpen}
                  onOpenChange={setIsCreateRuleOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Rule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Notification Rule</DialogTitle>
                      <DialogDescription>
                        Set up a new automated notification rule.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Rule name"
                        value={newRuleName}
                        onChange={(e) => setNewRuleName(e.target.value)}
                      />
                      <Input
                        placeholder="Rule description"
                        value={newRuleDescription}
                        onChange={(e) => setNewRuleDescription(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateRuleOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateRule}>Create Rule</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationRules.map((rule) => (
                  <Card key={rule.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getCategoryIcon(rule.category)}
                          <div>
                            <h3 className="font-semibold">{rule.name}</h3>
                            <p className="text-sm text-gray-600">
                              {rule.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(rule.priority)}
                          <Switch
                            checked={rule.isActive}
                            onCheckedChange={() => toggleRule(rule.id)}
                          />
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Trigger:</p>
                          <p className="font-medium">{rule.trigger}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Channels:</p>
                          <div className="flex space-x-2">
                            {rule.channels.map((channel) => (
                              <Badge key={channel} variant="outline">
                                {channel === "push" && (
                                  <Smartphone className="h-3 w-3 mr-1" />
                                )}
                                {channel === "email" && (
                                  <Mail className="h-3 w-3 mr-1" />
                                )}
                                {channel === "sms" && (
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                )}
                                {channel === "desktop" && (
                                  <Monitor className="h-3 w-3 mr-1" />
                                )}
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {rule.conditions.length > 0 && (
                        <div className="mt-3">
                          <p className="text-gray-600 mb-1 text-sm">
                            Conditions:
                          </p>
                          <ul className="text-sm text-gray-700 list-disc list-inside">
                            {rule.conditions.map((condition, index) => (
                              <li key={index}>{condition}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-600">
                        Mobile and web push notifications
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        pushNotifications: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        emailNotifications: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-600">
                        Receive urgent notifications via SMS
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        smsNotifications: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Desktop Notifications</p>
                      <p className="text-sm text-gray-600">
                        Browser desktop notifications
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.desktopNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        desktopNotifications: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {settings.soundEnabled ? (
                      <Volume2 className="h-5 w-5" />
                    ) : (
                      <VolumeX className="h-5 w-5" />
                    )}
                    <div>
                      <p className="font-medium">Sound Notifications</p>
                      <p className="text-sm text-gray-600">
                        Play sound for notifications
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        soundEnabled: checked,
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Settings</CardTitle>
                <CardDescription>
                  Configure notification preferences by category.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.categories).map(
                  ([category, config]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(category)}
                        <div>
                          <p className="font-medium capitalize">{category}</p>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(config.priority)}
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={config.enabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            categories: {
                              ...prev.categories,
                              [category]: { ...config, enabled: checked },
                            },
                          }))
                        }
                      />
                    </div>
                  ),
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
