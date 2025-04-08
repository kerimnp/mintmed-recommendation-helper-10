
import React from "react";
import { AntibioticsTab } from "./AntibioticsTab";
import { EffectivenessTab } from "./EffectivenessTab";
import { ResistanceTab } from "./ResistanceTab";
import { RegionalTab } from "./RegionalTab";
import { EducationTab } from "./EducationTab";
import { DashboardTabs } from "./DashboardTabs";

interface DashboardContentProps {
  activeTab: string;
}

export const DashboardContent = ({ activeTab }: DashboardContentProps) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Monitor resistance patterns and antibiotic effectiveness
        </p>
      </div>
      
      <DashboardTabs activeTab={activeTab} setActiveTab={(tab) => window.history.pushState(null, '', `?tab=${tab}`)} />
      
      <div className="animate-fade-in pt-6">
        {activeTab === "antibiotics" && <AntibioticsTab />}
        {activeTab === "effectiveness" && <EffectivenessTab />}
        {activeTab === "resistance" && <ResistanceTab />}
        {activeTab === "regional" && <RegionalTab />}
        {activeTab === "education" && <EducationTab />}
      </div>
    </div>
  );
};
