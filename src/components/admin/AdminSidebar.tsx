
import React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  PieChart, 
  Microscope, 
  MapPin, 
  BookOpen, 
  Home,
  Settings,
  Users
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const { theme } = useTheme();
  
  const navItems = [
    { id: "antibiotics", label: "Antibiotics", icon: Shield },
    { id: "effectiveness", label: "Effectiveness", icon: PieChart },
    { id: "resistance", label: "Resistance", icon: Microscope },
    { id: "regional", label: "Regional", icon: MapPin },
    { id: "education", label: "Education", icon: BookOpen },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-20 lg:relative lg:top-auto lg:left-auto lg:right-auto bg-white dark:bg-medical-bg-secondary border-b lg:border-r lg:border-b-0 border-black/5 dark:border-medical-text-secondary/10">
      <div className="flex items-center justify-between p-4 lg:p-6 lg:flex-col lg:h-screen lg:w-64">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={theme === 'dark' 
              ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
              : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
            } 
            alt="Horalix Logo" 
            className="h-8 w-auto"
          />
          <div className="flex flex-col">
            <span className="font-semibold">Admin Dashboard</span>
            <span className="text-xs text-muted-foreground">Analytics & Management</span>
          </div>
        </Link>
        
        <div className="hidden lg:flex flex-col gap-1 mt-12 w-full">
          <Link to="/" className="w-full">
            <Button variant="ghost" className="justify-start w-full">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
          
          {navItems.map((item) => (
            <Button 
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "justify-start w-full",
                activeTab === item.id ? "bg-medical-primary text-white" : ""
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
          
          <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
          
          <Button variant="ghost" className="justify-start w-full">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </Button>
          
          <Button variant="ghost" className="justify-start w-full">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
        
        <div className="lg:hidden flex">
          {navItems.map((item) => (
            <Button 
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "px-2",
                activeTab === item.id ? "bg-medical-primary/10 text-medical-primary" : ""
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
