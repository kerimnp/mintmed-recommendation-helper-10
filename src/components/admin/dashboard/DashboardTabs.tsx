
import React from "react";
import { 
  Tabs,
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Shield, PieChart, Microscope, MapPin, BookOpen } from "lucide-react";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 lg:grid-cols-5 mb-8 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm">
          <TabsTrigger value="antibiotics" className="flex items-center gap-2 py-3">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Antibiotics</span>
          </TabsTrigger>
          <TabsTrigger value="effectiveness" className="flex items-center gap-2 py-3">
            <PieChart className="h-4 w-4" />
            <span className="hidden md:inline">Effectiveness</span>
          </TabsTrigger>
          <TabsTrigger value="resistance" className="flex items-center gap-2 py-3">
            <Microscope className="h-4 w-4" />
            <span className="hidden md:inline">Resistance</span>
          </TabsTrigger>
          <TabsTrigger value="regional" className="flex items-center gap-2 py-3">
            <MapPin className="h-4 w-4" />
            <span className="hidden md:inline">Regional</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2 py-3">
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Education</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
