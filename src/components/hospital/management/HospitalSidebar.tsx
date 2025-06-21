
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Receipt,
  Settings,
  UserPlus,
  Building2
} from 'lucide-react';

interface HospitalSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'doctors', label: 'Doctors', icon: Users, badge: '12' },
  { id: 'invitations', label: 'Invitations', icon: UserPlus, badge: '3' },
  { id: 'credits', label: 'Credits', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'billing', label: 'Billing', icon: Receipt },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const SidebarContent = ({ activeTab, setActiveTab, onItemClick }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onItemClick?: () => void;
}) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">
            Hospital Admin
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Management Portal
          </p>
        </div>
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 p-4 space-y-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <Button
            key={item.id}
            variant={isActive ? 'default' : 'ghost'}
            className={`w-full justify-start gap-3 ${
              isActive 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => {
              setActiveTab(item.id);
              onItemClick?.();
            }}
          >
            <Icon className="h-5 w-5" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge 
                variant={isActive ? 'secondary' : 'outline'} 
                className="ml-auto"
              >
                {item.badge}
              </Badge>
            )}
          </Button>
        );
      })}
    </nav>

    {/* Footer */}
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
        <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
          Pro Subscription
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-400">
          1,200 credits remaining
        </div>
      </div>
    </div>
  </div>
);

export const HospitalSidebar: React.FC<HospitalSidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:dark:bg-gray-800 lg:border-r lg:border-gray-200 lg:dark:border-gray-700">
        <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
