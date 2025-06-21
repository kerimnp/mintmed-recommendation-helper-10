
import React from 'react';
import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { HospitalOverview } from './content/HospitalOverview';
import { DoctorsManagement } from './content/DoctorsManagement';
import { InvitationsManagement } from './content/InvitationsManagement';
import { CreditsManagement } from './content/CreditsManagement';
import { AnalyticsDashboard } from './content/AnalyticsDashboard';
import { BillingManagement } from './content/BillingManagement';
import { HospitalSettings } from './content/HospitalSettings';

interface HospitalContentProps {
  activeTab: string;
  user: User;
}

export const HospitalContent: React.FC<HospitalContentProps> = ({
  activeTab,
  user
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <HospitalOverview user={user} />;
      case 'doctors':
        return <DoctorsManagement user={user} />;
      case 'invitations':
        return <InvitationsManagement user={user} />;
      case 'credits':
        return <CreditsManagement user={user} />;
      case 'analytics':
        return <AnalyticsDashboard user={user} />;
      case 'billing':
        return <BillingManagement user={user} />;
      case 'settings':
        return <HospitalSettings user={user} />;
      default:
        return <HospitalOverview user={user} />;
    }
  };

  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {renderContent()}
    </motion.div>
  );
};
