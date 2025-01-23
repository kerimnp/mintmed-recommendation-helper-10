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

  const handleAllergyToggle = (allergy: string) => {
    onAllergyChange(allergy, !allergies[allergy as keyof typeof allergies]);
  };

  const allergyTypes = [
    "penicillin",
    "cephalosporin",
    "sulfa",
    "macrolide",
    "fluoroquinolone",
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {allergyTypes.map((allergy) => (
            <Button
              key={allergy}
              type="button"
              variant={allergies[allergy as keyof typeof allergies] ? "default" : "outline"}
              onClick={() => handleAllergyToggle(allergy)}
              className="transition-all duration-200"
            >
              {t.allergies[allergy as keyof typeof t.allergies]}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};