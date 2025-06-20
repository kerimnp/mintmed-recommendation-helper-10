import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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
  RadialBarChart,
  RadialBar,
  Legend,
  ScatterChart,
  Scatter,
  AreaChart,
  Area
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
  Zap,
  Star,
  Shield,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernMetricCard, ModernBadge, ModernGlassCard, ModernFloatingButton, modernDesignSystem } from './ModernDesignSystem';
import { useToast } from '@/hooks/use-toast';

// Enhanced real-time data with more realistic medical metrics
const generateTreatmentOutcomes = () => {
  const baseData = [
    { month: 'Jan', cureRate: 87.2, partialResponse: 8.1, failure: 4.7, patientSatisfaction: 4.3, costPerTreatment: 145 },
    { month: 'Feb', cureRate: 89.1, partialResponse: 7.2, failure: 3.7, patientSatisfaction: 4.4, costPerTreatment: 142 },
    { month: 'Mar', cureRate: 85.8, partialResponse: 9.8, failure: 4.4, patientSatisfaction: 4.2, costPerTreatment: 148 },
    { month: 'Apr', cureRate: 91.3, partialResponse: 6.1, failure: 2.6, patientSatisfaction: 4.6, costPerTreatment: 138 },
    { month: 'May', cureRate: 88.7, partialResponse: 7.8, failure: 3.5, patientSatisfaction: 4.5, costPerTreatment: 141 },
    { month: 'Jun', cureRate: 93.2, partialResponse: 4.9, failure: 1.9, patientSatisfaction: 4.7, costPerTreatment: 135 }
  ];
  
  return baseData.map(item => ({
    ...item,
    cureRate: Math.max(80, Math.min(98, item.cureRate + (Math.random() - 0.5) * 2)),
    partialResponse: Math.max(3, Math.min(15, item.partialResponse + (Math.random() - 0.5) * 1.5)),
    failure: Math.max(1, Math.min(8, item.failure + (Math.random() - 0.5) * 1)),
    patientSatisfaction: Math.max(3.5, Math.min(5, item.patientSatisfaction + (Math.random() - 0.5) * 0.3)),
    costPerTreatment: Math.max(120, Math.min(180, item.costPerTreatment + (Math.random() - 0.5) * 10))
  }));
};

const antibioticPerformance = [
  { 
    name: 'Amoxicillin', 
    effectiveness: 89.3, 
    patientSafety: 92.1, 
    costEfficiency: 95.4, 
    overallScore: 92.3,
    patientCount: 1247,
    avgDuration: 6.2,
    adverseEvents: 3.1
  },
  { 
    name: 'Cephalexin', 
    effectiveness: 91.7, 
    patientSafety: 88.4, 
    costEfficiency: 87.2, 
    overallScore: 89.1,
    patientCount: 892,
    avgDuration: 5.8,
    adverseEvents: 4.2
  },
  { 
    name: 'Azithromycin', 
    effectiveness: 84.2, 
    patientSafety: 85.1, 
    costEfficiency: 75.8, 
    overallScore: 81.7,
    patientCount: 1056,
    avgDuration: 7.1,
    adverseEvents: 6.3
  },
  { 
    name: 'Ciprofloxacin', 
    effectiveness: 78.6, 
    patientSafety: 72.3, 
    costEfficiency: 65.2, 
    overallScore: 72.0,
    patientCount: 673,
    avgDuration: 8.4,
    adverseEvents: 8.7
  },
  { 
    name: 'Doxycycline', 
    effectiveness: 86.9, 
    patientSafety: 89.2, 
    costEfficiency: 90.1, 
    overallScore: 88.7,
    patientCount: 734,
    avgDuration: 6.5,
    adverseEvents: 3.8
  }
];

const patientOutcomes = [
  { category: 'Complete Recovery', value: 78.2, patients: 2847, fill: '#10b981' },
  { category: 'Partial Recovery', value: 15.3, patients: 558, fill: '#f59e0b' },
  { category: 'No Improvement', value: 4.8, patients: 175, fill: '#ef4444' },
  { category: 'Adverse Events', value: 1.7, patients: 62, fill: '#dc2626' }
];

