
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Shield, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeverityBadgeProps {
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const config = {
    contraindicated: {
      icon: Shield,
      label: 'Contraindicated',
      classes: 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900/40'
    },
    major: {
      icon: AlertTriangle,
      label: 'Major',
      classes: 'bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-900/40'
    },
    moderate: {
      icon: AlertCircle,
      label: 'Moderate',
      classes: 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/40'
    },
    minor: {
      icon: Info,
      label: 'Minor',
      classes: 'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/40'
    }
  };

  const { icon: Icon, label, classes } = config[severity];

  return (
    <Badge variant="outline" className={cn("flex items-center gap-1.5 font-medium py-1.5 px-3 rounded-full shadow-sm", classes)}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
};
