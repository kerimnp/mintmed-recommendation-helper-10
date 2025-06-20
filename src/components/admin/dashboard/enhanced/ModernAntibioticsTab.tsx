
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  AreaChart,
  Area
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
  Search,
  Shield,
  Zap,
  Heart,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernMetricCard, ModernBadge, ModernGlassCard, ModernFloatingButton, modernDesignSystem } from './ModernDesignSystem';
import { useToast } from '@/hooks/use-toast';

// Real-time data simulation
const generateRealTimeData = () => {
  const baseData = [
    { month: 'Jan', amoxicillin: 120, cephalexin: 85, azithromycin: 95, ciprofloxacin: 45, effectiveness: 87 },
    { month: 'Feb', amoxicillin: 135, cephalexin: 92, azithromycin: 88, ciprofloxacin: 52, effectiveness: 89 },
    { month: 'Mar', amoxicillin: 145, cephalexin: 88, azithromycin: 102, ciprofloxacin: 48, effectiveness: 85 },
    { month: 'Apr', amoxicillin: 128, cephalexin: 95, azithromycin: 115, ciprofloxacin: 55, effectiveness: 91 },
    { month: 'May', amoxicillin: 142, cephalexin: 105, azithromycin: 98, ciprofloxacin: 62, effectiveness: 88 },
    { month: 'Jun', amoxicillin: 155, cephalexin: 112, azithromycin: 125, ciprofloxacin: 58, effectiveness: 93 }
  ];
  
  return baseData.map(item => ({
    ...item,
    amoxicillin: item.amoxicillin + Math.floor(Math.random() * 10) - 5,
    cephalexin: item.cephalexin + Math.floor(Math.random() * 8) - 4,
    azithromycin: item.azithromycin + Math.floor(Math.random() * 12) - 6,
    ciprofloxacin: item.ciprofloxacin + Math.floor(Math.random() * 6) - 3,
    effectiveness: Math.max(75, Math.min(98, item.effectiveness + Math.floor(Math.random() * 6) - 3))
  }));
};

const resistanceData = [
  { name: 'Penicillin', resistance: 15.2, trend: 'up', color: '#ef4444' },
  { name: 'Cephalosporin', resistance: 8.7, trend: 'stable', color: '#f59e0b' },
  { name: 'Macrolide', resistance: 12.4, trend: 'down', color: '#eab308' },
  { name: 'Fluoroquinolone', resistance: 22.1, trend: 'up', color: '#dc2626' },
  { name: 'Tetracycline', resistance: 6.3, trend: 'down', color: '#16a34a' }
];

const effectivenessData = [
  { antibiotic: 'Amoxicillin', successRate: 87.3, sideEffects: 12.1, cost: 'Low', patients: 1247, satisfaction: 4.6 },
  { antibiotic: 'Cephalexin', successRate: 91.2, sideEffects: 8.4, cost: 'Medium', patients: 892, satisfaction: 4.8 },
  { antibiotic: 'Azithromycin', successRate: 84.7, sideEffects: 15.2, cost: 'Medium', patients: 1056, satisfaction: 4.3 },
  { antibiotic: 'Ciprofloxacin', successRate: 78.9, sideEffects: 18.7, cost: 'High', patients: 673, satisfaction: 4.1 },
  { antibiotic: 'Doxycycline', successRate: 89.4, sideEffects: 10.3, cost: 'Low', patients: 734, satisfaction: 4.7 }
];

const realtimeAlerts = [
  { id: 1, type: 'critical', message: 'MRSA resistance spike detected in ICU', time: '2 min ago', severity: 'high' },
  { id: 2, type: 'warning', message: 'Amoxicillin stock running low', time: '5 min ago', severity: 'medium' },
  { id: 3, type: 'info', message: 'New treatment protocol approved', time: '10 min ago', severity: 'low' },
  { id: 4, type: 'success', message: 'Infection rate decreased by 15%', time: '15 min ago', severity: 'low' }
];

