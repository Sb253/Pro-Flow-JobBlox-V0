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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Clock,
  Send,
  Plus,
  Settings,
  Users,
  Bell,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Copy,
  Zap,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  project: string;
  status: "active" | "pending" | "completed";
  lastContact: string;
  preferredContact: "email" | "sms" | "phone";
}

interface AutomatedMessage {
  id: string;
  name: string;
  type:
    | "appointment_reminder"
    | "project_update"
    | "payment_reminder"
    | "completion_notice";
  trigger: string;
  subject: string;
  content: string;
  isActive: boolean;
  sentCount: number;
  lastSent: string;
}

interface CommunicationLog {
  id: string;
  customerId: string;
  customerName: string;
  type: "email" | "sms" | "phone" | "automated";
  subject: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read" | "failed";
}

const CustomerCommunication = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [messageType, setMessageType] = useState<string>("email");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateContent, setNewTemplateContent] = useState("");

  const customers: Customer[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      project: "Kitchen Renovation",
      status: "active",
      lastContact: "2 days ago",
      preferredContact: "email",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 234-5678",
      project: "Bathroom Remodel",
      status: "pending",
      lastContact: "1 week ago",
      preferredContact: "sms",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1 (555) 345-6789",
      project: "Home Addition",
      status: "completed",
      lastContact: "3 days ago",
      preferredContact: "phone",
    },
  ];

  const automatedMessages: AutomatedMessage[] = [
    {
      id: "1",
      name: "Smart Appointment Reminder",
      type: "appointment_reminder",
      trigger: "AI-optimized timing (24h before + weather check)",
      subject: "🔔 Smart Reminder: Your appointment tomorrow",
      content:
        "Hi {customer_name}, this is an AI-powered reminder about your appointment tomorrow at {appointment_time} for {project_name}.\n\n📊 **Smart Insights:**\n• Weather: {weather_forecast}\n• Team: {assigned_team} (5-star rated)\n• Preparation: {prep_checklist}\n\n🤖 **AI Recommendations:**\n• Best parking: {parking_suggestion}\n• What to expect: {project_timeline}\n\nNeed to reschedule? Reply with your preferred time and our AI will find the optimal slot!",
      isActive: true,
      sentCount: 45,
      lastSent: "2 hours ago",
    },
    {
      id: "2",
      name: "AI Project Journey Update",
      type: "project_update",
      trigger: "Dynamic: Based on project milestones + customer engagement",
      subject: "🚀 Your {project_name} Progress - AI Report",
      content:
        "Hello {customer_name}! Your AI project assistant here with exciting updates on {project_name}:\n\n📈 **Progress Analytics:**\n• Completion: {completion_percentage}% (ahead of schedule!)\n• Quality Score: {quality_rating}/10\n• Budget Status: {budget_status}\n\n🎯 **This Week's Achievements:**\n{completed_milestones}\n\n🔮 **AI Predictions:**\n• Next Phase: {next_phase} (starting {predicted_date})\n• Completion Forecast: {completion_prediction}\n• Potential Upgrades: {upsell_opportunities}\n\n📸 **Visual Progress:**\n[AI-curated photo gallery]\n\n💬 **Quick Feedback:**\nRate this week's progress: ⭐⭐⭐⭐⭐\n\nQuestions? Our AI chatbot is available 24/7!",
      isActive: true,
      sentCount: 23,
      lastSent: "1 day ago",
    },
    {
      id: "3",
      name: "Intelligent Payment Reminder",
      type: "payment_reminder",
      trigger: "AI-optimized: 3 days before + customer behavior analysis",
      subject: "💳 Smart Payment Reminder - Invoice #{invoice_number}",
      content:
        "Dear {customer_name},\n\n🤖 **AI Payment Assistant** here with a friendly reminder:\n\n📋 **Invoice Details:**\n• Invoice #{invoice_number}\n• Amount: {amount}\n• Due Date: {due_date}\n• Project: {project_name}\n\n💡 **Smart Payment Options:**\n• Online Portal: {payment_link} (instant processing)\n• Auto-Pay Setup: Save time with recurring payments\n• Payment Plan: {flexible_options} available\n\n🎁 **Early Payment Bonus:**\nPay within 24 hours and receive {early_payment_discount}% discount!\n\n📊 **Your Account Status:**\n• Payment History: {payment_score}/10 (excellent!)\n• Loyalty Points: {loyalty_points}\n• Next Project Discount: {next_discount}%\n\nQuestions? Our AI can help instantly at {support_link}",
      isActive: true,
      sentCount: 12,
      lastSent: "1 week ago",
    },
    {
      id: "4",
      name: "AI Completion Celebration",
      type: "completion_notice",
      trigger:
        "Project completion + quality verification + photo documentation",
      subject: "🎉 Your {project_name} is Complete - AI Quality Report!",
      content:
        "Congratulations {customer_name}! 🎊\n\n🤖 **AI Project Completion Report:**\n\n✅ **Quality Verification:**\n• AI Quality Score: {quality_score}/100\n• Compliance Check: ✓ Passed\n• Safety Standards: ✓ Exceeded\n• Customer Satisfaction Prediction: {satisfaction_prediction}%\n\n📸 **Before & After Gallery:**\n[AI-curated transformation photos]\n\n🔧 **Smart Maintenance Schedule:**\nOur AI has created a personalized maintenance plan:\n• 6-month check: {maintenance_date_1}\n• Annual service: {maintenance_date_2}\n• Warranty reminders: Automated\n\n🌟 **Exclusive Benefits:**\n• 20% discount on future projects\n• Priority scheduling for maintenance\n• Referral rewards: $500 credit per referral\n\n💬 **Share Your Experience:**\n[One-click review links]\n\n🤖 **AI Assistant:**\nYour dedicated AI assistant remains available for any questions about your completed project!\n\nThank you for choosing us! Our AI predicts you'll love the results for years to come! 🏠✨",
      isActive: true,
      sentCount: 8,
      lastSent: "3 days ago",
    },
    {
      id: "5",
      name: "Customer Journey Automation",
      type: "project_update",
      trigger:
        "AI-driven: Customer behavior + project phase + engagement level",
      subject: "🎯 Personalized Update: Your {project_name} Journey",
      content:
        "Hi {customer_name}! 👋\n\n🤖 **Your AI Journey Manager** has personalized insights:\n\n📊 **Journey Analytics:**\n• Days since project start: {days_elapsed}\n• Engagement level: {engagement_score}% (highly engaged!)\n• Satisfaction trend: {satisfaction_trend}\n• Communication preference: {preferred_channel}\n\n🎯 **Personalized Recommendations:**\n{ai_recommendations}\n\n🔮 **Predictive Insights:**\n• Optimal communication time: {best_contact_time}\n• Likely next service need: {predicted_service}\n• Referral probability: {referral_likelihood}%\n\n💡 **Smart Suggestions:**\n• Upgrade opportunities: {upgrade_suggestions}\n• Maintenance planning: {maintenance_plan}\n• Future project ideas: {future_projects}\n\n📱 **Interactive Features:**\n• Virtual project tour: {vr_link}\n• Real-time chat with AI: {chat_link}\n• Progress tracking app: {app_link}\n\nYour journey is unique, and our AI ensures every interaction is perfectly timed and relevant! 🚀",
      isActive: true,
      sentCount: 34,
      lastSent: "6 hours ago",
    },
    {
      id: "6",
      name: "Predictive Maintenance Alert",
      type: "project_update",
      trigger:
        "AI prediction: Based on project age + usage patterns + weather data",
      subject: "🔧 Smart Maintenance Alert - {project_name}",
      content:
        "Hello {customer_name}! 🏠\n\n🤖 **AI Maintenance Predictor** has detected optimal maintenance timing:\n\n📊 **Predictive Analysis:**\n• Project age: {project_age} months\n• Usage patterns: {usage_analysis}\n• Weather impact: {weather_impact}\n• Wear prediction: {wear_forecast}\n\n⚠️ **Recommended Actions:**\n{maintenance_recommendations}\n\n💰 **Cost Optimization:**\n• Preventive maintenance: ${preventive_cost}\n• Reactive repair cost: ${reactive_cost}\n• Savings with early action: ${savings_amount}\n\n📅 **Smart Scheduling:**\nBest maintenance window: {optimal_dates}\n(Based on weather, your schedule, and team availability)\n\n🎁 **Maintenance Package Benefits:**\n• 25% discount for existing customers\n• Priority scheduling\n• Extended warranty\n• AI monitoring included\n\n🤖 **One-Click Booking:**\n[Schedule maintenance with AI assistant]\n\nProactive care keeps your investment protected! 🛡️",
      isActive: true,
      sentCount: 15,
      lastSent: "3 days ago",
    },
  ];

  const communicationLogs: CommunicationLog[] = [
    {
      id: "1",
      customerId: "1",
      customerName: "John Smith",
      type: "email",
      subject: "Project Update - Kitchen Renovation",
      content: "Your kitchen renovation is progressing well...",
      timestamp: "2 hours ago",
      status: "read",
    },
    {
      id: "2",
      customerId: "2",
      customerName: "Sarah Johnson",
      type: "sms",
      subject: "Appointment Reminder",
      content: "Reminder: Your appointment is tomorrow at 10 AM",
      timestamp: "1 day ago",
      status: "delivered",
    },
    {
      id: "3",
      customerId: "1",
      customerName: "John Smith",
      type: "automated",
      subject: "Weekly Project Update",
      content: "Automated weekly update sent",
      timestamp: "3 days ago",
      status: "sent",
    },
    {
      id: "4",
      customerId: "3",
      customerName: "Mike Wilson",
      type: "phone",
      subject: "Follow-up Call",
      content: "Discussed final walkthrough and warranty",
      timestamp: "1 week ago",
      status: "sent",
    },
  ];

  const handleSendMessage = () => {
    if (selectedCustomer && messageContent.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", {
        customer: selectedCustomer,
        type: messageType,
        subject: messageSubject,
        content: messageContent,
      });
      setMessageSubject("");
      setMessageContent("");
    }
  };

  const handleCreateTemplate = () => {
    if (newTemplateName.trim() && newTemplateContent.trim()) {
      // In a real app, this would save the template
      console.log("Creating template:", {
        name: newTemplateName,
        content: newTemplateContent,
      });
      setNewTemplateName("");
      setNewTemplateContent("");
      setIsTemplateDialogOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "automated":
        return <Zap className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Send className="h-4 w-4 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "read":
        return <Eye className="h-4 w-4 text-purple-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Communication</h1>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="automated">Automated Messages</TabsTrigger>
          <TabsTrigger value="logs">Communication Logs</TabsTrigger>
          <TabsTrigger value="customers">Customer List</TabsTrigger>
        </TabsList>

        {/* Compose Message Tab */}
        <TabsContent value="compose">
          <Card>
            <CardHeader>
              <CardTitle>Send Message to Customer</CardTitle>
              <CardDescription>
                Send personalized messages to your customers via email, SMS, or
                schedule a call.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Customer
                  </label>
                  <Select
                    value={selectedCustomer}
                    onValueChange={setSelectedCustomer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} - {customer.project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message Type
                  </label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {messageType !== "phone" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Subject
                  </label>
                  <Input
                    placeholder="Message subject"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">
                  {messageType === "phone" ? "Call Notes" : "Message Content"}
                </label>
                <Textarea
                  placeholder={
                    messageType === "phone"
                      ? "Notes about the call..."
                      : "Type your message here..."
                  }
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <Dialog
                  open={isTemplateDialogOpen}
                  onOpenChange={setIsTemplateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Message Template</DialogTitle>
                      <DialogDescription>
                        Create a reusable template for common messages.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Template name"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                      />
                      <Textarea
                        placeholder="Template content (use {customer_name}, {project_name}, etc. for variables)"
                        value={newTemplateContent}
                        onChange={(e) => setNewTemplateContent(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsTemplateDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateTemplate}>
                        Create Template
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button onClick={handleSendMessage}>
                  <Send className="mr-2 h-4 w-4" />
                  {messageType === "phone" ? "Log Call" : "Send Message"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automated Messages Tab */}
        <TabsContent value="automated">
          <Card>
            <CardHeader>
              <CardTitle>Automated Message Templates</CardTitle>
              <CardDescription>
                Manage automated messages that are sent based on triggers and
                schedules.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automatedMessages.map((message) => (
                  <Card key={message.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{message.name}</h3>
                          <Badge
                            variant={message.isActive ? "default" : "secondary"}
                          >
                            {message.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={message.isActive}
                            onCheckedChange={(checked) => {
                              // Toggle automation
                              console.log(
                                `Toggle automation for ${message.id}:`,
                                checked,
                              );
                            }}
                          />
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Trigger:</p>
                          <p className="font-medium">{message.trigger}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Statistics:</p>
                          <p className="font-medium">
                            {message.sentCount} sent • Last: {message.lastSent}
                          </p>
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div>
                        <p className="text-gray-600 mb-1 text-sm">Subject:</p>
                        <p className="font-medium mb-2">{message.subject}</p>
                        <p className="text-gray-600 mb-1 text-sm">Content:</p>
                        <p className="text-sm text-gray-700">
                          {message.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Logs Tab */}
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>
                View all customer communications and their delivery status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {communicationLogs.map((log) => (
                    <Card key={log.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            {getMessageTypeIcon(log.type)}
                            <div>
                              <p className="font-medium">{log.customerName}</p>
                              <p className="text-sm text-gray-600">
                                {log.subject}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(log.status)}
                            <span className="text-sm text-gray-500">
                              {log.timestamp}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 pl-7">
                          {log.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer List Tab */}
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>
                Manage customer contact preferences and communication history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <Card key={customer.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-sm text-gray-600">
                            {customer.project}
                          </p>
                        </div>
                        {getStatusBadge(customer.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Email:</p>
                          <p className="font-medium">{customer.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Phone:</p>
                          <p className="font-medium">{customer.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">
                            Preferred Contact:
                          </p>
                          <div className="flex items-center space-x-1">
                            {getMessageTypeIcon(customer.preferredContact)}
                            <span className="font-medium capitalize">
                              {customer.preferredContact}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Last contact: {customer.lastContact}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            SMS
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerCommunication;
