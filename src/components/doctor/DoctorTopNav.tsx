
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, User, Settings, LogOut, Moon, Sun, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes'; // For dark mode toggle
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export const DoctorTopNav = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { signOut, user } = useAuth(); // Assuming useAuth provides user info and signOut
  const { toast } = useToast();

  // Placeholder for doctor's name and initials. Replace with actual data.
  const doctorInitials = user?.email?.substring(0, 2).toUpperCase() || "KS";
  const doctorEmail = user?.email || "kerim.sabic@example.com";


  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast({ title: 'Signed Out', description: 'You have been successfully signed out.' });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({ title: 'Error', description: 'Failed to sign out.', variant: 'destructive' });
    }
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Stethoscope className="h-8 w-8" />
              <span className="font-bold text-xl">MediScript</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-9 w-9 p-0">
                  <Avatar className="h-9 w-9">
                    {/* Replace with actual image if available */}
                    {/* <AvatarImage src="/path-to-avatar.jpg" alt="Dr. KS" /> */}
                    <AvatarFallback className="bg-blue-500 text-white">
                      {doctorInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. Kerim Šabić</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {doctorEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/doctor-profile')}> {/* Assuming a profile page route */}
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}> {/* Assuming a settings page route */}
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-700/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
