import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Brain,
  Activity,
  PieChart,
  LineChart,
  RefreshCw,
  Download,
  Settings,
  Filter,
  Eye,
  Lightbulb,
  Wrench,
  Building,
  MapPin,
  Phone,
  Mail,
  FileText,
  Calculator,
  Gauge,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  Award,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface Prediction {
  id: string;
  title: string;
  category: "cost" | "revenue" | "customer" | "equipment" | "timeline";
  prediction: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  timeframe: string;
  details: string;
  recommendations: string[];
  historicalAccuracy?: number;
}

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "stable";
  prediction: string;
  confidence: number;
  icon: React.ReactNode;
  color: string;
}

interface CustomerInsight {
  id: string;
  name: string;
  lifetimeValue: number;
  predictedValue: number;
  churnRisk: number;
  nextProjectProbability: number;
  recommendedActions: string[];
  segment: "high-value" | "growing" | "at-risk" | "new";
}

interface EquipmentPrediction {
  id: string;
  name: string;
  type: string;
  maintenanceDue: string;
  failureRisk: number;
  costImpact: number;
  recommendedAction: string;
  priority: "urgent" | "high" | "medium" | "low";
}

const PredictiveAnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("all");

  const metricCards: MetricCard[] = [
    {
      id: "revenue",
      title: "Revenue Forecast",
      value: "$127K",
      change: 15.3,
      trend: "up",
      prediction: "$142K next month",
      confidence: 0.89,
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      id: "projects",
      title: "Project Completion",
      value: "18 days",
      change: -2.1,
      trend: "down",
      prediction: "16 days average",
      confidence: 0.92,
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      id: "customers",
      title: "Customer Retention",
      value: "94%",
      change: 3.2,
      trend: "up",
      prediction: "96% next quarter",
      confidence: 0.85,
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      id: "costs",
      title: "Cost Optimization",
      value: "$8.2K",
      change: -12.5,
      trend: "down",
      prediction: "$7.1K savings",
      confidence: 0.78,
      icon: <Target className="h-6 w-6" />,
      color: "bg-orange-500",
    },
  ];

  const predictions: Prediction[] = [
    {
      id: "cost-1",
      title: "Kitchen Renovation Cost Estimate",
      category: "cost",
      prediction: "$12,500 - $15,200",
      confidence: 0.91,
      impact: "high",
      timeframe: "Next project",
      details:
        "Based on 47 similar projects, material costs, and current market rates",
      recommendations: [
        "Consider bulk purchasing for 15% savings",
        "Schedule during off-peak season for better contractor rates",
        "Include 12% contingency buffer for unexpected issues",
      ],
      historicalAccuracy: 0.87,
    },
    {
      id: "revenue-1",
      title: "Q4 Revenue Projection",
      category: "revenue",
      prediction: "$185K - $210K",
      confidence: 0.84,
      impact: "high",
      timeframe: "Next 3 months",
      details:
        "Seasonal trends, pipeline analysis, and market conditions indicate strong Q4",
      recommendations: [
        "Focus on high-margin bathroom renovations",
        "Increase marketing spend by 20% in October",
        "Prepare for 30% increase in project inquiries",
      ],
      historicalAccuracy: 0.82,
    },
    {
      id: "customer-1",
      title: "Customer Churn Risk Analysis",
      category: "customer",
      prediction: "3 customers at risk",
      confidence: 0.76,
      impact: "medium",
      timeframe: "Next 30 days",
      details:
        "Behavioral patterns indicate potential churn for high-value customers",
      recommendations: [
        "Schedule follow-up calls with at-risk customers",
        "Offer loyalty discounts or maintenance packages",
        "Implement proactive customer success outreach",
      ],
      historicalAccuracy: 0.79,
    },
    {
      id: "equipment-1",
      title: "Equipment Maintenance Forecast",
      category: "equipment",
      prediction: "2 critical maintenance events",
      confidence: 0.88,
      impact: "high",
      timeframe: "Next 2 weeks",
      details:
        "Predictive maintenance algorithms identify potential equipment failures",
      recommendations: [
        "Schedule preventive maintenance for tile saw",
        "Order replacement parts for compressor",
        "Consider equipment upgrade for better reliability",
      ],
      historicalAccuracy: 0.91,
    },
    {
      id: "timeline-1",
      title: "Project Timeline Optimization",
      category: "timeline",
      prediction: "15% faster completion",
      confidence: 0.82,
      impact: "medium",
      timeframe: "Ongoing",
      details:
        "Resource allocation optimization can significantly improve project timelines",
      recommendations: [
        "Implement parallel task scheduling",
        "Cross-train team members for flexibility",
        "Use AI-powered route optimization",
      ],
      historicalAccuracy: 0.85,
    },
  ];

  const customerInsights: CustomerInsight[] = [
    {
      id: "customer-1",
      name: "Johnson Family",
      lifetimeValue: 25400,
      predictedValue: 32000,
      churnRisk: 0.15,
      nextProjectProbability: 0.78,
      recommendedActions: [
        "Offer bathroom renovation consultation",
        "Send seasonal maintenance reminders",
      ],
      segment: "high-value",
    },
    {
      id: "customer-2",
      name: "Smith Construction LLC",
      lifetimeValue: 45600,
      predictedValue: 67000,
      churnRisk: 0.08,
      nextProjectProbability: 0.92,
      recommendedActions: [
        "Propose annual maintenance contract",
        "Introduce commercial renovation services",
      ],
      segment: "high-value",
    },
    {
      id: "customer-3",
      name: "Davis Residence",
      lifetimeValue: 8200,
      predictedValue: 15000,
      churnRisk: 0.45,
      nextProjectProbability: 0.34,
      recommendedActions: [
        "Schedule follow-up call",
        "Offer loyalty discount",
        "Request feedback and testimonial",
      ],
      segment: "at-risk",
    },
    {
      id: "customer-4",
      name: "Wilson Property Group",
      lifetimeValue: 12800,
      predictedValue: 28000,
      churnRisk: 0.22,
      nextProjectProbability: 0.65,
      recommendedActions: [
        "Present portfolio of recent work",
        "Offer bulk project discounts",
      ],
      segment: "growing",
    },
  ];

  const equipmentPredictions: EquipmentPrediction[] = [
    {
      id: "eq-1",
      name: "Tile Saw - Model TS-2000",
      type: "Cutting Equipment",
      maintenanceDue: "3 days",
      failureRisk: 0.73,
      costImpact: 2400,
      recommendedAction: "Schedule immediate maintenance",
      priority: "urgent",
    },
    {
      id: "eq-2",
      name: "Air Compressor - AC-500",
      type: "Power Tools",
      maintenanceDue: "12 days",
      failureRisk: 0.45,
      costImpact: 1200,
      recommendedAction: "Order replacement seals",
      priority: "high",
    },
    {
      id: "eq-3",
      name: "Concrete Mixer - CM-350",
      type: "Heavy Equipment",
      maintenanceDue: "28 days",
      failureRisk: 0.28,
      costImpact: 800,
      recommendedAction: "Routine inspection",
      priority: "medium",
    },
    {
      id: "eq-4",
      name: "Drill Set - Professional",
      type: "Hand Tools",
      maintenanceDue: "45 days",
      failureRisk: 0.12,
      costImpact: 300,
      recommendedAction: "Clean and calibrate",
      priority: "low",
    },
  ];

  const timeframes = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "1y", label: "Last year" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cost", label: "Cost Predictions" },
    { value: "revenue", label: "Revenue Forecasts" },
    { value: "customer", label: "Customer Analytics" },
    { value: "equipment", label: "Equipment Maintenance" },
    { value: "timeline", label: "Timeline Optimization" },
  ];

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) {
      return <Badge className="bg-green-500 text-white">High Confidence</Badge>;
    } else if (confidence >= 0.7) {
      return (
        <Badge className="bg-yellow-500 text-white">Medium Confidence</Badge>
      );
    } else {
      return <Badge className="bg-red-500 text-white">Low Confidence</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    const impactConfig = {
      high: { color: "bg-red-500", label: "High Impact" },
      medium: { color: "bg-yellow-500", label: "Medium Impact" },
      low: { color: "bg-green-500", label: "Low Impact" },
    };

    const config = impactConfig[impact as keyof typeof impactConfig];
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      urgent: {
        color: "bg-red-600",
        label: "Urgent",
        icon: <AlertTriangle className="h-3 w-3" />,
      },
      high: {
        color: "bg-orange-500",
        label: "High",
        icon: <AlertCircle className="h-3 w-3" />,
      },
      medium: {
        color: "bg-yellow-500",
        label: "Medium",
        icon: <Clock className="h-3 w-3" />,
      },
      low: {
        color: "bg-green-500",
        label: "Low",
        icon: <CheckCircle className="h-3 w-3" />,
      },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getSegmentBadge = (segment: string) => {
    const segmentConfig = {
      "high-value": {
        color: "bg-purple-500",
        label: "High Value",
        icon: <Star className="h-3 w-3" />,
      },
      growing: {
        color: "bg-green-500",
        label: "Growing",
        icon: <TrendingUp className="h-3 w-3" />,
      },
      "at-risk": {
        color: "bg-red-500",
        label: "At Risk",
        icon: <AlertTriangle className="h-3 w-3" />,
      },
      new: {
        color: "bg-blue-500",
        label: "New",
        icon: <Users className="h-3 w-3" />,
      },
    };

    const config = segmentConfig[segment as keyof typeof segmentConfig];
    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") {
      return (
        <ArrowUp
          className={`h-4 w-4 ${change > 0 ? "text-green-500" : "text-red-500"}`}
        />
      );
    } else if (trend === "down") {
      return (
        <ArrowDown
          className={`h-4 w-4 ${change < 0 ? "text-green-500" : "text-red-500"}`}
        />
      );
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredPredictions =
    selectedCategory === "all"
      ? predictions
      : predictions.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                Predictive Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                AI-powered insights and predictions for your construction
                business
              </p>
            </div>
            <div className="flex gap-3">
              <Select
                value={selectedTimeframe}
                onValueChange={setSelectedTimeframe}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map((timeframe) => (
                    <SelectItem key={timeframe.value} value={timeframe.value}>
                      {timeframe.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={handleRefreshData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricCards.map((metric) => (
            <Card key={metric.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-2xl font-bold text-gray-900">
                        {metric.value}
                      </p>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(metric.trend, metric.change)}
                        <span
                          className={`text-sm font-medium ${
                            metric.change > 0
                              ? "text-green-600"
                              : metric.change < 0
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {Math.abs(metric.change)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {metric.prediction}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress
                        value={metric.confidence * 100}
                        className="flex-1 h-2"
                      />
                      <span className="text-xs font-medium">
                        {Math.round(metric.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <div className="text-white">{metric.icon}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Predictions Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    AI Predictions Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {predictions.slice(0, 3).map((prediction) => (
                      <div
                        key={prediction.id}
                        className="border-l-4 border-blue-500 pl-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {prediction.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {prediction.prediction}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              {getConfidenceBadge(prediction.confidence)}
                              {getImpactBadge(prediction.impact)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => setActiveTab("predictions")}
                  >
                    View All Predictions
                  </Button>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    AI Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Overall Accuracy
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={87} className="w-20 h-2" />
                        <span className="text-sm font-bold">87%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Cost Predictions
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={91} className="w-20 h-2" />
                        <span className="text-sm font-bold">91%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Timeline Accuracy
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={84} className="w-20 h-2" />
                        <span className="text-sm font-bold">84%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Equipment Maintenance
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress value={93} className="w-20 h-2" />
                        <span className="text-sm font-bold">93%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Recent AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        Cost Optimization
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Bulk purchasing materials can save 15% on your next 3
                      projects
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-900">
                        Customer Opportunity
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      3 high-value customers are ready for follow-up projects
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="h-5 w-5 text-orange-600" />
                      <span className="font-medium text-orange-900">
                        Equipment Alert
                      </span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Tile saw requires maintenance within 3 days to prevent
                      failure
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                AI Predictions
              </h2>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6">
              {filteredPredictions.map((prediction) => (
                <Card
                  key={prediction.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {prediction.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {prediction.details}
                        </p>
                        <div className="flex items-center gap-3 mb-4">
                          {getConfidenceBadge(prediction.confidence)}
                          {getImpactBadge(prediction.impact)}
                          <Badge variant="outline">
                            {prediction.timeframe}
                          </Badge>
                          {prediction.historicalAccuracy && (
                            <Badge className="bg-gray-500 text-white">
                              {Math.round(prediction.historicalAccuracy * 100)}%
                              Historical Accuracy
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {prediction.prediction}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {Math.round(prediction.confidence * 100)}% confidence
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        AI Recommendations:
                      </h4>
                      <div className="space-y-2">
                        {prediction.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Customer Analytics
              </h2>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Customer Data
              </Button>
            </div>

            <div className="grid gap-6">
              {customerInsights.map((customer) => (
                <Card
                  key={customer.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {customer.name}
                          </h3>
                          {getSegmentBadge(customer.segment)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Lifetime Value
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              ${customer.lifetimeValue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Predicted Value
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              ${customer.predictedValue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Churn Risk</p>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={customer.churnRisk * 100}
                                className="flex-1 h-2"
                              />
                              <span
                                className={`text-sm font-bold ${
                                  customer.churnRisk > 0.3
                                    ? "text-red-600"
                                    : customer.churnRisk > 0.15
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }`}
                              >
                                {Math.round(customer.churnRisk * 100)}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Next Project
                            </p>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={customer.nextProjectProbability * 100}
                                className="flex-1 h-2"
                              />
                              <span className="text-sm font-bold text-blue-600">
                                {Math.round(
                                  customer.nextProjectProbability * 100,
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Recommended Actions:
                      </h4>
                      <div className="space-y-2">
                        {customer.recommendedActions.map((action, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {action}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Equipment Tab */}
          <TabsContent value="equipment" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Equipment Maintenance Predictions
              </h2>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Maintenance Settings
              </Button>
            </div>

            <div className="grid gap-6">
              {equipmentPredictions.map((equipment) => (
                <Card
                  key={equipment.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {equipment.name}
                          </h3>
                          {getPriorityBadge(equipment.priority)}
                        </div>
                        <p className="text-gray-600 mb-3">{equipment.type}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Maintenance Due
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {equipment.maintenanceDue}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Failure Risk
                            </p>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={equipment.failureRisk * 100}
                                className="flex-1 h-2"
                              />
                              <span
                                className={`text-sm font-bold ${
                                  equipment.failureRisk > 0.6
                                    ? "text-red-600"
                                    : equipment.failureRisk > 0.3
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }`}
                              >
                                {Math.round(equipment.failureRisk * 100)}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Cost Impact</p>
                            <p className="text-lg font-bold text-red-600">
                              ${equipment.costImpact.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Action</p>
                            <p className="text-sm font-medium text-gray-900">
                              {equipment.recommendedAction}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Maintenance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Maintenance Log
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Business Insights
              </h2>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Key Business Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-purple-900">
                          Revenue Growth
                        </span>
                      </div>
                      <p className="text-sm text-purple-700 mb-2">
                        Your revenue has grown 23% compared to last quarter,
                        primarily driven by bathroom renovation projects.
                      </p>
                      <Badge className="bg-purple-500 text-white">
                        High Impact
                      </Badge>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">
                          Efficiency Gains
                        </span>
                      </div>
                      <p className="text-sm text-green-700 mb-2">
                        Project completion times have improved by 18% through
                        better resource allocation and scheduling.
                      </p>
                      <Badge className="bg-green-500 text-white">
                        Positive Trend
                      </Badge>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium text-yellow-900">
                          Cost Alert
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700 mb-2">
                        Material costs have increased 8% this month. Consider
                        bulk purchasing for upcoming projects.
                      </p>
                      <Badge className="bg-yellow-500 text-white">
                        Action Required
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Optimize Pricing Strategy
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Increase bathroom renovation prices by 12% based on
                          market analysis and demand patterns.
                        </p>
                        <Badge className="mt-2 bg-blue-500 text-white">
                          Revenue Impact: +$15K/month
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Customer Retention Program
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Launch a maintenance package program to increase
                          customer lifetime value by 35%.
                        </p>
                        <Badge className="mt-2 bg-green-500 text-white">
                          LTV Impact: +$8K/customer
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Wrench className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Equipment Investment
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Invest in new tile cutting equipment to reduce project
                          time by 20% and improve quality.
                        </p>
                        <Badge className="mt-2 bg-orange-500 text-white">
                          ROI: 240% in 18 months
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  Market Trends & Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="p-4 bg-indigo-100 rounded-lg mb-3">
                      <Building className="h-8 w-8 text-indigo-600 mx-auto" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Kitchen Renovations
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Demand up 34% this quarter. Average project value: $18K
                    </p>
                    <Badge className="bg-indigo-500 text-white">
                      Hot Market
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="p-4 bg-teal-100 rounded-lg mb-3">
                      <ShieldCheck className="h-8 w-8 text-teal-600 mx-auto" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Energy Efficiency
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Green renovation requests up 45%. Premium pricing
                      opportunity.
                    </p>
                    <Badge className="bg-teal-500 text-white">
                      Growing Trend
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="p-4 bg-pink-100 rounded-lg mb-3">
                      <Award className="h-8 w-8 text-pink-600 mx-auto" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Luxury Bathrooms
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      High-end bathroom projects show 28% higher profit margins.
                    </p>
                    <Badge className="bg-pink-500 text-white">
                      High Margin
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;
