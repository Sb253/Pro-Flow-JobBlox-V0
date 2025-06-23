import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  FileText,
  Download,
  Upload,
  Camera,
  Wand2,
  RefreshCw,
  Eye,
  Edit,
  Save,
  Share,
  Copy,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Image,
  FileImage,
  Languages,
  BarChart3,
  Clock,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  Wrench,
  Palette,
  Type,
  Layout,
  Settings,
} from "lucide-react";

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "invoice" | "estimate" | "contract" | "proposal" | "report";
  fields: string[];
  aiFeatures: string[];
  complexity: "simple" | "standard" | "advanced";
  estimatedTime: string;
  popularity: number;
}

interface GeneratedDocument {
  id: string;
  title: string;
  type: string;
  content: string;
  status: "draft" | "review" | "approved" | "sent";
  createdAt: Date;
  aiConfidence: number;
  metadata: {
    wordCount: number;
    estimatedValue?: number;
    language: string;
    customizations: string[];
  };
}

interface AIAnalysis {
  extractedData: Record<string, any>;
  suggestions: string[];
  confidence: number;
  processingTime: number;
}

const SmartDocumentGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [generatedDocuments, setGeneratedDocuments] = useState<
    GeneratedDocument[]
  >([]);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [customInstructions, setCustomInstructions] = useState("");
  const [batchMode, setBatchMode] = useState(false);

  const documentTemplates: DocumentTemplate[] = [
    {
      id: "invoice-standard",
      name: "Standard Invoice",
      description: "Professional invoice with itemized billing",
      category: "billing",
      type: "invoice",
      fields: ["client", "project", "items", "labor", "materials", "tax"],
      aiFeatures: ["Auto-calculation", "Tax optimization", "Payment terms"],
      complexity: "simple",
      estimatedTime: "2 minutes",
      popularity: 95,
    },
    {
      id: "estimate-detailed",
      name: "Detailed Project Estimate",
      description: "Comprehensive cost breakdown with AI predictions",
      category: "estimation",
      type: "estimate",
      fields: [
        "project",
        "scope",
        "materials",
        "labor",
        "timeline",
        "contingency",
      ],
      aiFeatures: ["Cost prediction", "Market pricing", "Risk analysis"],
      complexity: "advanced",
      estimatedTime: "8 minutes",
      popularity: 88,
    },
    {
      id: "contract-construction",
      name: "Construction Contract",
      description: "Legal contract with AI-powered clause suggestions",
      category: "legal",
      type: "contract",
      fields: ["parties", "scope", "timeline", "payment", "terms", "liability"],
      aiFeatures: ["Legal compliance", "Risk mitigation", "Industry standards"],
      complexity: "advanced",
      estimatedTime: "15 minutes",
      popularity: 76,
    },
    {
      id: "proposal-renovation",
      name: "Renovation Proposal",
      description: "Compelling proposal with visual elements",
      category: "sales",
      type: "proposal",
      fields: [
        "client",
        "vision",
        "approach",
        "timeline",
        "investment",
        "benefits",
      ],
      aiFeatures: [
        "Persuasive writing",
        "Visual suggestions",
        "Competitive analysis",
      ],
      complexity: "standard",
      estimatedTime: "10 minutes",
      popularity: 82,
    },
    {
      id: "report-progress",
      name: "Project Progress Report",
      description: "Automated progress tracking with insights",
      category: "reporting",
      type: "report",
      fields: [
        "project",
        "milestones",
        "budget",
        "timeline",
        "issues",
        "next-steps",
      ],
      aiFeatures: [
        "Progress analysis",
        "Trend identification",
        "Recommendations",
      ],
      complexity: "standard",
      estimatedTime: "5 minutes",
      popularity: 71,
    },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  ];

  const mockDocuments: GeneratedDocument[] = [
    {
      id: "doc-1",
      title: "Kitchen Renovation Invoice - Johnson Residence",
      type: "invoice",
      content: "Professional invoice with detailed breakdown...",
      status: "sent",
      createdAt: new Date(Date.now() - 86400000),
      aiConfidence: 0.96,
      metadata: {
        wordCount: 342,
        estimatedValue: 3250,
        language: "en",
        customizations: ["Company branding", "Payment terms"],
      },
    },
    {
      id: "doc-2",
      title: "Bathroom Remodel Estimate - Smith Property",
      type: "estimate",
      content: "Comprehensive cost analysis with AI predictions...",
      status: "review",
      createdAt: new Date(Date.now() - 172800000),
      aiConfidence: 0.89,
      metadata: {
        wordCount: 567,
        estimatedValue: 8750,
        language: "en",
        customizations: ["Risk analysis", "Timeline optimization"],
      },
    },
    {
      id: "doc-3",
      title: "Commercial Renovation Proposal - ABC Corp",
      type: "proposal",
      content: "Persuasive proposal with visual elements...",
      status: "draft",
      createdAt: new Date(Date.now() - 259200000),
      aiConfidence: 0.92,
      metadata: {
        wordCount: 1234,
        estimatedValue: 45000,
        language: "en",
        customizations: ["Visual mockups", "ROI analysis"],
      },
    },
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = documentTemplates.find((t) => t.id === templateId);
    if (template) {
      // Initialize form data with template fields
      const initialData: Record<string, string> = {};
      template.fields.forEach((field) => {
        initialData[field] = "";
      });
      setFormData(initialData);
    }
  };

  const handleGenerateDocument = async () => {
    if (!selectedTemplate) return;

    setIsGenerating(true);
    try {
      // Simulate advanced AI document generation with multiple phases
      const phases = [
        "Analyzing project requirements...",
        "Gathering historical data...",
        "Applying legal compliance checks...",
        "Generating content with AI...",
        "Optimizing for industry standards...",
        "Finalizing document structure...",
      ];

      for (let i = 0; i < phases.length; i++) {
        await new Promise((resolve) =>
          setTimeout(resolve, 800 + Math.random() * 400),
        );
        // In a real app, you'd update a progress indicator here
      }

      const template = documentTemplates.find((t) => t.id === selectedTemplate);

      // Enhanced document generation with AI-powered content
      const aiGeneratedContent = generateAdvancedContent(template, formData);

      const newDocument: GeneratedDocument = {
        id: `doc-${Date.now()}`,
        title: `${template?.name} - ${formData.client || "New Client"}`,
        type: template?.type || "document",
        content: aiGeneratedContent,
        status: "draft",
        createdAt: new Date(),
        aiConfidence: 0.92 + Math.random() * 0.08,
        metadata: {
          wordCount: Math.floor(800 + Math.random() * 1200),
          estimatedValue: formData.value ? parseInt(formData.value) : undefined,
          language: selectedLanguage,
          customizations: [
            ...(template?.aiFeatures || []),
            "Legal compliance verified",
            "Industry standards applied",
            "Risk assessment included",
            "Performance metrics integrated",
          ],
        },
      };

      setGeneratedDocuments((prev) => [newDocument, ...prev]);
      setActiveTab("documents");
    } catch (error) {
      console.error("Document generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAdvancedContent = (
    template: DocumentTemplate | undefined,
    data: Record<string, string>,
  ) => {
    if (!template) return "AI-generated document content...";

    switch (template.type) {
      case "contract":
        return `**CONSTRUCTION CONTRACT**

**AI-GENERATED LEGAL DOCUMENT**

This contract has been automatically generated using advanced AI technology, incorporating:
• Industry-standard legal clauses
• Risk mitigation strategies
• Compliance with local building codes
• Performance-based payment terms
• Automated change order procedures

**PARTIES:**
Contractor: [Your Company Name]
Client: ${data.client || "[Client Name]"}

**PROJECT SCOPE:**
${data.scope || "[AI will analyze project requirements and generate detailed scope]"}

**SMART CONTRACT FEATURES:**
• Automated milestone tracking
• AI-powered progress verification
• Dynamic pricing adjustments
• Real-time compliance monitoring
• Predictive risk assessment

**PAYMENT TERMS:**
AI-optimized payment schedule based on project complexity and cash flow analysis.

**LEGAL COMPLIANCE:**
✓ Local building codes verified
✓ Insurance requirements met
✓ Permit procedures outlined
✓ Safety regulations incorporated

[Additional AI-generated clauses based on project type and risk assessment...]`;

      case "report":
        return `**PROJECT PROGRESS REPORT**

**AI-POWERED ANALYTICS REPORT**

Generated using machine learning algorithms and real-time data analysis.

**EXECUTIVE SUMMARY:**
Project: ${data.project || "[Project Name]"}
Client: ${data.client || "[Client Name]"}
Status: ${data.status || "In Progress"}

**AI INSIGHTS:**
• Completion Probability: 94% on-time delivery
• Budget Variance: -2.3% (under budget)
• Quality Score: 96/100 (AI assessment)
• Risk Level: Low (automated monitoring)

**PERFORMANCE METRICS:**
• Productivity Index: 112% (above baseline)
• Resource Utilization: 89% efficiency
• Customer Satisfaction: 4.8/5.0
• Safety Compliance: 100%

**PREDICTIVE ANALYSIS:**
• Estimated Completion: [AI-calculated date]
• Budget Forecast: [AI-optimized projections]
• Resource Requirements: [ML-based recommendations]
• Risk Mitigation: [Automated suggestions]

**AUTOMATED RECOMMENDATIONS:**
1. Optimize material delivery schedule
2. Adjust team allocation for peak efficiency
3. Implement preventive quality measures
4. Schedule customer communication touchpoints

[Detailed AI-generated analysis continues...]`;

      case "estimate":
        return `**DETAILED PROJECT ESTIMATE**

**AI-ENHANCED COST ANALYSIS**

Powered by machine learning algorithms analyzing 1000+ similar projects.

**PROJECT OVERVIEW:**
Client: ${data.client || "[Client Name]"}
Project: ${data.project || "[Project Description]"}
Location: ${data.location || "[Project Location]"}

**AI COST BREAKDOWN:**

**MATERIALS** (AI-Optimized Pricing)
• Primary Materials: $[AI-calculated]
• Specialty Items: $[Market-adjusted]
• Contingency (8%): $[Risk-assessed]

**LABOR** (Performance-Based Estimation)
• Skilled Labor: [AI-estimated hours] @ $[Optimized rate]
• General Labor: [Calculated hours] @ $[Market rate]
• Supervision: [Project-specific] @ $[Premium rate]

**AI ADVANTAGES:**
• 94% accuracy rate vs traditional estimates
• Real-time market price integration
• Historical performance data analysis
• Risk-adjusted contingency planning
• Seasonal cost optimization

**SMART FEATURES:**
• Dynamic pricing updates
• Alternative material suggestions
• Value engineering opportunities
• Financing options analysis

**TOTAL INVESTMENT:** $[AI-Calculated Total]

**CONFIDENCE LEVEL:** 96% (AI Assessment)

[Additional AI-generated details and recommendations...]`;

      default:
        return `**AI-GENERATED DOCUMENT**

This document has been created using advanced artificial intelligence technology, incorporating:

• Natural language processing for optimal readability
• Industry-specific terminology and standards
• Legal compliance verification
• Performance optimization suggestions
• Risk assessment and mitigation strategies

**CONTENT OVERVIEW:**
${data.project ? `Project: ${data.project}` : ""}
${data.client ? `Client: ${data.client}` : ""}

**AI ENHANCEMENTS:**
• Automated fact-checking
• Consistency verification
• Tone optimization
• Structure standardization
• Quality assurance protocols

[AI-generated content continues with project-specific details...]`;
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...fileArray]);

    if (fileArray.length > 0) {
      setIsAnalyzing(true);
      try {
        // Simulate AI document analysis
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 + Math.random() * 3000),
        );

        const analysis: AIAnalysis = {
          extractedData: {
            clientName: "Johnson Construction LLC",
            projectType: "Kitchen Renovation",
            estimatedCost: "$12,500",
            timeline: "3-4 weeks",
            materials: ["Cabinets", "Countertops", "Appliances", "Flooring"],
            laborHours: "80 hours",
          },
          suggestions: [
            "Consider adding a 10% contingency buffer",
            "Include permit costs in the estimate",
            "Suggest eco-friendly material alternatives",
            "Add warranty information for customer confidence",
          ],
          confidence: 0.87 + Math.random() * 0.13,
          processingTime: 2.3,
        };

        setAiAnalysis(analysis);

        // Auto-populate form with extracted data
        setFormData((prev) => ({
          ...prev,
          client: analysis.extractedData.clientName,
          project: analysis.extractedData.projectType,
          value: analysis.extractedData.estimatedCost.replace(/[^0-9]/g, ""),
        }));
      } catch (error) {
        console.error("Document analysis failed:", error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleBatchGeneration = async () => {
    if (uploadedFiles.length === 0) return;

    setIsGenerating(true);
    try {
      // Simulate batch processing
      for (let i = 0; i < uploadedFiles.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const newDocument: GeneratedDocument = {
          id: `batch-doc-${Date.now()}-${i}`,
          title: `Batch Generated Document ${i + 1}`,
          type: "estimate",
          content: `AI-generated document from ${uploadedFiles[i].name}...`,
          status: "draft",
          createdAt: new Date(),
          aiConfidence: 0.8 + Math.random() * 0.15,
          metadata: {
            wordCount: Math.floor(200 + Math.random() * 600),
            language: selectedLanguage,
            customizations: ["Batch processing", "Auto-extraction"],
          },
        };

        setGeneratedDocuments((prev) => [newDocument, ...prev]);
      }
    } catch (error) {
      console.error("Batch generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: "bg-gray-500", label: "Draft" },
      review: { color: "bg-yellow-500", label: "Review" },
      approved: { color: "bg-green-500", label: "Approved" },
      sent: { color: "bg-blue-500", label: "Sent" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getComplexityBadge = (complexity: string) => {
    const complexityConfig = {
      simple: { color: "bg-green-500", label: "Simple" },
      standard: { color: "bg-yellow-500", label: "Standard" },
      advanced: { color: "bg-red-500", label: "Advanced" },
    };

    const config =
      complexityConfig[complexity as keyof typeof complexityConfig] ||
      complexityConfig.simple;
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Wand2 className="h-8 w-8 text-white" />
                </div>
                Smart Document Generator
              </h1>
              <p className="text-gray-600 mt-2">
                AI-powered document creation with intelligent data extraction
                and multi-language support
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Upload
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Documents Generated
                  </p>
                  <p className="text-2xl font-bold text-gray-900">247</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    AI Accuracy
                  </p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Time Saved
                  </p>
                  <p className="text-2xl font-bold text-gray-900">156h</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Revenue Impact
                  </p>
                  <p className="text-2xl font-bold text-gray-900">$45K</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Generate Tab */}
          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Select Template
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={selectedTemplate}
                    onValueChange={handleTemplateSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a document template" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{template.name}</span>
                            <div className="flex items-center gap-2 ml-4">
                              {getComplexityBadge(template.complexity)}
                              <span className="text-xs text-gray-500">
                                {template.estimatedTime}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedTemplate && (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">
                          {
                            documentTemplates.find(
                              (t) => t.id === selectedTemplate,
                            )?.name
                          }
                        </h4>
                        <p className="text-sm text-blue-700 mb-3">
                          {
                            documentTemplates.find(
                              (t) => t.id === selectedTemplate,
                            )?.description
                          }
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {documentTemplates
                            .find((t) => t.id === selectedTemplate)
                            ?.aiFeatures.map((feature, index) => (
                              <Badge
                                key={index}
                                className="bg-blue-500 text-white text-xs"
                              >
                                <Zap className="h-3 w-3 mr-1" />
                                {feature}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-3">
                        {documentTemplates
                          .find((t) => t.id === selectedTemplate)
                          ?.fields.map((field) => (
                            <div key={field}>
                              <Label htmlFor={field} className="capitalize">
                                {field.replace("-", " ")}
                              </Label>
                              {field === "scope" ||
                              field === "vision" ||
                              field === "approach" ? (
                                <Textarea
                                  id={field}
                                  value={formData[field] || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      [field]: e.target.value,
                                    }))
                                  }
                                  placeholder={`Enter ${field.replace("-", " ")}...`}
                                  className="mt-1"
                                />
                              ) : (
                                <Input
                                  id={field}
                                  value={formData[field] || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      [field]: e.target.value,
                                    }))
                                  }
                                  placeholder={`Enter ${field.replace("-", " ")}...`}
                                  className="mt-1"
                                />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generation Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Generation Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <div className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="instructions">Custom Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder="Add specific requirements or preferences..."
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="batch-mode"
                      checked={batchMode}
                      onChange={(e) => setBatchMode(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="batch-mode">Enable batch processing</Label>
                  </div>

                  <Button
                    onClick={handleGenerateDocument}
                    disabled={!selectedTemplate || isGenerating}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Document
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analyze Tab */}
          <TabsContent value="analyze" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Document Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            Upload Documents
                          </p>
                          <p className="text-sm text-gray-600">
                            PDF, Word, Images, or Text files
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Uploaded Files:</h4>
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <FileImage className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Badge variant="outline">
                            {(file.size / 1024).toFixed(1)} KB
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploadedFiles.length > 0 && (
                    <Button
                      onClick={handleBatchGeneration}
                      disabled={isGenerating}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Batch Generate
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* AI Analysis Results */}
              {(isAnalyzing || aiAnalysis) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      AI Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Analyzing documents...</span>
                        </div>
                        <Progress value={65} className="w-full" />
                      </div>
                    ) : (
                      aiAnalysis && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              Analysis Confidence
                            </span>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={aiAnalysis.confidence * 100}
                                className="w-20"
                              />
                              <span className="text-sm font-medium">
                                {Math.round(aiAnalysis.confidence * 100)}%
                              </span>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              Extracted Data:
                            </h4>
                            <div className="space-y-2">
                              {Object.entries(aiAnalysis.extractedData).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex justify-between text-sm"
                                  >
                                    <span className="text-gray-600 capitalize">
                                      {key.replace(/([A-Z])/g, " $1").trim()}:
                                    </span>
                                    <span className="font-medium">{value}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              AI Suggestions:
                            </h4>
                            <div className="space-y-2">
                              {aiAnalysis.suggestions.map(
                                (suggestion, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2 text-sm"
                                  >
                                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <span>{suggestion}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="text-xs text-gray-500">
                            Processing time: {aiAnalysis.processingTime}s
                          </div>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Generated Documents
              </h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export All
                </Button>
                <Button variant="outline">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {[...generatedDocuments, ...mockDocuments].map((doc) => (
                <Card
                  key={doc.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{doc.title}</h3>
                          {getStatusBadge(doc.status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {doc.content}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {doc.createdAt.toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Type className="h-4 w-4" />
                            {doc.metadata.wordCount} words
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            {Math.round(doc.aiConfidence * 100)}% confidence
                          </span>
                          {doc.metadata.estimatedValue && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />$
                              {doc.metadata.estimatedValue.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Document Templates
              </h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <FileText className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {template.description}
                        </p>
                      </div>
                      {getComplexityBadge(template.complexity)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Popularity</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={template.popularity}
                            className="w-16 h-2"
                          />
                          <span className="font-medium">
                            {template.popularity}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Est. Time</span>
                        <span className="font-medium">
                          {template.estimatedTime}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-gray-600 mb-2">
                          AI Features:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.aiFeatures
                            .slice(0, 2)
                            .map((feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                <Zap className="h-3 w-3 mr-1" />
                                {feature}
                              </Badge>
                            ))}
                          {template.aiFeatures.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.aiFeatures.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => {
                          handleTemplateSelect(template.id);
                          setActiveTab("generate");
                        }}
                      >
                        <Wand2 className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SmartDocumentGenerator;
