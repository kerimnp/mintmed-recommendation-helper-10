
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const designSystem = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    medical: '#1e40af'
  },
  gradients: {
    primary: 'from-blue-500 to-blue-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-amber-500 to-amber-600',
    danger: 'from-red-500 to-red-600',
    medical: 'from-indigo-500 to-indigo-600'
  },
  shadows: {
    card: 'shadow-sm hover:shadow-lg transition-shadow duration-200',
    modal: 'shadow-xl'
  }
};

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon: React.ReactNode;
  gradient: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend = 'stable',
  trendValue,
  icon,
  gradient
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />;
      case 'down': return <TrendingDown className="h-4 w-4" />;
      default: return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className={`bg-gradient-to-r ${gradient} text-white ${designSystem.shadows.card}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-white/80 text-xs">{subtitle}</p>
              {trendValue && (
                <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span className="text-xs">{trendValue}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-white/60">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EnhancedBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'medical';
  size?: 'sm' | 'default' | 'lg';
}

export const EnhancedBadge: React.FC<EnhancedBadgeProps> = ({
  children,
  variant = 'default',
  size = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'warning':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'danger':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medical':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-4 py-2 text-sm';
      default:
        return 'px-2.5 py-1 text-xs';
    }
  };

  return (
    <Badge className={`${getVariantClasses()} ${getSizeClasses()} font-medium rounded-full`}>
      {children}
    </Badge>
  );
};
