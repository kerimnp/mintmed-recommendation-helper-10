
import React from "react";
import { EducationArticles } from "@/components/admin/education/EducationArticles";

export const EducationTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Educational Resources</h2>
        <p className="text-gray-500 dark:text-gray-400 ml-3 text-sm">
          Educational materials on antimicrobial therapy principles and best practices
        </p>
      </div>
      
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <EducationArticles />
        </div>
      </div>
    </div>
  );
};
