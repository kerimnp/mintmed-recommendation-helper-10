
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardTabs } from "@/components/admin/dashboard/DashboardTabs";
import { DashboardContent } from "@/components/admin/dashboard/DashboardContent";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("antibiotics");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-4 md:p-8 pt-24 lg:pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="p-4 bg-white/80 dark:bg-medical-bg-secondary/80 backdrop-blur-md rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <DashboardContent activeTab={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
