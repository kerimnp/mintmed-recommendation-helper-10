
import React from "react";
import { PremiumMainDashboardWithRealData } from "./premium/PremiumMainDashboardWithRealData";

interface MainDashboardTabProps {
  searchTerm: string;
}

export const MainDashboardTab: React.FC<MainDashboardTabProps> = ({ searchTerm }) => {
  return <PremiumMainDashboardWithRealData searchTerm={searchTerm} />;
};
