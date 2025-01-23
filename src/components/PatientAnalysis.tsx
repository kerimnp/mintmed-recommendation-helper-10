import React from "react";
import { Card } from "./ui/card";
import { Activity, AlertCircle, Heart, Scale, Thermometer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface PatientAnalysisProps {
  infectionSites: string[];
  severity: string;
  symptoms: string;
  bmi: number | null;
}

export const PatientAnalysis: React.FC<PatientAnalysisProps> = ({
  infectionSites,
  severity,
  symptoms,
  bmi
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  const getOrganColor = (organ: string) => {
    if (infectionSites.includes(organ)) {
      return severity === "severe" 
        ? "fill-red-600 animate-pulse" 
        : severity === "moderate"
        ? "fill-red-400"
        : "fill-red-300";
    }
    return "fill-gray-200 dark:fill-gray-700";
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-yellow-500" };
    if (bmi < 25) return { label: "Normal", color: "text-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
    return { label: "Obese", color: "text-red-500" };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "text-red-500";
      case "moderate":
        return "text-orange-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">
          {language === "en" ? "Patient Analysis" : "Analiza Pacijenta"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96">
          {/* Human body visualization */}
          <svg
            viewBox="0 0 100 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head with more detail */}
            <circle
              cx="50"
              cy="25"
              r="20"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("head")
              )}
            />
            <ellipse
              cx="43"
              cy="20"
              rx="2"
              ry="3"
              className="fill-gray-400"
            />
            <ellipse
              cx="57"
              cy="20"
              rx="2"
              ry="3"
              className="fill-gray-400"
            />
            <path
              d="M45 30 Q50 35 55 30"
              fill="none"
              stroke="gray"
              strokeWidth="1"
            />

            {/* Neck */}
            <rect
              x="45"
              y="45"
              width="10"
              height="5"
              className="fill-gray-200 dark:fill-gray-700"
            />

            {/* Body with more anatomical detail */}
            <path
              d="M35 50 Q50 45 65 50 L65 100 Q50 105 35 100 Z"
              className="fill-gray-200 dark:fill-gray-700 stroke-gray-400"
            />

            {/* Lungs with more detail */}
            <path
              d="M30 55 Q25 75 30 95 L40 95 Q35 75 40 55 Z"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("respiratory")
              )}
            />
            <path
              d="M70 55 Q75 75 70 95 L60 95 Q65 75 60 55 Z"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("respiratory")
              )}
            />

            {/* Abdomen with more detail */}
            <path
              d="M35 100 Q50 105 65 100 L65 130 Q50 135 35 130 Z"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("abdominal")
              )}
            />

            {/* Arms with more anatomical detail */}
            <path
              d="M15 50 Q20 75 25 100"
              className={cn(
                "stroke-gray-400 fill-none transition-colors duration-300",
                getOrganColor("skin")
              )}
              strokeWidth="10"
            />
            <path
              d="M85 50 Q80 75 75 100"
              className={cn(
                "stroke-gray-400 fill-none transition-colors duration-300",
                getOrganColor("skin")
              )}
              strokeWidth="10"
            />

            {/* Legs with more detail */}
            <path
              d="M35 130 L40 180"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("skin")
              )}
              strokeWidth="12"
            />
            <path
              d="M65 130 L60 180"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("skin")
              )}
              strokeWidth="12"
            />
          </svg>

          {/* Infection indicators */}
          {infectionSites.map((site) => (
            <div
              key={site}
              className="absolute"
              style={{
                ...getPositionForSite(site),
                transition: "all 0.3s ease-in-out",
              }}
            >
              <AlertCircle className="h-6 w-6 text-red-500 animate-pulse" />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Health Indicators Section */}
          <div className="space-y-4">
            {/* Severity Indicator */}
            <div className="flex items-center gap-2">
              <Thermometer className={cn("h-5 w-5", getSeverityColor(severity))} />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    {language === "en" ? "Severity" : "Ozbiljnost"}
                  </span>
                  <span className={cn("text-sm font-medium", getSeverityColor(severity))}>
                    {t.infectionDetails.severityLevels[severity as keyof typeof t.infectionDetails.severityLevels]}
                  </span>
                </div>
                <Progress 
                  value={severity === "severe" ? 100 : severity === "moderate" ? 66 : 33} 
                  className={cn(
                    "h-2",
                    severity === "severe" ? "bg-red-200" : 
                    severity === "moderate" ? "bg-orange-200" : "bg-yellow-200"
                  )}
                />
              </div>
            </div>

            {/* BMI Indicator */}
            {bmi && (
              <div className="flex items-center gap-2">
                <Scale className={cn("h-5 w-5", getBMICategory(bmi).color)} />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">BMI</span>
                    <span className={cn("text-sm font-medium", getBMICategory(bmi).color)}>
                      {bmi.toFixed(1)} - {getBMICategory(bmi).label}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(100, (bmi / 40) * 100)} 
                    className={cn("h-2", getBMICategory(bmi).color.replace("text-", "bg-").concat("/20"))}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Infection Sites */}
          <div>
            <h3 className="font-medium mb-2">
              {language === "en" ? "Infection Sites" : "Mjesta Infekcije"}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {infectionSites.map((site) => (
                <span
                  key={site}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm",
                    severity === "severe"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                      : severity === "moderate"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                  )}
                >
                  {t.infectionDetails.sites[site as keyof typeof t.infectionDetails.sites]}
                </span>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          {symptoms && (
            <div>
              <h3 className="font-medium mb-2">
                {language === "en" ? "Symptoms" : "Simptomi"}:
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{symptoms}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const getPositionForSite = (site: string): React.CSSProperties => {
  switch (site) {
    case "respiratory":
      return { top: "30%", left: "50%", transform: "translate(-50%, -50%)" };
    case "urinary":
      return { top: "60%", left: "50%", transform: "translate(-50%, -50%)" };
    case "skin":
      return { top: "40%", left: "85%", transform: "translate(-50%, -50%)" };
    case "abdominal":
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    case "cns":
      return { top: "10%", left: "50%", transform: "translate(-50%, -50%)" };
    case "ear":
      return { top: "15%", left: "70%", transform: "translate(-50%, -50%)" };
    case "eye":
      return { top: "15%", left: "30%", transform: "translate(-50%, -50%)" };
    case "dental":
      return { top: "20%", left: "50%", transform: "translate(-50%, -50%)" };
    default:
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }
};