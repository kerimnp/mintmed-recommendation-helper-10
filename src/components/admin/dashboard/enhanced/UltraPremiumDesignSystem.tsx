import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ultraPremiumDesignSystem = {
  colors: {
    luxury: {
      platinum: '#E5E4E2',
      gold: '#FFD700',
      rose: '#F7CAC9',
      obsidian: '#0F0F23',
      pearl: '#F8F6F0',
      champagne: '#F7E7CE',
      midnight: '#191970',
      crystal: '#FFFFFF',
      diamond: '#B9F2FF'
    },
    premium: {
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
        900: '#0c4a6e',
        950: '#082f49'
      },
      accent: {
        50: '#fef7ff',
        100: '#fceeff',
        200: '#f8ddff',
        300: '#f2c2ff',
        400: '#e796ff',
        500: '#d769ff',
        600: '#c43cff',
        700: '#a821e8',
        800: '#8b1bb8',
        900: '#701a8a',
        950: '#4c0454'
      },
      surface: {
        glass: 'rgba(255, 255, 255, 0.08)',
        glassLight: 'rgba(255, 255, 255, 0.12)',
        glassDark: 'rgba(0, 0, 0, 0.08)',
        frosted: 'rgba(255, 255, 255, 0.15)',
        crystal: 'rgba(255, 255, 255, 0.05)',
        pearl: 'rgba(248, 246, 240, 0.95)',
        platinum: 'rgba(229, 228, 226, 0.85)'
      }
    }
  },
  gradients: {
    luxury: {
      platinum: 'linear-gradient(135deg, #E5E4E2 0%, #F8F6F0 50%, #FFFFFF 100%)',
      gold: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
      crystal: 'linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 50%, #E6F3FF 100%)',
      obsidian: 'linear-gradient(135deg, #0F0F23 0%, #1a1a2e 50%, #16213e 100%)',
      aurora: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      cosmic: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      diamond: 'linear-gradient(135deg, #B9F2FF 0%, #81C784 25%, #FFB74D 50%, #F06292 75%, #9C27B0 100%)',
      royal: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      champagne: 'linear-gradient(135deg, #F7E7CE 0%, #E8D5B7 50%, #D4AF37 100%)'
    },
    surfaces: {
      ultraGlass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
      premiumFrost: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
      luxuryShimmer: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 215, 0, 0.1) 100%)',
      elegantDepth: 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)'
    }
  },
  shadows: {
    luxury: {
      floating: '0 32px 64px -12px rgba(0, 0, 0, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.04)',
      elevated: '0 20px 40px -8px rgba(0, 0, 0, 0.12), 0 16px 32px -8px rgba(0, 0, 0, 0.06)',
      premium: '0 24px 48px -12px rgba(0, 0, 0, 0.15), 0 20px 40px -12px rgba(0, 0, 0, 0.1)',
      ultra: '0 40px 80px -16px rgba(0, 0, 0, 0.1), 0 32px 64px -16px rgba(0, 0, 0, 0.06)',
      glow: '0 0 60px rgba(102, 126, 234, 0.3), 0 0 100px rgba(118, 75, 162, 0.2)',
      goldGlow: '0 0 40px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 215, 0, 0.2)',
      crystalGlow: '0 0 30px rgba(185, 242, 255, 0.5), 0 0 60px rgba(185, 242, 255, 0.3)'
    }
  },
  animations: {
    luxury: {
      float: {
        y: [-2, 2, -2],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: [0.4, 0.0, 0.6, 1]
        }
      },
      shimmer: {
        x: [-100, 100],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }
      },
      breathe: {
        scale: [1, 1.02, 1],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: [0.4, 0.0, 0.6, 1]
        }
      },
      glow: {
        boxShadow: [
          '0 0 20px rgba(102, 126, 234, 0.3)',
          '0 0 60px rgba(102, 126, 234, 0.6)', 
          '0 0 20px rgba(102, 126, 234, 0.3)'
        ],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: [0.4, 0.0, 0.6, 1]
        }
      }
    }
  },
  typography: {
    luxury: {
      display: {
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        fontWeight: '700',
        letterSpacing: '-0.02em',
        lineHeight: '1.1'
      },
      heading: {
        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        fontWeight: '600',
        letterSpacing: '-0.01em',
        lineHeight: '1.3'
      },
      body: {
        fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        fontWeight: '400',
        letterSpacing: '0em',
        lineHeight: '1.5'
      }
    }
  }
};

