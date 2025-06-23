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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  Star,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Send,
  Reply,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  PieChart,
  Target,
  Award,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  projectName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  status: "pending" | "responded" | "published" | "flagged";
  platform: "google" | "yelp" | "facebook" | "website" | "email";
  isPublic: boolean;
  response?: string;
  responseDate?: string;
  tags: string[];
}

interface ReviewTemplate {
  id: string;
  name: string;
  category: "positive" | "negative" | "neutral" | "follow_up";
  subject: string;
  content: string;
  isActive: boolean;
  usageCount: number;
}

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  responseRate: number;
  positiveReviews: number;
  negativeReviews: number;
  pendingResponses: number;
  monthlyGrowth: number;
  platformBreakdown: {
    [key: string]: number;
  };
  ratingDistribution: {
    [key: number]: number;
  };
}

const ReviewManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateContent, setNewTemplateContent] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState("");

  const reviews: Review[] = [
    {
      id: "1",
      customerName: "John Smith",
      customerEmail: "john@example.com",
      customerAvatar: "JS",
      projectName: "Kitchen Renovation",
      rating: 5,
      title: "Outstanding work and professionalism",
      content:
        "The team did an amazing job on our kitchen renovation. They were professional, on time, and the quality of work exceeded our expectations. Highly recommend!",
      date: "2 days ago",
      status: "pending",
      platform: "google",
      isPublic: true,
      tags: ["quality", "professional", "on-time"],
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      customerAvatar: "SJ",
      projectName: "Bathroom Remodel",
      rating: 4,
      title: "Great results, minor delays",
      content:
        "Overall very happy with the bathroom remodel. The final result looks fantastic. There were some minor delays due to material availability, but the team communicated well throughout the process.",
      date: "1 week ago",
      status: "responded",
      platform: "yelp",
      isPublic: true,
      response:
        "Thank you for your review, Sarah! We're glad you're happy with the final result. We apologize for the delays and appreciate your patience. We'll continue to improve our material planning process.",
      responseDate: "5 days ago",
      tags: ["communication", "quality", "delays"],
    },
    {
      id: "3",
      customerName: "Mike Wilson",
      customerEmail: "mike@example.com",
      customerAvatar: "MW",
      projectName: "Home Addition",
      rating: 2,
      title: "Disappointed with the service",
      content:
        "The project took much longer than promised and there were several issues with the quality of work. Had to call them back multiple times to fix problems. Not satisfied with the overall experience.",
      date: "3 days ago",
      status: "flagged",
      platform: "facebook",
      isPublic: false,
      tags: ["delays", "quality-issues", "follow-up"],
    },
    {
      id: "4",
      customerName: "Lisa Davis",
      customerEmail: "lisa@example.com",
      customerAvatar: "LD",
      projectName: "Deck Construction",
      rating: 5,
      title: "Perfect deck, perfect service",
      content:
        "From design to completion, everything was handled professionally. The deck looks amazing and was completed on schedule. The team was courteous and cleaned up after themselves every day.",
      date: "1 week ago",
      status: "published",
      platform: "website",
      isPublic: true,
      response:
        "Thank you so much, Lisa! We're thrilled that you're happy with your new deck. It was a pleasure working with you, and we appreciate you taking the time to share your experience.",
      responseDate: "6 days ago",
      tags: ["professional", "on-time", "clean"],
    },
  ];

  const templates: ReviewTemplate[] = [
    {
      id: "1",
      name: "Positive Response - General",
      category: "positive",
      subject: "Thank you for your wonderful review!",
      content:
        "Thank you so much for taking the time to share your experience, {customer_name}! We're thrilled that you're happy with your {project_name}. It was a pleasure working with you, and we appreciate your kind words about our team. Reviews like yours motivate us to continue delivering excellent service.",
      isActive: true,
      usageCount: 23,
    },
    {
      id: "2",
      name: "Negative Response - Apologetic",
      category: "negative",
      subject: "We sincerely apologize and want to make this right",
      content:
        "Thank you for bringing this to our attention, {customer_name}. We sincerely apologize that your experience with {project_name} didn't meet your expectations. We take all feedback seriously and would like the opportunity to discuss this further and make things right. Please contact us at your earliest convenience so we can address your concerns.",
      isActive: true,
      usageCount: 8,
    },
    {
      id: "3",
      name: "Follow-up Request",
      category: "follow_up",
      subject: "We'd love to hear about your experience",
      content:
        "Hi {customer_name}, we hope you're enjoying your completed {project_name}! We'd greatly appreciate if you could take a moment to share your experience with others by leaving a review. Your feedback helps us improve our services and helps other customers make informed decisions.",
      isActive: true,
      usageCount: 15,
    },
    {
      id: "4",
      name: "Neutral Response - Professional",
      category: "neutral",
      subject: "Thank you for your feedback",
      content:
        "Thank you for your review, {customer_name}. We appreciate you taking the time to share your experience with {project_name}. Your feedback is valuable to us as we continue to improve our services. If you have any additional questions or concerns, please don't hesitate to reach out.",
      isActive: true,
      usageCount: 12,
    },
  ];

  const stats: ReviewStats = {
    totalReviews: 127,
    averageRating: 4.3,
    responseRate: 89,
    positiveReviews: 98,
    negativeReviews: 12,
    pendingResponses: 8,
    monthlyGrowth: 15,
    platformBreakdown: {
      google: 45,
      yelp: 32,
      facebook: 28,
      website: 22,
    },
    ratingDistribution: {
      5: 67,
      4: 31,
      3: 17,
      2: 8,
      1: 4,
    },
  };

  const handleSendResponse = (reviewId: string) => {
    if (responseText.trim()) {
      // In a real app, this would send the response
      console.log("Sending response to review:", reviewId, responseText);
      setResponseText("");
      setSelectedReview(null);
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
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "responded":
        return <Badge className="bg-blue-500">Responded</Badge>;
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "flagged":
        return <Badge className="bg-red-500">Flagged</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPlatformIcon = (platform: string) => {
    // In a real app, you'd use actual platform icons
    return <div className="w-4 h-4 bg-gray-400 rounded" />;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "pending" && review.status === "pending") ||
      (selectedFilter === "positive" && review.rating >= 4) ||
      (selectedFilter === "negative" && review.rating <= 2) ||
      (selectedFilter === "flagged" && review.status === "flagged");

    const matchesSearch =
      searchQuery === "" ||
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Review Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Request Review
          </Button>
        </div>
      </div>

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="templates">Response Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <div className="space-y-4">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search reviews..."
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
                        <SelectItem value="all">All Reviews</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span>{stats.averageRating.toFixed(1)} avg</span>
                    </div>
                    <div>{stats.totalReviews} total</div>
                    <div>{stats.pendingResponses} pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {review.customerAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">
                                {review.customerName}
                              </h3>
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {review.projectName}
                            </p>
                            <h4 className="font-medium mb-2">{review.title}</h4>
                            <p className="text-gray-700 mb-3">
                              {review.content}
                            </p>
                            <div className="flex items-center space-x-2">
                              {review.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(review.status)}
                          {getPlatformIcon(review.platform)}
                        </div>
                      </div>

                      {review.response && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Reply className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">
                              Your Response
                            </span>
                            <span className="text-xs text-gray-500">
                              {review.responseDate}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {review.response}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReview(review)}
                          >
                            <Reply className="h-4 w-4 mr-1" />
                            {review.response ? "Update Response" : "Respond"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Original
                          </Button>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Response Templates</CardTitle>
                  <CardDescription>
                    Create and manage templates for quick responses to reviews.
                  </CardDescription>
                </div>
                <Dialog
                  open={isTemplateDialogOpen}
                  onOpenChange={setIsTemplateDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Response Template</DialogTitle>
                      <DialogDescription>
                        Create a reusable template for responding to reviews.
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
                        className="min-h-[120px]"
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold">{template.name}</h3>
                          <Badge
                            className={
                              template.category === "positive"
                                ? "bg-green-500"
                                : template.category === "negative"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                            }
                          >
                            {template.category}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Used {template.usageCount} times
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch checked={template.isActive} />
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Subject:</strong> {template.subject}
                      </p>
                      <p className="text-sm text-gray-700">
                        {template.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.totalReviews}
                    </div>
                    <div className="text-sm text-gray-600">Total Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {stats.averageRating.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.responseRate}%
                    </div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      +{stats.monthlyGrowth}%
                    </div>
                    <div className="text-sm text-gray-600">Monthly Growth</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Rating Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(stats.ratingDistribution)
                      .reverse()
                      .map(([rating, count]) => (
                        <div
                          key={rating}
                          className="flex items-center space-x-3"
                        >
                          <div className="flex items-center space-x-1 w-12">
                            <span className="text-sm">{rating}</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          </div>
                          <Progress
                            value={(count / stats.totalReviews) * 100}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-8">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.platformBreakdown).map(
                    ([platform, count]) => (
                      <div
                        key={platform}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex items-center space-x-2 w-20">
                          {getPlatformIcon(platform)}
                          <span className="text-sm capitalize">{platform}</span>
                        </div>
                        <Progress
                          value={(count / stats.totalReviews) * 100}
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-600 w-8">
                          {count}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Review Automation</CardTitle>
              <CardDescription>
                Configure automated review requests and response workflows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Automated Review Requests</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Send review requests</p>
                      <p className="text-sm text-gray-600">
                        Automatically request reviews after project completion
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Follow-up reminders</p>
                      <p className="text-sm text-gray-600">
                        Send reminder if no review after 7 days
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Positive review sharing</p>
                      <p className="text-sm text-gray-600">
                        Auto-share 5-star reviews on social media
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Response Automation</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-respond to positive</p>
                      <p className="text-sm text-gray-600">
                        Automatically thank customers for 4-5 star reviews
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Flag negative reviews</p>
                      <p className="text-sm text-gray-600">
                        Alert team for reviews with 1-2 stars
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Response time tracking</p>
                      <p className="text-sm text-gray-600">
                        Monitor and report response times
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Response Dialog */}
      {selectedReview && (
        <Dialog
          open={!!selectedReview}
          onOpenChange={() => setSelectedReview(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Respond to Review</DialogTitle>
              <DialogDescription>
                Craft a thoughtful response to {selectedReview.customerName}'s
                review.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {selectedReview.customerAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedReview.customerName}</p>
                    <div className="flex items-center space-x-2">
                      {renderStars(selectedReview.rating)}
                      <span className="text-sm text-gray-500">
                        {selectedReview.date}
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="font-medium mb-1">{selectedReview.title}</h4>
                <p className="text-sm text-gray-700">
                  {selectedReview.content}
                </p>
              </div>
              <Textarea
                placeholder="Write your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedReview(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleSendResponse(selectedReview.id)}>
                <Send className="mr-2 h-4 w-4" />
                Send Response
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReviewManagement;
