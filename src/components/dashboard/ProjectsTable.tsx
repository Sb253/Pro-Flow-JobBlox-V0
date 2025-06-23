import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Calendar,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  client: string;
  status: "active" | "completed" | "on-hold" | "delayed";
  deadline: string;
  completion: number;
}

interface ProjectsTableProps {
  projects?: Project[];
  onViewProject?: (id: string) => void;
  onEditProject?: (id: string) => void;
  onDeleteProject?: (id: string) => void;
}

const ProjectsTable = ({
  projects = defaultProjects,
  onViewProject = () => {},
  onEditProject = () => {},
  onDeleteProject = () => {},
}: ProjectsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Project>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredStatus, setFilteredStatus] = useState<string | null>(null);

  // Filter projects based on search term and status filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filteredStatus
      ? project.status === filteredStatus
      : true;
    return matchesSearch && matchesStatus;
  });

  // Sort projects based on current sort column and direction
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  // Handle column header click for sorting
  const handleSort = (column: keyof Project) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Get status badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600";
      case "completed":
        return "bg-blue-500 hover:bg-blue-600";
      case "on-hold":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "delayed":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-bold">Current Projects</h2>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          {/* Search input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {filteredStatus
                  ? `Status: ${filteredStatus}`
                  : "Filter by status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilteredStatus(null)}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredStatus("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredStatus("completed")}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredStatus("on-hold")}>
                On Hold
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilteredStatus("delayed")}>
                Delayed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Projects table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Project Name{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("client")}
              >
                Client{" "}
                {sortColumn === "client" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortColumn === "status" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("deadline")}
              >
                Deadline{" "}
                {sortColumn === "deadline" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("completion")}
              >
                Completion{" "}
                {sortColumn === "completion" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.length > 0 ? (
              sortedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {project.deadline}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.completion} className="h-2" />
                      <span className="text-xs">{project.completion}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onViewProject(project.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEditProject(project.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteProject(project.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No projects found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Default projects data for demonstration
const defaultProjects: Project[] = [
  {
    id: "1",
    name: "Downtown Office Complex",
    client: "Acme Corporation",
    status: "active",
    deadline: "2023-12-15",
    completion: 65,
  },
  {
    id: "2",
    name: "Riverside Apartments",
    client: "Riverfront Development",
    status: "delayed",
    deadline: "2023-10-30",
    completion: 40,
  },
  {
    id: "3",
    name: "City Center Mall",
    client: "Urban Retail Group",
    status: "completed",
    deadline: "2023-08-22",
    completion: 100,
  },
  {
    id: "4",
    name: "Highland Park Residences",
    client: "Highland Properties",
    status: "on-hold",
    deadline: "2024-02-28",
    completion: 25,
  },
  {
    id: "5",
    name: "Industrial Warehouse Complex",
    client: "Global Logistics Inc.",
    status: "active",
    deadline: "2024-01-15",
    completion: 70,
  },
];

export default ProjectsTable;
