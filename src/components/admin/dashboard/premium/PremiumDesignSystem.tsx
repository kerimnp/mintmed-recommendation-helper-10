
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Premium Glass Card Component
interface PremiumGlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  gradient?: 'primary' | 'secondary' | 'accent' | 'medical';
}

export const PremiumGlassCard: React.FC<PremiumGlassCardProps> = ({
  children,
  className,
  blur = 'md',
  gradient = 'primary'
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  const gradientClasses = {
    primary: 'bg-gradient-to-br from-white/90 via-white/70 to-blue-50/80 dark:from-slate-900/90 dark:via-slate-800/70 dark:to-blue-900/20',
    secondary: 'bg-gradient-to-br from-white/95 via-purple-50/80 to-pink-50/70 dark:from-slate-900/95 dark:via-purple-900/20 dark:to-pink-900/10',
    accent: 'bg-gradient-to-br from-emerald-50/90 via-white/80 to-teal-50/70 dark:from-emerald-900/20 dark:via-slate-800/80 dark:to-teal-900/10',
    medical: 'bg-gradient-to-br from-medical-primary/5 via-white/95 to-blue-50/80 dark:from-medical-primary/10 dark:via-slate-900/95 dark:to-blue-900/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border border-white/20 shadow-2xl",
        blurClasses[blur],
        gradientClasses[gradient],
        "dark:border-slate-700/50 dark:shadow-black/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Premium Metric Card
interface PremiumMetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description?: string;
  trend?: number[];
}

export const PremiumMetricCard: React.FC<PremiumMetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  description,
  trend
}) => {
  const changeColors = {
    positive: 'text-emerald-600 dark:text-emerald-400',
    negative: 'text-red-500 dark:text-red-400',
    neutral: 'text-slate-600 dark:text-slate-400'
  };

  return (
    <PremiumGlassCard className="p-6 hover:shadow-3xl transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-medical-primary/10 to-blue-500/10 group-hover:from-medical-primary/20 group-hover:to-blue-500/20 transition-all duration-300">
          <div className="text-medical-primary dark:text-blue-400">
            {icon}
          </div>
        </div>
        {trend && (
          <div className="h-8 w-16 opacity-70">
            <svg viewBox="0 0 64 32" className="w-full h-full">
              <polyline
                points={trend.map((val, i) => `${(i / (trend.length - 1)) * 64},${32 - (val / Math.max(...trend)) * 32}`).join(' ')}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-medical-primary dark:text-blue-400"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 tracking-wide">
          {title}
        </h3>
        <div className="text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </div>
        {change && (
          <p className={cn("text-sm font-medium", changeColors[changeType])}>
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </PremiumGlassCard>
  );
};

// Premium Status Indicator
interface PremiumStatusProps {
  status: 'excellent' | 'good' | 'warning' | 'critical';
  label: string;
  value?: string;
}

export const PremiumStatus: React.FC<PremiumStatusProps> = ({ status, label, value }) => {
  const statusConfig = {
    excellent: {
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    good: {
      color: 'bg-blue-500',
      textColor: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    warning: {
      color: 'bg-amber-500',
      textColor: 'text-amber-700 dark:text-amber-300',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    critical: {
      color: 'bg-red-500',
      textColor: 'text-red-700 dark:text-red-300',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-xl", config.bgColor)}>
      <div className={cn("w-3 h-3 rounded-full", config.color)} />
      <div className="flex-1">
        <span className={cn("text-sm font-medium", config.textColor)}>{label}</span>
        {value && <span className="text-xs text-slate-500 ml-2">{value}</span>}
      </div>
    </div>
  );
};

// Premium Progress Ring
interface PremiumProgressRingProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  children?: React.ReactNode;
}

export const PremiumProgressRing: React.FC<PremiumProgressRingProps> = ({
  percentage,
  size = 'md',
  color = '#0066cc',
  children
}) => {
  const sizes = {
    sm: { outer: 60, inner: 40, stroke: 4 },
    md: { outer: 80, inner: 60, stroke: 6 },
    lg: { outer: 120, inner: 100, stroke: 8 }
  };

  const { outer, inner, stroke } = sizes[size];
  const radius = (outer - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={outer} height={outer} className="transform -rotate-90">
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          className="text-slate-200 dark:text-slate-700"
        />
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

// Premium Badge
interface PremiumBadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info' | 'premium';
  children: React.ReactNode;
  pulse?: boolean;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ variant, children, pulse }) => {
  const variants = {
    success: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25',
    error: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25',
    premium: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
  };

  return (
    <Badge
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full border-0",
        variants[variant],
        pulse && "animate-pulse"
      )}
    >
      {children}
    </Badge>
  );
};
