
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { AntibioticsTab } from "./AntibioticsTab";
import { EffectivenessTab } from "./EffectivenessTab";
import { ResistanceTab } from "./ResistanceTab";
import { RegionalTab } from "./RegionalTab";
import { EducationTab } from "./EducationTab";

interface DashboardContentProps {
  activeTab: string;
}

export const DashboardContent = ({ activeTab }: DashboardContentProps) => {
  return (
    <div className="animate-fade-in w-full">
      {activeTab === "antibiotics" && <AntibioticsTab />}
      {activeTab === "effectiveness" && <EffectivenessTab />}
      {activeTab === "resistance" && <ResistanceTab />}
      {activeTab === "regional" && <RegionalTab />}
      {activeTab === "education" && <EducationTab />}
    </div>
  );
};
