
import React from 'react';
import { PremiumEducationTab } from './education/PremiumEducationTab';

interface EducationDashboardProps {
  searchTerm?: string;
}

export const EducationDashboard: React.FC<EducationDashboardProps> = ({ searchTerm = "" }) => {
  return <PremiumEducationTab searchTerm={searchTerm} />;
};
