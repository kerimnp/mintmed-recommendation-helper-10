
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Coins, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FreeCreditsDisplayProps {
  creditsLeft: number;
  className?: string;
}

export const FreeCreditsDisplay: React.FC<FreeCreditsDisplayProps> = ({
  creditsLeft,
  className = ""
}) => {
  const { language } = useLanguage();

  const getStatusColor = () => {
    if (creditsLeft === 0) return "destructive";
    if (creditsLeft <= 2) return "secondary";
    return "default";
  };

  const getStatusText = () => {
    if (language === "en") {
      if (creditsLeft === 0) return "No credits remaining";
      if (creditsLeft === 1) return "1 credit left";
      return `${creditsLeft} credits left`;
    } else {
      if (creditsLeft === 0) return "Nema preostalih kredita";
      if (creditsLeft === 1) return "1 kredit preostao";
      return `${creditsLeft} kredita preostalo`;
    }
  };

  return (
    <Card className={`p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Coins className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {language === "en" ? "Free Credits" : "Besplatni Krediti"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === "en" ? "Generate recommendations" : "Generiraj preporuke"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {creditsLeft <= 2 && creditsLeft > 0 && (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          )}
          <Badge variant={getStatusColor()} className="font-medium">
            {getStatusText()}
          </Badge>
        </div>
      </div>
      
      {creditsLeft === 0 && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300">
            {language === "en" 
              ? "You've used all your free credits. Contact support to continue using the service."
              : "Iskoristili ste sve besplatne kredite. Kontaktirajte podršku za nastavak korištenja usluge."}
          </p>
        </div>
      )}
      
      {creditsLeft <= 2 && creditsLeft > 0 && (
        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            {language === "en" 
              ? "You're running low on free credits. Consider upgrading soon."
              : "Ponestaje vam besplatnih kredita. Razmislite o nadogradnji uskoro."}
          </p>
        </div>
      )}
    </Card>
  );
};
