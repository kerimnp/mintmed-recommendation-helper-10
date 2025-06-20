
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
  MoreHorizontal,
  Shield,
  Users,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AntibioticSmartCardProps {
  antibiotic: {
    name: string;
    class: string;
    category: string;
    prescriptions: number;
    successRate: number;
    resistanceRate: number;
    trend: 'up' | 'down' | 'stable';
    riskLevel: 'low' | 'medium' | 'high';
    lastUpdated: string;
  };
  onViewDetails: (antibiotic: any) => void;
}

export const AntibioticSmartCard: React.FC<AntibioticSmartCardProps> = ({
  antibiotic,
  onViewDetails
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{antibiotic.name}</h3>
                {getTrendIcon(antibiotic.trend)}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {antibiotic.class}
                </Badge>
                <Badge className={`text-xs ${getRiskColor(antibiotic.riskLevel)}`}>
                  {antibiotic.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(antibiotic)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-gray-500">Prescriptions</span>
              </div>
              <p className="text-sm font-semibold">{antibiotic.prescriptions.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-xs text-gray-500">Success</span>
              </div>
              <p className="text-sm font-semibold">{antibiotic.successRate}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="h-3 w-3 text-orange-500" />
                <span className="text-xs text-gray-500">Resistance</span>
              </div>
              <p className="text-sm font-semibold">{antibiotic.resistanceRate}%</p>
            </div>
          </div>

          {/* Success Rate Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Treatment Success Rate</span>
              <span className="text-xs font-medium">{antibiotic.successRate}%</span>
            </div>
            <Progress value={antibiotic.successRate} className="h-2" />
          </div>

          {/* Resistance Rate Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Resistance Rate</span>
              <span className="text-xs font-medium">{antibiotic.resistanceRate}%</span>
            </div>
            <Progress value={antibiotic.resistanceRate} className="h-2 bg-red-100" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(antibiotic)}
              className="flex-1"
            >
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-1 text-xs text-gray-500 pt-2 border-t">
            <Clock className="h-3 w-3" />
            <span>Updated {antibiotic.lastUpdated}</span>
          </div>
        </CardContent>

        {/* Hover overlay */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-blue-50/50 rounded-lg pointer-events-none"
          />
        )}
      </Card>
    </motion.div>
  );
};
