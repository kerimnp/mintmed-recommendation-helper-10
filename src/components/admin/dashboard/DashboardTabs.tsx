
import React from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Shield, 
  PieChart, 
  Microscope, 
  MapPin, 
  BookOpen 
} from "lucide-react";

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
    { id: "education", icon: BookOpen, label: "Education" }
  ];

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md w-full flex justify-between h-auto p-1 rounded-xl">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex-1 px-3 py-2.5 data-[state=active]:bg-medical-primary data-[state=active]:text-white rounded-lg transition-colors"
          >
            <div className="flex flex-col items-center gap-1">
              <tab.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
