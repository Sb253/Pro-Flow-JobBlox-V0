import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Check,
  X,
  Star,
  Crown,
  Zap,
  Building2,
  ArrowLeft,
  Users,
  Calendar,
  FileText,
  Shield,
  Headphones,
  Globe,
  Sparkles,
} from "lucide-react";

interface PlanFeature {
  name: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small construction teams",
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: <Building2 className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/30",
      popular: false,
      features: [
        "Up to 5 team members",
        "10 active projects",
        "Basic project management",
        "Client portal access",
        "Email support",
        "Mobile app access",
        "Basic reporting",
      ],
    },
    {
      name: "Professional",
      description: "Ideal for growing construction companies",
      monthlyPrice: 79,
      yearlyPrice: 790,
      icon: <Star className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500/30",
      popular: true,
      features: [
        "Up to 25 team members",
        "Unlimited projects",
        "Advanced Gantt charts",
        "Resource allocation",
        "Document management",
        "Priority support",
        "Advanced analytics",
        "API access",
        "Custom workflows",
      ],
    },
    {
      name: "Enterprise",
      description: "For large construction enterprises",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      icon: <Crown className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500/30",
      popular: false,
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "Multi-tenant architecture",
        "Advanced security features",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom training",
        "SLA guarantee",
        "White-label options",
      ],
    },
  ];

  const detailedFeatures: PlanFeature[] = [
    {
      name: "Team Members",
      starter: "5",
      professional: "25",
      enterprise: "Unlimited",
    },
    {
      name: "Active Projects",
      starter: "10",
      professional: "Unlimited",
      enterprise: "Unlimited",
    },
    {
      name: "Storage",
      starter: "10 GB",
      professional: "100 GB",
      enterprise: "1 TB",
    },
    {
      name: "Client Portal",
      starter: true,
      professional: true,
      enterprise: true,
    },
    { name: "Mobile App", starter: true, professional: true, enterprise: true },
    {
      name: "Basic Reporting",
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: "Gantt Charts",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Resource Management",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Advanced Analytics",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "API Access",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Custom Workflows",
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Multi-tenant Architecture",
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Advanced Security",
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Custom Integrations",
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Dedicated Support",
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "SLA Guarantee",
      starter: false,
      professional: false,
      enterprise: true,
    },
  ];

  const getPrice = (plan: (typeof plans)[0]) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: (typeof plans)[0]) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    return monthlyCost - yearlyCost;
  };

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-slate-400" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <Building2 className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  JobBlox
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin")}
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
            >
              <Zap className="mr-2 h-4 w-4" />
              Try Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-16">
        <div className="container mx-auto px-6 text-center">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2 mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            Choose Your Plan
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Start with a 14-day free trial. No credit card required. Cancel
            anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span
              className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}
            >
              Monthly
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly",
                )
              }
              className="relative w-12 h-6 p-0 border-slate-600"
            >
              <div
                className={`absolute w-4 h-4 bg-blue-500 rounded-full transition-transform ${
                  billingCycle === "yearly" ? "translate-x-3" : "translate-x-1"
                }`}
              />
            </Button>
            <span
              className={`text-sm ${billingCycle === "yearly" ? "text-white" : "text-slate-400"}`}
            >
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge className="bg-green-500 text-white border-0">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-slate-800/50 border-2 ${plan.borderColor} hover:bg-slate-800/70 transition-all duration-300 ${
                  plan.popular ? "scale-105 shadow-2xl" : "hover:scale-105"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center text-white mx-auto mb-4`}
                  >
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {plan.description}
                  </CardDescription>

                  <div className="pt-4">
                    <div className="text-4xl font-bold text-white">
                      ${getPrice(plan)}
                      <span className="text-lg text-slate-400 font-normal">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <div className="text-sm text-green-400 mt-1">
                        Save ${getSavings(plan)} per year
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white border-0 font-semibold`}
                    size="lg"
                  >
                    Start Free Trial
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-slate-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Compare All Features
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              See exactly what's included in each plan
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 font-semibold text-white">
                      Features
                    </th>
                    <th className="text-center p-4 font-semibold text-white">
                      Starter
                    </th>
                    <th className="text-center p-4 font-semibold text-white">
                      Professional
                    </th>
                    <th className="text-center p-4 font-semibold text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailedFeatures.map((feature, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30"
                    >
                      <td className="p-4 text-slate-300">{feature.name}</td>
                      <td className="p-4 text-center">
                        {renderFeatureValue(feature.starter)}
                      </td>
                      <td className="p-4 text-center">
                        {renderFeatureValue(feature.professional)}
                      </td>
                      <td className="p-4 text-center">
                        {renderFeatureValue(feature.enterprise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Can I change plans anytime?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately, and we'll prorate the billing
                  accordingly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Is there a free trial?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Yes, all plans come with a 14-day free trial. No credit card
                  required to start, and you can cancel anytime during the trial
                  period.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  What payment methods do you accept?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  We accept all major credit cards, PayPal, and ACH transfers
                  for Enterprise customers. All payments are processed securely.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Do you offer custom enterprise solutions?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Yes, we offer custom solutions for large enterprises with
                  specific requirements. Contact our sales team to discuss your
                  needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of construction companies already using JobBlox to
            streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 py-4 text-lg font-semibold"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold"
            >
              <Headphones className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