const timeToRecovery = [
  { days: '1-3', patients: 1247, percentage: 34.2, satisfaction: 4.8 },
  { days: '4-7', patients: 1896, percentage: 52.1, satisfaction: 4.6 },
  { days: '8-14', patients: 425, percentage: 11.7, satisfaction: 4.2 },
  { days: '15+', patients: 73, percentage: 2.0, satisfaction: 3.8 }
];

const complicationPredictions = [
  { 
    risk: 'Low Risk', 
    probability: 78.4, 
    patients: 2847, 
    interventions: 12,
    color: '#10b981',
    icon: <CheckCircle2 className="h-5 w-5" />
  },
  { 
    risk: 'Moderate Risk', 
    probability: 18.2, 
    patients: 662, 
    interventions: 45,
    color: '#f59e0b',
    icon: <AlertCircle className="h-5 w-5" />
  },
  { 
    risk: 'High Risk', 
    probability: 3.4, 
    patients: 124, 
    interventions: 78,
    color: '#ef4444',
    icon: <AlertCircle className="h-5 w-5" />
  }
];

export const ModernEffectivenessTab: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('effectiveness');
  const [timeRange, setTimeRange] = useState('6m');
  const [treatmentData, setTreatmentData] = useState(generateTreatmentOutcomes());
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    successRate: 89.3,
    patientSafety: 94.7,
    avgRecoveryTime: 5.2,
    costEffectiveness: 127
  });
  const { toast } = useToast();

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTreatmentData(generateTreatmentOutcomes());
      setRealTimeMetrics(prev => ({
        successRate: Math.max(85, Math.min(95, prev.successRate + (Math.random() - 0.5) * 0.5)),
        patientSafety: Math.max(90, Math.min(98, prev.patientSafety + (Math.random() - 0.5) * 0.3)),
        avgRecoveryTime: Math.max(4, Math.min(8, prev.avgRecoveryTime + (Math.random() - 0.5) * 0.2)),
        costEffectiveness: Math.max(100, Math.min(150, prev.costEffectiveness + (Math.random() - 0.5) * 5))
      }));
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your comprehensive effectiveness report is being prepared...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-blue-50/30 to-purple-50/50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Modern Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 via-blue-700 to-purple-700 dark:from-emerald-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Treatment Effectiveness Intelligence
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Advanced analytics for optimal patient outcomes and clinical decision support
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-white/50 border-white/20 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <ModernFloatingButton onClick={handleGenerateReport}>
              <BarChart3 className="h-4 w-4" />
              Generate Report
            </ModernFloatingButton>
          </div>
        </motion.div>

        {/* Enhanced KPI Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <ModernMetricCard
            title="Overall Success Rate"
            value={`${realTimeMetrics.successRate.toFixed(1)}%`}
            subtitle="Complete + Partial Recovery"
            trend="up"
            trendValue="+3.2%"
            icon={<Target className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.success}
            realTime={true}
          />
          <ModernMetricCard
            title="Patient Safety Score"
            value={`${realTimeMetrics.patientSafety.toFixed(1)}`}
            subtitle="Composite safety index"
            trend="up"
            trendValue="+1.8"
            icon={<Shield className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.medical}
            realTime={true}
          />
          <ModernMetricCard
            title="Avg. Recovery Time"
            value={`${realTimeMetrics.avgRecoveryTime.toFixed(1)} days`}
            subtitle="Median time to recovery"
            trend="down"
            trendValue="-0.8d"
            icon={<Clock className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.primary}
            realTime={true}
          />
          <ModernMetricCard
            title="Cost Effectiveness"
            value={`€${Math.round(realTimeMetrics.costEffectiveness)}`}
            subtitle="Average cost per cure"
            trend="down"
            trendValue="-€15"
            icon={<Award className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.warning}
            realTime={true}
          />
        </motion.div>

        {/* Enhanced Analytics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="outcomes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
              <TabsTrigger value="outcomes" className="rounded-xl">Treatment Outcomes</TabsTrigger>
              <TabsTrigger value="performance" className="rounded-xl">Drug Performance</TabsTrigger>
              <TabsTrigger value="recovery" className="rounded-xl">Recovery Analysis</TabsTrigger>
              <TabsTrigger value="predictive" className="rounded-xl">Predictive Models</TabsTrigger>
            </TabsList>

            <TabsContent value="outcomes" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Treatment Success Trends
                      </span>
                      <ModernBadge variant="success" glow>Improving</ModernBadge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={treatmentData}>
                        <defs>
                          <linearGradient id="colorCureRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorPartialResponse" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="cureRate" 
                          stroke="#10b981" 
                          fillOpacity={1} 
                          fill="url(#colorCureRate)"
                          strokeWidth={3}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="partialResponse" 
                          stroke="#f59e0b" 
                          fillOpacity={1} 
                          fill="url(#colorPartialResponse)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </ModernGlassCard>

                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle>Patient Outcome Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={patientOutcomes}>
                        <RadialBar
                          label={{ position: 'insideStart', fill: '#fff' }}
                          background
                          dataKey="value"
                        />
                        <Legend iconSize={10} layout="vertical" verticalAlign="bottom" />
                        <Tooltip 
                          formatter={(value, name) => [
                            `${value}% (${patientOutcomes.find(item => item.category === name)?.patients || 0} patients)`,
                            name
                          ]}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </ModernGlassCard>
              </div>

              {/* Enhanced Outcome Details */}
              <ModernGlassCard>
                <CardHeader>
                  <CardTitle>Detailed Outcome Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {patientOutcomes.map((outcome, index) => (
                      <motion.div
                        key={outcome.category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-6 bg-gradient-to-br from-white/60 to-white/30 rounded-2xl backdrop-blur-sm border border-white/20"
                      >
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: outcome.fill + '20' }}>
                          {outcome.category.includes('Complete') && <CheckCircle2 className="h-8 w-8 text-emerald-600" />}
                          {outcome.category.includes('Partial') && <Activity className="h-8 w-8 text-amber-600" />}
                          {outcome.category.includes('No Improvement') && <AlertCircle className="h-8 w-8 text-red-600" />}
                          {outcome.category.includes('Adverse') && <Thermometer className="h-8 w-8 text-red-600" />}
                        </div>
                        <div className="text-3xl font-bold mb-2" style={{ color: outcome.fill }}>
                          {outcome.value}%
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{outcome.category}</div>
                        <div className="text-xs text-gray-500">{outcome.patients} patients</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </ModernGlassCard>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <ModernGlassCard>
                <CardHeader>
                  <CardTitle>Comprehensive Drug Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {antibioticPerformance
                      .sort((a, b) => b.overallScore - a.overallScore)
                      .map((drug, index) => (
                        <motion.div
                          key={drug.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 bg-gradient-to-br from-white/60 to-white/30 rounded-2xl backdrop-blur-sm border border-white/20"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="text-xl font-semibold">{drug.name}</h4>
                                <p className="text-sm text-gray-600">{drug.patientCount} patients • {drug.avgDuration} days avg</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <ModernBadge 
                                variant={drug.overallScore >= 90 ? 'success' : drug.overallScore >= 80 ? 'warning' : 'danger'}
                                glow
                              >
                                {drug.overallScore >= 90 ? 'Excellent' : drug.overallScore >= 80 ? 'Good' : 'Needs Review'}
                              </ModernBadge>
                              <div className="text-right">
                                <div className="text-2xl font-bold">{drug.overallScore}</div>
                                <div className="text-xs text-gray-500">Overall Score</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Effectiveness</span>
                                <span className="text-sm font-medium">{drug.effectiveness}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${drug.effectiveness}%` }}
                                  transition={{ duration: 1, delay: index * 0.2 }}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Patient Safety</span>
                                <span className="text-sm font-medium">{drug.patientSafety}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${drug.patientSafety}%` }}
                                  transition={{ duration: 1, delay: index * 0.2 + 0.1 }}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Cost Efficiency</span>
                                <span className="text-sm font-medium">{drug.costEfficiency}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${drug.costEfficiency}%` }}
                                  transition={{ duration: 1, delay: index * 0.2 + 0.2 }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-white/20">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Adverse Events: {drug.adverseEvents}%</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>Patient Rating: 4.{Math.floor(drug.overallScore / 10)}/5</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </ModernGlassCard>
            </TabsContent>

            <TabsContent value="recovery" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle>Recovery Time Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={timeToRecovery}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                        <XAxis dataKey="days" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Bar dataKey="patients" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </ModernGlassCard>

                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle>Recovery Satisfaction Correlation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {timeToRecovery.map((item, index) => (
                        <motion.div
                          key={item.days}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-white/50 rounded-xl backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {item.days}
                            </div>
                            <div>
                              <div className="font-medium">{item.patients} patients</div>
                              <div className="text-sm text-gray-600">{item.percentage}% of total</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">{item.satisfaction}</span>
                            </div>
                            <div className="text-xs text-gray-500">Satisfaction</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </ModernGlassCard>
              </div>

              {/* Enhanced Recovery Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <Zap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-blue-700 mb-2">{realTimeMetrics.avgRecoveryTime.toFixed(1)}</div>
                    <div className="text-sm text-blue-600 mb-2">Average Recovery Days</div>
                    <ModernBadge variant="success" size="sm">15% faster than industry</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <Users className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-emerald-700 mb-2">86.3%</div>
                    <div className="text-sm text-emerald-600 mb-2">Recovery within 7 days</div>
                    <ModernBadge variant="success" size="sm">Above target</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-purple-700 mb-2">2.1%</div>
                    <div className="text-sm text-purple-600 mb-2">Readmission Rate</div>
                    <ModernBadge variant="success" size="sm">Best in class</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
              </div>
            </TabsContent>

            <TabsContent value="predictive" className="space-y-6">
              <ModernGlassCard glow>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Brain className="h-6 w-6 text-purple-600" />
                    AI-Powered Predictive Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Complication Risk Prediction</h4>
                      <div className="space-y-4">
                        {complicationPredictions.map((prediction, index) => (
                          <motion.div
                            key={prediction.risk}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl border border-white/20 bg-white/30 backdrop-blur-sm"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: prediction.color + '20' }}>
                                  {React.cloneElement(prediction.icon, { style: { color: prediction.color } })}
                                </div>
                                <div>
                                  <div className="font-medium">{prediction.risk}</div>
                                  <div className="text-sm text-gray-600">{prediction.patients} patients</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold" style={{ color: prediction.color }}>
                                  {prediction.probability}%
                                </div>
                                <div className="text-xs text-gray-500">probability</div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-600">
                              {prediction.interventions} preventive interventions suggested
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-4">AI Model Performance</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                          <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                          <div className="text-3xl font-bold text-purple-700 mb-2">96.4%</div>
                          <div className="text-sm text-purple-600">Prediction Accuracy</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl">
                          <TrendingUp className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                          <div className="text-3xl font-bold text-emerald-700 mb-2">23%</div>
                          <div className="text-sm text-emerald-600">Improved Outcomes</div>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                          <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                          <div className="text-3xl font-bold text-blue-700 mb-2">18h</div>
                          <div className="text-sm text-blue-600">Earlier Detection</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-200/50">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      AI-Generated Insights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                          <p className="text-sm">Patients with comorbidities show 34% better outcomes with personalized duration adjustments.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <p className="text-sm">Early intervention protocols reduce treatment time by average 2.3 days.</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                          <p className="text-sm">Combination therapy shows 18% higher success rates in resistant cases.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                          <p className="text-sm">Patient satisfaction correlates strongly with treatment duration optimization.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </ModernGlassCard>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
