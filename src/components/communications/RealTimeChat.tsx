import React, { useState, useRef } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  MessageSquare,
  Send,
  Paperclip,
  Users,
  Hash,
  Plus,
  Search,
  Phone,
  Video,
  MoreVertical,
  File,
  Image,
  Download,
  Eye,
  Settings,
  UserPlus,
  Bell,
  BellOff,
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "image";
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  isCurrentUser: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: "general" | "project" | "team";
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
  members: number;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "offline";
  role: string;
}

const RealTimeChat = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>("general");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const channels: Channel[] = [
    {
      id: "general",
      name: "General",
      type: "general",
      unreadCount: 3,
      lastMessage: "Meeting at 3 PM today",
      lastMessageTime: "2 min ago",
      members: 12,
    },
    {
      id: "kitchen-renovation",
      name: "Kitchen Renovation",
      type: "project",
      unreadCount: 0,
      lastMessage: "Photos uploaded",
      lastMessageTime: "1 hour ago",
      members: 5,
    },
    {
      id: "field-team",
      name: "Field Team",
      type: "team",
      unreadCount: 1,
      lastMessage: "On site now",
      lastMessageTime: "30 min ago",
      members: 8,
    },
    {
      id: "bathroom-project",
      name: "Bathroom Project",
      type: "project",
      unreadCount: 0,
      lastMessage: "Materials delivered",
      lastMessageTime: "3 hours ago",
      members: 4,
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "John Smith",
      avatar: "JS",
      status: "online",
      role: "Project Manager",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "SJ",
      status: "online",
      role: "Site Supervisor",
    },
    {
      id: "3",
      name: "Mike Wilson",
      avatar: "MW",
      status: "away",
      role: "Electrician",
    },
    {
      id: "4",
      name: "Lisa Davis",
      avatar: "LD",
      status: "offline",
      role: "Designer",
    },
    {
      id: "5",
      name: "Tom Brown",
      avatar: "TB",
      status: "online",
      role: "Plumber",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "Sarah Johnson",
      senderAvatar: "SJ",
      content:
        "Good morning team! Ready for today's kitchen renovation project.",
      timestamp: "9:00 AM",
      type: "text",
      isCurrentUser: false,
    },
    {
      id: "2",
      sender: "Mike Wilson",
      senderAvatar: "MW",
      content: "All electrical work completed. Photos attached.",
      timestamp: "9:15 AM",
      type: "file",
      fileName: "electrical-work-photos.zip",
      fileSize: "2.4 MB",
      isCurrentUser: false,
    },
    {
      id: "3",
      sender: "You",
      senderAvatar: "YU",
      content:
        "Great work everyone! The client will be happy with the progress.",
      timestamp: "9:30 AM",
      type: "text",
      isCurrentUser: true,
    },
    {
      id: "4",
      sender: "Tom Brown",
      senderAvatar: "TB",
      content: "Plumbing inspection scheduled for tomorrow at 10 AM.",
      timestamp: "10:00 AM",
      type: "text",
      isCurrentUser: false,
    },
    {
      id: "5",
      sender: "Lisa Davis",
      senderAvatar: "LD",
      content: "Updated design mockups",
      timestamp: "10:30 AM",
      type: "image",
      fileName: "kitchen-design-v2.jpg",
      fileSize: "1.8 MB",
      isCurrentUser: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      // In a real app, this would create the channel on the server
      console.log("Creating channel:", newChannelName);
      setNewChannelName("");
      setIsCreateChannelOpen(false);
    }
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "general":
        return <Hash className="h-4 w-4" />;
      case "project":
        return <MessageSquare className="h-4 w-4" />;
      case "team":
        return <Users className="h-4 w-4" />;
      default:
        return <Hash className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const selectedChannelData = channels.find((c) => c.id === selectedChannel);

  return (
    <div className="bg-white h-full flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Team Chat</h2>
            <Dialog
              open={isCreateChannelOpen}
              onOpenChange={setIsCreateChannelOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Channel</DialogTitle>
                  <DialogDescription>
                    Create a new channel for team communication.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Channel name"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateChannelOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateChannel}>Create Channel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="channels" className="h-full flex flex-col">
            <TabsList className="mx-4 mt-2">
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4">
                <div className="space-y-1">
                  {channels
                    .filter((channel) =>
                      channel.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                    )
                    .map((channel) => (
                      <div
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                          selectedChannel === channel.id
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          {getChannelIcon(channel.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {channel.name}
                              </p>
                              {channel.unreadCount > 0 && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  {channel.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                              {channel.lastMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="members" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4">
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                            member.status,
                          )}`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedChannelData && getChannelIcon(selectedChannelData.type)}
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedChannelData?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedChannelData?.members} members
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] ${message.isCurrentUser ? "order-2" : "order-1"}`}
                  >
                    <div
                      className={`rounded-lg p-3 ${
                        message.isCurrentUser
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {!message.isCurrentUser && (
                        <div className="flex items-center mb-1">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="text-xs">
                              {message.senderAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">
                            {message.sender}
                          </span>
                        </div>
                      )}

                      {message.type === "text" && (
                        <p className="text-sm">{message.content}</p>
                      )}

                      {message.type === "file" && (
                        <div className="space-y-2">
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center space-x-2 p-2 bg-white bg-opacity-20 rounded">
                            <File className="h-4 w-4" />
                            <div className="flex-1">
                              <p className="text-xs font-medium">
                                {message.fileName}
                              </p>
                              <p className="text-xs opacity-75">
                                {message.fileSize}
                              </p>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {message.type === "image" && (
                        <div className="space-y-2">
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center space-x-2 p-2 bg-white bg-opacity-20 rounded">
                            <Image className="h-4 w-4" />
                            <div className="flex-1">
                              <p className="text-xs font-medium">
                                {message.fileName}
                              </p>
                              <p className="text-xs opacity-75">
                                {message.fileSize}
                              </p>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <p className="text-xs opacity-75 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={(e) => {
                // Handle file upload
                console.log("Files selected:", e.target.files);
              }}
            />
            <Button variant="outline" size="sm" onClick={handleFileUpload}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 min-h-[40px] max-h-32 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeChat;
