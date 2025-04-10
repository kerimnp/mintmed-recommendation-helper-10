
import React from "react";
import { 
  Shield, 
  PieChart, 
  Microscope, 
  MapPin, 
  BookOpen,
  PillIcon 
} from "lucide-react";
import { motion } from "framer-motion";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  const tabs = [
    { id: "antibiotics", icon: Shield, label: "Antibiotics" },
    { id: "effectiveness", icon: PieChart, label: "Effectiveness" },
    { id: "resistance", icon: Microscope, label: "Resistance" },
    { id: "regional", icon: MapPin, label: "Regional" },
    { id: "education", icon: BookOpen, label: "Education" },
    { id: "guidelines", icon: PillIcon, label: "Guidelines" }
  ];

  return (
    <div className="px-1 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-md border border-gray-100 dark:border-gray-800 mb-6">
      <div className="flex overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-1 items-center justify-center px-4 py-3 min-w-[120px] rounded-lg transition-all ${
              activeTab === tab.id 
                ? "text-white font-medium" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabs"
                className="absolute inset-0 bg-gradient-to-r from-medical-primary to-medical-accent rounded-lg"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative flex items-center">
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "mr-2" : "mx-auto"}`} />
              <span className={`${activeTab === tab.id ? "block" : "sr-only md:not-sr-only md:block md:mt-1 md:text-xs"}`}>
                {tab.label}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
