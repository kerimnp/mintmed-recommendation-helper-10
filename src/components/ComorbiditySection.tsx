import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";

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
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="kidneyDisease" 
            checked={formData.kidneyDisease}
            onCheckedChange={(checked) => onInputChange("kidneyDisease", checked)}
          />
          <Label htmlFor="kidneyDisease">{t.kidneyDisease}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="liverDisease" 
            checked={formData.liverDisease}
            onCheckedChange={(checked) => onInputChange("liverDisease", checked)}
          />
          <Label htmlFor="liverDisease">{t.liverDisease}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="diabetes" 
            checked={formData.diabetes}
            onCheckedChange={(checked) => onInputChange("diabetes", checked)}
          />
          <Label htmlFor="diabetes">{t.diabetes}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="immunosuppressed" 
            checked={formData.immunosuppressed}
            onCheckedChange={(checked) => onInputChange("immunosuppressed", checked)}
          />
          <Label htmlFor="immunosuppressed">{t.immunosuppressed}</Label>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Antibiotic Resistance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="mrsa" 
              checked={formData.resistances.mrsa}
              onCheckedChange={(checked) => handleResistanceChange("mrsa", checked as boolean)}
            />
            <Label htmlFor="mrsa">MRSA</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="vre" 
              checked={formData.resistances.vre}
              onCheckedChange={(checked) => handleResistanceChange("vre", checked as boolean)}
            />
            <Label htmlFor="vre">VRE</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="esbl" 
              checked={formData.resistances.esbl}
              onCheckedChange={(checked) => handleResistanceChange("esbl", checked as boolean)}
            />
            <Label htmlFor="esbl">ESBL</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="cre" 
              checked={formData.resistances.cre}
              onCheckedChange={(checked) => handleResistanceChange("cre", checked as boolean)}
            />
            <Label htmlFor="cre">CRE</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="pseudomonas" 
              checked={formData.resistances.pseudomonas}
              onCheckedChange={(checked) => handleResistanceChange("pseudomonas", checked as boolean)}
            />
            <Label htmlFor="pseudomonas">Pseudomonas</Label>
          </div>
        </div>
      </div>
    </Card>
  );
};