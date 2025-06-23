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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Building,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Users,
  Calendar,
  Activity,
  Settings,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
} from "lucide-react";

interface Tenant {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "suspended" | "trial";
  plan: "starter" | "professional" | "enterprise";
  userCount: number;
  storageUsed: number;
  storageLimit: number;
  lastActivity: string;
  created: string;
  domain: string;
}

const TenantManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const tenants: Tenant[] = [
    {
      id: "tenant_001",
      companyName: "ABC Construction Co.",
      contactName: "John Smith",
      email: "john@abcconstruction.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      status: "active",
      plan: "professional",
      userCount: 25,
      storageUsed: 2.4,
      storageLimit: 10,
      lastActivity: "2024-01-30T10:30:00Z",
      created: "2023-08-15T09:00:00Z",
      domain: "abcconstruction.jobblox.app",
    },
    {
      id: "tenant_002",
      companyName: "XYZ Builders",
      contactName: "Sarah Johnson",
      email: "sarah@xyzbuilders.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      status: "active",
      plan: "enterprise",
      userCount: 75,
      storageUsed: 8.7,
      storageLimit: 50,
      lastActivity: "2024-01-30T14:15:00Z",
      created: "2023-06-10T11:30:00Z",
      domain: "xyzbuilders.jobblox.app",
    },
    {
      id: "tenant_003",
      companyName: "Smith Contractors",
      contactName: "Mike Wilson",
      email: "mike@smithcontractors.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, Chicago, IL 60601",
      status: "suspended",
      plan: "starter",
      userCount: 8,
      storageUsed: 0.8,
      storageLimit: 2,
      lastActivity: "2024-01-25T16:45:00Z",
      created: "2023-11-05T14:20:00Z",
      domain: "smithcontractors.jobblox.app",
    },
    {
      id: "tenant_004",
      companyName: "Modern Homes LLC",
      contactName: "Lisa Davis",
      email: "lisa@modernhomes.com",
      phone: "+1 (555) 321-0987",
      address: "321 Elm St, Miami, FL 33101",
      status: "trial",
      plan: "professional",
      userCount: 12,
      storageUsed: 1.2,
      storageLimit: 10,
      lastActivity: "2024-01-30T09:20:00Z",
      created: "2024-01-25T10:00:00Z",
      domain: "modernhomes.jobblox.app",
    },
    {
      id: "tenant_005",
      companyName: "Elite Construction",
      contactName: "Robert Brown",
      email: "robert@eliteconstruction.com",
      phone: "+1 (555) 654-3210",
      address: "654 Cedar Rd, Seattle, WA 98101",
      status: "inactive",
      plan: "enterprise",
      userCount: 45,
      storageUsed: 5.3,
      storageLimit: 50,
      lastActivity: "2024-01-20T13:10:00Z",
      created: "2023-03-20T08:45:00Z",
      domain: "eliteconstruction.jobblox.app",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Clock className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Suspended
          </Badge>
        );
      case "trial":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            Trial
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

  const getStorageUsageColor = (used: number, limit: number) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tenant.status === statusFilter;
    const matchesPlan = planFilter === "all" || tenant.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="space-y-6">
      {/* Tenant Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">Total Tenants</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">189</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">32</p>
                <p className="text-sm text-muted-foreground">Trial</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">26</p>
                <p className="text-sm text-muted-foreground">Inactive</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tenant Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tenant Management</CardTitle>
              <CardDescription>
                Monitor and manage all tenant accounts
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
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
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
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

          {/* Tenants Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tenant.companyName}</p>
                      <p className="text-sm text-muted-foreground">
                        {tenant.domain}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tenant.contactName}</p>
                      <p className="text-sm text-muted-foreground">
                        {tenant.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                  <TableCell>{getPlanBadge(tenant.plan)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {tenant.userCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-1" />
                      <span
                        className={getStorageUsageColor(
                          tenant.storageUsed,
                          tenant.storageLimit,
                        )}
                      >
                        {tenant.storageUsed}GB / {tenant.storageLimit}GB
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-1" />
                      {new Date(tenant.lastActivity).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTenant(tenant);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTenant(tenant);
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

      {/* View Tenant Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tenant Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedTenant?.companyName}
            </DialogDescription>
          </DialogHeader>
          {selectedTenant && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Company Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      {selectedTenant.companyName}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedTenant.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedTenant.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedTenant.address}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Account Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>Status: {getStatusBadge(selectedTenant.status)}</div>
                    <div>Plan: {getPlanBadge(selectedTenant.plan)}</div>
                    <div>Users: {selectedTenant.userCount}</div>
                    <div>
                      Storage: {selectedTenant.storageUsed}GB /{" "}
                      {selectedTenant.storageLimit}GB
                    </div>
                    <div>
                      Created:{" "}
                      {new Date(selectedTenant.created).toLocaleDateString()}
                    </div>
                  </div>
                </div>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tenant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
            <DialogDescription>
              Modify tenant settings for {selectedTenant?.companyName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue={selectedTenant?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Plan</label>
              <Select defaultValue={selectedTenant?.plan}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Storage Limit (GB)</label>
              <Input
                type="number"
                defaultValue={selectedTenant?.storageLimit}
                placeholder="Storage limit in GB"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea placeholder="Add notes about this tenant..." />
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

export default TenantManagement;
