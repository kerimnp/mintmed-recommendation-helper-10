import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";

interface MedicationHistorySectionProps {
  formData: {
    recentAntibiotics: boolean;
    otherAllergies: string;
  };
  onInputChange: (field: string, value: any) => void;
}

export const MedicationHistorySection: React.FC<MedicationHistorySectionProps> = ({
  formData,
  onInputChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language].medicationHistory;

  return (
    <Card className="relative overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-teal-50/50 dark:from-green-950/50 dark:to-teal-950/50" />
      <div className="relative p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-300 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <Checkbox 
              id="recentAntibiotics" 
              checked={formData.recentAntibiotics}
              onCheckedChange={(checked) => onInputChange("recentAntibiotics", checked)}
              className="border-gray-400 dark:border-gray-600"
            />
            <Label 
              htmlFor="recentAntibiotics" 
              className="text-gray-700 dark:text-gray-300 font-medium"
            >
              {t.recentAntibiotics}
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherAllergies" className="text-gray-700 dark:text-gray-300">
              {t.otherAllergies}
            </Label>
            <Textarea 
              id="otherAllergies" 
              placeholder={t.otherAllergies}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 min-h-[100px]"
              value={formData.otherAllergies}
              onChange={(e) => onInputChange("otherAllergies", e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};