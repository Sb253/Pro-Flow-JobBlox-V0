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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Building,
  CheckCircle,
  AlertCircle,
  Star,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Settings,
  Home,
  Briefcase,
  Users,
  BarChart3,
  Target,
  TrendingUp,
  DollarSign,
  FileText,
  MessageSquare,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  available: boolean;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  date: string;
}

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes: string;
  address: string;
}

interface Staff {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  rating: number;
  available: boolean;
}

const OnlineBooking = () => {
  const [activeTab, setActiveTab] = useState("booking");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingStep, setBookingStep] = useState(1);

  const services: Service[] = [
    {
      id: "1",
      name: "Home Consultation",
      description: "Initial consultation and project assessment",
      duration: 60,
      price: 0,
      category: "Consultation",
      available: true,
    },
    {
      id: "2",
      name: "Kitchen Renovation Estimate",
      description: "Detailed estimate for kitchen renovation projects",
      duration: 90,
      price: 150,
      category: "Estimation",
      available: true,
    },
    {
      id: "3",
      name: "Bathroom Remodel Consultation",
      description: "Consultation for bathroom renovation projects",
      duration: 75,
      price: 100,
      category: "Consultation",
      available: true,
    },
    {
      id: "4",
      name: "Project Planning Session",
      description: "Detailed project planning and timeline discussion",
      duration: 120,
      price: 200,
      category: "Planning",
      available: true,
    },
    {
      id: "5",
      name: "Site Inspection",
      description: "Professional site inspection and assessment",
      duration: 45,
      price: 75,
      category: "Inspection",
      available: true,
    },
  ];

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00 AM", available: true, date: "2024-02-15" },
    { id: "2", time: "10:30 AM", available: true, date: "2024-02-15" },
    { id: "3", time: "01:00 PM", available: false, date: "2024-02-15" },
    { id: "4", time: "02:30 PM", available: true, date: "2024-02-15" },
    { id: "5", time: "04:00 PM", available: true, date: "2024-02-15" },
  ];

  const bookings: Booking[] = [
    {
      id: "1",
      customerName: "John Smith",
      customerEmail: "john@example.com",
      customerPhone: "(555) 123-4567",
      service: "Kitchen Renovation Estimate",
      date: "2024-02-15",
      time: "10:00 AM",
      status: "confirmed",
      notes: "Interested in modern kitchen design",
      address: "123 Main St, Anytown, ST 12345",
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      customerPhone: "(555) 987-6543",
      service: "Home Consultation",
      date: "2024-02-16",
      time: "02:00 PM",
      status: "pending",
      notes: "First-time homeowner, needs guidance",
      address: "456 Oak Ave, Somewhere, ST 67890",
    },
    {
      id: "3",
      customerName: "Mike Wilson",
      customerEmail: "mike@example.com",
      customerPhone: "(555) 456-7890",
      service: "Bathroom Remodel Consultation",
      date: "2024-02-14",
      time: "11:00 AM",
      status: "completed",
      notes: "Master bathroom renovation",
      address: "789 Pine St, Elsewhere, ST 13579",
    },
  ];

  const staff: Staff[] = [
    {
      id: "1",
      name: "John Smith",
      role: "Senior Project Manager",
      specialties: ["Kitchen Renovation", "Project Planning"],
      rating: 4.9,
      available: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Design Consultant",
      specialties: ["Interior Design", "Space Planning"],
      rating: 4.8,
      available: true,
    },
    {
      id: "3",
      name: "Mike Wilson",
      role: "Construction Supervisor",
      specialties: ["Site Inspection", "Quality Control"],
      rating: 4.7,
      available: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleBookingSubmit = () => {
    // Handle booking submission logic here
    console.log("Booking submitted");
    setBookingStep(1);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Online Booking System
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Schedule appointments and manage bookings
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800">
            <TabsTrigger
              value="booking"
              className="flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Manage Bookings</span>
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Staff</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>
                  Schedule a consultation or service appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Select a Service
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <Card
                            key={service.id}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                              selectedService === service.id
                                ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "bg-slate-50 dark:bg-slate-700"
                            }`}
                            onClick={() => setSelectedService(service.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                  {service.name}
                                </h3>
                                <Badge className="bg-blue-500">
                                  {service.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                {service.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4 text-slate-500" />
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                      {service.duration} min
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="h-4 w-4 text-slate-500" />
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                      {service.price === 0
                                        ? "Free"
                                        : `$${service.price}`}
                                    </span>
                                  </div>
                                </div>
                                {service.available ? (
                                  <Badge className="bg-green-500">
                                    Available
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-500">
                                    Unavailable
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => setBookingStep(2)}
                        disabled={!selectedService}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Next: Select Date & Time
                      </Button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          Select Date
                        </Label>
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          Available Time Slots
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot.id}
                              variant={
                                selectedTime === slot.time
                                  ? "default"
                                  : "outline"
                              }
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className="w-full"
                            >
                              {slot.time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setBookingStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setBookingStep(3)}
                        disabled={!selectedDate || !selectedTime}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Next: Contact Information
                      </Button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter your full name" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="address">Project Address</Label>
                          <Textarea
                            id="address"
                            placeholder="Enter the project address"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            placeholder="Any additional information or special requests"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setBookingStep(2)}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleBookingSubmit}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Manage Bookings</CardTitle>
                    <CardDescription>
                      View and manage all appointment bookings
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card
                      key={booking.id}
                      className="bg-slate-50 dark:bg-slate-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              {booking.customerName}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {booking.service}
                            </p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {booking.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {booking.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {booking.customerPhone}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {booking.customerEmail}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {booking.address}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4" />
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

          <TabsContent value="services" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Management</CardTitle>
                    <CardDescription>
                      Manage available services and pricing
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className="bg-slate-50 dark:bg-slate-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              {service.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-500">
                              {service.category}
                            </Badge>
                            {service.available ? (
                              <Badge className="bg-green-500">Available</Badge>
                            ) : (
                              <Badge className="bg-red-500">Unavailable</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {service.duration} min
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {service.price === 0
                                  ? "Free"
                                  : `$${service.price}`}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="staff" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Staff Management</CardTitle>
                    <CardDescription>
                      Manage staff availability and specialties
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Staff Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staff.map((member) => (
                    <Card
                      key={member.id}
                      className="bg-slate-50 dark:bg-slate-700"
                    >
                      <CardContent className="p-4">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {member.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {member.role}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(member.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                              {member.rating}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {member.specialties.map((specialty, index) => (
                              <Badge
                                key={index}
                                className="bg-blue-500 text-xs"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-center">
                            {member.available ? (
                              <Badge className="bg-green-500">Available</Badge>
                            ) : (
                              <Badge className="bg-red-500">Unavailable</Badge>
                            )}
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
    </div>
  );
};

export default OnlineBooking;
