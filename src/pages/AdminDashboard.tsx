import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { useNavigate } from "react-router-dom"; 
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import { AdminHeader } from "@/components/admin/dashboard/layout/AdminHeader";
import { SettingsDialog } from "@/components/admin/dashboard/layout/SettingsDialog";
import { MobileMenuSheet } from "@/components/admin/dashboard/layout/MobileMenuSheet";
import { PageHeaderSection } from "@/components/admin/dashboard/layout/PageHeaderSection";
import { AdminFooter } from "@/components/admin/dashboard/layout/AdminFooter";

const AdminDashboard = () => {
  const { toast } = useToast();
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
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const validTabs = ["dashboard", "antibiotics", "resistance", "regional", "guidelines", "effectiveness", "education", "clinical-guidelines", "history"];
    if (tabParam && validTabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    } else if (!tabParam || !validTabs.includes(tabParam)) {
      navigate(`/admin?tab=dashboard`, { replace: true });
      if (activeTab !== "dashboard") setActiveTab("dashboard");
    }
  }, []); 

  useEffect(() => {
    const currentSearch = new URLSearchParams(window.location.search);
    if (currentSearch.get('tab') !== activeTab) {
      navigate(`/admin?tab=${activeTab}`, { replace: true });
    }
  }, [activeTab, navigate]);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    setTimeout(() => navigate("/"), 500);
  };

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

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800 overflow-hidden">
      {/* AdminSidebar is now always visible */}
      <div className="hidden lg:block">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* MobileMenuSheet is now always available */}
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
        handleLogout={handleLogout}
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
          handleLogout={handleLogout}
        />
        
        <div className="flex-1 overflow-auto">
          <div className={`max-w-full mx-auto ${activeTab === 'history' ? 'p-0' : 'p-4 md:p-6 pt-6'}`}>
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