export const UltraLuxuryCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'platinum' | 'gold' | 'crystal' | 'obsidian' | 'aurora';
  glow?: boolean;
  floating?: boolean;
  shimmer?: boolean;
}> = ({ 
  children, 
  className = '', 
  variant = 'platinum', 
  glow = false, 
  floating = false,
  shimmer = false 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gold':
        return 'bg-gradient-to-br from-yellow-50/80 via-amber-50/60 to-orange-50/40 border border-amber-200/30';
      case 'crystal':
        return 'bg-gradient-to-br from-cyan-50/80 via-blue-50/60 to-indigo-50/40 border border-cyan-200/30';
      case 'obsidian':
        return 'bg-gradient-to-br from-gray-900/90 via-slate-900/80 to-zinc-900/70 border border-gray-700/30 text-white';
      case 'aurora':
        return 'bg-gradient-to-br from-purple-50/80 via-pink-50/60 to-blue-50/40 border border-purple-200/30';
      default:
        return 'bg-gradient-to-br from-white/80 via-gray-50/60 to-slate-50/40 border border-gray-200/30';
    }
  };

  return (
    <motion.div
      className={cn(
        "backdrop-blur-xl rounded-3xl overflow-hidden relative group transition-all duration-700",
        getVariantStyles(),
        glow && "shadow-2xl",
        className
      )}
      style={{
        boxShadow: glow ? ultraPremiumDesignSystem.shadows.luxury.floating : ultraPremiumDesignSystem.shadows.luxury.elevated
      }}
      animate={floating ? {
        y: [-2, 2, -2],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: [0.4, 0.0, 0.6, 1]
        }
      } : {}}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
      }}
    >
      {/* Shimmer effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: [-100, 100],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      )}
      
      {/* Luxury overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export const UltraPremiumButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'luxury' | 'gold' | 'crystal' | 'obsidian';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  glow?: boolean;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  glow = false 
}) => {
  const getVariantStyles = () => {
    if (disabled) return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    
    switch (variant) {
      case 'luxury':
        return 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white hover:from-yellow-500 hover:via-amber-600 hover:to-orange-600';
      case 'crystal':
        return 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white hover:from-cyan-500 hover:via-blue-600 hover:to-indigo-700';
      case 'obsidian':
        return 'bg-gradient-to-r from-gray-800 via-slate-900 to-zinc-900 text-white hover:from-gray-900 hover:via-slate-950 hover:to-zinc-950';
      default:
        return 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-sm rounded-xl';
      case 'lg': return 'px-8 py-4 text-lg rounded-2xl';
      case 'xl': return 'px-12 py-6 text-xl rounded-3xl';
      default: return 'px-6 py-3 text-base rounded-xl';
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { 
        scale: 1.05,
        y: -2,
        boxShadow: glow ? ultraPremiumDesignSystem.shadows.luxury.glow : ultraPremiumDesignSystem.shadows.luxury.elevated
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        getVariantStyles(),
        getSizeStyles(),
        "font-semibold backdrop-blur-sm transition-all duration-300 flex items-center gap-2 border-0 focus:outline-none focus:ring-2 focus:ring-purple-500/50 relative overflow-hidden group",
        className
      )}
    >
      {/* Luxury shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
        transition={{ duration: 0.6, ease: [0.4, 0.0, 0.6, 1] }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export const UltraPremiumBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'luxury' | 'gold' | 'crystal' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  pulse?: boolean;
  className?: string;
}> = ({ children, variant = 'luxury', size = 'md', glow = false, pulse = false, className = '' }) => {
  const getVariantClasses = () => {
    const baseClasses = 'backdrop-blur-sm border font-medium transition-all duration-300';
    switch (variant) {
      case 'luxury':
        return `${baseClasses} bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 text-purple-700 dark:text-purple-300 border-purple-200/50`;
      case 'gold':
        return `${baseClasses} bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-300 border-amber-200/50`;
      case 'crystal':
        return `${baseClasses} bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-indigo-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200/50`;
      case 'success':
        return `${baseClasses} bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200/50`;
      case 'warning':
        return `${baseClasses} bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200/50`;
      case 'danger':
        return `${baseClasses} bg-red-500/20 text-red-700 dark:text-red-300 border-red-200/50`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-200/50`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-2 py-1 text-xs rounded-lg';
      case 'lg': return 'px-4 py-2 text-base rounded-xl';
      default: return 'px-3 py-1.5 text-sm rounded-lg';
    }
  };

  return (
    <motion.span 
      className={cn(
        "inline-flex items-center",
        getVariantClasses(),
        getSizeClasses(),
        pulse && "animate-pulse",
        glow && "shadow-lg",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={pulse ? { opacity: [1, 0.7, 1] } : {}}
      transition={pulse ? { duration: 2, repeat: Infinity } : {}}
    >
      {children}
    </motion.span>
  );
};

export const UltraPremiumMetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon?: React.ReactNode;
  variant?: 'platinum' | 'gold' | 'crystal' | 'obsidian' | 'aurora';
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
  variant = 'platinum',
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] } 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "cursor-pointer select-none",
        className
      )}
    >
      <UltraLuxuryCard variant={variant} floating glow className={getSizeClasses()}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                {title}
              </p>
              {realTime && (
                <motion.div 
                  className="w-2 h-2 bg-emerald-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            <div className="flex items-baseline gap-3 mb-3">
              <motion.h3 
                className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
              >
                {value}
              </motion.h3>
              {trendValue && (
                <motion.span 
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
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
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg flex-shrink-0"
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
      </UltraLuxuryCard>
    </motion.div>
  );
};
