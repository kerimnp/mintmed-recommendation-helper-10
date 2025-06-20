
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export const modernDesignSystem = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      900: '#0c4a6e'
    },
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      500: '#10b981',
      600: '#059669',
      700: '#047857'
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
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      light: '#ffeef8'
    },
    surface: {
      glass: 'rgba(255, 255, 255, 0.7)',
      glassDark: 'rgba(0, 0, 0, 0.7)',
      card: 'rgba(255, 255, 255, 0.9)',
      cardDark: 'rgba(17, 24, 39, 0.9)'
    }
  },
  gradients: {
    primary: 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600',
    success: 'bg-gradient-to-br from-emerald-400 to-green-600',
    warning: 'bg-gradient-to-br from-amber-400 to-orange-600',
    danger: 'bg-gradient-to-br from-red-400 to-rose-600',
    medical: 'bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500',
    glass: 'bg-gradient-to-br from-white/20 to-white/5',
    surface: 'bg-gradient-to-br from-gray-50/80 to-white/60'
  },
  shadows: {
    glass: 'shadow-xl shadow-black/10 backdrop-blur-md',
    card: 'shadow-lg shadow-black/5',
    floating: 'shadow-2xl shadow-black/20',
    inner: 'inset-0 shadow-inner shadow-black/10'
  },
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: "easeOut" }
    },
    slideIn: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
};

export const ModernMetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon?: React.ReactNode;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
  realTime?: boolean;
}> = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon, 
  gradient = modernDesignSystem.gradients.primary,
  size = 'md',
  realTime = false
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
      case 'down': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <motion.div
      initial={modernDesignSystem.animations.fadeIn.initial}
      animate={modernDesignSystem.animations.fadeIn.animate}
      transition={modernDesignSystem.animations.fadeIn.transition}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className={`${modernDesignSystem.shadows.glass} border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden relative group`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {title}
                </p>
                {realTime && (
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                )}
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {value}
                </h3>
                {trendValue && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendColor()}`}>
                    {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            {icon && (
              <div className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ModernBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'medical' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  glow?: boolean;
}> = ({ children, variant = 'info', size = 'md', pulse = false, glow = false }) => {
  const getVariantClasses = () => {
    const baseClasses = 'backdrop-blur-sm border-0 font-medium transition-all duration-300';
    switch (variant) {
      case 'success':
        return `${baseClasses} bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 ${glow ? 'shadow-lg shadow-emerald-500/25' : ''}`;
      case 'warning':
        return `${baseClasses} bg-amber-500/20 text-amber-700 dark:text-amber-300 ${glow ? 'shadow-lg shadow-amber-500/25' : ''}`;
      case 'danger':
        return `${baseClasses} bg-red-500/20 text-red-700 dark:text-red-300 ${glow ? 'shadow-lg shadow-red-500/25' : ''}`;
      case 'medical':
        return `${baseClasses} bg-purple-500/20 text-purple-700 dark:text-purple-300 ${glow ? 'shadow-lg shadow-purple-500/25' : ''}`;
      case 'glass':
        return `${baseClasses} bg-white/20 text-gray-700 dark:text-gray-300 ${glow ? 'shadow-lg shadow-white/25' : ''}`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-700 dark:text-gray-300 ${glow ? 'shadow-lg shadow-gray-500/25' : ''}`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-2 py-1 text-xs';
      case 'lg': return 'px-4 py-2 text-base';
      default: return 'px-3 py-1.5 text-sm';
    }
  };

  return (
    <span className={`
      inline-flex items-center rounded-full
      ${getVariantClasses()}
      ${getSizeClasses()}
      ${pulse ? 'animate-pulse' : ''}
    `}>
      {children}
    </span>
  );
};

export const ModernGlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}> = ({ children, className = '', hover = true, glow = false }) => {
  return (
    <motion.div
      initial={modernDesignSystem.animations.scaleIn.initial}
      animate={modernDesignSystem.animations.scaleIn.animate}
      transition={modernDesignSystem.animations.scaleIn.transition}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`
        ${modernDesignSystem.shadows.glass} 
        border-0 
        bg-white/80 
        dark:bg-gray-900/80 
        backdrop-blur-lg 
        rounded-2xl 
        overflow-hidden 
        relative 
        group
        ${glow ? 'shadow-2xl shadow-blue-500/10' : ''}
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export const ModernFloatingButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, onClick, variant = 'primary', size = 'md', className = '' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700';
      case 'secondary':
        return 'bg-white/80 text-gray-700 hover:bg-white/90 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800/90';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-sm';
      case 'lg': return 'px-8 py-4 text-lg';
      default: return 'px-6 py-3 text-base';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        rounded-2xl
        font-medium
        shadow-lg
        backdrop-blur-sm
        transition-all
        duration-300
        flex
        items-center
        gap-2
        border-0
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};
