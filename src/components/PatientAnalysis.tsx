import React from "react";
import { Card } from "./ui/card";
import { Activity, Heart, Scale, Thermometer, Eye, Bone, Droplet, Bandage, Brain, Stethoscope } from "lucide-react";
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

  const getInfectionIcon = (site: string) => {
    switch (site) {
      case "dental":
        return <Bone className="h-6 w-6 text-blue-500" />;
      case "eye":
        return <Eye className="h-6 w-6 text-green-500" />;
      case "bone":
        return <Bone className="h-6 w-6 text-orange-500" />;
      case "urinary":
        return <Droplet className="h-6 w-6 text-yellow-500" />;
      case "abdominal":
        return <Stethoscope className="h-6 w-6 text-purple-500" />;
      case "wound":
        return <Bandage className="h-6 w-6 text-red-500" />;
      case "cns":
        return <Brain className="h-6 w-6 text-pink-500" />;
      default:
        return <Activity className="h-6 w-6 text-gray-500" />;
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 16) return { category: "Severe Thinness", color: "text-blue-700", bgColor: "bg-blue-700" };
    if (bmi < 17) return { category: "Moderate Thinness", color: "text-blue-500", bgColor: "bg-blue-500" };
    if (bmi < 18.5) return { category: "Mild Thinness", color: "text-blue-400", bgColor: "bg-blue-400" };
    if (bmi < 25) return { category: "Normal", color: "text-green-500", bgColor: "bg-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500", bgColor: "bg-yellow-500" };
    if (bmi < 35) return { category: "Obese Class I", color: "text-orange-500", bgColor: "bg-orange-500" };
    if (bmi < 40) return { category: "Obese Class II", color: "text-red-500", bgColor: "bg-red-500" };
    return { category: "Obese Class III", color: "text-red-700", bgColor: "bg-red-700" };
  };

  const renderBMIWheel = () => {
    if (!bmi) return null;
    const { category, color } = getBMICategory(bmi);
    const rotation = Math.min((bmi / 50) * 180, 180);

    return (
      <div className="relative w-64 h-64 mx-auto mt-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700">
            <div className="absolute w-full h-full overflow-hidden">
              <div className="absolute w-1/2 h-full origin-right transform rotate-[-90deg]">
                <div className="w-full h-full rounded-l-full bg-gradient-to-r from-blue-700 via-green-500 to-red-700" />
              </div>
            </div>
          </div>
          
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-[45%] bg-gray-800 dark:bg-white origin-bottom transform -translate-x-1/2 transition-transform duration-500"
            style={{ transform: `translateX(-50%) rotate(${rotation - 90}deg)` }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-gray-800 dark:bg-white" />
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 rounded-full transform scale-[0.85]">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{bmi.toFixed(1)}</span>
            <span className={`text-sm font-medium ${color}`}>{category}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderVitalSigns = () => (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {temperature && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
          <Thermometer className="h-5 w-5 text-orange-500" />
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Temperature</span>
            <p className="font-medium">{temperature}°C</p>
          </div>
        </div>
      )}
      {heartRate && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
          <Heart className="h-5 w-5 text-red-500" />
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</span>
            <p className="font-medium">{heartRate} BPM</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Patient Analysis</h2>
      </div>

      <div className="flex gap-8">
        <div className="relative w-64 h-96">
          <svg
            viewBox="0 0 200 400"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head */}
            <circle
              cx="100"
              cy="50"
              r="35"
              className="stroke-2 stroke-gray-400 fill-gray-200 dark:fill-gray-700"
            />

            {/* Neck */}
            <path
              d="M85 85 C85 85, 100 95, 115 85"
              className="fill-none stroke-gray-400 stroke-2"
            />

            {/* Torso outline */}
            <path
              d="M60 100 
                 C60 150, 60 200, 70 250
                 L130 250
                 C140 200, 140 150, 140 100
                 Z"
              className="fill-none stroke-gray-400 stroke-2"
            />

            {/* Left Lung */}
            <path
              d="M70 120 
                 C70 140, 70 160, 75 180
                 C80 200, 85 220, 90 230
                 L95 230
                 C95 220, 95 200, 95 180
                 C95 160, 95 140, 95 120
                 Z"
              className={cn(
                "transition-all duration-300",
                infectionSites.includes("respiratory")
                  ? severity === "severe"
                    ? "fill-red-600 animate-pulse"
                    : severity === "moderate"
                    ? "fill-red-400"
                    : "fill-red-300"
                  : "fill-gray-200 dark:fill-gray-700"
              )}
            />

            {/* Right Lung */}
            <path
              d="M105 120 
                 C105 140, 105 160, 105 180
                 C105 200, 105 220, 105 230
                 L110 230
                 C115 220, 120 200, 125 180
                 C130 160, 130 140, 130 120
                 Z"
              className={cn(
                "transition-all duration-300",
                infectionSites.includes("respiratory")
                  ? severity === "severe"
                    ? "fill-red-600 animate-pulse"
                    : severity === "moderate"
                    ? "fill-red-400"
                    : "fill-red-300"
                  : "fill-gray-200 dark:fill-gray-700"
              )}
            />

            {/* Kidneys */}
            <path
              d="M80 180 C75 190, 75 200, 80 210 C85 220, 90 220, 95 210 C100 200, 100 190, 95 180 Z"
              className={cn(
                "transition-all duration-300",
                infectionSites.includes("urinary")
                  ? severity === "severe"
                    ? "fill-red-600 animate-pulse"
                    : severity === "moderate"
                    ? "fill-red-400"
                    : "fill-red-300"
                  : "fill-gray-200 dark:fill-gray-700"
              )}
            />
            <path
              d="M105 180 C100 190, 100 200, 105 210 C110 220, 115 220, 120 210 C125 200, 125 190, 120 180 Z"
              className={cn(
                "transition-all duration-300",
                infectionSites.includes("urinary")
                  ? severity === "severe"
                    ? "fill-red-600 animate-pulse"
                    : severity === "moderate"
                    ? "fill-red-400"
                    : "fill-red-300"
                  : "fill-gray-200 dark:fill-gray-700"
              )}
            />

            {/* Arms */}
            <path
              d="M60 120
                 C40 140, 30 180, 25 220"
              className="fill-none stroke-gray-400 stroke-2"
            />
            <path
              d="M140 120
                 C160 140, 170 180, 175 220"
              className="fill-none stroke-gray-400 stroke-2"
            />

            {/* Legs */}
            <path
              d="M70 250
                 C65 300, 60 350, 55 390"
              className="fill-none stroke-gray-400 stroke-2"
            />
            <path
              d="M130 250
                 C135 300, 140 350, 145 390"
              className="fill-none stroke-gray-400 stroke-2"
            />

            {/* Brain (CNS) */}
            <circle
              cx="100"
              cy="40"
              r="25"
              className={cn(
                "transition-all duration-300",
                infectionSites.includes("cns")
                  ? severity === "severe"
                    ? "fill-red-600 animate-pulse"
                    : severity === "moderate"
                    ? "fill-red-400"
                    : "fill-red-300"
                  : "fill-gray-200 dark:fill-gray-700"
              )}
            />

            {/* Infection site indicators with dynamic positioning */}
            {infectionSites.map((site, index) => {
              const position = getPositionForSite(site);
              return (
                <g key={site} transform={`translate(${position.x}, ${position.y})`}>
                  <circle
                    r="8"
                    className={cn(
                      "transition-all duration-300",
                      severity === "severe"
                        ? "fill-red-600 animate-pulse"
                        : severity === "moderate"
                        ? "fill-red-400"
                        : "fill-red-300"
                    )}
                  />
                </g>
              );
            })}
          </svg>

          {/* Overlay infection icons */}
          {infectionSites.map((site) => {
            const position = getPositionForSite(site);
            return (
              <div
                key={site}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(position.x / 200) * 100}%`,
                  top: `${(position.y / 400) * 100}%`,
                }}
              >
                {getInfectionIcon(site)}
              </div>
            );
          })}
        </div>

        <div className="flex-1 space-y-6">
          {renderBMIWheel()}
          {renderVitalSigns()}

          <div className="space-y-4">
            <h3 className="font-medium">Infection Sites:</h3>
            <div className="flex flex-wrap gap-2">
              {infectionSites.map((site) => (
                <span
                  key={site}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm flex items-center gap-2",
                    severity === "severe"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      : severity === "moderate"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                  )}
                >
                  {getInfectionIcon(site)}
                  {t.infectionDetails.sites[site as keyof typeof t.infectionDetails.sites]}
                </span>
              ))}
            </div>
          </div>

          {symptoms && (
            <div className="space-y-2">
              <h3 className="font-medium">Symptoms:</h3>
              <p className="text-gray-600 dark:text-gray-400">{symptoms}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const getPositionForSite = (site: string): { x: number; y: number } => {
  switch (site) {
    case "respiratory":
      return { x: 100, y: 150 };
    case "urinary":
      return { x: 100, y: 220 };
    case "skin":
      return { x: 160, y: 180 };
    case "abdominal":
      return { x: 100, y: 200 };
    case "cns":
      return { x: 100, y: 50 };
    case "ear":
      return { x: 140, y: 60 };
    case "eye":
      return { x: 60, y: 60 };
    case "dental":
      return { x: 100, y: 80 };
    case "bone":
      return { x: 160, y: 250 };
    case "wound":
      return { x: 40, y: 180 };
    default:
      return { x: 100, y: 200 };
  }
};