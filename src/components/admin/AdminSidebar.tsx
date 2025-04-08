
import React from "react";
import { Link } from "react-router-dom";
import { Home, Settings, Users } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const { theme } = useTheme();
  
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 z-20">
      <div className="flex flex-col h-full p-4">
        <Link to="/" className="flex items-center gap-3 mb-8 px-2">
          <img 
            src={theme === 'dark' 
              ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
              : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
            } 
            alt="Horalix Logo" 
            className="h-8 w-auto"
          />
          <div className="flex flex-col">
            <span className="font-medium">Horalix Admin</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Control Panel</span>
          </div>
        </Link>
        
        <Link to="/" className="w-full">
          <Button variant="ghost" className="justify-start w-full mb-6 rounded-lg">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
          
        <div className="border-t border-gray-200 dark:border-gray-800 my-4 pt-4">
          <p className="px-3 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mb-2">Administration</p>
          
          <Button variant="ghost" className="justify-start w-full rounded-lg">
            <Users className="h-4 w-4 mr-3" />
            User Management
          </Button>
          
          <Button variant="ghost" className="justify-start w-full rounded-lg">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
        </div>
        
        <div className="mt-auto block pt-4">
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
