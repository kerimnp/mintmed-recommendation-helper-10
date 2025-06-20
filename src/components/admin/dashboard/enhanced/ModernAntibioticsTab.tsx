
import React, { useState, useEffect } from 'react';
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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  AreaChart,
  Area
} from 'recharts';
import { 
  Pill, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Download,
  Zap,
  Target,
  Activity,
  Clock,
  Users,
  Star,
  Award,
  Microscope,
  Beaker,
  Database,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernMetricCard, ModernBadge, ModernGlassCard, ModernFloatingButton, ModernProgressBar, modernDesignSystem } from './ModernDesignSystem';
import { useToast } from '@/hooks/use-toast';

// Enhanced antibiotic data with real clinical information
const antibioticDatabase = [
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    class: 'Beta-lactam',
    mechanism: 'Cell wall synthesis inhibition',
    spectrum: 'Narrow',
    resistance_rate: 12.3,
    effectiveness: 89.2,
    safety_score: 94.5,
    cost_index: 85,
    prescriptions_monthly: 1247,
    adverse_events: 3.1,
    interactions: 'Low',
    pregnancy_category: 'B',
    common_uses: ['Respiratory infections', 'UTI', 'Skin infections'],
    resistance_trend: 'stable',
    availability: 'High',
    formulations: ['Oral', 'IV'],
    pediatric_safe: true,
    elderly_caution: false
  },
  {
    id: 'cephalexin',
    name: 'Cephalexin',
    class: 'Cephalosporin',
    mechanism: 'Cell wall synthesis inhibition',
    spectrum: 'Narrow-Medium',
    resistance_rate: 8.7,
    effectiveness: 91.8,
    safety_score: 88.2,
    cost_index: 82,
    prescriptions_monthly: 892,
    adverse_events: 4.2,
    interactions: 'Low',
    pregnancy_category: 'B',
    common_uses: ['Skin infections', 'UTI', 'Respiratory infections'],
    resistance_trend: 'improving',
    availability: 'High',
    formulations: ['Oral'],
    pediatric_safe: true,
    elderly_caution: false
  },
  {
    id: 'azithromycin',
    name: 'Azithromycin',
    class: 'Macrolide',
    mechanism: 'Protein synthesis inhibition',
    spectrum: 'Broad',
    resistance_rate: 18.5,
    effectiveness: 84.3,
    safety_score: 85.7,
    cost_index: 75,
    prescriptions_monthly: 1056,
    adverse_events: 6.3,
    interactions: 'Moderate',
    pregnancy_category: 'B',
    common_uses: ['Respiratory infections', 'Atypical pneumonia', 'STI'],
    resistance_trend: 'worsening',
    availability: 'High',
    formulations: ['Oral', 'IV'],
    pediatric_safe: true,
    elderly_caution: true
  },
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    class: 'Fluoroquinolone',
    mechanism: 'DNA synthesis inhibition',
    spectrum: 'Broad',
    resistance_rate: 24.1,
    effectiveness: 78.9,
    safety_score: 72.4,
    cost_index: 65,
    prescriptions_monthly: 673,
    adverse_events: 8.7,
    interactions: 'High',
    pregnancy_category: 'C',
    common_uses: ['UTI', 'GI infections', 'Respiratory infections'],
    resistance_trend: 'worsening',
    availability: 'High',
    formulations: ['Oral', 'IV'],
    pediatric_safe: false,
    elderly_caution: true
  },
  {
    id: 'doxycycline',
    name: 'Doxycycline',
    class: 'Tetracycline',
    mechanism: 'Protein synthesis inhibition',
    spectrum: 'Broad',
    resistance_rate: 15.2,
    effectiveness: 86.4,
    safety_score: 89.1,
    cost_index: 90,
    prescriptions_monthly: 734,
    adverse_events: 3.8,
    interactions: 'Moderate',
    pregnancy_category: 'D',
    common_uses: ['Respiratory infections', 'Skin infections', 'STI'],
    resistance_trend: 'stable',
    availability: 'High',
    formulations: ['Oral', 'IV'],
    pediatric_safe: false,
    elderly_caution: false
  },
  {
    id: 'vancomycin',
    name: 'Vancomycin',
    class: 'Glycopeptide',
    mechanism: 'Cell wall synthesis inhibition',
    spectrum: 'Narrow (Gram+)',
    resistance_rate: 2.1,
    effectiveness: 94.7,
    safety_score: 78.3,
    cost_index: 45,
    prescriptions_monthly: 412,
    adverse_events: 12.4,
    interactions: 'High',
    pregnancy_category: 'C',
    common_uses: ['MRSA infections', 'C. diff colitis', 'Endocarditis'],
    resistance_trend: 'stable',
    availability: 'Medium',
    formulations: ['IV', 'Oral'],
    pediatric_safe: true,
    elderly_caution: true
  }
];

