
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Shield,
  Users,
  Clock,
  Pill,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicalAntibioticData } from './ClinicalAntibioticData';

interface ClinicalAntibioticCardProps {
  antibiotic: ClinicalAntibioticData;
  onViewDetails: (antibiotic: ClinicalAntibioticData) => void;
}

export const ClinicalAntibioticCard: React.FC<ClinicalAntibioticCardProps> = ({
  antibiotic,
  onViewDetails
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getEffectivenessColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-blue-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSafetyColor = (profile: string) => {
    switch (profile) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'moderate': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-l-4 border-l-blue-500 bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">{antibiotic.name}</h3>
                {getTrendIcon(antibiotic.trend)}
              </div>
              <p className="text-sm text-gray-600 mb-2">{antibiotic.mechanism}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs font-medium">
                  {antibiotic.class}
                </Badge>
                <Badge className={`text-xs font-medium ${getRiskColor(antibiotic.riskLevel)}`}>
                  {antibiotic.riskLevel.toUpperCase()} RISK
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Cat {antibiotic.pregnancyCategory}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Key Clinical Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Prescriptions</span>
              </div>
              <p className="text-lg font-bold text-blue-900">{antibiotic.prescriptions.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">Success Rate</span>
              </div>
              <p className={`text-lg font-bold ${getEffectivenessColor(antibiotic.successRate)}`}>
                {antibiotic.successRate}%
              </p>
            </div>
          </div>

          {/* Effectiveness Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-700">Clinical Effectiveness</span>
              <span className="text-xs font-bold text-gray-900">{antibiotic.successRate}%</span>
            </div>
            <Progress 
              value={antibiotic.successRate} 
              className="h-2"
            />
          </div>

          {/* Resistance Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-700">Resistance Rate</span>
              <span className="text-xs font-bold text-red-700">{antibiotic.resistanceRate}%</span>
            </div>
            <Progress 
              value={antibiotic.resistanceRate} 
              className="h-2"
            />
          </div>

          {/* Clinical Profile */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-gray-500" />
              <span className="text-gray-600">Safety:</span>
              <span className={`font-medium ${getSafetyColor(antibiotic.safetyProfile)}`}>
                {antibiotic.safetyProfile}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-600">Cost:</span>
              <span className={`font-medium ${getSafetyColor(antibiotic.costEffectiveness)}`}>
                {antibiotic.costEffectiveness}
              </span>
            </div>
          </div>

          {/* Spectrum Info */}
          <div className="p-2 bg-gray-50 rounded text-xs">
            <span className="font-medium text-gray-700">Spectrum: </span>
            <span className="text-gray-600">{antibiotic.spectrum}</span>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onViewDetails(antibiotic)}
            className="w-full mt-4"
            variant="outline"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Clinical Details
          </Button>

          {/* Last Updated */}
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 pt-2 border-t">
            <Clock className="h-3 w-3" />
            <span>Updated {antibiotic.lastUpdated}</span>
          </div>
        </CardContent>

        {/* Clinical Alert Overlay */}
        {antibiotic.riskLevel === 'high' && (
          <div className="absolute top-2 right-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
        )}
      </Card>
    </motion.div>
  );
};
