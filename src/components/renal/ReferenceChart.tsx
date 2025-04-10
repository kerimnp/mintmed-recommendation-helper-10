
import React, { useState } from "react";
import { gfrRangeCategories } from "@/utils/antibioticRecommendations/renalAdjustments/renalReferenceRanges";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

export const ReferenceChart: React.FC = () => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="mt-6 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={toggleExpand}
        className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-medical-primary" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {language === "en" ? "GFR Reference Ranges" : "Referentni rasponi GFR"}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {language === "en" 
              ? "Normal ranges for Glomerular Filtration Rate (GFR) in adults:"
              : "Normalni rasponi za stopu glomerularne filtracije (GFR) kod odraslih:"}
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === "en" ? "Stage" : "Stadij"}
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    GFR (mL/min)
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === "en" ? "Status" : "Status"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {gfrRangeCategories.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-3 py-2 whitespace-nowrap text-gray-700 dark:text-gray-300">{category.range}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {category.min === null 
                        ? `≤ ${category.max}` 
                        : category.max === null 
                          ? `≥ ${category.min}` 
                          : `${category.min}-${category.max}`}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${category.colorClass.split(' ').slice(0, 2).join(' ')}`}>
                              {category.status}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm max-w-xs">{category.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 text-xs rounded border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              {language === "en" 
                ? "Note: Test results may vary depending on your age, gender, health history, and other factors. Your test results may be different depending on the lab used. Consult with your healthcare provider for interpretation."
                : "Napomena: Rezultati testa mogu varirati ovisno o vašoj dobi, spolu, zdravstvenoj povijesti i drugim faktorima. Vaši rezultati testa mogu biti različiti ovisno o korištenom laboratoriju. Posavjetujte se sa svojim liječnikom za tumačenje."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
