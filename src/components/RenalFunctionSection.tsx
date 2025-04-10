
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Activity, KidneyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RenalFunctionSectionProps {
  creatinine: string;
  onCreatinineChange: (value: string) => void;
}

export const RenalFunctionSection: React.FC<RenalFunctionSectionProps> = ({
  creatinine,
  onCreatinineChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language].renalFunction;
  const [renalStatus, setRenalStatus] = useState<'normal' | 'impaired' | 'unknown'>('unknown');
  const [estimatedGFR, setEstimatedGFR] = useState<number | null>(null);

  // Calculate estimated GFR based on creatinine
  // This is a simplified calculation for demonstration purposes
  useEffect(() => {
    if (creatinine && !isNaN(parseFloat(creatinine)) && parseFloat(creatinine) > 0) {
      // Simplified calculation (not medically accurate)
      const estimatedValue = 120 / parseFloat(creatinine);
      setEstimatedGFR(Math.round(estimatedValue));
      
      if (estimatedValue >= 90) {
        setRenalStatus('normal');
      } else {
        setRenalStatus('impaired');
      }
    } else {
      setEstimatedGFR(null);
      setRenalStatus('unknown');
    }
  }, [creatinine]);

  return (
    <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="creatinine" className="text-gray-700 dark:text-gray-300 font-medium">
              {t.creatinine} (mg/dL)
            </Label>
            <Input
              id="creatinine"
              type="number"
              step="0.1"
              min="0"
              placeholder={t.creatinine}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 
                focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-lg text-lg h-12"
              value={creatinine}
              onChange={(e) => onCreatinineChange(e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Normal range: 0.7 - 1.3 mg/dL for men, 0.6 - 1.1 mg/dL for women
            </p>
          </div>
          
          <div className={cn(
            "rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all",
            renalStatus === 'normal' ? "bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30" : 
            renalStatus === 'impaired' ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30" :
            "bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
          )}>
            <div className="mb-2">
              <div className={cn(
                "inline-flex items-center justify-center rounded-full w-10 h-10",
                renalStatus === 'normal' ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : 
                renalStatus === 'impaired' ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" :
                "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}>
                <Activity className="h-5 w-5" />
              </div>
            </div>
            
            <h3 className={cn(
              "text-lg font-medium",
              renalStatus === 'normal' ? "text-green-800 dark:text-green-400" : 
              renalStatus === 'impaired' ? "text-amber-800 dark:text-amber-400" :
              "text-gray-800 dark:text-gray-400"
            )}>
              {renalStatus === 'normal' ? "Normal Renal Function" : 
               renalStatus === 'impaired' ? "Renal Impairment" :
               "Renal Function Unknown"}
            </h3>
            
            {estimatedGFR !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2"
              >
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {estimatedGFR}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estimated GFR (mL/min)</p>
              </motion.div>
            )}
            
            {renalStatus === 'impaired' && (
              <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                Dose adjustments may be required
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
