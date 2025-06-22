
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  DollarSign,
  Eye,
  Beaker,
  Clock
} from 'lucide-react';
import { type EnhancedAntibioticData } from '@/services/antibioticService';

interface AntibioticCardProps {
  antibiotic: EnhancedAntibioticData;
  onClick: () => void;
}

export const AntibioticCard: React.FC<AntibioticCardProps> = ({ antibiotic, onClick }) => {
  const getResistanceBadgeColor = (resistance: number) => {
    if (resistance > 20) return 'destructive';
    if (resistance > 10) return 'default';
    return 'secondary';
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
              {antibiotic.name}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {antibiotic.category}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {antibiotic.featured && (
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            )}
            {antibiotic.trending && (
              <TrendingUp className="h-4 w-4 text-blue-500" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {antibiotic.effectiveness}%
            </div>
            <div className="text-xs text-green-600 dark:text-green-500">
              Effectiveness
            </div>
          </div>
          
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">
              {antibiotic.resistance}%
            </div>
            <div className="text-xs text-red-600 dark:text-red-500">
              Resistance
            </div>
          </div>
        </div>

        {/* Mechanism and Spectrum */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Beaker className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400 truncate">
              {antibiotic.mechanism}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400 truncate">
              {antibiotic.spectrum}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={getResistanceBadgeColor(antibiotic.resistance)}>
            {antibiotic.resistance > 20 ? 'High' : antibiotic.resistance > 10 ? 'Moderate' : 'Low'} Resistance
          </Badge>
          <Badge variant={getAvailabilityColor(antibiotic.availability)}>
            {antibiotic.availability} Availability
          </Badge>
        </div>

        {/* Cost and Half-life */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>${antibiotic.cost}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{antibiotic.halfLife}</span>
          </div>
        </div>

        {/* Warning indicators */}
        {antibiotic.warnings.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-xs text-amber-700 dark:text-amber-400">
              {antibiotic.warnings.length} contraindication{antibiotic.warnings.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* View Details Button */}
        <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
