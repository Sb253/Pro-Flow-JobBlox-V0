import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Settings,
  Minimize2,
  Maximize2,
  X,
  Volume2,
  VolumeX,
  RefreshCw,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Wrench,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Zap,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "suggestion" | "action" | "error";
  metadata?: {
    context?: string;
    actionType?: string;
    confidence?: number;
  };
}

interface ChatMode {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  context: string[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: string;
  category: string;
}

interface AIChatAssistantProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  onClose?: () => void;
  currentContext?: string;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  isMinimized = false,
  onToggleMinimize = () => {},
  onClose = () => {},
  currentContext = "dashboard",
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedMode, setSelectedMode] = useState("general");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatModes: ChatMode[] = [
    {
      id: "general",
      name: "General Assistant",
      description: "General help and guidance",
      icon: <Bot className="h-4 w-4" />,
      color: "bg-blue-500",
      context: ["dashboard", "navigation", "general"],
    },
    {
      id: "project",
      name: "Project Manager",
      description: "Project management and scheduling",
      icon: <Calendar className="h-4 w-4" />,
      color: "bg-green-500",
      context: ["projects", "scheduling", "resources"],
    },
    {
      id: "customer",
      name: "Customer Service",
      description: "Customer support and communication",
      icon: <Users className="h-4 w-4" />,
      color: "bg-purple-500",
      context: ["customers", "support", "communication"],
    },
    {
      id: "finance",
      name: "Financial Advisor",
      description: "Financial analysis and reporting",
      icon: <DollarSign className="h-4 w-4" />,
      color: "bg-yellow-500",
      context: ["finance", "invoicing", "reports"],
    },
    {
      id: "field",
      name: "Field Assistant",
      description: "Field work and job site support",
      icon: <Wrench className="h-4 w-4" />,
      color: "bg-orange-500",
      context: ["field", "jobs", "equipment"],
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "schedule-job",
      label: "Schedule Job",
      icon: <Calendar className="h-4 w-4" />,
      action: "Help me schedule a new job",
      category: "project",
    },
    {
      id: "create-invoice",
      label: "Create Invoice",
      icon: <FileText className="h-4 w-4" />,
      action: "Help me create an invoice",
      category: "finance",
    },
    {
      id: "add-customer",
      label: "Add Customer",
      icon: <Users className="h-4 w-4" />,
      action: "Help me add a new customer",
      category: "customer",
    },
    {
      id: "route-optimization",
      label: "Optimize Routes",
      icon: <MapPin className="h-4 w-4" />,
      action: "Help me optimize field worker routes",
      category: "field",
    },
    {
      id: "cost-estimate",
      label: "Cost Estimate",
      icon: <DollarSign className="h-4 w-4" />,
      action: "Help me estimate project costs",
      category: "project",
    },
    {
      id: "equipment-check",
      label: "Equipment Status",
      icon: <Wrench className="h-4 w-4" />,
      action: "Check equipment maintenance status",
      category: "field",
    },
  ];

  const contextualSuggestions = {
    dashboard: [
      "Show me today's key metrics",
      "What projects need attention?",
      "Generate a weekly summary report",
    ],
    projects: [
      "Analyze project profitability",
      "Suggest resource allocation",
      "Predict project completion dates",
    ],
    customers: [
      "Identify high-value customers",
      "Draft customer follow-up emails",
      "Analyze customer satisfaction trends",
    ],
    finance: [
      "Generate financial forecasts",
      "Analyze cash flow patterns",
      "Suggest cost optimization strategies",
    ],
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message based on user role and context
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: `Hello! I'm your AI assistant for JobBlox CRM. I can help you with project management, customer service, financial analysis, and field operations. How can I assist you today?`,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
        metadata: {
          context: currentContext,
          confidence: 1.0,
        },
      };
      setMessages([welcomeMessage]);
    }
  }, [currentContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simulate AI response with context awareness
      const aiResponse = await generateAIResponse(
        content,
        selectedMode,
        currentContext,
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: "ai",
        timestamp: new Date(),
        type: aiResponse.type,
        metadata: aiResponse.metadata,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
        type: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (
    input: string,
    mode: string,
    context: string,
  ) => {
    // Simulate API call delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000),
    );

    const lowerInput = input.toLowerCase();

    // Advanced Context-aware responses with job recommendations
    if (lowerInput.includes("schedule") || lowerInput.includes("appointment")) {
      return {
        content:
          "🎯 **Smart Scheduling Recommendation**: Based on your current workload, team availability, and historical data, I recommend scheduling this for next Tuesday at 2 PM. Here's why:\n\n• Mike Johnson has 3 hours available and specializes in this type of work\n• Route optimization saves 45 minutes travel time\n• Weather forecast is optimal (sunny, 72°F)\n• Customer's preferred time slot based on past interactions\n\n**Recommended Actions:**\n1. Schedule with Mike Johnson\n2. Send automated reminder 24h before\n3. Prepare materials list (auto-generated)\n\nShall I proceed with this optimized scheduling?",
        type: "suggestion" as const,
        metadata: {
          context: "scheduling",
          actionType: "smart_schedule_job",
          confidence: 0.94,
          recommendations: [
            "Assign to Mike Johnson (97% success rate)",
            "Tuesday 2 PM slot (optimal)",
            "Auto-prepare materials list",
          ],
        },
      };
    }

    if (
      lowerInput.includes("cost") ||
      lowerInput.includes("estimate") ||
      lowerInput.includes("price")
    ) {
      return {
        content:
          "💰 **AI-Powered Cost Analysis**: Based on 247 similar projects and current market data:\n\n**Estimated Range**: $2,800 - $3,200\n• Materials: $1,200 (15% below market avg)\n• Labor: 16 hours @ $75/hr = $1,200\n• Contingency: 15% ($480)\n• Profit Margin: 28% (above industry standard)\n\n**Smart Recommendations:**\n• 🔥 **Upsell Opportunity**: Premium fixtures (+$800, 40% margin)\n• ⚡ **Seasonal Discount**: Apply 5% early booking discount\n• 📊 **Win Probability**: 87% based on customer profile\n\n**Next Steps:**\n1. Generate detailed estimate with AI templates\n2. Schedule site visit for precise measurements\n3. Send interactive proposal with 3D mockups\n\nWould you like me to create the full estimate package?",
        type: "suggestion" as const,
        metadata: {
          context: "finance",
          actionType: "ai_cost_estimate",
          confidence: 0.91,
          recommendations: [
            "Upsell premium fixtures (+$800)",
            "Apply early booking discount (5%)",
            "Include 3D mockups for higher conversion",
          ],
        },
      };
    }

    if (lowerInput.includes("customer") || lowerInput.includes("client")) {
      return {
        content:
          "👥 **Customer Intelligence Report**: AI analysis of your customer base reveals key opportunities:\n\n**High-Value Prospects** (Ready for outreach):\n• Sarah Johnson - $15K+ project potential, 30 days since last contact\n• Mike Wilson - Referred 3 customers, expansion project likely\n• Lisa Davis - Seasonal maintenance due, 95% renewal probability\n\n**Personalized Outreach Suggestions:**\n• Sarah: Kitchen renovation follow-up (her Pinterest activity shows interest)\n• Mike: Commercial expansion proposal (business growth detected)\n• Lisa: Preventive maintenance package (cost-effective positioning)\n\n**AI-Generated Actions:**\n1. Draft personalized emails with dynamic content\n2. Schedule optimal send times (based on engagement data)\n3. Set up automated follow-up sequences\n4. Create targeted service packages\n\n**Predicted Outcomes:**\n• 73% response rate (vs 23% industry avg)\n• $42K potential revenue from these 3 contacts\n\nShall I execute this customer engagement strategy?",
        type: "suggestion" as const,
        metadata: {
          context: "customer",
          actionType: "ai_customer_intelligence",
          confidence: 0.96,
          recommendations: [
            "Personalized outreach to 3 high-value prospects",
            "Automated follow-up sequences",
            "Targeted service packages",
          ],
        },
      };
    }

    if (
      lowerInput.includes("route") ||
      lowerInput.includes("optimize") ||
      lowerInput.includes("travel")
    ) {
      return {
        content:
          "🗺️ **AI Route Optimization**: Real-time analysis of today's schedule:\n\n**Current Efficiency**: 67% (Below optimal)\n**Optimized Routes Save**: 2.1 hours total, $156 in fuel costs\n\n**Team Optimizations:**\n• **Mike's Route**: 23% improvement (1.2h saved)\n  - Avoid Highway 101 construction (15min delay)\n  - Lunch break at optimal location\n  - Traffic-aware departure times\n\n• **Sarah's Route**: 18% improvement (45min saved)\n  - Combine nearby appointments\n  - Use alternate route via Oak Street\n  - Reschedule 3 PM to avoid school traffic\n\n**Smart Features:**\n• Real-time traffic integration\n• Weather impact analysis\n• Customer availability optimization\n• Fuel cost minimization\n• Emergency re-routing capability\n\n**Additional Benefits:**\n• Reduced vehicle wear: $89/month savings\n• Improved customer satisfaction: Earlier arrivals\n• Team morale boost: Less time in traffic\n\nShall I update their schedules and send notifications?",
        type: "action" as const,
        metadata: {
          context: "field",
          actionType: "ai_route_optimization",
          confidence: 0.93,
          recommendations: [
            "Save 2.1 hours daily with optimized routes",
            "Reduce fuel costs by $156/week",
            "Implement real-time traffic integration",
          ],
        },
      };
    }

    if (
      lowerInput.includes("report") ||
      lowerInput.includes("summary") ||
      lowerInput.includes("analytics")
    ) {
      return {
        content:
          "📊 **AI Business Intelligence Report**: Comprehensive analysis of your operations:\n\n**Performance Metrics** (This Week):\n• Jobs Completed: 12 (↑15% vs last week)\n• Revenue: $47,300 (↑8%, trending positive)\n• Customer Satisfaction: 94% (↑2%)\n• Profit Margin: 31% (above industry 24%)\n\n**Team Performance:**\n🏆 **Top Performer**: Mike Johnson\n  - 6 jobs completed (5-star average)\n  - 23% faster than estimated times\n  - Zero customer complaints\n  - Recommended for team lead promotion\n\n**Business Opportunities** (AI-Identified):\n• 3 follow-up quotes pending: $18K total value\n• Seasonal demand spike predicted (next 2 weeks)\n• Upselling opportunity: 67% of customers interested in premium services\n• New service area expansion: 34% ROI potential\n\n**Predictive Insights:**\n• Next month revenue forecast: $52K-58K\n• Optimal hiring time: 3 weeks (demand surge)\n• Equipment maintenance due: Truck #2 (schedule now)\n• Customer churn risk: 2 accounts (proactive outreach needed)\n\n**Automated Actions Available:**\n1. Generate detailed performance reports\n2. Create team recognition announcements\n3. Schedule equipment maintenance\n4. Launch customer retention campaigns\n\nWhich insights would you like me to explore further?",
        type: "suggestion" as const,
        metadata: {
          context: "analytics",
          actionType: "ai_business_intelligence",
          confidence: 0.97,
          recommendations: [
            "Promote Mike Johnson to team lead",
            "Follow up on $18K pending quotes",
            "Schedule equipment maintenance",
            "Launch customer retention campaign",
          ],
        },
      };
    }

    // Job recommendation system
    if (
      lowerInput.includes("recommend") ||
      lowerInput.includes("suggest") ||
      lowerInput.includes("job")
    ) {
      return {
        content:
          "🎯 **AI Job Recommendations**: Based on your expertise, capacity, and market analysis:\n\n**High-Priority Opportunities:**\n\n1. **Kitchen Renovation - Johnson Residence**\n   • Value: $8,500 • Probability: 89% • Timeline: 2 weeks\n   • Match Score: 94% (your specialty)\n   • Customer: Repeat client, always pays on time\n   • Recommended Team: Mike + Sarah (optimal skill combo)\n\n2. **Commercial Bathroom Upgrade - ABC Corp**\n   • Value: $15,200 • Probability: 76% • Timeline: 1 week\n   • Match Score: 87% (commercial experience)\n   • Urgency: High (facility compliance deadline)\n   • Profit Margin: 35% (premium pricing justified)\n\n3. **Home Addition - Wilson Property**\n   • Value: $32,000 • Probability: 68% • Timeline: 6 weeks\n   • Match Score: 91% (complex projects)\n   • Strategic Value: Portfolio expansion\n   • Referral Potential: High (neighborhood influence)\n\n**AI Insights:**\n• Best time to contact: Tuesday 10-11 AM (highest response rate)\n• Optimal pricing strategy: Premium positioning (+12% vs competitors)\n• Resource allocation: 2 teams can handle concurrent projects\n• Risk factors: Weather dependency (outdoor work)\n\n**Next Steps:**\n1. Prioritize Johnson (quick win, high probability)\n2. Prepare detailed proposals with 3D mockups\n3. Schedule site visits within 48 hours\n4. Set up automated follow-up sequences\n\nShall I initiate contact with these prospects?",
        type: "suggestion" as const,
        metadata: {
          context: "recommendations",
          actionType: "ai_job_recommendations",
          confidence: 0.92,
          recommendations: [
            "Prioritize Johnson kitchen renovation (89% win rate)",
            "Fast-track ABC Corp commercial project",
            "Prepare 3D mockups for Wilson addition",
          ],
        },
      };
    }

    // Default contextual response with enhanced AI capabilities
    const responses = {
      general:
        "🤖 **AI Assistant Ready**: I'm your intelligent business partner with advanced capabilities:\n\n**Core Functions:**\n• 🎯 Smart job recommendations based on ML analysis\n• 📊 Predictive analytics and forecasting\n• 🗺️ Real-time route optimization\n• 💰 AI-powered cost estimation\n• 👥 Customer intelligence and segmentation\n• 📈 Performance optimization suggestions\n\n**Advanced Features:**\n• Natural language processing for complex queries\n• Pattern recognition from historical data\n• Automated workflow suggestions\n• Risk assessment and mitigation\n• Market trend analysis\n\nWhat would you like to optimize today?",
      project:
        "🏗️ **Project AI Manager**: Advanced project intelligence at your service:\n\n**Capabilities:**\n• Predict completion dates with 94% accuracy\n• Optimize resource allocation using ML algorithms\n• Identify potential delays before they occur\n• Suggest cost-saving opportunities\n• Automate progress reporting\n• Risk assessment and contingency planning\n\n**Smart Recommendations:**\n• Team performance optimization\n• Material procurement timing\n• Quality control checkpoints\n• Customer communication automation\n\nWhich project needs AI-powered optimization?",
      customer:
        "👥 **Customer AI Specialist**: Intelligent customer relationship management:\n\n**Advanced Analytics:**\n• Customer lifetime value prediction\n• Churn risk assessment\n• Personalized communication strategies\n• Upselling opportunity identification\n• Satisfaction score forecasting\n• Referral potential analysis\n\n**Automated Actions:**\n• Personalized email campaigns\n• Follow-up sequence optimization\n• Service package recommendations\n• Loyalty program management\n\nWhich customers should we focus on for maximum impact?",
      finance:
        "💰 **Financial AI Advisor**: Intelligent financial management and analysis:\n\n**Smart Capabilities:**\n• AI-powered cost estimation with 91% accuracy\n• Profitability analysis and optimization\n• Cash flow forecasting\n• Pricing strategy recommendations\n• Invoice automation and follow-up\n• Tax optimization suggestions\n\n**Predictive Insights:**\n• Revenue forecasting\n• Expense pattern analysis\n• Investment opportunity assessment\n• Risk management strategies\n\nWhat financial insights can I provide?",
      field:
        "🚛 **Field Operations AI**: Intelligent field management system:\n\n**Optimization Features:**\n• Real-time route optimization\n• Equipment maintenance prediction\n• Job site productivity analysis\n• Team coordination automation\n• Weather impact assessment\n• Emergency response planning\n\n**Smart Monitoring:**\n• GPS tracking with AI insights\n• Performance benchmarking\n• Safety compliance checking\n• Resource utilization optimization\n\nHow can I optimize your field operations today?",
    };

    return {
      content: responses[mode as keyof typeof responses] || responses.general,
      type: "text" as const,
      metadata: {
        context: mode,
        confidence: 0.88,
        aiFeatures: [
          "Machine Learning Analysis",
          "Predictive Intelligence",
          "Natural Language Processing",
          "Real-time Optimization",
        ],
      },
    };
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
    } else {
      // Start listening
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        setInputValue("Schedule a kitchen renovation for next week");
      }, 3000);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if (isSpeaking) {
      setIsSpeaking(false);
      // Stop speech synthesis
    } else {
      setIsSpeaking(true);
      // Simulate text-to-speech
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const getMessageIcon = (message: Message) => {
    if (message.sender === "user") {
      return <User className="h-4 w-4" />;
    }

    switch (message.type) {
      case "suggestion":
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case "action":
        return <Zap className="h-4 w-4 text-blue-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bot className="h-4 w-4 text-blue-500" />;
    }
  };

  const getMessageBadge = (message: Message) => {
    if (message.metadata?.confidence && message.metadata.confidence < 0.8) {
      return (
        <Badge variant="outline" className="text-xs ml-2">
          Low Confidence
        </Badge>
      );
    }
    if (message.type === "suggestion") {
      return <Badge className="bg-yellow-500 text-xs ml-2">Suggestion</Badge>;
    }
    if (message.type === "action") {
      return <Badge className="bg-blue-500 text-xs ml-2">Action</Badge>;
    }
    return null;
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] bg-white border border-gray-200 rounded-lg shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-white/20 rounded">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <p className="text-xs opacity-90">
              {chatModes.find((m) => m.id === selectedMode)?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMinimize}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Mode Selector */}
      <div className="p-2 border-b bg-gray-50">
        <div className="flex gap-1 overflow-x-auto">
          {chatModes.map((mode) => (
            <Button
              key={mode.id}
              variant={selectedMode === mode.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedMode(mode.id)}
              className={`flex items-center gap-1 text-xs whitespace-nowrap ${
                selectedMode === mode.id ? mode.color : ""
              }`}
            >
              {mode.icon}
              {mode.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100">
                    {getMessageIcon(message)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : message.type === "error"
                      ? "bg-red-50 border border-red-200"
                      : message.type === "suggestion"
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-gray-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm">{message.content}</p>
                  {message.sender === "ai" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTextToSpeech(message.content)}
                      className="ml-2 h-6 w-6 p-0"
                    >
                      {isSpeaking ? (
                        <VolumeX className="h-3 w-3" />
                      ) : (
                        <Volume2 className="h-3 w-3" />
                      )}
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {getMessageBadge(message)}
                </div>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100">
                  <Bot className="h-4 w-4 text-blue-500" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      {showSuggestions && (
        <div className="p-2 border-t bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">
              Quick Actions
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestions(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {quickActions
              .filter(
                (action) =>
                  action.category === selectedMode ||
                  selectedMode === "general",
              )
              .slice(0, 4)
              .map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center gap-1 text-xs h-8"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
          </div>
        </div>
      )}

      {/* Contextual Suggestions */}
      {contextualSuggestions[
        currentContext as keyof typeof contextualSuggestions
      ] && (
        <div className="p-2 border-t">
          <span className="text-xs font-medium text-gray-600 mb-2 block">
            Suggestions for {currentContext}
          </span>
          <div className="space-y-1">
            {contextualSuggestions[
              currentContext as keyof typeof contextualSuggestions
            ]
              .slice(0, 2)
              .map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left justify-start text-xs h-7 text-gray-600 hover:text-gray-900"
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  {suggestion}
                </Button>
              ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }
              }}
              placeholder="Ask me anything about your business..."
              disabled={isLoading}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceToggle}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${
                isListening ? "text-red-500" : "text-gray-400"
              }`}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {isListening && (
          <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Listening...
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatAssistant;
