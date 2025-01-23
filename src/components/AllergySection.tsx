import React from "react";
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
    <div className="allergies-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold bg-gradient-to-br from-medical-error via-medical-warning to-medical-error bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-sm text-medical-text-secondary">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(allergies).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center space-x-2 p-3 bg-white/5 dark:bg-medical-bg/50 
              rounded-lg border border-medical-error/10 dark:border-medical-warning/10 
              hover:bg-white/10 dark:hover:bg-medical-bg/60 transition-colors"
          >
            <Checkbox
              id={key}
              checked={value}
              onCheckedChange={(checked) => onAllergyChange(key, checked as boolean)}
              className="border-medical-error/30 data-[state=checked]:bg-medical-error 
                data-[state=checked]:border-medical-error"
            />
            <Label 
              htmlFor={key}
              className="text-medical-text select-none cursor-pointer"
            >
              {t[key as keyof typeof t]}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
