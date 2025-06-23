import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface Task {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  dependencies: string[];
  assignedTo: string[];
  color: string;
}

interface Resource {
  id: string;
  name: string;
  role: string;
  availability: number;
  avatar: string;
}

const GanttChartView = ({
  projectId = "1",
  tasks = defaultTasks,
  resources = defaultResources,
}) => {
  const [view, setView] = useState("gantt");
  const [zoomLevel, setZoomLevel] = useState(50);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [filter, setFilter] = useState("all");

  // Calculate the timeline based on tasks and zoom level
  const startDate = new Date(
    Math.min(...tasks.map((task) => task.startDate.getTime())),
  );
  const endDate = new Date(
    Math.max(...tasks.map((task) => task.endDate.getTime())),
  );

  // Generate days for the timeline
  const generateTimelineDays = () => {
    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const timelineDays = generateTimelineDays();

  // Calculate task position and width based on timeline
  const getTaskStyle = (task: Task) => {
    const totalDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const taskStartDays =
      (task.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const taskDuration =
      (task.endDate.getTime() - task.startDate.getTime()) /
      (1000 * 60 * 60 * 24);

    const left = (taskStartDays / totalDays) * 100;
    const width = (taskDuration / totalDays) * 100;

    return {
      left: `${left}%`,
      width: `${width}%`,
      backgroundColor: task.color,
    };
  };

  return (
    <div className="w-full h-full bg-background p-4">
      <Card className="w-full h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Project Timeline</CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter tasks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={view} onValueChange={setView} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <ZoomOut className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[zoomLevel]}
                    min={10}
                    max={100}
                    step={10}
                    onValueChange={(value) => setZoomLevel(value[0])}
                    className="w-[100px]"
                  />
                  <ZoomIn className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <TabsContent value="gantt" className="border rounded-md p-0 mt-0">
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Timeline header */}
                  <div className="flex border-b">
                    <div className="w-[200px] min-w-[200px] border-r p-2 bg-muted">
                      <div className="font-medium">Task Name</div>
                    </div>
                    <div className="flex-1 flex">
                      {timelineDays.map((day, index) => (
                        <div
                          key={index}
                          className={`min-w-[40px] text-center text-xs p-1 border-r ${day.getDay() === 0 || day.getDay() === 6 ? "bg-muted/50" : ""}`}
                          style={{ width: `${100 / timelineDays.length}%` }}
                        >
                          {format(day, "MMM d")}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="relative">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex border-b hover:bg-muted/20"
                      >
                        <div className="w-[200px] min-w-[200px] border-r p-2 flex items-center">
                          <div>
                            <div className="font-medium">{task.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {task.progress}% complete
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 relative h-12">
                          <div
                            className="absolute h-6 top-3 rounded-md cursor-pointer"
                            style={getTaskStyle(task)}
                          >
                            <div className="h-full w-full flex items-center justify-center text-xs text-white truncate px-2">
                              {task.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="resources"
              className="border rounded-md p-4 mt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <img
                            src={resource.avatar}
                            alt={resource.name}
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{resource.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {resource.role}
                          </div>
                        </div>
                        <div className="ml-auto text-sm">
                          {resource.availability}% available
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="timeline"
              className="border rounded-md p-4 mt-0"
            >
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-4">
                    <div className="w-[200px]">
                      <div className="font-medium">{task.name}</div>
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${task.progress}%`,
                            backgroundColor: task.color,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(task.startDate, "MMM d")} -{" "}
                      {format(task.endDate, "MMM d")}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Default mock data
const defaultTasks: Task[] = [
  {
    id: "1",
    name: "Site Preparation",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 5, 10),
    progress: 100,
    dependencies: [],
    assignedTo: ["1", "2"],
    color: "#4CAF50",
  },
  {
    id: "2",
    name: "Foundation Work",
    startDate: new Date(2023, 5, 11),
    endDate: new Date(2023, 5, 25),
    progress: 75,
    dependencies: ["1"],
    assignedTo: ["1", "3"],
    color: "#2196F3",
  },
  {
    id: "3",
    name: "Framing",
    startDate: new Date(2023, 5, 26),
    endDate: new Date(2023, 6, 15),
    progress: 40,
    dependencies: ["2"],
    assignedTo: ["2", "4"],
    color: "#FF9800",
  },
  {
    id: "4",
    name: "Electrical Work",
    startDate: new Date(2023, 6, 10),
    endDate: new Date(2023, 6, 20),
    progress: 20,
    dependencies: ["3"],
    assignedTo: ["5"],
    color: "#9C27B0",
  },
  {
    id: "5",
    name: "Plumbing",
    startDate: new Date(2023, 6, 10),
    endDate: new Date(2023, 6, 20),
    progress: 15,
    dependencies: ["3"],
    assignedTo: ["6"],
    color: "#F44336",
  },
  {
    id: "6",
    name: "Interior Finishing",
    startDate: new Date(2023, 6, 21),
    endDate: new Date(2023, 7, 15),
    progress: 0,
    dependencies: ["4", "5"],
    assignedTo: ["2", "7"],
    color: "#607D8B",
  },
];

const defaultResources: Resource[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Project Manager",
    availability: 75,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Construction Lead",
    availability: 100,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: "3",
    name: "Mike Williams",
    role: "Foundation Specialist",
    availability: 50,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Framing Lead",
    availability: 80,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
  },
  {
    id: "5",
    name: "Robert Taylor",
    role: "Electrical Engineer",
    availability: 60,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    role: "Plumbing Specialist",
    availability: 90,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
  },
  {
    id: "7",
    name: "David Wilson",
    role: "Interior Designer",
    availability: 40,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
  },
];

export default GanttChartView;
