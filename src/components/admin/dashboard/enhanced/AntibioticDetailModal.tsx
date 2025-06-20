
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Users,
  FileText,
  Shield,
  Target,
  Zap,
  BookOpen,
  MapPin,
  Download,
  Share2
} from 'lucide-react';
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
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

interface AntibioticDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  antibiotic: {
    name: string;
    class: string;
    category: string;
  };
}

const mockDetailedData = {
  'Amoxicillin': {
    overview: {
      totalPrescriptions: 2847,
      successRate: 87.3,
      resistanceRate: 14.2,
      avgTreatmentDays: 7.4,
      costEffectiveness: 'High',
      safetyProfile: 'Excellent'
    },
    prescriptionTrends: [
      { month: 'Jan', prescriptions: 245, success: 85, resistance: 12 },
      { month: 'Feb', prescriptions: 267, success: 88, resistance: 13 },
      { month: 'Mar', prescriptions: 289, success: 89, resistance: 14 },
      { month: 'Apr', prescriptions: 234, success: 86, resistance: 15 },
      { month: 'May', prescriptions: 298, success: 90, resistance: 13 },
      { month: 'Jun', prescriptions: 312, success: 88, resistance: 14 }
    ],
    resistancePatterns: [
      { pathogen: 'S. pneumoniae', resistance: 15, trend: 'stable' },
      { pathogen: 'H. influenzae', resistance: 8, trend: 'decreasing' },
      { pathogen: 'E. coli', resistance: 22, trend: 'increasing' },
      { pathogen: 'S. pyogenes', resistance: 3, trend: 'stable' }
    ],
    regionalData: [
      { region: 'Sarajevo', usage: 45, resistance: 16 },
      { region: 'Banja Luka', usage: 32, resistance: 12 },
      { region: 'Tuzla', usage: 28, resistance: 14 },
      { region: 'Mostar', usage: 19, resistance: 18 }
    ],
    safetyData: {
      adverseEvents: {
        mild: 127,
        moderate: 23,
        severe: 3
      },
      allergicReactions: 8,
      drugInteractions: 12,
      contraindications: ['Penicillin allergy', 'Infectious mononucleosis']
    },
    clinicalGuidelines: [
      {
        source: 'IDSA 2024',
        indication: 'Community-acquired pneumonia',
        recommendation: 'First-line therapy for outpatient treatment',
        evidenceLevel: 'A'
      },
      {
        source: 'CDC Guidelines',
        indication: 'Acute otitis media',
        recommendation: 'Preferred oral antibiotic',
        evidenceLevel: 'A'
      }
    ]
  }
};

export const AntibioticDetailModal: React.FC<AntibioticDetailModalProps> = ({
  isOpen,
  onClose,
  antibiotic
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const data = mockDetailedData[antibiotic.name as keyof typeof mockDetailedData] || mockDetailedData['Amoxicillin'];

  const MetricCard = ({ title, value, subtitle, trend, icon: Icon, color }: any) => (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1">
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : trend === 'down' ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
          ) : null}
          <span className={`text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {trend === 'up' ? 'Trending up' : trend === 'down' ? 'Trending down' : 'Stable'}
          </span>
        </div>
      )}
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            {antibiotic.name} - Comprehensive Analysis
            <Badge variant="outline" className="ml-2">{antibiotic.class}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="resistance">Resistance</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="regional">Regional</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricCard
                  title="Total Prescriptions"
                  value={data.overview.totalPrescriptions.toLocaleString()}
                  subtitle="Last 6 months"
                  trend="up"
                  icon={FileText}
                  color="bg-blue-500"
                />
                <MetricCard
                  title="Success Rate"
                  value={`${data.overview.successRate}%`}
                  subtitle="Treatment effectiveness"
                  trend="up"
                  icon={CheckCircle}
                  color="bg-green-500"
                />
                <MetricCard
                  title="Resistance Rate"
                  value={`${data.overview.resistanceRate}%`}
                  subtitle="Across all pathogens"
                  trend="stable"
                  icon={Shield}
                  color="bg-orange-500"
                />
                <MetricCard
                  title="Avg Treatment Duration"
                  value={`${data.overview.avgTreatmentDays} days`}
                  subtitle="Mean duration"
                  icon={Clock}
                  color="bg-purple-500"
                />
                <MetricCard
                  title="Cost Effectiveness"
                  value={data.overview.costEffectiveness}
                  subtitle="Economic rating"
                  icon={Target}
                  color="bg-indigo-500"
                />
                <MetricCard
                  title="Safety Profile"
                  value={data.overview.safetyProfile}
                  subtitle="Overall safety"
                  icon={Zap}
                  color="bg-teal-500"
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Analysis
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Guidelines
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prescription Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.prescriptionTrends}>
                      <defs>
                        <linearGradient id="colorPrescriptions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="prescriptions" 
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#colorPrescriptions)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Success Rate Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={data.prescriptionTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resistance Rate Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={data.prescriptionTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="resistance" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resistance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resistance Patterns by Pathogen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.resistancePatterns.map((pattern, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{pattern.pathogen}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">{pattern.resistance}%</span>
                              {pattern.trend === 'increasing' && (
                                <TrendingUp className="h-4 w-4 text-red-500" />
                              )}
                              {pattern.trend === 'decreasing' && (
                                <TrendingDown className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          </div>
                          <Progress value={pattern.resistance} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="safety" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Adverse Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Mild Reactions</span>
                        <Badge variant="secondary">{data.safetyData.adverseEvents.mild}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Moderate Reactions</span>
                        <Badge variant="outline">{data.safetyData.adverseEvents.moderate}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Severe Reactions</span>
                        <Badge variant="destructive">{data.safetyData.adverseEvents.severe}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contraindications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {data.safetyData.contraindications.map((contraindication, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{contraindication}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-6">
              <div className="space-y-4">
                {data.clinicalGuidelines.map((guideline, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{guideline.source}</Badge>
                            <Badge variant={guideline.evidenceLevel === 'A' ? 'default' : 'secondary'}>
                              Level {guideline.evidenceLevel}
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-1">{guideline.indication}</h4>
                          <p className="text-sm text-gray-600">{guideline.recommendation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Usage and Resistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.regionalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#3b82f6" name="Usage %" />
                      <Bar dataKey="resistance" fill="#ef4444" name="Resistance %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
