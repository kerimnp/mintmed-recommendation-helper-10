import React from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

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
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Allergies</h2>
        <p className="text-sm text-gray-500">Select any known drug allergies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="penicillin"
            checked={allergies.penicillin}
            onCheckedChange={(checked) => onAllergyChange("penicillin", checked as boolean)}
          />
          <Label htmlFor="penicillin">
            Penicillin (includes Amoxicillin, Ampicillin)
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="cephalosporin"
            checked={allergies.cephalosporin}
            onCheckedChange={(checked) => onAllergyChange("cephalosporin", checked as boolean)}
          />
          <Label htmlFor="cephalosporin">
            Cephalosporins (e.g., Ceftriaxone, Cefepime)
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="sulfa"
            checked={allergies.sulfa}
            onCheckedChange={(checked) => onAllergyChange("sulfa", checked as boolean)}
          />
          <Label htmlFor="sulfa">
            Sulfa Drugs (e.g., TMP-SMX)
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="macrolide"
            checked={allergies.macrolide}
            onCheckedChange={(checked) => onAllergyChange("macrolide", checked as boolean)}
          />
          <Label htmlFor="macrolide">
            Macrolides (e.g., Azithromycin, Clarithromycin)
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="fluoroquinolone"
            checked={allergies.fluoroquinolone}
            onCheckedChange={(checked) => onAllergyChange("fluoroquinolone", checked as boolean)}
          />
          <Label htmlFor="fluoroquinolone">
            Fluoroquinolones (e.g., Ciprofloxacin, Levofloxacin)
          </Label>
        </div>
      </div>
    </div>
  );
};