
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { HospitalHeader } from './management/HospitalHeader';
import { HospitalSidebar } from './management/HospitalSidebar';
import { HospitalContent } from './management/HospitalContent';

interface HospitalManagementProps {
  user: User;
}

export const HospitalManagement: React.FC<HospitalManagementProps> = ({ user }) => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <HospitalSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <HospitalHeader 
          user={user}
          onSignOut={signOut}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main className="flex-1 p-6">
          <HospitalContent activeTab={activeTab} user={user} />
        </main>
      </div>
    </div>
  );
};
