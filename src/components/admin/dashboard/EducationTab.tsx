
import React from "react";
import { EducationArticles } from "@/components/admin/education/EducationArticles";

export const EducationTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Educational Resources</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          Access evidence-based clinical resources for antimicrobial stewardship. Our curated 
          content provides up-to-date guidance on optimal antimicrobial therapy, resistance mechanisms, 
          and specialized clinical scenarios.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
            <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Clinical Guidelines</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Consensus recommendations from leading organizations on optimal antimicrobial therapy practices.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
            <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Case-Based Learning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Interactive clinical scenarios to develop practical skills in antimicrobial prescribing.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
            <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Research Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Latest findings on resistance mechanisms, novel therapeutics, and emerging pathogens.
            </p>
          </div>
        </div>
      </div>
      
      <EducationArticles />
    </div>
  );
};
