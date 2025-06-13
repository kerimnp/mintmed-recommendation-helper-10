
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Activity, Users, AlertTriangle, Award } from 'lucide-react';

// Mock data - In production, this would come from your database
const prescriptionData = [
  { month: 'Jan', prescriptions: 245, cost: 12500, effectiveness: 87 },
  { month: 'Feb', prescriptions: 278, cost: 14200, effectiveness: 89 },
  { month: 'Mar', prescriptions: 312, cost: 15800, effectiveness: 91 },
  { month: 'Apr', prescriptions: 298, cost: 15100, effectiveness: 88 },
  { month: 'May', prescriptions: 334, cost: 16900, effectiveness: 92 },
  { month: 'Jun', prescriptions: 356, cost: 18200, effectiveness: 94 },
];

const antibioticUsage = [
  { name: 'Amoxicillin', value: 23, color: '#8884d8' },
  { name: 'Ciprofloxacin', value: 18, color: '#82ca9d' },
  { name: 'Azithromycin', value: 15, color: '#ffc658' },
  { name: 'Cephalexin', value: 12, color: '#ff7300' },
  { name: 'Others', value: 32, color: '#0088fe' },
];

const resistanceData = [
  { pathogen: 'E. coli', baseline: 15, current: 18, trend: 'increasing' },
  { pathogen: 'S. aureus', baseline: 22, current: 19, trend: 'decreasing' },
  { pathogen: 'K. pneumoniae', baseline: 28, current: 31, trend: 'increasing' },
  { pathogen: 'P. aeruginosa', baseline: 35, current: 33, trend: 'decreasing' },
];

const chartConfig = {
  prescriptions: {
    label: "Prescriptions",
    color: "#2563eb",
  },
  cost: {
    label: "Cost ($)",
    color: "#dc2626",
  },
  effectiveness: {
    label: "Effectiveness (%)",
    color: "#16a34a",
  },
};

export const PharmaceuticalDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Pharmaceutical Analytics</h1>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="icu">ICU</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="internal">Internal Medicine</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Prescriptions</p>
                <p className="text-2xl font-bold text-blue-600">1,823</p>
                <p className="text-xs text-green-600">+12% from last period</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-green-600">$92,700</p>
                <p className="text-xs text-green-600">-5% from last period</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Effectiveness</p>
                <p className="text-2xl font-bold text-purple-600">91%</p>
                <p className="text-xs text-green-600">+3% from last period</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patients Treated</p>
                <p className="text-2xl font-bold text-orange-600">1,456</p>
                <p className="text-xs text-green-600">+8% from last period</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="resistance">Resistance</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={prescriptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="prescriptions" fill="var(--color-prescriptions)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost & Effectiveness Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={prescriptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="cost" orientation="left" />
                    <YAxis yAxisId="effectiveness" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line yAxisId="cost" type="monotone" dataKey="cost" stroke="var(--color-cost)" strokeWidth={2} />
                    <Line yAxisId="effectiveness" type="monotone" dataKey="effectiveness" stroke="var(--color-effectiveness)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Antibiotic Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={antibioticUsage}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {antibioticUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="space-y-4">
                  {antibioticUsage.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-lg font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resistance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resistance Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resistanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-medium">{item.pathogen}</h4>
                        <p className="text-sm text-gray-600">
                          Baseline: {item.baseline}% → Current: {item.current}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.trend === 'increasing' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Award className="h-5 w-5 text-green-500" />
                      )}
                      <Badge variant={item.trend === 'increasing' ? 'destructive' : 'default'}>
                        {item.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Clinical Outcomes Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Advanced outcome analytics will be available as we collect more clinical data.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    This section will include treatment success rates, patient satisfaction scores, 
                    adverse event tracking, and cost-effectiveness analysis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
