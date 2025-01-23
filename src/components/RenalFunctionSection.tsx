import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

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
    <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl
      border border-gray-200 dark:border-gray-800">
      <div className="relative p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="creatinine" className="text-gray-700 dark:text-gray-300">
              {t.creatinine}
            </Label>
            <Input
              id="creatinine"
              type="number"
              step="0.1"
              min="0"
              placeholder={t.creatinine}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 
                focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={creatinine}
              onChange={(e) => onCreatinineChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
