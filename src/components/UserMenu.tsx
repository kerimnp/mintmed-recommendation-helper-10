
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LoginModal from './LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, UserCircle, Settings, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

const UserMenu: React.FC = () => {
  const { user, signOut, loading } = useAuth();
  const { language } = useLanguage();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (email?: string | null) => {
    if (!email) return 'U'; // Default User
    const parts = email.split('@')[0].split('.');
    if (parts.length > 1) {
      return parts.map(part => part[0]).join('').toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };
  
  // Default to "KS" if no user and not loading, otherwise derive from user or show placeholder
  const avatarFallbackText = loading ? '...' : user ? getInitials(user.email) : 'KS';


  if (!user && !loading) {
    return (
      <>
        <Button variant="ghost" onClick={() => setIsLoginModalOpen(true)} className="p-0 rounded-full">
          <Avatar>
            <AvatarFallback>{avatarFallbackText}</AvatarFallback>
          </Avatar>
        </Button>
        <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
      </>
    );
  }

  if (user) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                {user.user_metadata?.avatar_url && <AvatarImage src={user.user_metadata.avatar_url} alt={user.email || 'User'} />}
                <AvatarFallback>{avatarFallbackText}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Dr. {user.email?.split('@')[0] || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/doctor-dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>{language === 'en' ? 'Dashboard' : 'Nadzorna ploča'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert('Profile page to be implemented')}>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>{language === 'en' ? 'Profile' : 'Profil'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert('Settings page to be implemented')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{language === 'en' ? 'Settings' : 'Postavke'}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{language === 'en' ? 'Sign Out' : 'Odjava'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
      </>
    );
  }

  // Fallback for loading state or if user becomes null unexpectedly during loading
  return (
    <Button variant="ghost" disabled className="p-0 rounded-full">
      <Avatar>
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
    </Button>
  );
};

export default UserMenu;
