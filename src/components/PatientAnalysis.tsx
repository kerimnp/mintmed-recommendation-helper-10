import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Activity, AlertCircle, Heart, Scale, Thermometer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { cn } from "@/lib/utils";

interface PatientAnalysisProps {
  infectionSites: string[];
  severity: string;
  symptoms: string;
  bmi?: number;
  temperature?: number;
  heartRate?: number;
  bloodPressure?: string;
}

export const PatientAnalysis: React.FC<PatientAnalysisProps> = ({
  infectionSites,
  severity,
  symptoms,
  bmi,
  temperature,
  heartRate,
  bloodPressure,
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
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { category: "Normal", color: "text-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obese", color: "text-red-500" };
  };

  const renderBMIWheel = () => {
    if (!bmi) return null;
    const { category, color } = getBMICategory(bmi);
    const rotation = (bmi / 40) * 180; // Max BMI scale at 40

    return (
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-gray-200">
            <div 
              className="w-1 h-12 bg-blue-500 origin-bottom transform transition-transform duration-500"
              style={{ transform: `translateX(11px) rotate(${rotation}deg)` }}
            />
          </div>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold">{bmi.toFixed(1)}</span>
            <span className={`text-sm ${color}`}>{category}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderVitalSigns = () => (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {temperature && (
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-orange-500" />
          <span>{temperature}°C</span>
        </div>
      )}
      {heartRate && (
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          <span>{heartRate} BPM</span>
        </div>
      )}
      {bloodPressure && (
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          <span>{bloodPressure} mmHg</span>
        </div>
      )}
      {bmi && (
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-green-500" />
          <span>BMI: {bmi.toFixed(1)}</span>
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">
          {language === "en" ? "Patient Analysis" : "Analiza Pacijenta"}
        </h2>
      </div>

      <div className="flex gap-8">
        <div className="relative w-64 h-96">
          <svg
            viewBox="0 0 100 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head */}
            <circle
              cx="50"
              cy="25"
              r="20"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("head")
              )}
            />

            {/* Body */}
            <rect
              x="35"
              y="45"
              width="30"
              height="60"
              className="fill-gray-200 dark:fill-gray-700 stroke-gray-400"
            />

            {/* Lungs */}
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

            {/* Abdomen */}
            <ellipse
              cx="50"
              cy="120"
              rx="15"
              ry="20"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("abdominal")
              )}
            />

            {/* Arms */}
            <rect
              x="15"
              y="45"
              width="10"
              height="50"
              rx="5"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("skin")
              )}
            />
            <rect
              x="75"
              y="45"
              width="10"
              height="50"
              rx="5"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("skin")
              )}
            />

            {/* Legs */}
            <rect
              x="35"
              y="105"
              width="12"
              height="60"
              rx="6"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("skin")
              )}
            />
            <rect
              x="53"
              y="105"
              width="12"
              height="60"
              rx="6"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("skin")
              )}
            />
          </svg>

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

        <div className="flex-1 space-y-4">
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

          <div>
            <h3 className="font-medium mb-2">
              {language === "en" ? "Severity" : "Ozbiljnost"}:
            </h3>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm",
                severity === "severe"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                  : severity === "moderate"
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
              )}
            >
              {t.infectionDetails.severityLevels[severity as keyof typeof t.infectionDetails.severityLevels]}
            </span>
          </div>

          {renderBMIWheel()}
          {renderVitalSigns()}

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