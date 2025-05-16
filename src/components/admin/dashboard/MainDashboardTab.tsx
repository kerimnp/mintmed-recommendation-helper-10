
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { construction } from "lucide-react"; // Using a placeholder icon

interface MainDashboardTabProps {
  searchTerm?: string;
}

export const MainDashboardTab: React.FC<MainDashboardTabProps> = ({ searchTerm }) => {
  // Dummy data for metrics - replace with real data/subscriptions
  const metrics = [
    { title: "Total Patients", value: "128", subtext: "patients to date", trend: "up" },
    { title: "Active Therapies", value: "54", subtext: "currently ongoing", trend: "stable" },
    { title: "Upcoming Check-Ins", value: "8", subtext: "due today", trend: "down" },
    { title: "New Prescriptions", value: "12", subtext: "last 7 days", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {metric.title}
              </CardTitle>
              {/* Placeholder for sparkline icon */}
              {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-medical-primary">{metric.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {metric.subtext}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-medical-primary">Dashboard Content Area</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <construction className="h-16 w-16 text-yellow-500 mb-4" />
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Dashboard Features Under Construction
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            The detailed dashboard sections (Heatmap, Patient Tracker, Alerts, etc.) will be implemented here.
          </p>
          {searchTerm && (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Search term active: <span className="font-semibold">{searchTerm}</span>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
