
import React from 'react';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { EnhancedDashboardTab } from '@/components/admin/dashboard/EnhancedDashboardTab';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ClinicalDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-medical-primary mx-auto" />
            <p className="text-gray-600 dark:text-gray-400">Loading clinical dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <EnhancedDashboardTab searchTerm="" />
      </div>
    </div>
  );
};

export default ClinicalDashboard;
