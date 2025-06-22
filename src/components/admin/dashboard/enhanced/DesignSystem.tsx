
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const designSystem = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309'
    },
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c'
    },
    medical: {
      primary: '#0f4c75',
      secondary: '#3282b8',
      accent: '#bbe1fa',
      light: '#f8fafc'
    }
  },
  gradients: {
    primary: 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-600',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600',
    medical: 'bg-gradient-to-br from-medical-primary via-medical-secondary to-blue-600'
  },
  shadows: {
    soft: 'shadow-lg shadow-blue-500/10',
    medium: 'shadow-xl shadow-blue-500/20',
    strong: 'shadow-2xl shadow-blue-500/30'
  }
};

export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon?: React.ReactNode;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon, 
  gradient = designSystem.gradients.primary,
  size = 'md' 
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCardSize = () => {
    switch (size) {
      case 'sm': return 'p-4';
      case 'lg': return 'p-8';
      default: return 'p-6';
    }
  };

  return (
    <Card className={`${designSystem.shadows.soft} hover:${designSystem.shadows.medium} transition-all duration-300 transform hover:-translate-y-1 border-0`}>
      <CardContent className={getCardSize()}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </p>
              {trendValue && (
                <Badge variant="outline" className={`${getTrendColor()} border-current`}>
                  {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {icon && (
            <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center text-white shadow-lg`}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const EnhancedBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'medical';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}> = ({ children, variant = 'info', size = 'md', pulse = false }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
      case 'danger':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'medical':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-2 py-1 text-xs';
      case 'lg': return 'px-4 py-2 text-base';
      default: return 'px-3 py-1 text-sm';
    }
  };

  return (
    <span className={`
      inline-flex items-center rounded-full border font-medium
      ${getVariantClasses()}
      ${getSizeClasses()}
      ${pulse ? 'animate-pulse' : ''}
      transition-all duration-200
    `}>
      {children}
    </span>
  );
};
