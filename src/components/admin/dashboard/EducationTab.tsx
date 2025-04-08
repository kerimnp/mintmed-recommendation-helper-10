
import React from "react";
import { EducationArticles } from "@/components/admin/education/EducationArticles";

export const EducationTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Educational Resources</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Evidence-based clinical resources for antimicrobial therapy
          </p>
        </div>
      </div>
      
      <EducationArticles />
    </div>
  );
};
