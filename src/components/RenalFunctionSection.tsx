
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Activity, AlertCircle, TrendingDown, Heart, Check } from "lucide-react";
import { calculateGFR, getRenalAdjustmentMessage } from "@/utils/antibioticRecommendations/renalAdjustments/gfrCalculation";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

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
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  // Calculate GFR and renal status immediately when creatinine changes or when component mounts
  useEffect(() => {
    calculateRenalFunction();
  }, [creatinine, age, weight, gender]);

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
      
      if (!isNaN(creatinineValue) && creatinineValue > 0) {
        const calculatedGFR = calculateGFR({
          age: ageValue.toString(),
          weight: weightValue.toString(),
          gender: genderValue,
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
      
      setIsCalculating(false);
    }, 300);
  };

  const getRenalStatusIcon = () => {
    if (!renalStatus) return <Heart className="h-5 w-5 text-gray-400" />;
    
    switch (renalStatus) {
      case "normal":
        return <Check className="h-5 w-5 text-green-500" />;
      case "mild":
        return <TrendingDown className="h-5 w-5 text-yellow-500" />;
      case "moderate":
        return <TrendingDown className="h-5 w-5 text-orange-500" />;
      case "severe":
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Heart className="h-5 w-5 text-gray-400" />;
    }
  };

  const getAdjustmentMessage = () => {
    if (!gfr) return null;
    return getRenalAdjustmentMessage(gfr);
  };

  const renderRenalStatus = () => {
    let color = "bg-gray-200 dark:bg-gray-700";
    let text = "Enter creatinine value";
    let textColor = "text-gray-600 dark:text-gray-300";
    
    if (renalStatus) {
      if (renalStatus === "normal") {
        color = "bg-green-100 border-green-300 dark:bg-green-900/30";
        textColor = "text-green-800 dark:text-green-300";
        text = translationWithDefaults.normal;
      } else if (renalStatus === "mild") {
        color = "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30";
        textColor = "text-yellow-800 dark:text-yellow-300";
        text = translationWithDefaults.mild;
      } else if (renalStatus === "moderate") {
        color = "bg-orange-100 border-orange-300 dark:bg-orange-900/30";
        textColor = "text-orange-800 dark:text-orange-300";
        text = translationWithDefaults.moderate;
      } else if (renalStatus === "severe") {
        color = "bg-red-100 border-red-300 dark:bg-red-900/30";
        textColor = "text-red-800 dark:text-red-300";
        text = translationWithDefaults.severe;
      }
    }
    
    return (
      <div className="mt-4 space-y-3">
        <div className={`rounded-lg ${color} border p-3 transition-all duration-300 animate-fade-in`}>
          <div className="flex items-center gap-2">
            {getRenalStatusIcon()}
            <span className={`font-medium ${textColor}`}>
              {isCalculating ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Calculating...
                </span>
              ) : (
                gfr ? `${text} - GFR: ${Math.round(gfr)} mL/min` : text
              )}
            </span>
          </div>
          
          {gfr && !isCalculating && (
            <p className={`mt-2 text-sm ${textColor}`}>
              {getAdjustmentMessage()}
            </p>
          )}
        </div>
        
        {renalStatus === "severe" && (
          <Alert variant="destructive" className="animate-fade-in">
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label 
                  htmlFor="creatinine"
                  className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 mb-2 cursor-help"
                >
                  {translationWithDefaults.creatinineLabel}
                  <Heart className="h-4 w-4 text-gray-400" />
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  {language === "en" 
                    ? "Normal range: 0.7-1.3 mg/dL for men and 0.6-1.1 mg/dL for women"
                    : "Normalni raspon: 0.7-1.3 mg/dL za muškarce i 0.6-1.1 mg/dL za žene"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="relative">
            <Input
              id="creatinine"
              type="number"
              step="0.1"
              min="0.1"
              max="20"
              value={creatinine}
              onChange={(e) => onCreatinineChange(e.target.value)}
              className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors pl-3 pr-10"
              placeholder="e.g., 0.8"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 text-sm">mg/dL</span>
            </div>
          </div>
        </div>
        
        {renderRenalStatus()}
      </div>
    </Card>
  );
}
