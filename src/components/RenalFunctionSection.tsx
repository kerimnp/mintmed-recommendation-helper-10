
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Activity } from "lucide-react";
import { calculateGFR } from "@/utils/antibioticRecommendations/renalAdjustments/gfrCalculation";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

interface RenalFunctionSectionProps {
  creatinine: string;
  onCreatinineChange: (value: string) => void;
  age?: string;
  weight?: string;
  gender?: string;
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
  gender = ""
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
  
  useEffect(() => {
    if (creatinine && age && weight && gender) {
      const creatinineValue = parseFloat(creatinine);
      if (!isNaN(creatinineValue) && creatinineValue > 0) {
        const calculatedGFR = calculateGFR({
          age,
          weight,
          gender,
          creatinine: creatinineValue
        });
        
        setGfr(calculatedGFR);
        
        // Determine renal status based on GFR
        if (calculatedGFR >= 90) {
          setRenalStatus("normal");
        } else if (calculatedGFR >= 60) {
          setRenalStatus("mild");
        } else if (calculatedGFR >= 30) {
          setRenalStatus("moderate");
        } else {
          setRenalStatus("severe");
        }
      } else {
        setGfr(null);
        setRenalStatus("");
      }
    } else {
      setGfr(null);
      setRenalStatus("");
    }
  }, [creatinine, age, weight, gender]);

  const renderRenalStatus = () => {
    if (!gfr) return null;
    
    let color = "bg-green-500";
    let text = translationWithDefaults.normal;
    
    if (renalStatus === "mild") {
      color = "bg-yellow-500";
      text = translationWithDefaults.mild;
    } else if (renalStatus === "moderate") {
      color = "bg-orange-500";
      text = translationWithDefaults.moderate;
    } else if (renalStatus === "severe") {
      color = "bg-red-500";
      text = translationWithDefaults.severe;
    }
    
    return (
      <div className="mt-4">
        <Badge variant="outline" className={`text-white ${color} px-2 py-1`}>
          {text} - GFR: {Math.round(gfr)} mL/min
        </Badge>
        
        {renalStatus === "severe" && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {language === "en" 
                ? "Severe renal impairment detected. Dose adjustments required."
                : "Otkriveno teško oštećenje bubrega. Potrebno je prilagođavanje doze."}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border border-gray-100 dark:border-gray-800 rounded-xl">
      <div className="space-y-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-medical-primary" />
          {translationWithDefaults.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{translationWithDefaults.subtitle}</p>
      </div>
      
      <div className="space-y-4">
        <div className="max-w-xs">
          <Label 
            htmlFor="creatinine"
            className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2"
          >
            {translationWithDefaults.creatinineLabel}
          </Label>
          <Input
            id="creatinine"
            type="number"
            step="0.1"
            min="0.1"
            max="20"
            value={creatinine}
            onChange={(e) => onCreatinineChange(e.target.value)}
            className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
            placeholder="e.g., 0.8"
          />
        </div>
        
        {renderRenalStatus()}
      </div>
    </Card>
  );
}
