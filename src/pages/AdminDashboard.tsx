import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"; // Keep for other toasts if any, or remove if AuthContext handles all
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { useNavigate } from "react-router-dom"; 
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { Loader2 } from "lucide-react"; // For loading state

import { AdminHeader } from "@/components/admin/dashboard/layout/AdminHeader";
import { SettingsDialog } from "@/components/admin/dashboard/layout/SettingsDialog";
import { MobileMenuSheet } from "@/components/admin/dashboard/layout/MobileMenuSheet";
import { PageHeaderSection } from "@/components/admin/dashboard/layout/PageHeaderSection";
import { AdminFooter } from "@/components/admin/dashboard/layout/AdminFooter";

const AdminDashboard = () => {
  const { user, session, loading: authLoading, signOut } = useAuth(); // Get auth state and signOut
  const { toast } = useToast(); // Keep for non-auth toasts if needed
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !session) {
      navigate("/auth");
    }
  }, [authLoading, session, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const validTabs = ["dashboard", "antibiotics", "resistance", "regional", "guidelines", "effectiveness", "education", "clinical-guidelines", "history"];
    if (tabParam && validTabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    } else if (!tabParam || !validTabs.includes(tabParam)) {
      if (session) { // Only navigate if session exists, otherwise auth redirect will handle
           navigate(`/admin?tab=dashboard`, { replace: true });
           if (activeTab !== "dashboard") setActiveTab("dashboard");
      }
    }
  }, [session, navigate, activeTab]); // Added activeTab to dependencies

  useEffect(() => {
    if (session) { // Only update URL if session exists
        const currentSearch = new URLSearchParams(window.location.search);
        if (currentSearch.get('tab') !== activeTab) {
            navigate(`/admin?tab=${activeTab}`, { replace: true });
        }
    }
  }, [activeTab, navigate, session]);


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Search executed",
        description: `Searching for: "${searchTerm}"`,
      });
      const lowerSearchTerm = searchTerm.toLowerCase();
      if (lowerSearchTerm.includes("dashboard")) setActiveTab("dashboard");
      else if (lowerSearchTerm.includes("antibiotic") || lowerSearchTerm.includes("drug") || lowerSearchTerm.includes("medication")) setActiveTab("antibiotics");
      else if (lowerSearchTerm.includes("resist") || lowerSearchTerm.includes("pattern")) setActiveTab("resistance");
      else if (lowerSearchTerm.includes("region") || lowerSearchTerm.includes("local")) setActiveTab("regional");
      else if (lowerSearchTerm.includes("guide") || lowerSearchTerm.includes("protocol")) setActiveTab("guidelines");
      else if (lowerSearchTerm.includes("effect") || lowerSearchTerm.includes("outcome")) setActiveTab("effectiveness");
      else if (lowerSearchTerm.includes("educat") || lowerSearchTerm.includes("learn") || lowerSearchTerm.includes("quiz")) setActiveTab("education");
      else if (lowerSearchTerm.includes("history") || lowerSearchTerm.includes("patient record")) setActiveTab("history");
    }
  };

  if (!mounted || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
        <Loader2 className="h-12 w-12 animate-spin text-medical-primary" />
      </div>
    );
  }

  if (!session) { // Should be caught by useEffect, but as a safeguard
    return null; // or a redirect component, but useEffect handles navigation
  }

  // User is authenticated and auth state is loaded
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800 overflow-hidden">
      <div className="hidden lg:block">
        {/* AdminSidebar now uses useAuth internally for logout */}
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
        handleLogout={signOut} // Use signOut from AuthContext
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
          handleLogout={signOut} // Use signOut from AuthContext
          // TODO: Pass user object here if AdminHeader is to display user info and can be modified
          // For now, user info is not displayed in header as it's read-only
        />
        
        <div className="flex-1 overflow-auto">
          <div className={`max-w-full mx-auto ${activeTab === 'history' ? 'p-0' : 'p-4 md:p-6 pt-6'}`}>
            {/* Optionally display user info here */}
            {user && (
              <div className="mb-4 p-2 bg-blue-50 dark:bg-slate-800 rounded text-sm text-blue-700 dark:text-blue-300">
                Logged in as: {user.email} 
                {user.user_metadata?.first_name && ` (${user.user_metadata.first_name} ${user.user_metadata.last_name || ''})`}
              </div>
            )}
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={activeTab === 'history' ? '' : 'space-y-6'}
            >
              {activeTab !== 'history' && (
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
            {activeTab !== 'history' && <AdminFooter />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
