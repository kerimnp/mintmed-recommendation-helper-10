import React from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";

interface MedicationHistorySectionProps {
  formData: {
    recentAntibiotics: boolean;
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

  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="recentAntibiotics" 
            checked={formData.recentAntibiotics}
            onCheckedChange={(checked) => onInputChange("recentAntibiotics", checked)}
          />
          <Label htmlFor="recentAntibiotics">{t.recentAntibiotics}</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherAllergies" className="form-label">{t.otherAllergies}</Label>
          <Textarea 
            id="otherAllergies" 
            placeholder={t.otherAllergies}
            className="input-field"
            value={formData.otherAllergies}
            onChange={(e) => onInputChange("otherAllergies", e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};