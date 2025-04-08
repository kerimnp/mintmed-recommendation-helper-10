
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
    <div className="space-y-6">
      <DashboardTabs activeTab={activeTab} setActiveTab={(tab) => window.history.pushState(null, '', `?tab=${tab}`)} />
      
      <div className="animate-fade-in">
        {activeTab === "antibiotics" && <AntibioticsTab />}
        {activeTab === "effectiveness" && <EffectivenessTab />}
        {activeTab === "resistance" && <ResistanceTab />}
        {activeTab === "regional" && <RegionalTab />}
        {activeTab === "education" && <EducationTab />}
      </div>
    </div>
  );
};
