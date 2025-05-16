import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { Link, useNavigate } from "react-router-dom";
import { Home, Bell, Sun, Moon, Settings, Search, Menu, LogOut, LayoutDashboard } from "lucide-react"; // Added LayoutDashboard
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast as sonnerToast } from "sonner";

const AdminDashboard = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard"); // Changed default to "dashboard"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    } else {
      // If no tab param, ensure URL reflects default activeTab
      navigate(`/admin?tab=${activeTab}`, { replace: true });
    }
  }, []); // Removed activeTab from dependency array to avoid loop on initial load

  // Update URL when activeTab changes
  useEffect(() => {
    navigate(`/admin?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);


  const handleLogout = () => {
    // In a real app, this would call an auth logout function
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    // Navigate to home page
    setTimeout(() => navigate("/"), 500);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      // Show success toast
      toast({
        title: "Search executed",
        description: `Searching for: "${searchTerm}"`,
      });
      
      // Determine which tab to navigate to based on search term
      const lowerSearchTerm = searchTerm.toLowerCase();
      
      if (lowerSearchTerm.includes("dashboard")) {
        setActiveTab("dashboard");
      } else if (lowerSearchTerm.includes("antibiotic") || lowerSearchTerm.includes("drug") || lowerSearchTerm.includes("medication")) {
        setActiveTab("antibiotics");
      } else if (lowerSearchTerm.includes("resist") || lowerSearchTerm.includes("pattern")) {
        setActiveTab("resistance");
      } else if (lowerSearchTerm.includes("region") || lowerSearchTerm.includes("local")) {
        setActiveTab("regional");
      } else if (lowerSearchTerm.includes("guide") || lowerSearchTerm.includes("protocol")) {
        setActiveTab("guidelines");
      } else if (lowerSearchTerm.includes("effect") || lowerSearchTerm.includes("outcome")) {
        setActiveTab("effectiveness");
      } else if (lowerSearchTerm.includes("educat") || lowerSearchTerm.includes("learn") || lowerSearchTerm.includes("quiz")) {
        setActiveTab("education");
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800 overflow-hidden">
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

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Settings</DialogTitle>
            <DialogDescription>
              Customize your dashboard experience and account preferences
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="appearance">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reduced-motion">Reduced Motion</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Minimize animations throughout the interface</p>
                  </div>
                  <Switch id="reduced-motion" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-view">Compact View</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing and size of UI elements</p>
                  </div>
                  <Switch id="compact-view" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifs">Email Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive system notifications via email</p>
                  </div>
                  <Switch id="email-notifs" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifs">Push Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive in-app notifications</p>
                  </div>
                  <Switch id="push-notifs" defaultChecked />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/lovable.svg" /> {/* Placeholder - update if a specific image is desired */}
                    <AvatarFallback>KS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Dr. Kerim Sabic</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Head of Clinical Informatics</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="flex-1 overflow-hidden w-full flex flex-col h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                {/* SheetContent is part of AdminSidebar mobile setup */}
              </Sheet>
              
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
            <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-md w-full relative mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search dashboard, guidelines, drugs..."
                  className="pl-9 border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 h-9 rounded-full w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
            
            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => {
                sonnerToast.success("No new notifications");
              }}>
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
                      <AvatarImage src="/lovable.svg" /> {/* Placeholder - update if specific image desired */}
                      <AvatarFallback>KS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <div className="flex items-center p-2 gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/lovable.svg" /> {/* Placeholder - update if specific image desired */}
                      <AvatarFallback>KS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Dr. Kerim Sabic</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">kerim.sabic@horalix.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    sonnerToast.success("Profile view will be implemented soon");
                  }}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-700" onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-full mx-auto p-4 md:p-6 pt-6"> {/* Changed max-w-7xl to max-w-full */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Page heading */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white capitalize">
                    {activeTab.replace('-', ' ')} Overview
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Monitor key metrics and manage clinical data
                  </p>
                </div>
                
                {/* Mobile search bar */}
                <form onSubmit={handleSearch} className="md:hidden w-full">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search..."
                      className="pl-9 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
                
                <div className="flex items-center gap-3">
                  <Link to="/">
                    <Button variant="outline" className="flex items-center gap-2 rounded-full">
                      <Home className="h-4 w-4" />
                      <span className="hidden md:inline">Back to Home</span>
                    </Button>
                  </Link>
                  
                  <DialogTrigger asChild>
                     <Button 
                        variant="default" 
                        className="bg-medical-primary hover:bg-medical-primary/90 rounded-full flex items-center gap-2"
                        onClick={() => setIsSettingsOpen(true)} // Trigger settings dialog
                      >
                        <Settings className="h-4 w-4" />
                        <span className="hidden md:inline">Settings</span>
                      </Button>
                  </DialogTrigger>
                </div>
              </div>
              
              <DashboardContent activeTab={activeTab} searchTerm={searchTerm} />
            </motion.div>
            
            <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 mt-8">
              <p>© 2025 Horalix Clinical Decision Support System</p>
              <p className="mt-1">Version 1.0.0 | Last updated: May 16, 2025</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
