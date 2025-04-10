
import React from "react";
import { Card } from "../ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { gfrRangeCategories } from "@/utils/antibioticRecommendations/renalAdjustments/renalReferenceRanges";

export const ReferenceChart: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {language === "en" ? "GFR Reference Ranges" : "Referentni rasponi GFR"}
      </h4>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        {language === "en" 
          ? "The normal range for GFR depends on age, weight, and muscle mass. In most healthy people, the normal GFR is 90 or higher."
          : "Normalni raspon GFR ovisi o dobi, težini i mišićnoj masi. Kod većine zdravih ljudi, normalni GFR je 90 ili više."}
      </div>
      
      <div className="grid gap-2">
        {gfrRangeCategories.map((category) => (
          <div 
            key={category.range} 
            className={`px-3 py-2 rounded-md border flex justify-between items-center ${category.colorClass}`}
          >
            <div>
              <span className="font-medium">{category.range}</span>
              <span className="mx-2">-</span>
              <span>{category.status}</span>
            </div>
            <div className="text-sm">
              {category.min === null 
                ? `< ${category.max}`
                : category.max === null 
                  ? `≥ ${category.min}` 
                  : `${category.min} - ${category.max}`}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 p-3 rounded-md border border-gray-200 dark:border-gray-700">
        <p className="mb-2 font-medium">
          {language === "en" ? "Important Note:" : "Važna napomena:"}
        </p>
        <p>
          {language === "en" 
            ? "Test results may vary depending on your age, gender, health history, and other factors. Your results may differ depending on the lab used. Always consult with your healthcare provider about what your test results mean for you."
            : "Rezultati testa mogu varirati ovisno o vašoj dobi, spolu, zdravstvenoj povijesti i drugim faktorima. Vaši rezultati mogu se razlikovati ovisno o korištenom laboratoriju. Uvijek se posavjetujte sa svojim liječnikom o tome što vaši rezultati testa znače za vas."}
        </p>
      </div>
    </div>
  );
};
