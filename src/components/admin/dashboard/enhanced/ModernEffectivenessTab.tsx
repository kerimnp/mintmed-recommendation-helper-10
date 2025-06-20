
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  AlertCircle, 
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Download,
  Filter,
  Calendar,
  Globe,
  Users,
  Zap,
  Shield,
  Award,
  Brain,
  Eye,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced mock data with more sophisticated metrics
const effectivenessData = [
  { drug: 'Vancomycin', effectiveness: 95, resistance: 8, sideEffects: 25, studies: 1200, confidence: 98 },
  { drug: 'Linezolid', effectiveness: 92, resistance: 5, sideEffects: 18, studies: 850, confidence: 96 },
  { drug: 'Daptomycin', effectiveness: 89, resistance: 7, sideEffects: 22, studies: 720, confidence: 94 },
  { drug: 'Amoxicillin', effectiveness: 85, resistance: 15, sideEffects: 12, studies: 2100, confidence: 99 },
  { drug: 'Azithromycin', effectiveness: 78, resistance: 22, sideEffects: 8, studies: 1800, confidence: 97 },
  { drug: 'Ciprofloxacin', effectiveness: 75, resistance: 28, sideEffects: 18, studies: 1600, confidence: 95 }
];

const timeSeriesData = [
  { month: 'Jan', vancomycin: 95, linezolid: 92, amoxicillin: 85, trend: 2.1 },
  { month: 'Feb', vancomycin: 94, linezolid: 93, amoxicillin: 86, trend: 1.8 },
  { month: 'Mar', vancomycin: 96, linezolid: 91, amoxicillin: 84, trend: -0.5 },
  { month: 'Apr', vancomycin: 95, linezolid: 94, amoxicillin: 87, trend: 2.3 },
  { month: 'May', vancomycin: 97, linezolid: 93, amoxicillin: 85, trend: 1.2 },
  { month: 'Jun', vancomycin: 95, linezolid: 95, amoxicillin: 88, trend: 3.1 }
];

const patientOutcomes = [
  { name: 'Complete Recovery', value: 68, color: '#10b981' },
  { name: 'Significant Improvement', value: 22, color: '#3b82f6' },
  { name: 'Partial Response', value: 7, color: '#f59e0b' },
  { name: 'No Response', value: 3, color: '#ef4444' }
];

const resistancePatterns = [
  { pathogen: 'MRSA', susceptibility: 92, resistance: 8, trend: -2.1 },
  { pathogen: 'VRE', susceptibility: 78, resistance: 22, trend: 1.5 },
  { pathogen: 'ESBL E.coli', susceptibility: 65, resistance: 35, trend: 3.2 },
  { pathogen: 'C. diff', susceptibility: 89, resistance: 11, trend: -0.8 },
  { pathogen: 'P. aeruginosa', susceptibility: 72, resistance: 28, trend: 2.7 }
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
  index: number;
}> = ({ title, value, change, icon, trend, index }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-emerald-600 bg-emerald-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 rounded-2xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-transparent to-medical-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-medical-primary/10 to-medical-accent/10 group-hover:from-medical-primary/20 group-hover:to-medical-accent/20 transition-all duration-300">
              {icon}
            </div>
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${getTrendColor()} transition-all duration-300`}>
              {getTrendIcon()}
              <span className="text-sm font-medium">{change > 0 ? '+' : ''}{change}%</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-medical-primary transition-colors duration-300">
              {value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {title}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ChartCard: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, children, actions, className = "" }) => {
  return (
    <Card className={`border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};