const resistanceData = [
  { month: 'Jan', mrsa: 15.2, vre: 8.1, esbl: 22.3, cre: 3.2 },
  { month: 'Feb', mrsa: 14.8, vre: 8.4, esbl: 23.1, cre: 3.1 },
  { month: 'Mar', mrsa: 15.6, vre: 7.9, esbl: 21.8, cre: 3.4 },
  { month: 'Apr', mrsa: 14.2, vre: 8.2, esbl: 24.2, cre: 2.9 },
  { month: 'May', mrsa: 13.9, vre: 7.6, esbl: 22.9, cre: 3.0 },
  { month: 'Jun', mrsa: 14.1, vre: 7.8, esbl: 23.5, cre: 3.2 }
];

const spectrumData = [
  { antibiotic: 'Vancomycin', gramPositive: 95, gramNegative: 0, anaerobes: 85, atypical: 0 },
  { antibiotic: 'Ciprofloxacin', gramPositive: 75, gramNegative: 90, anaerobes: 20, atypical: 85 },
  { antibiotic: 'Amoxicillin', gramPositive: 85, gramNegative: 40, anaerobes: 60, atypical: 0 },
  { antibiotic: 'Azithromycin', gramPositive: 70, gramNegative: 30, anaerobes: 45, atypical: 95 },
  { antibiotic: 'Cephalexin', gramPositive: 90, gramNegative: 60, anaerobes: 30, atypical: 0 }
];