export const ModernAntibioticsTab: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState(generateRealTimeData());
  const [currentMetrics, setCurrentMetrics] = useState({
    totalPrescriptions: 2847,
    successRate: 87.3,
    resistanceRate: 14.2,
    avgTreatmentTime: 7.4
  });
  const { toast } = useToast();

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrescriptionData(generateRealTimeData());
      setCurrentMetrics(prev => ({
        totalPrescriptions: prev.totalPrescriptions + Math.floor(Math.random() * 5),
        successRate: Math.max(80, Math.min(95, prev.successRate + (Math.random() - 0.5) * 0.5)),
        resistanceRate: Math.max(10, Math.min(20, prev.resistanceRate + (Math.random() - 0.5) * 0.3)),
        avgTreatmentTime: Math.max(5, Math.min(10, prev.avgTreatmentTime + (Math.random() - 0.5) * 0.2))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPrescriptionData(generateRealTimeData());
      toast({
        title: "Data Refreshed",
        description: "Successfully updated antibiotic analytics data",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your antibiotic analytics report is being generated...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Modern Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Intelligent Antibiotic Analytics
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              AI-powered insights for optimal antimicrobial stewardship
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ModernFloatingButton 
              onClick={handleRefresh} 
              variant="secondary"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </ModernFloatingButton>
            <ModernFloatingButton onClick={handleExport} size="sm">
              <Download className="h-4 w-4" />
              Export
            </ModernFloatingButton>
          </div>
        </motion.div>

        {/* Real-time Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <ModernMetricCard
            title="Total Prescriptions"
            value={currentMetrics.totalPrescriptions.toLocaleString()}
            subtitle="This month"
            trend="up"
            trendValue="+12.3%"
            icon={<Pill className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.primary}
            realTime={true}
          />
          <ModernMetricCard
            title="Success Rate"
            value={`${currentMetrics.successRate.toFixed(1)}%`}
            subtitle="Treatment effectiveness"
            trend="up"
            trendValue="+2.1%"
            icon={<CheckCircle className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.success}
            realTime={true}
          />
          <ModernMetricCard
            title="Resistance Rate"
            value={`${currentMetrics.resistanceRate.toFixed(1)}%`}
            subtitle="Multi-drug resistance"
            trend="down"
            trendValue="-1.8%"
            icon={<Shield className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.warning}
            realTime={true}
          />
          <ModernMetricCard
            title="Avg. Treatment Time"
            value={`${currentMetrics.avgTreatmentTime.toFixed(1)} days`}
            subtitle="Recovery duration"
            trend="stable"
            trendValue="0%"
            icon={<Clock className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.medical}
            realTime={true}
          />
        </motion.div>

        {/* Modern Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernGlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search antibiotics, conditions, or patterns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>
                <ModernBadge variant="glass" glow>
                  <Activity className="h-3 w-3 mr-1" />
                  Live Data
                </ModernBadge>
              </div>
              <div className="flex items-center gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-44 bg-white/50 border-white/20 backdrop-blur-sm">
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
                  <SelectTrigger className="w-32 bg-white/50 border-white/20 backdrop-blur-sm">
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
            </div>
          </ModernGlassCard>
        </motion.div>

        {/* Real-time Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ModernGlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold">Real-time Alerts</h3>
              <ModernBadge variant="warning" size="sm" pulse>
                {realtimeAlerts.length} Active
              </ModernBadge>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {realtimeAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-l-4 ${
                      alert.type === 'critical' ? 'bg-red-50 border-red-400 dark:bg-red-900/20' :
                      alert.type === 'warning' ? 'bg-amber-50 border-amber-400 dark:bg-amber-900/20' :
                      alert.type === 'success' ? 'bg-emerald-50 border-emerald-400 dark:bg-emerald-900/20' :
                      'bg-blue-50 border-blue-400 dark:bg-blue-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {alert.type === 'critical' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                        {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                        {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                        {alert.type === 'info' && <Activity className="h-5 w-5 text-blue-600" />}
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                      <ModernBadge 
                        variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'success'} 
                        size="sm"
                      >
                        {alert.severity}
                      </ModernBadge>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ModernGlassCard>
        </motion.div>

        {/* Enhanced Analytics Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="prescriptions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
              <TabsTrigger value="prescriptions" className="rounded-xl">Prescription Analytics</TabsTrigger>
              <TabsTrigger value="resistance" className="rounded-xl">Resistance Monitoring</TabsTrigger>
              <TabsTrigger value="effectiveness" className="rounded-xl">Treatment Outcomes</TabsTrigger>
              <TabsTrigger value="ai-insights" className="rounded-xl">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="prescriptions" className="space-y-6">
              <ModernGlassCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Prescription Volume & Effectiveness Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={prescriptionData}>
                      <defs>
                        <linearGradient id="colorAmoxicillin" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorCephalexin" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f093fb" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f093fb" stopOpacity={0.1}/>
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
                      <Area type="monotone" dataKey="amoxicillin" stroke="#667eea" fillOpacity={1} fill="url(#colorAmoxicillin)" strokeWidth={3} />
                      <Area type="monotone" dataKey="cephalexin" stroke="#f093fb" fillOpacity={1} fill="url(#colorCephalexin)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </ModernGlassCard>
            </TabsContent>

            <TabsContent value="resistance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModernGlassCard>
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
                </ModernGlassCard>

                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle>Critical Resistance Patterns</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resistanceData.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white/50 rounded-xl backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.resistance}% resistance</p>
                          </div>
                        </div>
                        <ModernBadge 
                          variant={item.trend === 'up' ? 'danger' : item.trend === 'down' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'} {item.trend}
                        </ModernBadge>
                      </motion.div>
                    ))}
                  </CardContent>
                </ModernGlassCard>
              </div>
            </TabsContent>

            <TabsContent value="effectiveness" className="space-y-6">
              <ModernGlassCard>
                <CardHeader>
                  <CardTitle>Treatment Effectiveness Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {effectivenessData.map((drug, index) => (
                      <motion.div
                        key={drug.antibiotic}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-gradient-to-br from-white/60 to-white/40 rounded-2xl backdrop-blur-sm border border-white/20"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {drug.antibiotic.substring(0, 2)}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold">{drug.antibiotic}</h4>
                              <p className="text-sm text-gray-600">{drug.patients} patients treated</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <ModernBadge 
                              variant={drug.cost === 'Low' ? 'success' : drug.cost === 'Medium' ? 'warning' : 'danger'}
                              glow
                            >
                              {drug.cost} Cost
                            </ModernBadge>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-red-500" />
                              <span className="text-sm font-medium">{drug.satisfaction}/5</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Success Rate</span>
                              <span className="text-sm font-medium">{drug.successRate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div 
                                className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${drug.successRate}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Side Effects</span>
                              <span className="text-sm font-medium">{drug.sideEffects}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div 
                                className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${drug.sideEffects}%` }}
                                transition={{ duration: 1, delay: index * 0.2 + 0.1 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </ModernGlassCard>
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              <ModernGlassCard glow>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Brain className="h-6 w-6 text-purple-600" />
                    AI-Powered Clinical Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                      <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-purple-700 mb-2">94.7%</div>
                      <div className="text-sm text-purple-600">Prediction Accuracy</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl">
                      <TrendingUp className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-emerald-700 mb-2">18%</div>
                      <div className="text-sm text-emerald-600">Improved Outcomes</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                      <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-blue-700 mb-2">36h</div>
                      <div className="text-sm text-blue-600">Faster Diagnosis</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-200/50">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      Latest AI Recommendations
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                        <p className="text-sm">Consider switching to cephalexin for patients with penicillin sensitivity showing moderate response.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <p className="text-sm">Monitor ciprofloxacin usage in elderly patients due to increased tendon rupture risk.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                        <p className="text-sm">Doxycycline showing excellent outcomes for respiratory tract infections this month.</p>
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
