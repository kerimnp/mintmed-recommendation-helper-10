
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useDoctorProfile } from '@/hooks/useDoctorProfile';
import { User, Settings, LogOut, ChevronDown, Stethoscope } from 'lucide-react';

export const ProfileDropdown: React.FC = () => {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useDoctorProfile();
  const navigate = useNavigate();

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

  return (
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
        
        <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
          <User className="h-4 w-4 mr-2" />
          View Profile
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
          <Stethoscope className="h-4 w-4 mr-2" />
          Edit Profile
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/admin?tab=dashboard')} className="cursor-pointer">
          <Settings className="h-4 w-4 mr-2" />
          Dashboard
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 dark:text-red-400">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
