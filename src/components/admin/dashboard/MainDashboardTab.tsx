
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardMetrics } from "./DashboardMetrics";
import { RecentActivity } from "./RecentActivity";
import { QuickActions } from "./QuickActions";
import { 
  Activity,
  Users,
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  Calendar,
  FileText,
  Settings
} from "lucide-react";

interface MainDashboardTabProps {
  searchTerm: string;
}

export const MainDashboardTab: React.FC<MainDashboardTabProps> = ({ searchTerm }) => {
  // Filter logic based on searchTerm if needed
  const filteredContent = searchTerm ? 
    `Showing results for: "${searchTerm}"` : 
    null;

  return (
    <div className="space-y-6">
      {filteredContent && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-blue-700 dark:text-blue-300">{filteredContent}</p>
        </div>
      )}

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-medical-primary to-blue-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome to MediAid Dashboard</h2>
        <p className="text-blue-100 mb-4">
          Your comprehensive antibiotic stewardship and clinical decision support platform
        </p>
        <div className="flex gap-4">
          <Button variant="secondary" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View Guidelines
          </Button>
          <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <DashboardMetrics />

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions - Now using the new component */}
        <QuickActions />

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Health</span>
                <Badge className="bg-green-100 text-green-800">Optimal</Badge>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">API Response Time</span>
                <Badge className="bg-green-100 text-green-800">Fast</Badge>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Guideline Updates</span>
                <Badge className="bg-blue-100 text-blue-800">Current</Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Pending Reviews</span>
              <Badge variant="outline">12</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">New Prescriptions</span>
              <Badge variant="outline">8</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Expiring Certifications</span>
              <Badge className="bg-orange-100 text-orange-800">3</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Critical Alerts</span>
              <Badge className="bg-red-100 text-red-800">2</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        
        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Prescription Accuracy</span>
                <span className="text-sm text-muted-foreground">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm text-muted-foreground">2.3s avg</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">User Satisfaction</span>
                <span className="text-sm text-muted-foreground">4.7/5</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
