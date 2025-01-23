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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "fill-red-600 animate-pulse";
      case "moderate":
        return "fill-red-400";
      case "mild":
        return "fill-red-300";
      default:
        return "fill-gray-200 dark:fill-gray-700";
    }
  };

  const renderBMIWheel = () => {
    if (!bmi) return null;

    const getBMICategory = (bmi: number) => {
      if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500", angle: 30 };
      if (bmi < 25) return { label: "Normal", color: "text-green-500", angle: 90 };
      if (bmi < 30) return { label: "Overweight", color: "text-yellow-500", angle: 150 };
      if (bmi < 35) return { label: "Obese Class I", color: "text-orange-500", angle: 210 };
      if (bmi < 40) return { label: "Obese Class II", color: "text-red-500", angle: 270 };
      return { label: "Obese Class III", color: "text-red-700", angle: 330 };
    };

    const category = getBMICategory(bmi);
    const rotation = Math.min((bmi / 50) * 180, 180);

    return (
      <div className="relative w-48 h-48 mx-auto">
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <defs>
              <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="33%" stopColor="#22C55E" />
                <stop offset="66%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#bmiGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <line
              x1="50"
              y1="50"
              x2="85"
              y2="50"
              stroke="currentColor"
              strokeWidth="2"
              className="origin-center transition-transform duration-500"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{bmi.toFixed(1)}</span>
            <span className={`text-sm font-medium ${category.color}`}>
              {category.label}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderHumanBody = () => (
    <svg viewBox="0 0 200 400" className="w-full h-full">
      {/* Head */}
      <circle
        cx="100"
        cy="50"
        r="30"
        className={cn(
          "transition-all duration-300",
          infectionSites.includes("cns")
            ? getSeverityColor(severity)
            : "fill-gray-200 dark:fill-gray-700"
        )}
      />

      {/* Neck */}
      <path
        d="M85 80 C85 80, 100 90, 115 80"
        className="fill-none stroke-gray-400 stroke-2"
      />

      {/* Torso */}
      <path
        d="M70 90 
           C70 140, 70 190, 80 240
           L120 240
           C130 190, 130 140, 130 90
           Z"
        className="fill-gray-200 dark:fill-gray-700 stroke-gray-400 stroke-2"
      />

      {/* Left Lung */}
      <path
        d="M75 110 
           C75 130, 75 150, 80 170
           C85 190, 90 210, 95 220
           L97 220
           C97 210, 97 190, 97 170
           C97 150, 97 130, 97 110
           Z"
        className={cn(
          "transition-all duration-300",
          infectionSites.includes("respiratory")
            ? getSeverityColor(severity)
            : "fill-gray-200 dark:fill-gray-700"
        )}
      />

      {/* Right Lung */}
      <path
        d="M103 110 
           C103 130, 103 150, 103 170
           C103 190, 103 210, 103 220
           L105 220
           C110 210, 115 190, 120 170
           C125 150, 125 130, 125 110
           Z"
        className={cn(
          "transition-all duration-300",
          infectionSites.includes("respiratory")
            ? getSeverityColor(severity)
            : "fill-gray-200 dark:fill-gray-700"
        )}
      />

      {/* Kidneys */}
      <path
        d="M85 180 C80 190, 80 200, 85 210 C90 220, 95 220, 100 210 C105 200, 105 190, 100 180 Z"
        className={cn(
          "transition-all duration-300",
          infectionSites.includes("urinary")
            ? getSeverityColor(severity)
            : "fill-gray-200 dark:fill-gray-700"
        )}
      />

      {/* Arms */}
      <path
        d="M70 100 L40 180"
        className="fill-none stroke-gray-400 stroke-2"
      />
      <path
        d="M130 100 L160 180"
        className="fill-none stroke-gray-400 stroke-2"
      />

      {/* Legs */}
      <path
        d="M80 240 L60 380"
        className="fill-none stroke-gray-400 stroke-2"
      />
      <path
        d="M120 240 L140 380"
        className="fill-none stroke-gray-400 stroke-2"
      />

      {/* Infection Indicators */}
      {infectionSites.map((site, index) => {
        const position = getPositionForSite(site);
        return (
          <g key={site} transform={`translate(${position.x}, ${position.y})`}>
            <circle
              r="8"
              className={cn(
                "transition-all duration-300",
                getSeverityColor(severity)
              )}
            />
            {getInfectionIcon(site)}
          </g>
        );
      })}
    </svg>
  );

  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Patient Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px]">
          {renderHumanBody()}
        </div>

        <div className="space-y-6">
          {renderBMIWheel()}

          <div className="grid grid-cols-2 gap-4">
            {temperature && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Temperature</span>
                  <p className="font-medium">{temperature}°C</p>
                </div>
              </div>
            )}
            {heartRate && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                <Heart className="h-5 w-5 text-red-500" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</span>
                  <p className="font-medium">{heartRate} BPM</p>
                </div>
              </div>
            )}
          </div>

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
      return { x: 100, y: 200 };
    case "skin":
      return { x: 160, y: 180 };
    case "abdominal":
      return { x: 100, y: 190 };
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

const getInfectionIcon = (site: string) => {
  switch (site) {
    case "dental":
      return <Bone className="h-4 w-4 text-blue-500" />;
    case "eye":
      return <Eye className="h-4 w-4 text-green-500" />;
    case "bone":
      return <Bone className="h-4 w-4 text-orange-500" />;
    case "urinary":
      return <Droplet className="h-4 w-4 text-yellow-500" />;
    case "abdominal":
      return <Stethoscope className="h-4 w-4 text-purple-500" />;
    case "wound":
      return <Bandage className="h-4 w-4 text-red-500" />;
    case "cns":
      return <Brain className="h-4 w-4 text-pink-500" />;
    default:
      return <Activity className="h-4 w-4 text-gray-500" />;
  }
};