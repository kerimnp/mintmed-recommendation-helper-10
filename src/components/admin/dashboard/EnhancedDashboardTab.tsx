
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicalDecisionSupport } from "@/components/clinical/ClinicalDecisionSupport";
import { AntibioticStewardshipDashboard } from "@/components/stewardship/AntibioticStewardshipDashboard";
import { EnhancedAnalyticsDashboard } from "@/components/analytics/EnhancedAnalyticsDashboard";
import { DashboardMetrics } from "./DashboardMetrics";
import { RecentActivity } from "./RecentActivity";
import { QuickActions } from "./QuickActions";
import { useDoctorProfile } from "@/hooks/useDoctorProfile";
import { 
  Activity,
  Users,
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  Shield,
  BarChart3,
  Brain
} from "lucide-react";

interface EnhancedDashboardTabProps {
  searchTerm: string;
}

export const EnhancedDashboardTab: React.FC<EnhancedDashboardTabProps> = ({ searchTerm }) => {
  const { data: doctorProfile } = useDoctorProfile();
  
  // Filter logic based on searchTerm if needed
  const filteredContent = searchTerm ? 
    `Showing results for: "${searchTerm}"` : 
    null;

  const getWelcomeMessage = () => {
    if (doctorProfile?.first_name && doctorProfile?.last_name) {
      return `Welcome back Dr. ${doctorProfile.first_name} ${doctorProfile.last_name}`;
    }
    return "Welcome back Doctor";
  };

  const hospitalMetrics = {
    activePrescriptions: 247,
    pendingReviews: 12,
    criticalAlerts: 3,
    complianceScore: 94.2,
    costSavings: 125000,
    avgResponseTime: 2.3
  };

  return (
    <div className="space-y-6">
      {filteredContent && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-blue-700 dark:text-blue-300">{filteredContent}</p>
        </div>
      )}

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-medical-primary to-blue-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">{getWelcomeMessage()}</h2>
        <p className="text-blue-100 mb-4">
          Your comprehensive hospital-grade antibiotic stewardship and clinical decision support platform
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

      {/* Hospital-Grade Metrics */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-primary">{hospitalMetrics.activePrescriptions}</div>
            <p className="text-xs text-green-600 mt-1">+12 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{hospitalMetrics.pendingReviews}</div>
            <p className="text-xs text-gray-500 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{hospitalMetrics.criticalAlerts}</div>
            <p className="text-xs text-red-500 mt-1">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{hospitalMetrics.complianceScore}%</div>
            <Progress value={hospitalMetrics.complianceScore} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${(hospitalMetrics.costSavings / 1000).toFixed(0)}K</div>
            <p className="text-xs text-green-600 mt-1">+18% vs target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{hospitalMetrics.avgResponseTime}s</div>
            <p className="text-xs text-green-600 mt-1">Within SLA</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs for Hospital-Grade Features */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="clinical" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Clinical Support
          </TabsTrigger>
          <TabsTrigger value="stewardship" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Stewardship
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Intelligence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Original Dashboard Metrics */}
          <DashboardMetrics />

          {/* Main Content Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Quick Actions */}
            <QuickActions />

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database Performance</span>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
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

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Security Status</span>
                    <Badge className="bg-green-100 text-green-800">Secure</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Today's Critical Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Drug Interaction Alerts</span>
                  <Badge className="bg-red-100 text-red-800">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resistance Alerts</span>
                  <Badge className="bg-orange-100 text-orange-800">1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prolonged Therapy</span>
                  <Badge className="bg-yellow-100 text-yellow-800">5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dose Adjustments</span>
                  <Badge className="bg-blue-100 text-blue-800">8</Badge>
                </div>
                <div className="pt-2">
                  <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                    Review Critical Items
                  </Button>
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
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cost Effectiveness</span>
                    <span className="text-sm text-muted-foreground">340% ROI</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clinical">
          <ClinicalDecisionSupport />
        </TabsContent>

        <TabsContent value="stewardship">
          <AntibioticStewardshipDashboard />
        </TabsContent>

        <TabsContent value="analytics">
          <EnhancedAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Clinical Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Predictive Analytics</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    AI models predict treatment outcomes and resistance patterns
                  </p>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Natural Language Processing</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Extracts insights from clinical notes and reports
                  </p>
                  <Badge className="bg-blue-100 text-blue-800">Beta</Badge>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Automated Alerts</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Real-time monitoring and intelligent alerting
                  </p>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Recent AI Insights</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-sm">
                      <strong>Trend Alert:</strong> Increased E. coli resistance to ciprofloxacin detected in ICU
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="text-sm">
                      <strong>Optimization:</strong> 12 patients identified for IV to PO conversion
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <p className="text-sm">
                      <strong>Cost Saving:</strong> Generic substitutions could save $5,400 this week
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
