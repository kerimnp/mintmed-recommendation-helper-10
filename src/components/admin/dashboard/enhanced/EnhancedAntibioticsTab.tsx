
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Pill,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard, EnhancedBadge, designSystem } from './DesignSystem';

// Mock data for demonstration
const prescriptionData = [
  { month: 'Jan', amoxicillin: 120, cephalexin: 85, azithromycin: 95, ciprofloxacin: 45 },
  { month: 'Feb', amoxicillin: 135, cephalexin: 92, azithromycin: 88, ciprofloxacin: 52 },
  { month: 'Mar', amoxicillin: 145, cephalexin: 88, azithromycin: 102, ciprofloxacin: 48 },
  { month: 'Apr', amoxicillin: 128, cephalexin: 95, azithromycin: 115, ciprofloxacin: 55 },
  { month: 'May', amoxicillin: 142, cephalexin: 105, azithromycin: 98, ciprofloxacin: 62 },
  { month: 'Jun', amoxicillin: 155, cephalexin: 112, azithromycin: 125, ciprofloxacin: 58 }
];

const resistanceData = [
  { name: 'Penicillin', resistance: 15, color: '#ef4444' },
  { name: 'Cephalosporin', resistance: 8, color: '#f59e0b' },
  { name: 'Macrolide', resistance: 12, color: '#eab308' },
  { name: 'Fluoroquinolone', resistance: 22, color: '#dc2626' },
  { name: 'Tetracycline', resistance: 6, color: '#16a34a' }
];

const effectivenessData = [
  { antibiotic: 'Amoxicillin', successRate: 87, sideEffects: 12, cost: 'Low' },
  { antibiotic: 'Cephalexin', successRate: 91, sideEffects: 8, cost: 'Medium' },
  { antibiotic: 'Azithromycin', successRate: 84, sideEffects: 15, cost: 'Medium' },
  { antibiotic: 'Ciprofloxacin', successRate: 78, sideEffects: 18, cost: 'High' },
  { antibiotic: 'Doxycycline', successRate: 89, sideEffects: 10, cost: 'Low' }
];

export const EnhancedAntibioticsTab: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleExport = () => {
    console.log('Exporting antibiotic data...');
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Antibiotic Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive insights into antibiotic prescriptions, resistance patterns, and effectiveness metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Total Prescriptions"
          value="2,847"
          subtitle="This month"
          trend="up"
          trendValue="+12%"
          icon={<Pill className="h-6 w-6" />}
          gradient={designSystem.gradients.primary}
        />
        <MetricCard
          title="Success Rate"
          value="87.3%"
          subtitle="Average effectiveness"
          trend="up"
          trendValue="+2.1%"
          icon={<CheckCircle className="h-6 w-6" />}
          gradient={designSystem.gradients.success}
        />
        <MetricCard
          title="Resistance Rate"
          value="14.2%"
          subtitle="Across all antibiotics"
          trend="down"
          trendValue="-1.8%"
          icon={<AlertTriangle className="h-6 w-6" />}
          gradient={designSystem.gradients.warning}
        />
        <MetricCard
          title="Avg. Treatment Time"
          value="7.4 days"
          subtitle="Mean duration"
          trend="stable"
          trendValue="0%"
          icon={<Clock className="h-6 w-6" />}
          gradient={designSystem.gradients.medical}
        />
      </motion.div>

      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-3 flex-1">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search antibiotics, conditions, or patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-w-md"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="penicillins">Penicillins</SelectItem>
              <SelectItem value="cephalosporins">Cephalosporins</SelectItem>
              <SelectItem value="macrolides">Macrolides</SelectItem>
              <SelectItem value="fluoroquinolones">Fluoroquinolones</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Main Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="prescriptions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="prescriptions">Prescription Trends</TabsTrigger>
            <TabsTrigger value="resistance">Resistance Patterns</TabsTrigger>
            <TabsTrigger value="effectiveness">Effectiveness Analysis</TabsTrigger>
            <TabsTrigger value="safety">Safety Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-6">
            <Card className={designSystem.shadows.soft}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Prescription Volume Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={prescriptionData}>
                    <defs>
                      <linearGradient id="colorAmoxicillin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorCephalexin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Area type="monotone" dataKey="amoxicillin" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAmoxicillin)" strokeWidth={2} />
                    <Area type="monotone" dataKey="cephalexin" stroke="#10b981" fillOpacity={1} fill="url(#colorCephalexin)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resistance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={designSystem.shadows.soft}>
                <CardHeader>
                  <CardTitle>Resistance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={resistanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="resistance"
                      >
                        {resistanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={designSystem.shadows.soft}>
                <CardHeader>
                  <CardTitle>Resistance Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">High MRSA Resistance</p>
                        <p className="text-sm text-gray-600">22% increase in Region A</p>
                      </div>
                    </div>
                    <EnhancedBadge variant="danger">Critical</EnhancedBadge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium">Rising Fluoroquinolone Resistance</p>
                        <p className="text-sm text-gray-600">8% increase this quarter</p>
                      </div>
                    </div>
                    <EnhancedBadge variant="warning">Monitor</EnhancedBadge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="effectiveness" className="space-y-6">
            <Card className={designSystem.shadows.soft}>
              <CardHeader>
                <CardTitle>Treatment Effectiveness Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {effectivenessData.map((drug, index) => (
                    <motion.div
                      key={drug.antibiotic}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{drug.antibiotic}</h4>
                          <div className="flex items-center gap-2">
                            <EnhancedBadge 
                              variant={drug.cost === 'Low' ? 'success' : drug.cost === 'Medium' ? 'warning' : 'danger'}
                              size="sm"
                            >
                              {drug.cost} Cost
                            </EnhancedBadge>
                            <span className="text-sm text-gray-600">{drug.successRate}% success</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${drug.successRate}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{drug.sideEffects}% side effects reported</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={designSystem.shadows.soft}>
                <CardHeader>
                  <CardTitle>Adverse Events Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Mild Reactions</span>
                      <EnhancedBadge variant="success">127 cases</EnhancedBadge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Moderate Reactions</span>
                      <EnhancedBadge variant="warning">23 cases</EnhancedBadge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Severe Reactions</span>
                      <EnhancedBadge variant="danger">3 cases</EnhancedBadge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={designSystem.shadows.soft}>
                <CardHeader>
                  <CardTitle>Drug Interaction Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="font-medium text-red-800 dark:text-red-300">High Priority</p>
                      <p className="text-sm text-red-600 dark:text-red-400">Warfarin + Ciprofloxacin interactions detected</p>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <p className="font-medium text-amber-800 dark:text-amber-300">Medium Priority</p>
                      <p className="text-sm text-amber-600 dark:text-amber-400">Metformin compatibility checks pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
