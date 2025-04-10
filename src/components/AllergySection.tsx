
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AlertTriangle, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AllergySectionProps {
  allergies: {
    penicillin: boolean;
    cephalosporin: boolean;
    sulfa: boolean;
    macrolide: boolean;
    fluoroquinolone: boolean;
  };
  onAllergyChange: (allergy: string, checked: boolean) => void;
}

export const AllergySection: React.FC<AllergySectionProps> = ({
  allergies,
  onAllergyChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  const allergyTypes = [
    "penicillin",
    "cephalosporin",
    "sulfa",
    "macrolide",
    "fluoroquinolone",
  ] as const;

  const allAllergyIcons = {
    "penicillin": <AlertCircle className="h-3.5 w-3.5" />,
    "cephalosporin": <AlertCircle className="h-3.5 w-3.5" />,
    "sulfa": <AlertCircle className="h-3.5 w-3.5" />,
    "macrolide": <AlertCircle className="h-3.5 w-3.5" />,
    "fluoroquinolone": <AlertCircle className="h-3.5 w-3.5" />,
  };

  const getAllergyStatus = () => {
    const activeAllergies = Object.values(allergies).filter(Boolean).length;
    if (activeAllergies === 0) return "none";
    if (activeAllergies <= 2) return "some";
    return "multiple";
  };

  const allergyStatus = getAllergyStatus();
  
  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              {allergyStatus === "multiple" ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : allergyStatus === "some" ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : (
                <Check className="h-5 w-5 text-green-500" />
              )}
              {t.allergies.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.allergies.subtitle}
            </p>
          </div>
          
          {allergyStatus !== "none" && (
            <div className={cn(
              "text-xs font-medium rounded-full px-2.5 py-1",
              allergyStatus === "multiple" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
            )}>
              {allergyStatus === "multiple" 
                ? `${Object.values(allergies).filter(Boolean).length} allergies` 
                : `${Object.values(allergies).filter(Boolean).length} allergy`}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {allergyTypes.map((allergy) => (
            <motion.div
              key={allergy}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <Button
                type="button"
                variant={allergies[allergy] ? "default" : "outline"}
                onClick={() => onAllergyChange(allergy, !allergies[allergy])}
                className={cn(
                  "w-full transition-all duration-200 rounded-xl h-auto py-3",
                  allergies[allergy] 
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-md" 
                    : "hover:bg-red-50 dark:hover:bg-red-900/20 border-gray-200 dark:border-gray-700"
                )}
              >
                <div className="flex flex-col items-center gap-1.5">
                  {allergies[allergy] ? (
                    <span className="bg-white/20 p-1.5 rounded-full">
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 p-1.5">
                      {allAllergyIcons[allergy]}
                    </span>
                  )}
                  <span className="text-xs font-medium">{t.allergies[allergy]}</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
        
        {allergyStatus !== "none" && (
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Note:</span> Patient allergies will be considered when generating antibiotic recommendations.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
