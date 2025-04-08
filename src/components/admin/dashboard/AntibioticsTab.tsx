
import React from "react";
import { AntibioticAnalytics } from "@/components/admin/AntibioticAnalytics";

export const AntibioticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Antibiotic Prescription Analytics</h2>
        <p className="text-gray-500 dark:text-gray-400 ml-3 text-sm">
          View detailed analytics on antibiotic prescriptions and product usage
        </p>
      </div>
      
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <AntibioticAnalytics />
        </div>
      </div>
    </div>
  );
};
