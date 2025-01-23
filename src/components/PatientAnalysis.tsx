import React from "react";
import { Card } from "./ui/card";
import { Activity, AlertCircle, Heart, Scale, Thermometer, Eye, Bone, Droplet, Bandage, Brain, Stethoscope, Syringe } from "lucide-react";
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
      case "surgical":
        return <Bandage className="h-6 w-6 text-red-500" />;
      case "cns":
        return <Brain className="h-6 w-6 text-pink-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
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
    const rotation = Math.min((bmi / 50) * 180, 180); // Max BMI scale at 50

    return (
      <div className="relative w-64 h-64 mx-auto mt-6">
        <div className="absolute inset-0">
          {/* BMI Scale Background */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="absolute w-full h-full">
              <div className="absolute w-1/2 h-full origin-right transform rotate-[-90deg]">
                <div className="w-full h-full rounded-l-full bg-gradient-to-r from-blue-700 via-green-500 to-red-700" />
              </div>
            </div>
          </div>
          
          {/* Needle */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-[45%] bg-gray-800 dark:bg-white origin-bottom transform -translate-x-1/2 transition-transform duration-500"
            style={{ transform: `translateX(-50%) rotate(${rotation - 90}deg)` }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-gray-800 dark:bg-white" />
          </div>
          
          {/* Center display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 rounded-full transform scale-[0.85]">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{bmi.toFixed(1)}</span>
            <span className={`text-sm font-medium ${color}`}>{category}</span>
          </div>

          {/* BMI Scale Labels */}
          <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-700" />
              <span>Severe Thinness (&lt;16)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Moderate Thinness (16-17)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span>Mild Thinness (17-18.5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Normal (18.5-25)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Overweight (25-30)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span>Obese Class I (30-35)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Obese Class II (35-40)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-700" />
              <span>Obese Class III (&gt;40)</span>
            </div>
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
      {bloodPressure && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Activity className="h-5 w-5 text-blue-500" />
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Blood Pressure</span>
            <p className="font-medium">{bloodPressure} mmHg</p>
          </div>
        </div>
      )}
      {bmi && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
          <Scale className="h-5 w-5 text-green-500" />
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">BMI</span>
            <p className="font-medium">{bmi.toFixed(1)} kg/m²</p>
          </div>
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

            {/* Neck */}
            <rect
              x="45"
              y="42"
              width="10"
              height="8"
              className="fill-gray-200 dark:fill-gray-700 stroke-gray-400"
            />

            {/* Shoulders */}
            <path
              d="M25 55 L75 55"
              className="stroke-gray-400 stroke-2 fill-none"
            />

            {/* Body */}
            <path
              d="M35 55 
                 C35 65, 35 85, 35 95 
                 L65 95 
                 C65 85, 65 65, 65 55 
                 Z"
              className="fill-gray-200 dark:fill-gray-700 stroke-gray-400"
            />

            {/* Arms */}
            <path
              d="M25 55 
                 C20 65, 18 75, 15 95"
              className="stroke-gray-400 stroke-2 fill-none"
            />
            <path
              d="M75 55 
                 C80 65, 82 75, 85 95"
              className="stroke-gray-400 stroke-2 fill-none"
            />

            {/* Lower Body */}
            <path
              d="M35 95 
                 C35 105, 35 115, 35 125 
                 L65 125 
                 C65 115, 65 105, 65 95 
                 Z"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("abdominal")
              )}
            />

            {/* Legs */}
            <path
              d="M35 125 
                 C33 145, 32 165, 30 185"
              className="stroke-gray-400 stroke-2 fill-none"
            />
            <path
              d="M65 125 
                 C67 145, 68 165, 70 185"
              className="stroke-gray-400 stroke-2 fill-none"
            />

            {/* Organs and infection sites */}
            <circle
              cx="50"
              cy="75"
              r="8"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("respiratory")
              )}
            />
            <circle
              cx="50"
              cy="110"
              r="8"
              className={cn(
                "stroke-gray-400 transition-colors duration-300",
                getOrganColor("urinary")
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
              {getInfectionIcon(site)}
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
                    "px-3 py-1 rounded-full text-sm flex items-center gap-2",
                    severity === "severe"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                      : severity === "moderate"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                  )}
                >
                  {getInfectionIcon(site)}
                  {t.infectionDetails.sites[site as keyof typeof t.infectionDetails.sites]}
                </span>
              ))}
            </div>
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