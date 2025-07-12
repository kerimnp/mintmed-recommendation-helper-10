
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useDoctorProfile } from '@/hooks/useDoctorProfile';
import { useUserProfile } from '@/hooks/useUserProfile';
import { User, Settings, LogOut, ChevronDown, Stethoscope, Coins, BarChart3, TrendingUp, Pill } from 'lucide-react';
import { SettingsDialog } from './SettingsDialog';
import { useTheme } from 'next-themes';

export const ProfileDropdown: React.FC = () => {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useDoctorProfile();
  const { profile: userProfile } = useUserProfile();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  if (!user) return null;

  const userInitials = profile?.first_name && profile?.last_name
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : user?.email?.[0]?.toUpperCase() || 'U';

  const displayName = profile?.first_name 
    ? `${profile.first_name} ${profile.last_name || ''}`.trim()
    : user?.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  // Use actual credits from database
  const availableCredits = userProfile?.free_credits_left || 0;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 px-2 h-10">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-medical-primary text-white text-sm font-medium">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {isLoading ? 'Loading...' : displayName}
              </span>
              {profile?.specialization && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {profile.specialization}
                </span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          {/* User Info Section */}
          <div className="px-3 py-2">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-medical-primary text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
                {profile?.hospital_affiliation && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 truncate">
                    {profile.hospital_affiliation}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Credits Section */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Free Credits
                </span>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                {availableCredits} left
              </Badge>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          {/* Navigation Section */}
          <DropdownMenuItem onClick={() => navigate('/advisor')} className="cursor-pointer">
            <Pill className="h-4 w-4 mr-2" />
            Antibiotic Advisor
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/admin?tab=dashboard')} className="cursor-pointer">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/subscription')} className="cursor-pointer">
            <TrendingUp className="h-4 w-4 mr-2" />
            Subscription
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Settings and Profile Section */}
          <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            View Profile
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Sign Out Section */}
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 dark:text-red-400">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        theme={theme}
        setTheme={setTheme}
        handleLogout={handleSignOut}
      />
    </>
  );
};
