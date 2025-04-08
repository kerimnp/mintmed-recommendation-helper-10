
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardTabs } from "@/components/admin/dashboard/DashboardTabs";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("resistance");

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary overflow-auto">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-auto w-full">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 pt-8">
          {/* Header with back navigation */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Monitor resistance patterns and antibiotic effectiveness
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </header>
          
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl">
            <div className="p-4 md:p-6 lg:p-8">
              <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="mt-6">
                <DashboardContent activeTab={activeTab} />
              </div>
            </div>
          </div>
          
          <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
            <p>© 2025 Horalix Clinical Decision Support System</p>
            <p className="mt-1">Version 1.0.0 | Last updated: April 8, 2025</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
