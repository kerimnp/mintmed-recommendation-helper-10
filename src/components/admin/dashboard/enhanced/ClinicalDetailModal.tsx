
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
  Pill,
  BookOpen,
  MapPin,
  Download,
  Share2,
  ExternalLink,
  Heart,
  Brain,
  Kidney
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
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { ClinicalAntibioticData } from './ClinicalAntibioticData';

interface ClinicalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  antibiotic: ClinicalAntibioticData;
}

export const ClinicalDetailModal: React.FC<ClinicalDetailModalProps> = ({
  isOpen,
  onClose,
  antibiotic
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSafetyIcon = (profile: string) => {
    switch (profile) {
      case 'excellent': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'good': return <Shield className="h-5 w-5 text-blue-500" />;
      case 'moderate': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'poor': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, color, trend }: any) => (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
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
          ) : (
            <Activity className="h-4 w-4 text-gray-500" />
          )}
          <span className="text-sm text-gray-600 capitalize">{trend} trend</span>
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
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
            {antibiotic.name} - Clinical Analysis
            <Badge variant="outline" className="ml-2">{antibiotic.class}</Badge>
            <Badge className={`ml-1 ${getRiskColor(antibiotic.riskLevel)}`}>
              {antibiotic.riskLevel.toUpperCase()} RISK
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="clinical">Clinical Use</TabsTrigger>
              <TabsTrigger value="resistance">Resistance</TabsTrigger>
              <TabsTrigger value="safety">Safety Profile</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="regional">Regional Data</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Total Prescriptions"
                  value={antibiotic.prescriptions.toLocaleString()}
                  subtitle="Last 6 months"
                  trend={antibiotic.trend}
                  icon={FileText}
                  color="bg-blue-500"
                />
                <MetricCard
                  title="Success Rate"
                  value={`${antibiotic.successRate}%`}
                  subtitle="Clinical effectiveness"
                  icon={CheckCircle}
                  color="bg-green-500"
                />
                <MetricCard
                  title="Resistance Rate"
                  value={`${antibiotic.resistanceRate}%`}
                  subtitle="Across all pathogens"
                  icon={Shield}
                  color="bg-orange-500"
                />
                <MetricCard
                  title="Safety Profile"
                  value={antibiotic.safetyProfile}
                  subtitle="Overall safety rating"
                  icon={Heart}
                  color="bg-purple-500"
                />
              </div>

              {/* Clinical Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Mechanism & Spectrum
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Mechanism: </span>
                      <span className="text-gray-900">{antibiotic.mechanism}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Spectrum: </span>
                      <span className="text-gray-900">{antibiotic.spectrum}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Category: </span>
                      <Badge variant="outline">{antibiotic.category}</Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Pregnancy: </span>
                      <Badge variant="secondary">Category {antibiotic.pregnancyCategory}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Clinical Effectiveness
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Success Rate</span>
                        <span className="text-sm font-bold">{antibiotic.successRate}%</span>
                      </div>
                      <Progress value={antibiotic.successRate} className="h-3" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Cost Effectiveness</span>
                        <Badge variant="outline" className="capitalize">
                          {antibiotic.costEffectiveness}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSafetyIcon(antibiotic.safetyProfile)}
                      <span className="text-sm">
                        <span className="font-medium">Safety: </span>
                        <span className="capitalize">{antibiotic.safetyProfile}</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Analysis
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Dosing Guide
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Clinical Guidelines
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clinical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Indications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {antibiotic.commonIndications.map((indication, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{indication}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monitoring Parameters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {antibiotic.monitoringParameters.map((parameter, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <Activity className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{parameter}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Dosing Adjustments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Kidney className="h-5 w-5 text-yellow-600" />
                      <div>
                        <span className="font-medium">Renal Adjustment</span>
                        <p className="text-sm text-gray-600">
                          {antibiotic.renalAdjustment ? 'Required' : 'Not required'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Heart className="h-5 w-5 text-orange-600" />
                      <div>
                        <span className="font-medium">Hepatic Adjustment</span>
                        <p className="text-sm text-gray-600">
                          {antibiotic.hepaticAdjustment ? 'Required' : 'Not required'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resistance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resistance Patterns by Organism</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {antibiotic.resistancePatterns.map((pattern, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{pattern.organism}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-gray-700">{pattern.resistance}%</span>
                              {pattern.trend === 'increasing' && (
                                <TrendingUp className="h-4 w-4 text-red-500" />
                              )}
                              {pattern.trend === 'decreasing' && (
                                <TrendingDown className="h-4 w-4 text-green-500" />
                              )}
                              {pattern.trend === 'stable' && (
                                <Activity className="h-4 w-4 text-gray-500" />
                              )}
                            </div>
                          </div>
                          <Progress value={pattern.resistance} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1 capitalize">
                            Trend: {pattern.trend}
                          </p>
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
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Contraindications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {antibiotic.contraindications.map((contraindication, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{contraindication}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Common Side Effects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {antibiotic.sideEffects.map((effect, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                          <Brain className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{effect}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Drug Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {antibiotic.drugInteractions.map((interaction, index) => (
                      <Badge key={index} variant="outline" className="justify-center p-2">
                        {interaction}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-6">
              <div className="space-y-4">
                {antibiotic.clinicalGuidelines.map((guideline, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="font-medium">
                              {guideline.source}
                            </Badge>
                            <Badge variant={guideline.evidenceLevel === 'A' ? 'default' : 'secondary'}>
                              Level {guideline.evidenceLevel} Evidence
                            </Badge>
                          </div>
                          <p className="font-medium text-gray-900 mb-1">Clinical Recommendation</p>
                          <p className="text-sm text-gray-700">{guideline.recommendation}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Regional Usage and Effectiveness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={antibiotic.regionalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#3b82f6" name="Usage %" />
                      <Bar dataKey="resistance" fill="#ef4444" name="Resistance %" />
                      <Bar dataKey="effectiveness" fill="#10b981" name="Effectiveness %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {antibiotic.regionalData.map((region, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">{region.region}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Usage</span>
                          <span className="font-medium">{region.usage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Resistance</span>
                          <span className="font-medium text-red-600">{region.resistance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Effectiveness</span>
                          <span className="font-medium text-green-600">{region.effectiveness}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
