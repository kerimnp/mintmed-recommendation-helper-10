
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity, 
  Shield,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

export const EnhancedAnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("utilization");
  const [timeRange, setTimeRange] = useState("30d");
  const [department, setDepartment] = useState("all");

  const utilizationData = [
    { name: 'Jan', prescriptions: 450, guidelines: 420, adherence: 93 },
    { name: 'Feb', prescriptions: 520, guidelines: 485, adherence: 93 },
    { name: 'Mar', prescriptions: 480, guidelines: 460, adherence: 96 },
    { name: 'Apr', prescriptions: 610, guidelines: 580, adherence: 95 },
    { name: 'May', prescriptions: 590, guidelines: 565, adherence: 96 },
    { name: 'Jun', prescriptions: 650, guidelines: 630, adherence: 97 }
  ];

  const resistanceData = [
    { name: 'E. coli', cipro: 28, amox: 45, genta: 12 },
    { name: 'S. aureus', cipro: 15, amox: 85, genta: 8 },
    { name: 'K. pneumoniae', cipro: 35, amox: 75, genta: 15 },
    { name: 'P. aeruginosa', cipro: 22, amox: 95, genta: 18 }
  ];

  const costData = [
    { name: 'Broad Spectrum', value: 45000, percentage: 42 },
    { name: 'Narrow Spectrum', value: 28000, percentage: 26 },
    { name: 'Generic', value: 20000, percentage: 19 },
    { name: 'Specialty', value: 14000, percentage: 13 }
  ];

  const outcomeData = [
    { month: 'Jan', success: 92, los: 7.2, readmission: 8.5 },
    { month: 'Feb', success: 94, los: 6.8, readmission: 7.2 },
    { month: 'Mar', success: 93, los: 7.0, readmission: 8.0 },
    { month: 'Apr', success: 95, los: 6.5, readmission: 6.8 },
    { month: 'May', success: 96, los: 6.2, readmission: 6.5 },
    { month: 'Jun', success: 97, los: 5.9, readmission: 5.8 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const keyMetrics = [
    {
      title: "Total Prescriptions",
      value: "3,247",
      change: "+12.5%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Guideline Adherence",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Cost Savings",
      value: "$125K",
      change: "+18.7%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Avg Length of Stay",
      value: "5.9 days",
      change: "-8.2%",
      trend: "down",
      period: "vs last month"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Advanced Analytics Dashboard
        </h2>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="icu">ICU</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metric.value}</span>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                  <span className="text-sm font-medium text-green-600">
                    {metric.change}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="resistance">Resistance</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
        </TabsList>

        <TabsContent value="utilization" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="prescriptions" 
                      stackId="1" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="guidelines" 
                      stackId="2" 
                      stroke="#82ca9d" 
                      fill="#82ca9d" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Guideline Adherence</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="adherence" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Department Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">ICU</span>
                    <span className="text-sm">892 prescriptions</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-500">27% of total</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Emergency</span>
                    <span className="text-sm">654 prescriptions</span>
                  </div>
                  <Progress value={55} className="h-2" />
                  <p className="text-xs text-gray-500">20% of total</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Surgery</span>
                    <span className="text-sm">523 prescriptions</span>
                  </div>
                  <Progress value={44} className="h-2" />
                  <p className="text-xs text-gray-500">16% of total</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Medicine</span>
                    <span className="text-sm">1178 prescriptions</span>
                  </div>
                  <Progress value={99} className="h-2" />
                  <p className="text-xs text-gray-500">37% of total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resistance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resistance Patterns by Pathogen</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={resistanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cipro" fill="#8884d8" name="Ciprofloxacin" />
                  <Bar dataKey="amox" fill="#82ca9d" name="Amoxicillin" />
                  <Bar dataKey="genta" fill="#ffc658" name="Gentamicin" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Savings Over Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <span className="font-medium">IV to PO Conversions</span>
                    <span className="text-green-600 font-bold">$45,200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <span className="font-medium">De-escalation Therapy</span>
                    <span className="text-blue-600 font-bold">$32,800</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <span className="font-medium">Duration Optimization</span>
                    <span className="text-purple-600 font-bold">$28,500</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <span className="font-medium">Generic Substitution</span>
                    <span className="text-orange-600 font-bold">$18,700</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Savings</span>
                    <span className="text-green-600">$125,200</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Outcomes Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={outcomeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="success" 
                    stroke="#8884d8" 
                    name="Success Rate (%)"
                    strokeWidth={3}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="los" 
                    stroke="#82ca9d" 
                    name="Length of Stay (days)"
                    strokeWidth={3}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="readmission" 
                    stroke="#ffc658" 
                    name="Readmission Rate (%)"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Prediction Models</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">C. diff Risk Model</span>
                      <Badge className="bg-green-100 text-green-800">Accuracy: 87%</Badge>
                    </div>
                    <Progress value={87} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Predicts C. difficile infection risk based on antibiotic exposure
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Resistance Development</span>
                      <Badge className="bg-blue-100 text-blue-800">Accuracy: 82%</Badge>
                    </div>
                    <Progress value={82} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Forecasts emergence of resistance patterns
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Treatment Failure</span>
                      <Badge className="bg-purple-100 text-purple-800">Accuracy: 79%</Badge>
                    </div>
                    <Progress value={79} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Identifies patients at risk for treatment failure
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-400">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                    High-Priority Interventions
                  </h4>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">
                    15 patients identified for immediate review
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">
                    Cost Optimization
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    Potential savings of $12,450 this month
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-400">
                  <h4 className="font-medium text-green-800 dark:text-green-200">
                    Guideline Adherence
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                    3 departments exceeding 95% compliance
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
