import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "./ui/button";
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
  const t = translations[language];

  const allergyTypes = [
    "penicillin",
    "cephalosporin",
    "sulfa",
    "macrolide",
    "fluoroquinolone",
  ] as const;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">{t.allergies.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.allergies.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {allergyTypes.map((allergy) => (
            <Button
              key={allergy}
              type="button"
              variant={allergies[allergy] ? "default" : "outline"}
              onClick={() => onAllergyChange(allergy, !allergies[allergy])}
              className={`transition-all duration-200 ${
                allergies[allergy] 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "hover:bg-red-100 dark:hover:bg-red-900"
              }`}
            >
              {t.allergies[allergy]}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};