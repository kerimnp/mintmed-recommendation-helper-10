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
  Users,
  PillIcon,
  LogOut,
  LayoutDashboard,
  History
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
// import { useAuth } from "@/contexts/AuthContext"; // Import if needed for dynamic user info

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const { theme } = useTheme();
  // const { signOut } = useAuth(); // Uncomment if using context signOut

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Overview and key metrics" },
    { id: "history", label: "Patient History", icon: History, description: "View patient medical history" },
    { id: "antibiotics", label: "Antibiotics", icon: Shield, description: "Antibiotic guidelines and usage" },
    { id: "effectiveness", label: "Effectiveness", icon: PieChart, description: "Treatment effectiveness data" },
    { id: "resistance", label: "Resistance", icon: Microscope, description: "Resistance pattern mapping" },
    { id: "regional", label: "Regional", icon: MapPin, description: "Regional adaptation" },
    { id: "education", label: "Education", icon: BookOpen, description: "Educational resources" },
    { id: "guidelines", label: "Guidelines", icon: PillIcon, description: "Clinical guidelines" },
  ];

  const handleLogout = async () => {
    // await signOut(); // Use this if integrating with AuthContext signOut
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    // Navigate to home page
    setTimeout(() => window.location.href = "/", 500); // Consider using useNavigate from react-router-dom
  };

  return (
    <aside className="fixed top-0 left-0 right-0 z-20 lg:relative lg:top-auto lg:left-auto lg:right-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-800 h-full">
      <div className="flex flex-col h-full lg:h-screen lg:w-64 p-4">
        <Link to="/" className="flex items-center gap-3 mb-8 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
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
                  "justify-start w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors",
                  activeTab === item.id 
                    ? "bg-medical-primary/10 text-medical-primary font-medium" 
                    : ""
                )}
                onClick={() => setActiveTab(item.id)}
                title={item.description}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 my-4 pt-4">
            <p className="px-3 text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mb-1">Administration</p>
            
            <Button 
              variant="ghost" 
              className="justify-start w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => {
                toast({
                  title: "User Management",
                  description: "User management will be implemented soon.",
                });
              }}
            >
              <Users className="h-4 w-4 mr-3" />
              User Management
            </Button>
            
            <Button 
              variant="ghost" 
              className="justify-start w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => {
                toast({
                  title: "Settings",
                  description: "Settings will be implemented soon.",
                });
              }}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="lg:hidden flex justify-around overflow-x-auto no-scrollbar py-2">
          {navItems.map((item) => (
            <Button 
              key={item.id}
              variant="ghost"
              size="icon"
              className={cn(
                "flex flex-col items-center h-auto p-2 rounded-lg",
                activeTab === item.id ? "bg-medical-primary/10 text-medical-primary" : "text-gray-600 dark:text-gray-400"
              )}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
        
        <div className="mt-auto hidden lg:block pt-4">
          <Separator className="mb-4" />
          <Button 
            variant="ghost" 
            className="justify-start w-full rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Log out
          </Button>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Horalix © 2025
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
