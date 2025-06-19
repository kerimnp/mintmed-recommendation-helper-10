
import React from "react";
import { EnhancedEffectivenessTab } from "./enhanced/EnhancedEffectivenessTab";

interface EffectivenessTabProps {
  searchTerm?: string;
}

export const EffectivenessTab: React.FC<EffectivenessTabProps> = ({ searchTerm = "" }) => {
  return <EnhancedEffectivenessTab />;
};