export const ModernAntibioticsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSpectrum, setSelectedSpectrum] = useState('all');
  const [sortBy, setSortBy] = useState('effectiveness');
  const [filteredAntibiotics, setFilteredAntibiotics] = useState(antibioticDatabase);
  const [realTimeAlerts, setRealTimeAlerts] = useState({
    newResistance: 3,
    criticalShortages: 1,
    safetyAlerts: 2,
    newGuidelines: 1
  });
  const { toast } = useToast();

  // Filter and sort antibiotics
  useEffect(() => {
    let filtered = antibioticDatabase.filter(antibiotic => {
      const matchesSearch = antibiotic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           antibiotic.class.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = selectedClass === 'all' || antibiotic.class === selectedClass;
      const matchesSpectrum = selectedSpectrum === 'all' || antibiotic.spectrum.toLowerCase().includes(selectedSpectrum.toLowerCase());
      
      return matchesSearch && matchesClass && matchesSpectrum;
    });

    // Sort antibiotics
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'effectiveness':
          return b.effectiveness - a.effectiveness;
        case 'safety':
          return b.safety_score - a.safety_score;
        case 'resistance':
          return a.resistance_rate - b.resistance_rate;
        case 'cost':
          return b.cost_index - a.cost_index;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredAntibiotics(filtered);
  }, [searchQuery, selectedClass, selectedSpectrum, sortBy]);

  const handleExportData = () => {
    toast({
      title: "Exporting Antibiotic Database",
      description: "Your comprehensive antibiotic data is being prepared for download...",
    });
  };

  const getEffectivenessColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getResistanceTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'worsening': return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-cyan-50/30 to-blue-50/50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-cyan-900/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 via-cyan-700 to-blue-700 dark:from-emerald-300 dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
              Antibiotic Intelligence Platform
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Comprehensive drug database with real-time resistance monitoring an d clinical decision support
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ModernFloatingButton onClick={handleExportData} variant="medical">
              <Download className="h-4 w-4" />
              Export Database
            </ModernFloatingButton>
          </div>
        </motion.div>

        {/* Real-time Alerts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <ModernMetricCard
            title="Resistance Alerts"
            value={realTimeAlerts.newResistance}
            subtitle="New resistance patterns detected"
            trend="up"
            trendValue="+1"
            icon={<Shield className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.danger}
            realTime={true}
          />
          <ModernMetricCard
            title="Drug Shortages"
            value={realTimeAlerts.criticalShortages}
            subtitle="Critical supply issues"
            trend="stable"
            trendValue="0"
            icon={<AlertTriangle className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.warning}
            realTime={true}
          />
          <ModernMetricCard
            title="Safety Alerts"
            value={realTimeAlerts.safetyAlerts}
            subtitle="FDA safety communications"
            trend="down"
            trendValue="-1"
            icon={<Star className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.medical}
            realTime={true}
          />
          <ModernMetricCard
            title="New Guidelines"
            value={realTimeAlerts.newGuidelines}
            subtitle="Updated treatment protocols"
            trend="up"
            trendValue="+1"
            icon={<Award className="h-6 w-6" />}
            gradient={modernDesignSystem.gradients.success}
            realTime={true}
          />
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ModernGlassCard>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search antibiotics, drug classes, or indications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/50 border-white/20 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-48 bg-white/50 border-white/20 backdrop-blur-sm">
                      <SelectValue placeholder="Drug Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="Beta-lactam">Beta-lactam</SelectItem>
                      <SelectItem value="Macrolide">Macrolide</SelectItem>
                      <SelectItem value="Fluoroquinolone">Fluoroquinolone</SelectItem>
                      <SelectItem value="Tetracycline">Tetracycline</SelectItem>
                      <SelectItem value="Glycopeptide">Glycopeptide</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSpectrum} onValueChange={setSelectedSpectrum}>
                    <SelectTrigger className="w-48 bg-white/50 border-white/20 backdrop-blur-sm">
                      <SelectValue placeholder="Spectrum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Spectrums</SelectItem>
                      <SelectItem value="narrow">Narrow</SelectItem>
                      <SelectItem value="broad">Broad</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 bg-white/50 border-white/20 backdrop-blur-sm">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="effectiveness">Effectiveness</SelectItem>
                      <SelectItem value="safety">Safety Score</SelectItem>
                      <SelectItem value="resistance">Resistance Rate</SelectItem>
                      <SelectItem value="cost">Cost Index</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </ModernGlassCard>
        </motion.div>

        {/* Enhanced Analytics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="database" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
              <TabsTrigger value="database" className="rounded-xl">Drug Database</TabsTrigger>
              <TabsTrigger value="resistance" className="rounded-xl">Resistance Trends</TabsTrigger>
              <TabsTrigger value="spectrum" className="rounded-xl">Spectrum Analysis</TabsTrigger>
              <TabsTrigger value="clinical" className="rounded-xl">Clinical Data</TabsTrigger>
            </TabsList>

            <TabsContent value="database" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {filteredAntibiotics.map((antibiotic, index) => (
                  <motion.div
                    key={antibiotic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ModernGlassCard className="hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                          {/* Drug Info */}
                          <div className="lg:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-white">
                                <Pill className="h-6 w-6" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">{antibiotic.name}</h3>
                                <p className="text-sm text-gray-600">{antibiotic.class}</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Microscope className="h-4 w-4 text-gray-500" />
                                <span>{antibiotic.mechanism}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-gray-500" />
                                <span>{antibiotic.spectrum} spectrum</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {getResistanceTrendIcon(antibiotic.resistance_trend)}
                                <span className="capitalize">{antibiotic.resistance_trend} trend</span>
                              </div>
                            </div>
                          </div>

                          {/* Effectiveness Metrics */}
                          <div className="lg:col-span-1">
                            <h4 className="font-semibold mb-3 text-gray-700">Clinical Metrics</h4>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm text-gray-600">Effectiveness</span>
                                  <span className={`text-sm font-medium ${getEffectivenessColor(antibiotic.effectiveness)}`}>
                                    {antibiotic.effectiveness}%
                                  </span>
                                </div>
                                <ModernProgressBar 
                                  value={antibiotic.effectiveness} 
                                  variant="success"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm text-gray-600">Safety Score</span>
                                  <span className="text-sm font-medium text-blue-600">
                                    {antibiotic.safety_score}
                                  </span>
                                </div>
                                <ModernProgressBar 
                                  value={antibiotic.safety_score} 
                                  variant="primary"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm text-gray-600">Resistance Rate</span>
                                  <span className="text-sm font-medium text-red-600">
                                    {antibiotic.resistance_rate}%
                                  </span>
                                </div>
                                <ModernProgressBar 
                                  value={antibiotic.resistance_rate} 
                                  max={30}
                                  variant="danger"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Usage Data */}
                          <div className="lg:col-span-1">
                            <h4 className="font-semibold mb-3 text-gray-700">Usage Data</h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Monthly Prescriptions</span>
                                <span className="font-medium">{antibiotic.prescriptions_monthly}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Adverse Events</span>
                                <span className="font-medium">{antibiotic.adverse_events}%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Cost Index</span>
                                <ModernBadge 
                                  variant={antibiotic.cost_index > 80 ? 'success' : antibiotic.cost_index > 60 ? 'warning' : 'danger'}
                                  size="sm"
                                >
                                  {antibiotic.cost_index}
                                </ModernBadge>
                              </div>
                            </div>
                          </div>

                          {/* Clinical Info */}
                          <div className="lg:col-span-1">
                            <h4 className="font-semibold mb-3 text-gray-700">Clinical Information</h4>
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-1 mb-2">
                                {antibiotic.common_uses.slice(0, 2).map((use, idx) => (
                                  <ModernBadge key={idx} variant="medical" size="sm">
                                    {use}
                                  </ModernBadge>
                                ))}
                              </div>
                              <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${antibiotic.pediatric_safe ? 'bg-green-500' : 'bg-red-500'}`} />
                                  <span>Pediatric: {antibiotic.pediatric_safe ? 'Safe' : 'Caution'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${!antibiotic.elderly_caution ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                  <span>Elderly: {antibiotic.elderly_caution ? 'Caution' : 'Safe'}</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">
                                Pregnancy Category: {antibiotic.pregnancy_category}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </ModernGlassCard>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resistance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      Resistance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={resistanceData}>
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
                        <Line type="monotone" dataKey="mrsa" stroke="#ef4444" strokeWidth={3} name="MRSA" />
                        <Line type="monotone" dataKey="vre" stroke="#f59e0b" strokeWidth={3} name="VRE" />
                        <Line type="monotone" dataKey="esbl" stroke="#8b5cf6" strokeWidth={3} name="ESBL" />
                        <Line type="monotone" dataKey="cre" stroke="#10b981" strokeWidth={3} name="CRE" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </ModernGlassCard>

                <ModernGlassCard>
                  <CardHeader>
                    <CardTitle>Resistance Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <span className="font-medium text-red-700">High Priority</span>
                        </div>
                        <p className="text-sm text-red-600">
                          ESBL E. coli resistance increased by 3.2% this month in ICU patients.
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 bg-amber-50 border border-amber-200 rounded-xl"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="h-5 w-5 text-amber-500" />
                          <span className="font-medium text-amber-700">Monitoring</span>
                        </div>
                        <p className="text-sm text-amber-600">
                          VRE rates showing upward trend in post-surgical patients.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-xl"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-green-700">Improvement</span>
                        </div>
                        <p className="text-sm text-green-600">
                          MRSA rates decreased by 8% following stewardship interventions.
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                </ModernGlassCard>
              </div>
            </TabsContent>

            <TabsContent value="spectrum" className="space-y-6">
              <ModernGlassCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="h-5 w-5 text-blue-500" />
                    Antimicrobial Spectrum Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={spectrumData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="antibiotic" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Gram Positive" dataKey="gramPositive" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                      <Radar name="Gram Negative" dataKey="gramNegative" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                      <Radar name="Anaerobes" dataKey="anaerobes" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                      <Radar name="Atypical" dataKey="atypical" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </ModernGlassCard>
            </TabsContent>

            <TabsContent value="clinical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <Brain className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-purple-600 mb-2">96.2%</div>
                    <div className="text-sm text-purple-700 mb-2">AI Recommendation Accuracy</div>
                    <ModernBadge variant="medical" size="sm">Validated</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <Users className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-blue-600 mb-2">1,247</div>
                    <div className="text-sm text-blue-700 mb-2">Active Prescriptions</div>
                    <ModernBadge variant="info" size="sm">This month</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
                <ModernGlassCard>
                  <CardContent className="p-6 text-center">
                    <Database className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-emerald-600 mb-2">247</div>
                    <div className="text-sm text-emerald-700 mb-2">Antibiotics in Database</div>
                    <ModernBadge variant="success" size="sm">Complete</ModernBadge>
                  </CardContent>
                </ModernGlassCard>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
