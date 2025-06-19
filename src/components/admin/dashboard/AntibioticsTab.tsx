
import React from "react";
import { EnhancedAntibioticsTab } from "./enhanced/EnhancedAntibioticsTab";

interface AntibioticsTabProps {
  searchTerm?: string;
}

export const AntibioticsTab: React.FC<AntibioticsTabProps> = ({ searchTerm = "" }) => {
  return <EnhancedAntibioticsTab />;
};
