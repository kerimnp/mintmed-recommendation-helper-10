import React from "react";
import { Activity, AlertCircle, TrendingDown, Check } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { getGFRCategory, getGFRInterpretation } from "@/utils/antibioticRecommendations/renalAdjustments/renalReferenceRanges";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface GFRDisplayProps {
  gfr: number | null;
  isCalculating: boolean;
  renalStatus: string;
}

export const GFRDisplay: React.FC<GFRDisplayProps> = ({
  gfr,
  isCalculating,
  renalStatus
}) => {
  const { language } = useLanguage();

  const getRenalStatusIcon = () => {
    if (!renalStatus) return <Activity className="h-5 w-5 text-gray-400" />;
    
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
        return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    if (!renalStatus) return language === "en" ? "Enter creatinine value" : "Unesite vrijednost kreatinina";
    
    const translation = {
      normal: language === "en" ? "Normal" : "Normalna",
      mild: language === "en" ? "Mild Impairment" : "Blago oštećenje",
      moderate: language === "en" ? "Moderate Impairment" : "Umjereno oštećenje",
      severe: language === "en" ? "Severe Impairment" : "Teško oštećenje"
    };
    
    return translation[renalStatus as keyof typeof translation];
  };

  const getStatusClass = () => {
    if (!renalStatus) return "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
    
    if (gfr === null) return "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
    
    const category = getGFRCategory(gfr);
    return category.colorClass;
  };

  const getProgressColor = () => {
    if (!renalStatus) return "bg-gray-300";
    
    switch (renalStatus) {
      case "normal": return "bg-green-500";
      case "mild": return "bg-yellow-500";
      case "moderate": return "bg-orange-500";
      case "severe": return "bg-red-500";
      default: return "bg-gray-300";
    }
  };

  const getProgressValue = () => {
    if (!gfr || gfr <= 15) return 15;
    if (gfr >= 90) return 100;
    return (gfr / 90) * 100;
  };

  return (
    <div className="mt-4 space-y-3">
      <div className={`rounded-lg ${getStatusClass()} border p-3 transition-all duration-300 animate-fade-in`}>
        <div className="flex items-center gap-2">
          {getRenalStatusIcon()}
          <span className="font-medium">
            {isCalculating ? (
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                {language === "en" ? "Calculating..." : "Izračunavanje..."}
              </span>
            ) : (
              gfr ? (
                <div className="flex items-center gap-2">
                  {getStatusText()}
                  <Badge variant="outline" className="ml-2 font-mono">
                    GFR: {Math.round(gfr)} mL/min
                  </Badge>
                </div>
              ) : getStatusText()
            )}
          </span>
        </div>
        
        {gfr && !isCalculating && (
          <>
            <div className="mt-3 mb-2">
              <Progress value={getProgressValue()} className={`h-2 ${getProgressColor()}`} />
            </div>
            <p className="mt-2 text-sm">
              {getGFRInterpretation(gfr)}
            </p>
          </>
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
