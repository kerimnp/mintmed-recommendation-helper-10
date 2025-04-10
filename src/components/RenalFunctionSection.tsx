
import React from "react";
import { Card } from "./ui/card";
import { Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { CreatinineInput } from "./renal/CreatinineInput";

interface RenalFunctionSectionProps {
  creatinine: string;
  onCreatinineChange: (value: string) => void;
  age?: string;
  weight?: string;
  gender?: string;
  height?: string;
}

export const RenalFunctionSection: React.FC<RenalFunctionSectionProps> = ({
  creatinine,
  onCreatinineChange,
  age = "",
  weight = "",
  gender = "",
  height = ""
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-medical-primary" />
          {language === "en" ? "Renal Function Assessment" : "Procjena Bubrežne Funkcije"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {language === "en" 
            ? "Enter creatinine values to calculate clearance and assess renal function" 
            : "Unesite vrijednosti kreatinina za izračun klirensa i procjenu bubrežne funkcije"}
        </p>
      </div>
      
      <CreatinineInput 
        creatinine={creatinine} 
        onCreatinineChange={onCreatinineChange}
        gender={gender}
        age={age}
        weight={weight}
      />
    </Card>
  );
};
