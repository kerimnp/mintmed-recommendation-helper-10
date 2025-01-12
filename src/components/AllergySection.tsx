import React from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";

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
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="penicillin"
            checked={allergies.penicillin}
            onCheckedChange={(checked) => onAllergyChange("penicillin", checked as boolean)}
          />
          <Label htmlFor="penicillin">{t.penicillin}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="cephalosporin"
            checked={allergies.cephalosporin}
            onCheckedChange={(checked) => onAllergyChange("cephalosporin", checked as boolean)}
          />
          <Label htmlFor="cephalosporin">{t.cephalosporin}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="sulfa"
            checked={allergies.sulfa}
            onCheckedChange={(checked) => onAllergyChange("sulfa", checked as boolean)}
          />
          <Label htmlFor="sulfa">{t.sulfa}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="macrolide"
            checked={allergies.macrolide}
            onCheckedChange={(checked) => onAllergyChange("macrolide", checked as boolean)}
          />
          <Label htmlFor="macrolide">{t.macrolide}</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="fluoroquinolone"
            checked={allergies.fluoroquinolone}
            onCheckedChange={(checked) => onAllergyChange("fluoroquinolone", checked as boolean)}
          />
          <Label htmlFor="fluoroquinolone">{t.fluoroquinolone}</Label>
        </div>
      </div>
    </div>
  );
};