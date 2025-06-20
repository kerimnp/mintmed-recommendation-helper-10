
import React from "react";
import { ModernEffectivenessTab } from "./enhanced/ModernEffectivenessTab";

interface EffectivenessTabProps {
  searchTerm?: string;
}

export const EffectivenessTab: React.FC<EffectivenessTabProps> = ({ searchTerm = "" }) => {
  return <ModernEffectivenessTab />;
};
