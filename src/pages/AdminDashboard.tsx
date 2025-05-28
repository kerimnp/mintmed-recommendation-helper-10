
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"; 
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { useNavigate } from "react-router-dom"; 
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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (session) { // Ensure session exists before trying to manage tabs
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');

      if (tabParam === "user-management" && !isUserManagementAuthorized) {
        // If trying to access user-management without auth, redirect to dashboard
        toast({ title: "Access Denied", description: "You are not authorized to view User Management.", variant: "destructive" });
        navigate(`/admin?tab=dashboard`, { replace: true });
        if (activeTab !== "dashboard") setActiveTab("dashboard");
      } else if (tabParam && validTabs.includes(tabParam) && tabParam !== activeTab) {
        setActiveTab(tabParam);
      } else if (!tabParam || !validTabs.includes(tabParam)) {
        // If no valid tab in URL, default to dashboard
        navigate(`/admin?tab=dashboard`, { replace: true });
        if (activeTab !== "dashboard") setActiveTab("dashboard");
      }
    }
  }, [session, navigate, activeTab, isUserManagementAuthorized, validTabs, toast]); 

  useEffect(() => {
    if (session) { 
        const currentSearch = new URLSearchParams(window.location.search);
        if (currentSearch.get('tab') !== activeTab) {
            // Ensure we don't navigate to user-management if not authorized
            if (activeTab === "user-management" && !isUserManagementAuthorized) {
              navigate(`/admin?tab=dashboard`, { replace: true });
            } else {
              navigate(`/admin?tab=${activeTab}`, { replace: true });
            }
        }
    }
  }, [activeTab, navigate, session, isUserManagementAuthorized]);


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Search executed",
        description: `Searching for: "${searchTerm}"`,
      });
      const lowerSearchTerm = searchTerm.toLowerCase();
      // This search logic mainly navigates. The actual filtering is done within tabs.
      if (lowerSearchTerm.includes("dashboard")) setActiveTab("dashboard");
      else if ((lowerSearchTerm.includes("user") || lowerSearchTerm.includes("member")) && isUserManagementAuthorized) setActiveTab("user-management");
      else if (lowerSearchTerm.includes("antibiotic") || lowerSearchTerm.includes("drug") || lowerSearchTerm.includes("medication")) setActiveTab("antibiotics");
      else if (lowerSearchTerm.includes("resist") || lowerSearchTerm.includes("pattern")) setActiveTab("resistance");
      else if (lowerSearchTerm.includes("region") || lowerSearchTerm.includes("local")) setActiveTab("regional");
      else if (lowerSearchTerm.includes("guide") || lowerSearchTerm.includes("protocol")) setActiveTab("guidelines");
      else if (lowerSearchTerm.includes("effect") || lowerSearchTerm.includes("outcome")) setActiveTab("effectiveness");
      else if (lowerSearchTerm.includes("educat") || lowerSearchTerm.includes("learn") || lowerSearchTerm.includes("quiz")) setActiveTab("education");
      else if (lowerSearchTerm.includes("history") || lowerSearchTerm.includes("patient record")) setActiveTab("history");
      // If search for "user" or "member" but not authorized, don't switch tab or provide feedback
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
  
  // Final check before rendering content
  if (activeTab === "user-management" && !isUserManagementAuthorized && !authLoading && session) {
     // This case should ideally be caught by useEffect redirecting, but as a fallback:
     console.warn("Attempted to render user-management without authorization. ActiveTab was: ", activeTab);
     // To prevent flicker or brief rendering of denied content, we could navigate here too,
     // but useEffect should handle it. For safety, we can ensure DashboardContent receives a safe tab.
     // Or, more simply, DashboardContent itself will handle the final rendering denial.
  }


  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800 overflow-hidden">
      <div className="hidden lg:block">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <MobileMenuSheet
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
          theme={theme}
          setTheme={setTheme}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          handleLogout={signOut}
        />
        
        <div className="flex-1 overflow-auto">
          <div className={`max-w-full mx-auto ${(activeTab === 'history' || (activeTab === 'user-management' && isUserManagementAuthorized)) ? 'p-0' : 'p-4 md:p-6 pt-6'}`}>
            {user && (
              <div className={`mb-4 p-2 bg-blue-50 dark:bg-slate-800 rounded text-sm text-blue-700 dark:text-blue-300 ${((activeTab === 'history' || (activeTab === 'user-management' && isUserManagementAuthorized))) ? 'mx-4 mt-4 md:mx-6 md:mt-6' : ''}`}>
                Logged in as: {user.email} 
                {user.user_metadata?.first_name && ` (${user.user_metadata.first_name} ${user.user_metadata.last_name || ''})`}
              </div>
            )}
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={((activeTab === 'history' || (activeTab === 'user-management' && isUserManagementAuthorized))) ? '' : 'space-y-6'}
            >
              {(!(activeTab === 'history' || (activeTab === 'user-management' && isUserManagementAuthorized))) && (
                <PageHeaderSection
                  activeTab={activeTab}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                  setIsSettingsOpen={setIsSettingsOpen}
                />
              )}
              
              <DashboardContent activeTab={activeTab} searchTerm={searchTerm} />
            </motion.div>
            {(!(activeTab === 'history' || (activeTab === 'user-management' && isUserManagementAuthorized))) && <AdminFooter />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
