import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence, Easing } from 'framer-motion';
import { cn } from '@/lib/utils';

export const modernDesignSystem = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    },
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    medical: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      light: '#ffeef8',
      dark: '#2d1b69'
    },
    surface: {
      glass: 'rgba(255, 255, 255, 0.85)',
      glassDark: 'rgba(17, 24, 39, 0.85)',
      card: 'rgba(255, 255, 255, 0.95)',
      cardDark: 'rgba(17, 24, 39, 0.95)',
      overlay: 'rgba(0, 0, 0, 0.4)',
      subtle: 'rgba(248, 250, 252, 0.8)'
    }
  },
  gradients: {
    primary: 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600',
    success: 'bg-gradient-to-br from-emerald-400 to-green-600',
    warning: 'bg-gradient-to-br from-amber-400 to-orange-600',
    danger: 'bg-gradient-to-br from-red-400 to-rose-600',
    medical: 'bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500',
    glass: 'bg-gradient-to-br from-white/20 to-white/5',
    surface: 'bg-gradient-to-br from-gray-50/80 to-white/60',
    ios: 'bg-gradient-to-br from-blue-500/90 via-purple-500/90 to-pink-500/90',
    premium: 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500',
    clinical: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500'
  },
  shadows: {
    glass: 'shadow-xl shadow-black/10 backdrop-blur-md',
    card: 'shadow-lg shadow-black/5',
    floating: 'shadow-2xl shadow-black/20',
    inner: 'inset-0 shadow-inner shadow-black/10',
    ios: 'shadow-2xl shadow-blue-500/25',
    premium: 'shadow-2xl shadow-amber-500/30',
    medical: 'shadow-xl shadow-purple-500/20'
  },
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
    },
    slideIn: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
    },
    spring: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30
    },
    bounce: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px'
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
  className?: string;
  onClick?: () => void;
}> = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon, 
  gradient = modernDesignSystem.gradients.primary,
  size = 'md',
  realTime = false,
  className = '',
  onClick
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200';
      case 'down': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 border-gray-200';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'p-4';
      case 'lg': return 'p-8';
      default: return 'p-6';
    }
  };

  return (
    <motion.div
      initial={modernDesignSystem.animations.fadeIn.initial}
      animate={modernDesignSystem.animations.fadeIn.animate}
      transition={modernDesignSystem.animations.fadeIn.transition}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] } 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "cursor-pointer select-none",
        className
      )}
    >
      <Card className={cn(
        modernDesignSystem.shadows.glass,
        "border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden relative group transition-all duration-300",
        onClick && "hover:shadow-2xl"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className={cn(getSizeClasses(), "relative z-10")}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                  {title}
                </p>
                {realTime && (
                  <motion.div 
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <motion.h3 
                  className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, ...modernDesignSystem.animations.spring }}
                >
                  {value}
                </motion.h3>
                {trendValue && (
                  <motion.span 
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium border",
                      getTrendColor()
                    )}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
                  </motion.span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {subtitle}
                </p>
              )}
            </div>
            {icon && (
              <motion.div 
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0",
                  gradient
                )}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                initial={{ rotate: -5, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {icon}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ModernBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'medical' | 'glass' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  glow?: boolean;
  className?: string;
}> = ({ children, variant = 'info', size = 'md', pulse = false, glow = false, className = '' }) => {
  const getVariantClasses = () => {
    const baseClasses = 'backdrop-blur-sm border font-medium transition-all duration-300';
    switch (variant) {
      case 'success':
        return `${baseClasses} bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 ${glow ? 'shadow-lg shadow-emerald-500/25' : ''}`;
      case 'warning':
        return `${baseClasses} bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200/50 ${glow ? 'shadow-lg shadow-amber-500/25' : ''}`;
      case 'danger':
        return `${baseClasses} bg-red-500/20 text-red-700 dark:text-red-300 border-red-200/50 ${glow ? 'shadow-lg shadow-red-500/25' : ''}`;
      case 'medical':
        return `${baseClasses} bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200/50 ${glow ? 'shadow-lg shadow-purple-500/25' : ''}`;
      case 'premium':
        return `${baseClasses} bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-300 border-amber-200/50 ${glow ? 'shadow-lg shadow-amber-500/25' : ''}`;
      case 'glass':
        return `${baseClasses} bg-white/20 text-gray-700 dark:text-gray-300 border-white/20 ${glow ? 'shadow-lg shadow-white/25' : ''}`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-200/50 ${glow ? 'shadow-lg shadow-gray-500/25' : ''}`;
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
    <motion.span 
      className={cn(
        "inline-flex items-center rounded-full",
        getVariantClasses(),
        getSizeClasses(),
        pulse && "animate-pulse",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  );
};

export const ModernGlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: string;
}> = ({ children, className = '', hover = true, glow = false, gradient }) => {
  return (
    <motion.div
      initial={modernDesignSystem.animations.scaleIn.initial}
      animate={modernDesignSystem.animations.scaleIn.animate}
      transition={modernDesignSystem.animations.scaleIn.transition}
      whileHover={hover ? { 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] } 
      } : {}}
      className={cn(
        modernDesignSystem.shadows.glass,
        "border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl overflow-hidden relative group transition-all duration-300",
        glow && "shadow-2xl shadow-blue-500/10",
        gradient && `bg-gradient-to-br ${gradient}`,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export const ModernFloatingButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'medical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', size = 'md', className = '', disabled = false }) => {
  const getVariantClasses = () => {
    if (disabled) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
    
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25';
      case 'secondary':
        return 'bg-white/80 text-gray-700 hover:bg-white/90 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800/90 border border-gray-200/50';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/25';
      case 'success':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/25';
      case 'medical':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-lg shadow-purple-500/25';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25';
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
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        getVariantClasses(),
        getSizeClasses(),
        "rounded-2xl font-medium backdrop-blur-sm transition-all duration-300 flex items-center gap-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export const ModernProgressBar: React.FC<{
  value: number;
  max?: number;
  className?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  animated?: boolean;
  showValue?: boolean;
}> = ({ value, max = 100, className = '', variant = 'primary', animated = true, showValue = false }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'success': return 'bg-gradient-to-r from-emerald-500 to-green-600';
      case 'warning': return 'bg-gradient-to-r from-amber-500 to-orange-600';
      case 'danger': return 'bg-gradient-to-r from-red-500 to-rose-600';
      default: return 'bg-gradient-to-r from-blue-500 to-purple-600';
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={cn("h-2 rounded-full", getVariantClasses())}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: animated ? 1 : 0,
            ease: [0.4, 0.0, 0.2, 1]
          }}
        />
      </div>
      {showValue && (
        <div className="absolute right-0 top-0 transform translate-y-[-100%] mb-1">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export const ModernLoadingSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-8 h-8';
      default: return 'w-6 h-6';
    }
  };

  return (
    <motion.div
      className={cn(
        "rounded-full border-2 border-gray-300 border-t-blue-500",
        getSizeClasses(),
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};
