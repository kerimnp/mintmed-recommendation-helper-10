import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/pages/Index";

interface RenalFunctionSectionProps {
  creatinine: string;
  onCreatinineChange: (value: string) => void;
}

export const RenalFunctionSection: React.FC<RenalFunctionSectionProps> = ({
  creatinine,
  onCreatinineChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language].renalFunction;

  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">{t.title}</h2>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="creatinine" className="form-label">{t.creatinine}</Label>
          <Input
            id="creatinine"
            type="number"
            step="0.1"
            min="0"
            placeholder={t.creatinine}
            className="input-field"
            value={creatinine}
            onChange={(e) => onCreatinineChange(e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};