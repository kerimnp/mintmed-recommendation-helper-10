
import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast"; 
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { useNavigate, useLocation } from "react-router-dom"; 
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react"; 

import { AdminHeader } from "@/components/admin/dashboard/layout/AdminHeader";
import { SettingsDialog } from "@/components/admin/dashboard/layout/SettingsDialog";
import { MobileMenuSheet } from "@/components/admin/dashboard/layout/MobileMenuSheet";
import { PageHeaderSection } from "@/components/admin/dashboard/layout/PageHeaderSection";
import { AdminFooter } from "@/components/admin/dashboard/layout/AdminFooter";

const AdminDashboard = () => {
  const { user, session, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isUserManagementAuthorized = user?.email === 'kerim@horalix.com';

  const baseValidTabs = ["dashboard", "history", "antibiotics", "resistance", "regional", "guidelines", "effectiveness", "education", "clinical-guidelines"];
  const validTabs = isUserManagementAuthorized ? [...baseValidTabs, "user-management"] : baseValidTabs;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !session) {
      navigate("/auth");
    }
  }, [authLoading, session, navigate]);

  // Effect to synchronize activeTab state with URL
  useEffect(() => {
    if (session) { // Ensure session exists before trying to manage tabs
      const urlParams = new URLSearchParams(location.search);
      let tabParam = urlParams.get('tab');

      if (tabParam === "user-management" && !isUserManagementAuthorized) {
        toast({ title: "Access Denied", description: "You are not authorized to view User Management.", variant: "destructive" });
        tabParam = "dashboard"; // Fallback to dashboard
        navigate(`/admin?tab=dashboard`, { replace: true });
      } else if (!tabParam || !validTabs.includes(tabParam)) {
        tabParam = "dashboard"; // Default to dashboard if tab is invalid or missing
        navigate(`/admin?tab=dashboard`, { replace: true });
      }
      
      if (tabParam !== activeTab) {
        setActiveTab(tabParam);
      }
    }
  }, [session, location.search, navigate, activeTab, isUserManagementAuthorized, validTabs, toast]);

  // Callback to handle tab changes from UI (e.g., sidebar)
  const handleSetActiveTab = useCallback((newTab: string) => {
    if (newTab === "user-management" && !isUserManagementAuthorized) {
      toast({ title: "Access Denied", description: "You are not authorized to view User Management.", variant: "destructive" });
      // Optionally navigate to dashboard or do nothing to prevent URL change
      navigate(`/admin?tab=dashboard`, { replace: true });
      setActiveTab("dashboard"); // Ensure state matches
      return;
    }
    if (validTabs.includes(newTab)) {
      setActiveTab(newTab);
      navigate(`/admin?tab=${newTab}`, { replace: true });
    }
  }, [navigate, isUserManagementAuthorized, validTabs, toast]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Search executed",
        description: `Searching for: "${searchTerm}"`,
      });
      const lowerSearchTerm = searchTerm.toLowerCase();
      if (lowerSearchTerm.includes("dashboard")) handleSetActiveTab("dashboard");
      else if ((lowerSearchTerm.includes("user") || lowerSearchTerm.includes("member")) && isUserManagementAuthorized) handleSetActiveTab("user-management");
      else if (lowerSearchTerm.includes("antibiotic") || lowerSearchTerm.includes("drug") || lowerSearchTerm.includes("medication")) handleSetActiveTab("antibiotics");
      else if (lowerSearchTerm.includes("resist") || lowerSearchTerm.includes("pattern")) handleSetActiveTab("resistance");
      else if (lowerSearchTerm.includes("region") || lowerSearchTerm.includes("local")) handleSetActiveTab("regional");
      else if (lowerSearchTerm.includes("guide") || lowerSearchTerm.includes("protocol")) handleSetActiveTab("guidelines");
      else if (lowerSearchTerm.includes("effect") || lowerSearchTerm.includes("outcome")) handleSetActiveTab("effectiveness");
      else if (lowerSearchTerm.includes("educat") || lowerSearchTerm.includes("learn") || lowerSearchTerm.includes("quiz")) handleSetActiveTab("education");
      else if (lowerSearchTerm.includes("history") || lowerSearchTerm.includes("patient record")) handleSetActiveTab("history");
      else if ((lowerSearchTerm.includes("user") || lowerSearchTerm.includes("member")) && !isUserManagementAuthorized) {
        toast({ title: "Access Denied", description: "User management search is restricted.", variant: "destructive" });
      }
    }
  };

  if (!mounted || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
        <Loader2 className="h-12 w-12 animate-spin text-medical-primary" />
      </div>
    );
  }

  if (!session) {
    return null; 
  }
  
  // Ensure DashboardContent receives a safe tab, especially if redirection is pending
  const currentDisplayTab = (activeTab === "user-management" && !isUserManagementAuthorized) ? "dashboard" : activeTab;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800 overflow-hidden">
      <div className="hidden lg:block">
        <AdminSidebar activeTab={activeTab} setActiveTab={handleSetActiveTab} />
      </div>
      
      <MobileMenuSheet
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
      />

      <SettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        theme={theme}
        setTheme={setTheme}
        handleLogout={signOut}
      />

      <main className="flex-1 overflow-hidden w-full flex flex-col h-screen">
        <AdminHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          theme={theme}
          setTheme={setTheme}
          setIsSettingsOpen={setIsSettingsOpen}
          handleLogout={signOut}
          handleSearch={handleSearch}
        />
        
        <div className="flex-1 overflow-auto">
          <div className={`max-w-full mx-auto ${(currentDisplayTab === 'history' || (currentDisplayTab === 'user-management' && isUserManagementAuthorized)) ? 'p-0' : 'p-4 md:p-6 pt-6'}`}>
            <motion.div 
              key={currentDisplayTab} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={((currentDisplayTab === 'history' || (currentDisplayTab === 'user-management' && isUserManagementAuthorized))) ? '' : 'space-y-6'}
            >
              {(!(currentDisplayTab === 'history' || (currentDisplayTab === 'user-management' && isUserManagementAuthorized))) && (
                <PageHeaderSection
                  activeTab={currentDisplayTab}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                  setIsSettingsOpen={setIsSettingsOpen}
                />
              )}
              
              <DashboardContent activeTab={currentDisplayTab} searchTerm={searchTerm} />
            </motion.div>
            {(!(currentDisplayTab === 'history' || (currentDisplayTab === 'user-management' && isUserManagementAuthorized))) && <AdminFooter />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
