
import React from "react";
import { ResistanceTab } from "./ResistanceTab";
import { AntibioticsTab } from "./AntibioticsTab";
import { RegionalTab } from "./RegionalTab";
import { EffectivenessTab } from "./EffectivenessTab";
import { GuidelinesTab } from "./GuidelinesTab";
import { EducationTab } from "./EducationTab";
import { ClinicalGuidelines } from "../ClinicalGuidelines";
import { MainDashboardTab } from "./MainDashboardTab";
import { PatientHistoryTab } from "./PatientHistoryTab"; // Import the new tab

interface DashboardContentProps {
  activeTab: string;
  searchTerm?: string;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ 
  activeTab,
  searchTerm = "" 
}) => {
  return (
    <div className="w-full">
      {activeTab === "dashboard" && <MainDashboardTab searchTerm={searchTerm} />}
      {activeTab === "resistance" && <ResistanceTab searchTerm={searchTerm} />}
      {activeTab === "antibiotics" && <AntibioticsTab searchTerm={searchTerm} />}
      {activeTab === "regional" && <RegionalTab searchTerm={searchTerm} />}
      {activeTab === "effectiveness" && <EffectivenessTab searchTerm={searchTerm} />}
      {activeTab === "guidelines" && <GuidelinesTab searchTerm={searchTerm} />}
      {activeTab === "education" && <EducationTab searchTerm={searchTerm} />}
      {activeTab === "clinical-guidelines" && <ClinicalGuidelines searchTerm={searchTerm} />}
      {activeTab === "history" && <PatientHistoryTab searchTerm={searchTerm} />} {/* Add new tab */}
    </div>
  );
};
