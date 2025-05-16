
import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

interface MobileMenuSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileMenuSheet: React.FC<MobileMenuSheetProps> = ({
  isOpen,
  onOpenChange,
  activeTab,
  setActiveTab,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            onOpenChange(false); // Close sheet on tab selection
          }} 
        />
      </SheetContent>
    </Sheet>
  );
};

