
import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, subtitle }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-medical-primary/10 text-medical-primary font-semibold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-medical-text">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-medical-text-secondary">{subtitle}</p>
      </div>
    </div>
  );
};
