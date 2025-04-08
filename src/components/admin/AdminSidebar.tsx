
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
    <aside className="fixed top-0 left-0 right-0 z-20 lg:relative lg:top-auto lg:left-auto lg:right-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-800">
      <div className="flex flex-col h-full lg:h-screen lg:w-64 p-4">
        <Link to="/" className="flex items-center gap-3 mb-8 px-2">
          <img 
            src={theme === 'dark' 
              ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
              : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
            } 
            alt="Horalix Logo" 
            className="h-8 w-auto"
          />
          <div className="hidden lg:flex flex-col">
            <span className="font-medium">Horalix Admin</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Control Panel</span>
          </div>
        </Link>
        
        <div className="hidden lg:flex flex-col space-y-1 w-full">
          <Link to="/" className="w-full">
            <Button variant="ghost" className="justify-start w-full mb-4 rounded-lg">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <p className="px-3 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mb-1">Main Navigation</p>
          
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button 
                key={item.id}
                variant="ghost"
                className={cn(
                  "justify-start w-full rounded-lg",
                  activeTab === item.id 
                    ? "bg-medical-primary/10 text-medical-primary font-medium" 
                    : ""
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 my-4 pt-4">
            <p className="px-3 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mb-1">Administration</p>
            
            <Button variant="ghost" className="justify-start w-full rounded-lg">
              <Users className="h-4 w-4 mr-3" />
              User Management
            </Button>
            
            <Button variant="ghost" className="justify-start w-full rounded-lg">
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="lg:hidden flex justify-between">
          {navItems.map((item) => (
            <Button 
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "px-3 py-2",
                activeTab === item.id ? "bg-medical-primary/10 text-medical-primary" : ""
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        
        <div className="mt-auto hidden lg:block pt-4">
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Horalix © 2025
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
