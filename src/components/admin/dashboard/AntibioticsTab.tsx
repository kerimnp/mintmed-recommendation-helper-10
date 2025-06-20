
import React from "react";
import { ModernAntibioticsTab } from "./enhanced/ModernAntibioticsTab";

interface AntibioticsTabProps {
  searchTerm?: string;
}

export const AntibioticsTab: React.FC<AntibioticsTabProps> = ({ searchTerm = "" }) => {
  return <ModernAntibioticsTab />;
};
