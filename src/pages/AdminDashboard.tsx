
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { Link } from "react-router-dom";
import { Home, Bell, Sun, Moon, Settings, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminDashboard = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("resistance");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure theme is available on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get tab from URL on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary overflow-auto">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0">
          <AdminSidebar activeTab={activeTab} setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsMobileMenuOpen(false);
          }} />
        </SheetContent>
      </Sheet>

      <main className="flex-1 overflow-auto w-full">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                    : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
                  } 
                  alt="Horalix Logo" 
                  className="h-8 w-auto"
                />
                <span className="font-semibold text-lg hidden sm:inline-block">Horalix</span>
              </Link>
            </div>
            
            {/* Search */}
            <div className="hidden md:flex items-center max-w-md w-full relative mx-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search guidelines, drugs, or resistance data..."
                className="pl-9 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://ui.shadcn.com/avatars/03.png" />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link to="/">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <div className="max-w-7xl mx-auto p-4 md:p-6 pt-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Page heading */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Monitor resistance patterns and antibiotic effectiveness
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Link to="/">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span className="hidden md:inline">Back to Home</span>
                  </Button>
                </Link>
                <Button variant="default" className="bg-medical-primary hover:bg-medical-primary/90">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
            
            <DashboardContent activeTab={activeTab} />
          </motion.div>
          
          <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 mt-8">
            <p>© 2025 Horalix Clinical Decision Support System</p>
            <p className="mt-1">Version 1.0.0 | Last updated: April 10, 2025</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
