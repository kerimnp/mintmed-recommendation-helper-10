import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { AlertCircle } from "lucide-react";

interface MedicationHistorySectionProps {
  formData: {
    recentAntibiotics: boolean;
    allergies: {
      penicillin: boolean;
      cephalosporin: boolean;
      sulfa: boolean;
      macrolide: boolean;
      fluoroquinolone: boolean;
    };
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

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    onInputChange(`allergies.${allergy}`, checked);
  };

  return (
    <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl
      border border-gray-200 dark:border-gray-800">
      <div className="relative p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {t.title}
            <AlertCircle className="h-5 w-5 text-red-500" />
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg 
            bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
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

          <div className="space-y-4">
            <Label className="text-gray-700 dark:text-gray-300 font-medium">
              {t.antibioticAllergies}
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(formData.allergies).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center space-x-3 p-3 rounded-lg 
                    bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                    hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  <Checkbox 
                    id={`allergy-${key}`}
                    checked={value}
                    onCheckedChange={(checked) => handleAllergyChange(key, checked as boolean)}
                    className="border-gray-400 dark:border-gray-600 data-[state=checked]:bg-red-500 
                      data-[state=checked]:border-red-500"
                  />
                  <Label 
                    htmlFor={`allergy-${key}`}
                    className="text-gray-700 dark:text-gray-300 font-medium capitalize"
                  >
                    {t[key as keyof typeof t] || key}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherAllergies" className="text-gray-700 dark:text-gray-300">
              {t.otherAllergies}
            </Label>
            <Textarea 
              id="otherAllergies" 
              placeholder={t.otherAllergies}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 
                focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-h-[100px]"
              value={formData.otherAllergies}
              onChange={(e) => onInputChange("otherAllergies", e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};