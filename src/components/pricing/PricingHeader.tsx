
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageToggle } from '@/components/LanguageToggle';

export const PricingHeader: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src={theme === 'dark' ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png" : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"} 
                alt="Horalix Logo" 
                className="h-8 w-auto" 
              />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'en' ? 'Pricing Plans' : 'Cjenovni Planovi'}
              </h1>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {/* Language Toggle */}
          <LanguageToggle />
          
          {/* Sign In Button - only show if user is not logged in */}
          {!user && (
            <Link to="/auth">
              <Button variant="outline" className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                {language === 'en' ? 'Sign In' : 'Prijava'}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
