import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Activity,
  BarChart3
} from 'lucide-react';

export const AntibioticStewardshipDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stewardshipMetrics = {
    daysOfTherapy: {
      current: 742,
      previous: 856,
      change: -13.3,
      target: 700
    },
    definedDailyDoses: {
      current: 1245,
      previous: 1389,
      change: -10.4,
      target: 1200
    },
    appropriatenessScore: {
      current: 87,
      previous: 82,
      change: 6.1,
      target: 90
    },
    costSavings: {
      current: 125000,
      previous: 98000,
      change: 27.6,
      target: 150000
    }
  };

  const interventions = [
    {
      id: 1,
      type: "IV to PO Conversion",
      patient: "John Doe (MRN: 12345)",
      antibiotic: "Cefuroxime",
      recommendation: "Switch to oral cephalexin",
      potentialSavings: 450,
      urgency: "medium",
      status: "pending"
    },
    {
      id: 2,
      type: "Duration Optimization",
      patient: "Jane Smith (MRN: 67890)",
      antibiotic: "Vancomycin",
      recommendation: "Consider de-escalation to cefazolin",
      potentialSavings: 680,
      urgency: "high",
      status: "pending"
    },
    {
      id: 3,
      type: "Dose Adjustment",
      patient: "Bob Johnson (MRN: 11111)",
      antibiotic: "Gentamicin",
      recommendation: "Reduce dose based on renal function",
      potentialSavings: 120,
      urgency: "high",
      status: "approved"
    }
  ];

  const resistanceData = [
    { pathogen: "E. coli", antibiotic: "Ciprofloxacin", resistance: 28, trend: "stable" },
    { pathogen: "S. aureus", antibiotic: "Methicillin", resistance: 15, trend: "decreasing" },
    { pathogen: "K. pneumoniae", antibiotic: "Carbapenem", resistance: 8, trend: "increasing" },
    { pathogen: "P. aeruginosa", antibiotic: "Piperacillin", resistance: 22, trend: "stable" }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "decreasing": return <TrendingDown className="h-4 w-4 text-green-500" />;
      case "stable": return <Activity className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Antibiotic Stewardship Dashboard
        </h2>
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            87% Compliance
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Shield className="h-4 w-4 mr-1" />
            Active Monitoring
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Days of Therapy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stewardshipMetrics.daysOfTherapy.current}</span>
              <Badge className="bg-green-100 text-green-800">
                {stewardshipMetrics.daysOfTherapy.change}%
              </Badge>
            </div>
            <Progress 
              value={(stewardshipMetrics.daysOfTherapy.current / stewardshipMetrics.daysOfTherapy.target) * 100} 
              className="mt-2" 
            />
            <p className="text-xs text-gray-500 mt-1">Target: {stewardshipMetrics.daysOfTherapy.target}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Defined Daily Doses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stewardshipMetrics.definedDailyDoses.current}</span>
              <Badge className="bg-green-100 text-green-800">
                {stewardshipMetrics.definedDailyDoses.change}%
              </Badge>
            </div>
            <Progress 
              value={(stewardshipMetrics.definedDailyDoses.current / stewardshipMetrics.definedDailyDoses.target) * 100} 
              className="mt-2" 
            />
            <p className="text-xs text-gray-500 mt-1">Target: {stewardshipMetrics.definedDailyDoses.target}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Appropriateness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stewardshipMetrics.appropriatenessScore.current}%</span>
              <Badge className="bg-green-100 text-green-800">
                +{stewardshipMetrics.appropriatenessScore.change}%
              </Badge>
            </div>
            <Progress 
              value={stewardshipMetrics.appropriatenessScore.current} 
              className="mt-2" 
            />
            <p className="text-xs text-gray-500 mt-1">Target: {stewardshipMetrics.appropriatenessScore.target}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${(stewardshipMetrics.costSavings.current / 1000).toFixed(0)}K</span>
              <Badge className="bg-green-100 text-green-800">
                +{stewardshipMetrics.costSavings.change}%
              </Badge>
            </div>
            <Progress 
              value={(stewardshipMetrics.costSavings.current / stewardshipMetrics.costSavings.target) * 100} 
              className="mt-2" 
            />
            <p className="text-xs text-gray-500 mt-1">Target: ${stewardshipMetrics.costSavings.target / 1000}K</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="resistance">Resistance</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    3 patients on prolonged vancomycin therapy ({">"}7 days) require review
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    12 IV antibiotics eligible for oral conversion
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertDescription>
                    New resistance pattern detected in ICU - E. coli to fluoroquinolones
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">ICU</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Emergency</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Surgery</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Medicine</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Interventions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {interventions.map((intervention) => (
                <div key={intervention.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{intervention.type}</h4>
                      <p className="text-sm text-gray-600">{intervention.patient}</p>
                      <p className="text-sm">Current: {intervention.antibiotic}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={getUrgencyColor(intervention.urgency)}>
                        {intervention.urgency} priority
                      </Badge>
                      <div className="text-sm text-green-600">
                        Savings: ${intervention.potentialSavings}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                    <p className="text-sm">{intervention.recommendation}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-medical-primary hover:bg-medical-primary/90">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button variant="ghost" size="sm">
                      Defer
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resistance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resistance Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resistanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{item.pathogen}</p>
                        <p className="text-sm text-gray-600">vs {item.antibiotic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{item.resistance}%</p>
                        <p className="text-xs text-gray-500">resistance</p>
                      </div>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clinical Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Treatment Success</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Length of Stay</span>
                    <span className="text-sm font-medium">-12%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Readmission Rate</span>
                    <span className="text-sm font-medium">3.2%</span>
                  </div>
                  <Progress value={3.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Safety Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Adverse Events</span>
                    <span className="text-sm font-medium">2.1%</span>
                  </div>
                  <Progress value={2.1} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">C. diff Infections</span>
                    <span className="text-sm font-medium">0.8%</span>
                  </div>
                  <Progress value={0.8} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Drug Interactions</span>
                    <span className="text-sm font-medium">1.5%</span>
                  </div>
                  <Progress value={1.5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cost Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Drug Cost Reduction</span>
                    <span className="text-sm font-medium text-green-600">-18%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Savings</span>
                    <span className="text-sm font-medium text-green-600">$125K</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">ROI</span>
                    <span className="text-sm font-medium text-green-600">340%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
