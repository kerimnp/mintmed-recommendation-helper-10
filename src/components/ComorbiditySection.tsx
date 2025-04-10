
import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

interface ComorbiditySectionProps {
  formData: {
    kidneyDisease: boolean;
    liverDisease: boolean;
    diabetes: boolean;
    immunosuppressed: boolean;
    resistances: {
      mrsa: boolean;
      vre: boolean;
      esbl: boolean;
      cre: boolean;
      pseudomonas: boolean;
    };
  };
  onInputChange: (field: string, value: any) => void;
}

export const ComorbiditySection: React.FC<ComorbiditySectionProps> = ({
  formData,
  onInputChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language].comorbidities;

  const handleResistanceChange = (resistance: string, checked: boolean) => {
    onInputChange("resistances", {
      ...formData.resistances,
      [resistance]: checked
    });
  };

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
          {[
            { id: "kidneyDisease", label: t.kidneyDisease },
            { id: "liverDisease", label: t.liverDisease },
            { id: "diabetes", label: t.diabetes },
            { id: "immunosuppressed", label: language === "en" ? t.immunosuppressed : t.immunosupresija }
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center space-x-3 p-3 rounded-lg 
              bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <Checkbox 
                id={id} 
                checked={formData[id as keyof typeof formData] as boolean}
                onCheckedChange={(checked) => onInputChange(id, checked)}
                className="border-gray-400 dark:border-gray-600"
              />
              <Label htmlFor={id} className="text-gray-700 dark:text-gray-300">{label}</Label>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            Antibiotic Resistance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "mrsa", label: "MRSA" },
              { id: "vre", label: "VRE" },
              { id: "esbl", label: "ESBL" },
              { id: "cre", label: "CRE" },
              { id: "pseudomonas", label: "Pseudomonas" }
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-3 p-3 rounded-lg 
                bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <Checkbox 
                  id={id} 
                  checked={formData.resistances[id as keyof typeof formData.resistances]}
                  onCheckedChange={(checked) => handleResistanceChange(id, checked as boolean)}
                  className="border-gray-400 dark:border-gray-600"
                />
                <Label htmlFor={id} className="text-gray-700 dark:text-gray-300">{label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
