import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

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
    <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl
      border border-gray-200 dark:border-gray-800">
      <div className="relative p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(allergies).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center space-x-2 p-3 bg-white/90 dark:bg-gray-800/90 
                rounded-lg border border-gray-200 dark:border-gray-700 
                hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
            >
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) => onAllergyChange(key, checked as boolean)}
                className="border-gray-300 dark:border-gray-600"
              />
              <Label 
                htmlFor={key}
                className="text-gray-700 dark:text-gray-300 select-none cursor-pointer"
              >
                {t[key as keyof typeof t]}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};