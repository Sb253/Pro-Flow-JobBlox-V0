import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  FileIcon,
  MessageSquare,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Share2,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "approved" | "pending" | "rejected";
}

interface ApprovalRequest {
  id: string;
  title: string;
  description: string;
  requestDate: string;
  status: "approved" | "pending" | "rejected";
  documents: Document[];
}

interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isClient: boolean;
}

const ClientPortal = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Project Contract.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2023-05-15",
      status: "approved",
    },
    {
      id: "2",
      name: "Site Plans.dwg",
      type: "CAD",
      size: "15.7 MB",
      uploadDate: "2023-05-18",
      status: "approved",
    },
    {
      id: "3",
      name: "Budget Estimate.xlsx",
      type: "Excel",
      size: "1.2 MB",
      uploadDate: "2023-05-20",
      status: "pending",
    },
    {
      id: "4",
      name: "Material Specifications.docx",
      type: "Word",
      size: "3.5 MB",
      uploadDate: "2023-05-22",
      status: "rejected",
    },
    {
      id: "5",
      name: "Timeline Proposal.pdf",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2023-05-25",
      status: "pending",
    },
  ]);

  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: "1",
      title: "Foundation Design Approval",
      description:
        "Please review and approve the foundation design documents for the project.",
      requestDate: "2023-05-20",
      status: "pending",
      documents: [
        {
          id: "101",
          name: "Foundation-Design-v1.pdf",
          type: "PDF",
          size: "8.2 MB",
          uploadDate: "2023-05-19",
          status: "pending",
        },
        {
          id: "102",
          name: "Soil-Analysis.pdf",
          type: "PDF",
          size: "3.4 MB",
          uploadDate: "2023-05-19",
          status: "pending",
        },
      ],
    },
    {
      id: "2",
      title: "Material Selection",
      description:
        "Approval needed for the proposed materials for exterior finishing.",
      requestDate: "2023-05-18",
      status: "approved",
      documents: [
        {
          id: "201",
          name: "Exterior-Materials.pdf",
          type: "PDF",
          size: "5.7 MB",
          uploadDate: "2023-05-17",
          status: "approved",
        },
      ],
    },
    {
      id: "3",
      title: "Budget Revision",
      description: "Review updated budget allocation for electrical systems.",
      requestDate: "2023-05-22",
      status: "rejected",
      documents: [
        {
          id: "301",
          name: "Budget-Revision-2.xlsx",
          type: "Excel",
          size: "1.8 MB",
          uploadDate: "2023-05-21",
          status: "rejected",
        },
      ],
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "John Smith",
      senderAvatar: "JS",
      content:
        "Hello, I wanted to check on the progress of the kitchen renovation. Are we still on schedule for completion next month?",
      timestamp: "2023-05-20 09:15 AM",
      isClient: true,
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      senderAvatar: "SJ",
      content:
        "Hi John, yes we are still on track. The cabinets will be installed next week and countertops the week after. I'll send updated photos tomorrow.",
      timestamp: "2023-05-20 10:30 AM",
      isClient: false,
    },
    {
      id: "3",
      sender: "John Smith",
      senderAvatar: "JS",
      content:
        "Great, thank you for the update. Looking forward to seeing the photos.",
      timestamp: "2023-05-20 11:05 AM",
      isClient: true,
    },
    {
      id: "4",
      sender: "Sarah Johnson",
      senderAvatar: "SJ",
      content:
        "Also, we need to discuss the lighting fixtures. Do you have time for a quick call tomorrow?",
      timestamp: "2023-05-20 02:45 PM",
      isClient: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: `${messages.length + 1}`,
        sender: "John Smith",
        senderAvatar: "JS",
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        isClient: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleDocumentUpload = () => {
    // Simulate document upload
    const newDocument: Document = {
      id: `${documents.length + 1}`,
      name: "New-Document.pdf",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setDocuments([...documents, newDocument]);
    setIsUploadDialogOpen(false);
  };

  const getStatusBadge = (status: "approved" | "pending" | "rejected") => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: "approved" | "pending" | "rejected") => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Client Portal</h1>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Document Library</span>
                <Dialog
                  open={isUploadDialogOpen}
                  onOpenChange={setIsUploadDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" /> Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload New Document</DialogTitle>
                      <DialogDescription>
                        Select a file from your computer to upload to the
                        project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag and drop files here or click to browse
                        </p>
                        <Input
                          type="file"
                          className="hidden"
                          id="file-upload"
                        />
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() =>
                            document.getElementById("file-upload")?.click()
                          }
                        >
                          Select File
                        </Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsUploadDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleDocumentUpload}>Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription>
                Access and manage all project-related documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium flex items-center">
                        <FileIcon className="mr-2 h-4 w-4" />
                        {doc.name}
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedDocument && (
            <Dialog
              open={!!selectedDocument}
              onOpenChange={() => setSelectedDocument(null)}
            >
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <FileIcon className="mr-2 h-5 w-5" />
                    {selectedDocument.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedDocument.type} • {selectedDocument.size} • Uploaded
                    on {selectedDocument.uploadDate}
                  </DialogDescription>
                </DialogHeader>
                <div className="bg-gray-100 h-96 flex items-center justify-center rounded-md">
                  <p className="text-gray-500">
                    Document preview would appear here
                  </p>
                </div>
                <DialogFooter>
                  <div className="flex items-center mr-auto space-x-2">
                    {getStatusIcon(selectedDocument.status)}
                    <span>
                      {selectedDocument.status.charAt(0).toUpperCase() +
                        selectedDocument.status.slice(1)}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDocument(null)}
                  >
                    Close
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* Approvals Tab */}
        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Approval Requests</CardTitle>
              <CardDescription>
                Review and respond to approval requests for your project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {approvalRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {request.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Requested on {request.requestDate}
                          </CardDescription>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{request.description}</p>
                      <h4 className="text-sm font-medium mb-2">
                        Attached Documents:
                      </h4>
                      <ul className="space-y-2">
                        {request.documents.map((doc) => (
                          <li
                            key={doc.id}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                          >
                            <div className="flex items-center">
                              <FileIcon className="mr-2 h-4 w-4" />
                              <span>{doc.name}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {request.status === "pending" && (
                        <div className="flex space-x-2 w-full">
                          <Button variant="outline" className="flex-1">
                            <AlertCircle className="mr-2 h-4 w-4" /> Reject
                          </Button>
                          <Button className="flex-1">
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                          </Button>
                        </div>
                      )}
                      {request.status !== "pending" && (
                        <div className="flex items-center w-full">
                          <div className="flex items-center">
                            {getStatusIcon(request.status)}
                            <span className="ml-2">
                              {request.status === "approved"
                                ? "Approved on "
                                : "Rejected on "}
                              {new Date(
                                request.requestDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Project Communication</CardTitle>
              <CardDescription>
                Communicate with your project team in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <div className="flex flex-col h-full">
                <ScrollArea className="flex-grow pr-4 mb-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isClient ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.isClient
                              ? "bg-blue-100 text-blue-900"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>
                                {message.senderAvatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">
                              {message.sender}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator className="my-2" />
                <div className="flex items-center space-x-2">
                  <Textarea
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientPortal;
