
import React from "react";
import { PremiumMainDashboard } from "./premium/PremiumMainDashboard";

interface MainDashboardTabProps {
  searchTerm: string;
}

export const MainDashboardTab: React.FC<MainDashboardTabProps> = ({ searchTerm }) => {
  return <PremiumMainDashboard searchTerm={searchTerm} />;
};
