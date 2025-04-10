
import React from "react";
import { AntibioticsTab } from "./AntibioticsTab";
import { EffectivenessTab } from "./EffectivenessTab";
import { ResistanceTab } from "./ResistanceTab";
import { RegionalTab } from "./RegionalTab";
import { EducationTab } from "./EducationTab";
import { GuidelinesTab } from "./GuidelinesTab";
import { DashboardTabs } from "./DashboardTabs";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardContentProps {
  activeTab: string;
}

export const DashboardContent = ({ activeTab }: DashboardContentProps) => {
  return (
    <div className="space-y-6">
      <DashboardTabs activeTab={activeTab} setActiveTab={(tab) => window.history.pushState(null, '', `?tab=${tab}`)} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "antibiotics" && <AntibioticsTab />}
          {activeTab === "effectiveness" && <EffectivenessTab />}
          {activeTab === "resistance" && <ResistanceTab />}
          {activeTab === "regional" && <RegionalTab />}
          {activeTab === "education" && <EducationTab />}
          {activeTab === "guidelines" && <GuidelinesTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
