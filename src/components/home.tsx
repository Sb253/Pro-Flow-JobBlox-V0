import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  Calendar,
  FileText,
  Shield,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Globe,
  BarChart3,
  Clock,
  Target,
  Settings,
  Phone,
  Mail,
  MapPin,
  Award,
  TrendingUp,
  DollarSign,
  Hammer,
  Truck,
  HardHat,
  Calculator,
  FileCheck,
  MessageSquare,
  Smartphone,
  Cloud,
  Lock,
  Headphones,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [systemHealth, setSystemHealth] = useState({
    containerStatus: "checking",
    renderTime: Date.now(),
    errors: [] as string[],
  });

  useEffect(() => {
    // System health check
    const checkSystemHealth = () => {
      try {
        console.log("Landing page mounted successfully");
        console.log("Navigation available:", typeof navigate === "function");
        console.log("React version:", React.version);

        setSystemHealth((prev) => ({
          ...prev,
          containerStatus: "healthy",
          renderTime: Date.now(),
        }));
      } catch (error) {
        console.error("System health check failed:", error);
        setSystemHealth((prev) => ({
          ...prev,
          containerStatus: "error",
          errors: [...prev.errors, String(error)],
        }));
      }
    };

    checkSystemHealth();

    // Periodic health check
    const healthInterval = setInterval(checkSystemHealth, 30000);

    return () => clearInterval(healthInterval);
  }, [navigate]);

  const features = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Multi-Tenant Architecture",
      description:
        "Complete data isolation between companies with enterprise-grade security",
      color: "bg-blue-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Role-Based Permissions",
      description:
        "Granular access control for admins, project managers, and field workers",
      color: "bg-purple-500",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Project Management",
      description: "Gantt charts, resource allocation, and timeline management",
      color: "bg-green-500",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Client Portal",
      description:
        "Document sharing, approval workflows, and client communication",
      color: "bg-orange-500",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Real-time insights, KPIs, and performance metrics",
      color: "bg-cyan-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "SOC 2 compliant with advanced encryption and audit trails",
      color: "bg-red-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "ABC Construction",
      role: "Project Manager",
      content:
        "JobBlox transformed how we manage our construction projects. The client portal alone saved us 10 hours per week.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      company: "BuildRight LLC",
      role: "CEO",
      content:
        "The multi-tenant architecture is perfect for our needs. Each project team has their own secure workspace.",
      rating: 5,
    },
    {
      name: "Emily Chen",
      company: "Urban Developers",
      role: "Operations Director",
      content:
        "Implementation was seamless and the ROI was immediate. Our team productivity increased by 40%.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "500+", label: "Construction Companies" },
    { value: "10,000+", label: "Projects Managed" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "24/7", label: "Support Available" },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      description: "Perfect for small construction teams",
      features: [
        "Up to 5 projects",
        "Basic client portal",
        "Document management",
        "Email support",
        "Mobile app access",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "Ideal for growing construction companies",
      features: [
        "Unlimited projects",
        "Advanced Gantt charts",
        "Resource allocation",
        "Client approval workflows",
        "Priority support",
        "Custom reporting",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large construction enterprises",
      features: [
        "Everything in Professional",
        "Multi-tenant architecture",
        "Advanced security",
        "Dedicated support",
        "Custom integrations",
        "White-label options",
        "SLA guarantee",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How does the multi-tenant architecture work?",
      answer:
        "Our multi-tenant system ensures complete data isolation between companies. Each tenant has their own secure workspace with dedicated databases and user management, while sharing the underlying infrastructure for cost efficiency.",
    },
    {
      question: "Can I integrate JobBlox with my existing tools?",
      answer:
        "Yes! JobBlox offers extensive API access and pre-built integrations with popular construction tools, accounting software, and project management platforms. Our iPaaS manager makes integration setup simple.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We're SOC 2 compliant with enterprise-grade encryption, regular security audits, and comprehensive backup systems. Your data is protected with bank-level security.",
    },
    {
      question: "Do you offer mobile access?",
      answer:
        "Yes, JobBlox includes full mobile apps for iOS and Android, allowing field workers to update project status, upload photos, log time, and communicate with the team from anywhere.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer 24/7 support for all plans, with priority support for Professional and Enterprise customers. This includes phone, email, and live chat support, plus comprehensive documentation and training resources.",
    },
    {
      question: "Can I customize the system for my specific needs?",
      answer:
        "Yes! Our Enterprise plan includes custom development options, white-label solutions, and dedicated implementation support to tailor JobBlox to your specific construction workflows.",
    },
  ];

  const industries = [
    {
      name: "Residential Construction",
      icon: <Building2 className="h-8 w-8" />,
      description: "Custom homes, renovations, and residential developments",
    },
    {
      name: "Commercial Construction",
      icon: <Hammer className="h-8 w-8" />,
      description: "Office buildings, retail spaces, and commercial projects",
    },
    {
      name: "Infrastructure",
      icon: <Truck className="h-8 w-8" />,
      description: "Roads, bridges, utilities, and public works",
    },
    {
      name: "Industrial Construction",
      icon: <HardHat className="h-8 w-8" />,
      description:
        "Manufacturing facilities, warehouses, and industrial complexes",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white dark:text-white overflow-x-hidden">
      {/* System Health Indicator (only visible in development) */}
      {import.meta.env.DEV && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              systemHealth.containerStatus === "healthy"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : systemHealth.containerStatus === "error"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            }`}
          >
            {systemHealth.containerStatus === "healthy" && "● System Healthy"}
            {systemHealth.containerStatus === "error" && "● System Error"}
            {systemHealth.containerStatus === "checking" && "● Checking..."}
          </div>
        </div>
      )}
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20">
          <div className="relative container mx-auto px-6 py-20">
            <div className="text-center space-y-8">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                <Sparkles className="mr-2 h-4 w-4" />
                Next-Generation Construction CRM
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                Build Smarter,
                <br />
                Manage Better
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                The only construction CRM you'll ever need. Multi-tenant
                architecture, powerful project management, and seamless client
                collaboration.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl"
                  onClick={() => navigate("/login/tenant")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 text-lg font-semibold"
                  onClick={() => navigate("/login/admin")}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Admin Portal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for construction
              companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center text-white mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-slate-300 text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                    <p className="text-sm text-blue-400">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Industries Section */}
      <div className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Built for Every Construction Sector
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From residential homes to major infrastructure projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 text-center"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mb-4 mx-auto">
                    {industry.icon}
                  </div>
                  <CardTitle className="text-white text-lg">
                    {industry.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400">
                    {industry.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose the plan that fits your construction business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-2 border-blue-500 bg-slate-800/70" : "bg-slate-800/50 border-slate-700"} hover:bg-slate-800/70 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                      <Star className="mr-1 h-4 w-4" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="text-slate-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-slate-300"
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" : "bg-slate-700 hover:bg-slate-600"} text-white border-0`}
                    onClick={() => navigate("/subscription")}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about JobBlox
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-slate-800/50 border-slate-700 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Stay Updated with Construction Tech
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Get the latest insights, tips, and updates about construction
                management and technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-6">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of construction companies already using JobBlox to
                streamline their operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg font-semibold"
                  onClick={() => navigate("/login/tenant")}
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold"
                  onClick={() => navigate("/login/admin")}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Admin Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  JobBlox
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                The leading construction CRM platform designed to streamline
                project management, enhance client relationships, and boost
                productivity for construction companies of all sizes.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-slate-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>1-800-JOBBLOX</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>hello@jobblox.com</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-800 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              © 2024 JobBlox. All rights reserved. Built for the construction
              industry.
            </p>
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
