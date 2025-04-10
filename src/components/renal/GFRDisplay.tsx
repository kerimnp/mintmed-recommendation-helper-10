
import React from "react";
import { Activity, AlertCircle, TrendingDown, Check, FilePlus } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { getGFRCategory, getGFRInterpretation } from "@/utils/antibioticRecommendations/renalAdjustments/renalReferenceRanges";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
    if (!renalStatus) return "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    
    if (gfr === null) return "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    
    const statusClasses = {
      normal: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30",
      mild: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900/30",
      moderate: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-900/30",
      severe: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30"
    };
    
    return statusClasses[renalStatus as keyof typeof statusClasses] || "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
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

  const getTextColor = () => {
    if (!renalStatus) return "text-gray-600 dark:text-gray-400";
    
    switch (renalStatus) {
      case "normal": return "text-green-700 dark:text-green-400";
      case "mild": return "text-yellow-700 dark:text-yellow-400";
      case "moderate": return "text-orange-700 dark:text-orange-400";
      case "severe": return "text-red-700 dark:text-red-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  if (!gfr && !isCalculating && !renalStatus) {
    return (
      <div className="mt-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400">
        <FilePlus className="h-6 w-6 mx-auto mb-2 opacity-50" />
        <p className="text-sm">
          {language === "en" 
            ? "Enter patient data and creatinine value to calculate renal function"
            : "Unesite podatke o pacijentu i vrijednost kreatinina za izračun bubrežne funkcije"}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <div className={`rounded-lg ${getStatusClass()} border p-3 sm:p-4 transition-all duration-300 animate-fade-in`}>
        <div className="flex items-center gap-2">
          {getRenalStatusIcon()}
          <span className={`font-medium ${getTextColor()}`}>
            {isCalculating ? (
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                {language === "en" ? "Calculating..." : "Izračunavanje..."}
              </span>
            ) : (
              gfr ? (
                <div className="flex items-center gap-2 flex-wrap">
                  {getStatusText()}
                  <Badge variant="outline" className="ml-1 sm:ml-2 font-mono">
                    {Math.round(gfr)} mL/min
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
            
            <div className={`grid ${isMobile ? 'grid-cols-2 gap-1 mt-2' : 'grid-cols-4 gap-2 mt-4'} text-center text-xs`}>
              <div className={`p-1 rounded ${renalStatus === "severe" ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 font-semibold" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>
                &lt; 30
              </div>
              <div className={`p-1 rounded ${renalStatus === "moderate" ? "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 font-semibold" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>
                30-59
              </div>
              {isMobile && <div className="col-span-2 h-1"></div>}
              <div className={`p-1 rounded ${renalStatus === "mild" ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 font-semibold" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>
                60-89
              </div>
              <div className={`p-1 rounded ${renalStatus === "normal" ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 font-semibold" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>
                &gt;= 90
              </div>
            </div>
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
