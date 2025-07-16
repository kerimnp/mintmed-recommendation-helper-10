import React from "react";
import { EnhancedEducationTab } from "@/components/admin/education/EnhancedEducationTab";

interface EducationTabProps {
  searchTerm?: string;
}

export const EducationTab: React.FC<EducationTabProps> = ({ searchTerm }) => {
  return <EnhancedEducationTab searchTerm={searchTerm} />;
};