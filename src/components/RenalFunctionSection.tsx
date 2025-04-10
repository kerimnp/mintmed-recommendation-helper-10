
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { CreatinineInput } from "./renal/CreatinineInput";
import { GFRDisplay } from "./renal/GFRDisplay";
import { calculateCreatinineClearance } from "@/utils/antibioticRecommendations/renalAdjustments/creatinineClearance";

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
  const [crCl, setCrCl] = useState<number | null>(null);
  const [renalStatus, setRenalStatus] = useState<"normal" | "mild" | "moderate" | "severe" | "">("");
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Calculate creatinine clearance when inputs change
  useEffect(() => {
    if (creatinine && age && weight && gender) {
      const creatinineValue = parseFloat(creatinine);
      const ageValue = parseFloat(age);
      const weightValue = parseFloat(weight);

      if (!isNaN(creatinineValue) && !isNaN(ageValue) && !isNaN(weightValue) && creatinineValue > 0) {
        setIsCalculating(true);
        
        // Small delay to show calculation is happening
        setTimeout(() => {
          const isFemale = gender.toLowerCase() === 'female';
          const calculatedCrCl = calculateCreatinineClearance({
            age: ageValue,
            weight: weightValue,
            creatinine: creatinineValue,
            isFemale
          });
          
          setCrCl(calculatedCrCl);
          
          // Set renal status based on crCl value
          if (calculatedCrCl >= 90) setRenalStatus("normal");
          else if (calculatedCrCl >= 60) setRenalStatus("mild");
          else if (calculatedCrCl >= 30) setRenalStatus("moderate");
          else setRenalStatus("severe");
          
          setIsCalculating(false);
        }, 300);
      } else {
        setCrCl(null);
        setRenalStatus("");
      }
    } else {
      setCrCl(null);
      setRenalStatus("");
    }
  }, [creatinine, age, weight, gender]);
  
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
      
      <div className="space-y-6">
        <CreatinineInput 
          creatinine={creatinine} 
          onCreatinineChange={onCreatinineChange}
          gender={gender}
          age={age}
          weight={weight}
        />
        
        <GFRDisplay 
          gfr={crCl} 
          isCalculating={isCalculating}
          renalStatus={renalStatus}
        />
      </div>
    </Card>
  );
};
