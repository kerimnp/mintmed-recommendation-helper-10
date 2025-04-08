
import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("antibiotics");
  
  // Use URL params to set the active tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.history.pushState(null, '', `?tab=${tab}`);
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary">
      <AdminSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <main className="flex-1 overflow-auto w-full py-6 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <DashboardContent activeTab={activeTab} />
          
          <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 mt-8">
            <p>© 2025 Horalix Clinical Decision Support System</p>
            <p className="mt-1">Version 1.0.0 | Last updated: April 8, 2025</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
