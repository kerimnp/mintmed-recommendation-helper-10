
import React from "react";
import { 
  TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Shield, PieChart, Microscope, MapPin, BookOpen } from "lucide-react";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  return (
    <div className="w-full">
      <TabsList className="w-full grid grid-cols-3 lg:grid-cols-5 mb-8">
        <TabsTrigger value="antibiotics" className="flex items-center gap-2" onClick={() => setActiveTab("antibiotics")}>
          <Shield className="h-4 w-4" />
          <span className="hidden md:inline">Antibiotics</span>
        </TabsTrigger>
        <TabsTrigger value="effectiveness" className="flex items-center gap-2" onClick={() => setActiveTab("effectiveness")}>
          <PieChart className="h-4 w-4" />
          <span className="hidden md:inline">Effectiveness</span>
        </TabsTrigger>
        <TabsTrigger value="resistance" className="flex items-center gap-2" onClick={() => setActiveTab("resistance")}>
          <Microscope className="h-4 w-4" />
          <span className="hidden md:inline">Resistance</span>
        </TabsTrigger>
        <TabsTrigger value="regional" className="flex items-center gap-2" onClick={() => setActiveTab("regional")}>
          <MapPin className="h-4 w-4" />
          <span className="hidden md:inline">Regional</span>
        </TabsTrigger>
        <TabsTrigger value="education" className="flex items-center gap-2" onClick={() => setActiveTab("education")}>
          <BookOpen className="h-4 w-4" />
          <span className="hidden md:inline">Education</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
