
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Activity, Kidney } from "lucide-react";
import { calculateGFR } from "@/utils/antibioticRecommendations/renalAdjustments/gfrCalculation";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { CreatinineInput } from "./renal/CreatinineInput";
import { GFRDisplay } from "./renal/GFRDisplay";
import { ReferenceChart } from "./renal/ReferenceChart";
import { getGFRCategory } from "@/utils/antibioticRecommendations/renalAdjustments/renalReferenceRanges";

interface RenalFunctionSectionProps {
  creatinine: string;
  onCreatinineChange: (value: string) => void;
  age?: string;
  weight?: string;
  gender?: string;
  height?: string;
}

interface RenalFunctionTranslation {
  title: string;
  subtitle: string;
  creatinineLabel: string;
  normal: string;
  mild: string;
  moderate: string;
  severe: string;
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
  const defaultTranslation: RenalFunctionTranslation = {
    title: "Renal Function",
    subtitle: "Enter creatinine value if known",
    creatinineLabel: "Creatinine (mg/dL)",
    normal: "Normal",
    mild: "Mild Impairment",
    moderate: "Moderate Impairment",
    severe: "Severe Impairment"
  };
  
  // Get translations with type safety
  const translationData = translations[language].renalFunction as Partial<RenalFunctionTranslation> || {};
  const translationWithDefaults: RenalFunctionTranslation = {
    title: translationData.title || defaultTranslation.title,
    subtitle: translationData.subtitle || defaultTranslation.subtitle,
    creatinineLabel: translationData.creatinineLabel || defaultTranslation.creatinineLabel,
    normal: translationData.normal || defaultTranslation.normal,
    mild: translationData.mild || defaultTranslation.mild,
    moderate: translationData.moderate || defaultTranslation.moderate,
    severe: translationData.severe || defaultTranslation.severe
  };
  
  const [gfr, setGfr] = useState<number | null>(null);
  const [renalStatus, setRenalStatus] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  // Calculate GFR and renal status immediately when creatinine changes or when component mounts
  useEffect(() => {
    calculateRenalFunction();
  }, [creatinine, age, weight, gender, height]);

  // Calculate renal function based on input values
  const calculateRenalFunction = () => {
    if (!creatinine || creatinine === "") {
      setGfr(null);
      setRenalStatus("");
      return;
    }
    
    setIsCalculating(true);
    
    // Short delay to show calculation animation
    setTimeout(() => {
      const creatinineValue = parseFloat(creatinine);
      
      // Default values if parameters are missing
      const ageValue = age ? parseFloat(age) : 50;
      const weightValue = weight ? parseFloat(weight) : 70;
      const genderValue = gender || "male";
      const heightValue = height || "";
      
      if (!isNaN(creatinineValue) && creatinineValue > 0) {
        const calculatedGFR = calculateGFR({
          age: ageValue.toString(),
          weight: weightValue.toString(),
          gender: genderValue,
          creatinine: creatinineValue,
          height: heightValue
        });
        
        setGfr(calculatedGFR);
        
        // Determine renal status based on GFR category
        const category = getGFRCategory(calculatedGFR);
        setRenalStatus(category.severity);
      } else {
        setGfr(null);
        setRenalStatus("");
      }
      
      setIsCalculating(false);
    }, 300);
  };

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border border-gray-100 dark:border-gray-800 rounded-xl">
      <div className="space-y-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Kidney className="h-5 w-5 text-medical-primary" />
          {translationWithDefaults.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{translationWithDefaults.subtitle}</p>
      </div>
      
      <div className="space-y-4">
        <CreatinineInput 
          creatinine={creatinine} 
          onCreatinineChange={onCreatinineChange}
          gender={gender}
        />
        
        <GFRDisplay 
          gfr={gfr} 
          isCalculating={isCalculating} 
          renalStatus={renalStatus}
        />
        
        <ReferenceChart />
      </div>
    </Card>
  );
};
