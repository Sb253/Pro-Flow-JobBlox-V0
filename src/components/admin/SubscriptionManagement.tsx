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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  CreditCard,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

interface Subscription {
  id: string;
  tenantName: string;
  plan: "starter" | "professional" | "enterprise";
  status: "active" | "cancelled" | "past_due" | "trialing";
  amount: number;
  billingCycle: "monthly" | "yearly";
  nextBilling: string;
  created: string;
  features: string[];
}

const SubscriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const subscriptions: Subscription[] = [
    {
      id: "sub_001",
      tenantName: "ABC Construction Co.",
      plan: "professional",
      status: "active",
      amount: 99,
      billingCycle: "monthly",
      nextBilling: "2024-02-15",
      created: "2023-08-15",
      features: [
        "Project Management",
        "Team Collaboration",
        "Advanced Reports",
      ],
    },
    {
      id: "sub_002",
      tenantName: "XYZ Builders",
      plan: "enterprise",
      status: "active",
      amount: 299,
      billingCycle: "monthly",
      nextBilling: "2024-02-20",
      created: "2023-06-10",
      features: ["All Features", "Custom Integrations", "Priority Support"],
    },
    {
      id: "sub_003",
      tenantName: "Smith Contractors",
      plan: "starter",
      status: "past_due",
      amount: 49,
      billingCycle: "monthly",
      nextBilling: "2024-01-28",
      created: "2023-11-05",
      features: ["Basic Project Management", "5 Team Members"],
    },
    {
      id: "sub_004",
      tenantName: "Modern Homes LLC",
      plan: "professional",
      status: "trialing",
      amount: 99,
      billingCycle: "monthly",
      nextBilling: "2024-02-10",
      created: "2024-01-25",
      features: [
        "Project Management",
        "Team Collaboration",
        "Advanced Reports",
      ],
    },
    {
      id: "sub_005",
      tenantName: "Elite Construction",
      plan: "enterprise",
      status: "cancelled",
      amount: 299,
      billingCycle: "yearly",
      nextBilling: "N/A",
      created: "2023-03-20",
      features: ["All Features", "Custom Integrations", "Priority Support"],
    },
  ];

  const planStats = {
    starter: { count: 89, revenue: 4361 },
    professional: { count: 156, revenue: 15444 },
    enterprise: { count: 42, revenue: 12558 },
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
      case "past_due":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Past Due
          </Badge>
        );
      case "trialing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            Trial
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Cancelled
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

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.tenantName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const matchesPlan = planFilter === "all" || sub.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="space-y-6">
      {/* Plan Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{planStats.starter.count}</p>
                <p className="text-sm text-muted-foreground">Starter Plans</p>
                <p className="text-xs text-green-600">
                  ${planStats.starter.revenue.toLocaleString()} MRR
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {planStats.professional.count}
                </p>
                <p className="text-sm text-muted-foreground">
                  Professional Plans
                </p>
                <p className="text-xs text-blue-600">
                  ${planStats.professional.revenue.toLocaleString()} MRR
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {planStats.enterprise.count}
                </p>
                <p className="text-sm text-muted-foreground">
                  Enterprise Plans
                </p>
                <p className="text-xs text-purple-600">
                  ${planStats.enterprise.revenue.toLocaleString()} MRR
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>
                Monitor and manage all tenant subscriptions
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Subscription
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants..."
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
                <SelectItem value="trialing">Trial</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subscriptions Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Billing</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{subscription.tenantName}</p>
                      <p className="text-sm text-muted-foreground">
                        Since{" "}
                        {new Date(subscription.created).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                  <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {subscription.amount}
                      <span className="text-sm text-muted-foreground ml-1">
                        /{subscription.billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {subscription.billingCycle === "monthly"
                        ? "Monthly"
                        : "Yearly"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {subscription.nextBilling !== "N/A"
                        ? new Date(
                            subscription.nextBilling,
                          ).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedSubscription(subscription);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Subscription Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogDescription>
              Modify subscription details for {selectedSubscription?.tenantName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Plan</label>
              <Select defaultValue={selectedSubscription?.plan}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter - $49/month</SelectItem>
                  <SelectItem value="professional">
                    Professional - $99/month
                  </SelectItem>
                  <SelectItem value="enterprise">
                    Enterprise - $299/month
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue={selectedSubscription?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trialing">Trial</SelectItem>
                  <SelectItem value="past_due">Past Due</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Billing Cycle</label>
              <Select defaultValue={selectedSubscription?.billingCycle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionManagement;
