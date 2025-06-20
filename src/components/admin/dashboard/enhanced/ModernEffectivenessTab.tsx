
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Target, 
  TrendingUp, 
  Activity, 
  Award,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  Thermometer,
  Heart,
  Brain,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard, EnhancedBadge, designSystem } from './DesignSystem';

// Mock data for treatment effectiveness
const treatmentOutcomes = [
  { month: 'Jan', cureRate: 87, partialResponse: 8, failure: 5 },
  { month: 'Feb', cureRate: 89, partialResponse: 7, failure: 4 },
  { month: 'Mar', cureRate: 85, partialResponse: 10, failure: 5 },
  { month: 'Apr', cureRate: 91, partialResponse: 6, failure: 3 },
  { month: 'May', cureRate: 88, partialResponse: 8, failure: 4 },
  { month: 'Jun', cureRate: 93, partialResponse: 5, failure: 2 }
];

const antibioticPerformance = [
  { name: 'Amoxicillin', effectiveness: 89, patientSafety: 92, costEfficiency: 95, overallScore: 92 },
  { name: 'Cephalexin', effectiveness: 91, patientSafety: 88, costEfficiency: 87, overallScore: 89 },
  { name: 'Azithromycin', effectiveness: 84, patientSafety: 85, costEfficiency: 75, overallScore: 81 },
  { name: 'Ciprofloxacin', effectiveness: 78, patientSafety: 72, costEfficiency: 65, overallScore: 72 },
  { name: 'Doxycycline', effectiveness: 86, patientSafety: 89, costEfficiency: 90, overallScore: 88 }
];

// Fixed patient outcomes data structure for PieChart
const patientOutcomes = [
  { name: 'Complete Recovery', value: 78, color: '#22c55e' },
  { name: 'Partial Recovery', value: 15, color: '#f59e0b' },
  { name: 'No Improvement', value: 5, color: '#ef4444' },
  { name: 'Adverse Events', value: 2, color: '#dc2626' }
];

const timeToRecovery = [
  { days: '1-3', patients: 125, percentage: 35 },
  { days: '4-7', patients: 185, percentage: 52 },
  { days: '8-14', patients: 38, percentage: 11 },
  { days: '15+', patients: 7, percentage: 2 }
];

export const ModernEffectivenessTab: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('effectiveness');
  const [timeRange, setTimeRange] = useState('6m');
  const [comparisonMode, setComparisonMode] = useState('individual');

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
            Treatment Effectiveness Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive analysis of treatment outcomes, recovery rates, and patient safety metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Key Performance Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Overall Success Rate"
          value="89.3%"
          subtitle="Complete + Partial Recovery"
          trend="up"
          trendValue="+3.2%"
          icon={<Target className="h-6 w-6" />}
          gradient={designSystem.gradients.success}
        />
        <MetricCard
          title="Patient Safety Score"
          value="94.7"
          subtitle="Composite safety index"
          trend="up"
          trendValue="+1.8"
          icon={<Heart className="h-6 w-6" />}
          gradient={designSystem.gradients.medical}
        />
        <MetricCard
          title="Avg. Recovery Time"
          value="5.2 days"
          subtitle="Median time to recovery"
          trend="down"
          trendValue="-0.8d"
          icon={<Clock className="h-6 w-6" />}
          gradient={designSystem.gradients.primary}
        />
        <MetricCard
          title="Cost Effectiveness"
          value="€127"
          subtitle="Average cost per cure"
          trend="down"
          trendValue="-€15"
          icon={<Award className="h-6 w-6" />}
          gradient={designSystem.gradients.warning}
        />
      </motion.div>

      {/* Main Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="outcomes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="outcomes">Treatment Outcomes</TabsTrigger>
            <TabsTrigger value="performance">Drug Performance</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Analysis</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Models</TabsTrigger>
          </TabsList>

          <TabsContent value="outcomes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={designSystem.shadows.soft}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Treatment Success Trends</span>
                    <EnhancedBadge variant="success">Improving</EnhancedBadge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={treatmentOutcomes}>
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
                      <Line 
                        type="monotone" 
                        dataKey="cureRate" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="partialResponse" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="failure" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={designSystem.shadows.soft}>
                <CardHeader>
                  <CardTitle>Patient Outcome Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={patientOutcomes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {patientOutcomes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Percentage']}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry: any) => (
                          <span style={{ color: entry.color }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Outcome Details */}
            <Card className={designSystem.shadows.soft}>
              <CardHeader>
                <CardTitle>Detailed Outcome Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700">78%</div>
                    <div className="text-sm text-green-600">Complete Recovery</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Activity className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-700">15%</div>
                    <div className="text-sm text-yellow-600">Partial Recovery</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-700">5%</div>
                    <div className="text-sm text-red-600">No Improvement</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <Thermometer className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-700">2%</div>
                    <div className="text-sm text-red-600">Adverse Events</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className={designSystem.shadows.soft}>
              <CardHeader>
                <CardTitle>Antibiotic Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={antibioticPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Bar dataKey="effectiveness" fill="#3b82f6" name="Effectiveness" />
                    <Bar dataKey="patientSafety" fill="#10b981" name="Patient Safety" />
                    <Bar dataKey="costEfficiency" fill="#f59e0b" name="Cost Efficiency" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Ranking */}
            <Card className={designSystem.shadows.soft}>
              <CardHeader>
                <CardTitle>Overall Performance Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {antibioticPerformance
                    .sort((a, b) => b.overallScore - a.overallScore)
                    .map((drug, index) => (
                      <motion.div
                        key={drug.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-bold text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{drug.name}</h4>
                            <p className="text-sm text-gray-600">Overall Score: {drug.overallScore}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${drug.overallScore}%` }}
                            />
                          </div>
                          <EnhancedBadge 
                            variant={drug.overallScore >= 90 ? 'success' : drug.overallScore >= 80 ? 'warning' : 'danger'}
                          >
                            {drug.overallScore >= 90 ? 'Excellent' : drug.overallScore >= 80 ? 'Good' : 'Needs Improvement'}
                          </EnhancedBadge>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-6">
            <Card className={designSystem.shadows.soft}>
              <CardHeader>
                <CardTitle>Recovery Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeToRecovery}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="days" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Bar dataKey="patients" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recovery Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={designSystem.shadows.soft}>
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">5.2</div>
                  <div className="text-sm text-gray-600">Average Recovery Days</div>
                </CardContent>
              </Card>
              <Card className={designSystem.shadows.soft}>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">87%</div>
                  <div className="text-sm text-gray-600">Recovery within 7 days</div>
                </CardContent>
              </Card>
              <Card className={designSystem.shadows.soft}>
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2.3%</div>
                  <div className="text-sm text-gray-600">Readmission Rate</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <Card className={designSystem.shadows.soft}>
              <CardHeader>
                <CardTitle>Predictive Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Predictions</h3>
                  <p className="text-gray-600 mb-6">
                    Advanced machine learning models for treatment outcome prediction and personalized therapy recommendations
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">94.2%</div>
                      <div className="text-sm">Prediction Accuracy</div>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">12%</div>
                      <div className="text-sm">Improved Outcomes</div>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">48h</div>
                      <div className="text-sm">Earlier Detection</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
