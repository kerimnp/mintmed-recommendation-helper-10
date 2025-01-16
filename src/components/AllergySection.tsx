import React from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";
import { Card } from "./ui/card";

interface AllergySectionProps {
  allergies: {
    penicillin: boolean;
    cephalosporin: boolean;
    sulfa: boolean;
    macrolide: boolean;
    fluoroquinolone: boolean;
  };
  onAllergyChange: (allergy: string, checked: boolean) => void;
}

export const AllergySection: React.FC<AllergySectionProps> = ({
  allergies,
  onAllergyChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language].allergies;

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(allergies).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700/50 
              rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 
              dark:hover:bg-gray-700 transition-colors"
          >
            <Checkbox
              id={key}
              checked={value}
              onCheckedChange={(checked) => onAllergyChange(key, checked as boolean)}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label 
              htmlFor={key}
              className="text-gray-700 dark:text-gray-200 select-none cursor-pointer"
            >
              {t[key as keyof typeof t]}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
};