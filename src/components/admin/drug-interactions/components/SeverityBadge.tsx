
import React from 'react';
import { Badge } from '@/components/ui/badge';

type SeverityType = 'severe' | 'moderate' | 'mild' | 'unknown';

interface SeverityBadgeProps {
  severity: SeverityType;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  switch(severity) {
    case 'severe':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900/50">
          Severe
        </Badge>
      );
    case 'moderate':
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900/50">
          Moderate
        </Badge>
      );
    case 'mild':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900/50">
          Mild
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-900/50">
          Unknown
        </Badge>
      );
  }
};
