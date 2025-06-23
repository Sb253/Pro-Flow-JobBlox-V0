import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeyMetric {
  title: string;
  value: string | number;
  description: string;
  change?: string;
  icon: React.ReactNode;
  progress?: number;
}

interface KeyMetricsPanelProps {
  metrics?: KeyMetric[];
}

const KeyMetricsPanel = ({
  metrics = defaultMetrics,
}: KeyMetricsPanelProps) => {
  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Key Metrics</h2>
        <p className="text-muted-foreground">
          Overview of your construction projects and performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="p-2 bg-primary/10 rounded-lg">{metric.icon}</div>
              {metric.change && (
                <div className="flex items-center text-sm font-medium text-green-600">
                  {metric.change}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {metric.title}
              </p>
              {metric.progress !== undefined && (
                <div className="mt-4">
                  <Progress value={metric.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.progress}% complete
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <span>View details</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const defaultMetrics: KeyMetric[] = [
  {
    title: "Active Projects",
    value: 12,
    description: "Current ongoing projects",
    change: "+2.5%",
    icon: <CheckCircle className="h-5 w-5 text-primary" />,
    progress: 68,
  },
  {
    title: "Upcoming Deadlines",
    value: 8,
    description: "Projects due this month",
    icon: <Calendar className="h-5 w-5 text-primary" />,
  },
  {
    title: "Client Satisfaction",
    value: "92%",
    description: "Based on recent feedback",
    change: "+4.3%",
    icon: <Users className="h-5 w-5 text-primary" />,
    progress: 92,
  },
  {
    title: "Budget Utilization",
    value: "$1.2M",
    description: "Across all active projects",
    change: "+1.8%",
    icon: <DollarSign className="h-5 w-5 text-primary" />,
    progress: 75,
  },
  {
    title: "Pending Approvals",
    value: 5,
    description: "Awaiting client review",
    icon: <Clock className="h-5 w-5 text-primary" />,
  },
  {
    title: "Team Efficiency",
    value: "87%",
    description: "Task completion rate",
    change: "+3.2%",
    icon: <Users className="h-5 w-5 text-primary" />,
    progress: 87,
  },
];

export default KeyMetricsPanel;