export const ModernEffectivenessTab: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');
  const [selectedPathogen, setSelectedPathogen] = useState('all');
  const [chartType, setChartType] = useState('bar');

  const metrics = [
    {
      title: 'Overall Effectiveness',
      value: '87.3%',
      change: 2.1,
      icon: <Target className="w-6 h-6 text-medical-primary" />,
      trend: 'up' as const
    },
    {
      title: 'Resistance Rate',
      value: '12.7%',
      change: -1.5,
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      trend: 'down' as const
    },
    {
      title: 'Treatment Success',
      value: '92.1%',
      change: 3.2,
      icon: <Award className="w-6 h-6 text-blue-500" />,
      trend: 'up' as const
    },
    {
      title: 'Adverse Events',
      value: '8.4%',
      change: -0.8,
      icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
      trend: 'down' as const
    }
  ];

  return (
    <div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Treatment Effectiveness Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Real-time insights into therapeutic outcomes and resistance patterns
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Enhanced Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all duration-300"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>

            <select
              value={selectedPathogen}
              onChange={(e) => setSelectedPathogen(e.target.value)}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all duration-300"
            >
              <option value="all">All Pathogens</option>
              <option value="mrsa">MRSA</option>
              <option value="vre">VRE</option>
              <option value="esbl">ESBL</option>
            </select>

            <div className="flex items-center space-x-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-indigo-500/5 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-indigo-500/5 transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.title} {...metric} index={index} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Effectiveness Comparison */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChartCard
            title="Antibiotic Effectiveness Comparison"
            subtitle="Success rates across different antibiotics"
            actions={
              <div className="flex items-center space-x-2">
                <Button
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                  className="transition-all duration-300"
                >
                  <BarChart3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={chartType === 'radar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('radar')}
                  className="transition-all duration-300"
                >
                  <Target className="w-4 h-4" />
                </Button>
              </div>
            }
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={effectivenessData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis 
                      dataKey="drug" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="effectiveness" 
                      name="Effectiveness %" 
                      fill="url(#effectivenessGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="effectivenessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                ) : (
                  <RadarChart data={effectivenessData.slice(0, 6)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="drug" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="Effectiveness"
                      dataKey="effectiveness"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                )}
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>

        {/* Treatment Outcomes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ChartCard
            title="Patient Treatment Outcomes"
            subtitle="Distribution of treatment results"
            actions={
              <Badge className="bg-emerald-500/10 text-emerald-700 border-0">
                Last 30 days
              </Badge>
            }
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={patientOutcomes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {patientOutcomes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>

        {/* Effectiveness Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ChartCard
            title="Effectiveness Trends Over Time"
            subtitle="Monthly effectiveness rates for key antibiotics"
            actions={
              <div className="flex items-center space-x-2">
                <LineChartIcon className="w-4 h-4 text-indigo-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">6 months</span>
              </div>
            }
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id="vancomycinGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="linezolidGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="amoxicillinGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[75, 100]} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="vancomycin"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#vancomycinGradient)"
                    name="Vancomycin"
                  />
                  <Area
                    type="monotone"
                    dataKey="linezolid"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#linezolidGradient)"
                    name="Linezolid"
                  />
                  <Area
                    type="monotone"
                    dataKey="amoxicillin"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#amoxicillinGradient)"
                    name="Amoxicillin"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>

        {/* Resistance Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ChartCard
            title="Resistance Monitoring"
            subtitle="Current susceptibility patterns by pathogen"
            actions={
              <Button
                variant="outline"
                size="sm"
                className="bg-white/60 hover:bg-red-50 border-red-200 text-red-700 transition-all duration-300"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                View Alerts
              </Button>
            }
          >
            <div className="space-y-4">
              {resistancePatterns.map((pattern, index) => (
                <motion.div
                  key={pattern.pathogen}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-medical-primary/10 to-medical-accent/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-medical-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {pattern.pathogen}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {pattern.susceptibility}% susceptible
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${pattern.susceptibility}%` }}
                      />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      pattern.trend > 0 
                        ? 'text-red-600' 
                        : pattern.trend < 0 
                        ? 'text-emerald-600' 
                        : 'text-gray-600'
                    }`}>
                      {pattern.trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{Math.abs(pattern.trend)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>
        </motion.div>
      </div>
    </div>
  );
};
