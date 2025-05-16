import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';
import { toast as sonnerToast } from "sonner";
import { RealTimeClock } from './RealTimeClock'; // Import the new clock component

interface AdminHeaderProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  theme,
  setTheme,
  searchTerm,
  setSearchTerm,
  handleSearch,
  setIsMobileMenuOpen,
  setIsSettingsOpen,
  handleLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={theme === 'dark' 
                ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
              } 
              alt="Horalix Logo" 
              className="h-8 w-auto"
            />
            <span className="font-semibold text-lg hidden sm:inline-block text-gray-800 dark:text-white">Horalix</span>
          </Link>
        </div>
        
        <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-md w-full relative mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search dashboard, guidelines, drugs..."
              className="pl-9 border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 h-9 rounded-full w-full focus:ring-medical-primary focus:border-medical-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        
        <div className="flex items-center gap-3">
          <RealTimeClock /> 
          <Button variant="ghost" size="icon" className="rounded-full text-gray-600 hover:text-medical-primary dark:text-gray-400 dark:hover:text-medical-accent" onClick={() => {
            sonnerToast.success("No new notifications at the moment!", {
              description: "Keep up the great work.",
              duration: 3000,
            });
          }}>
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-gray-600 hover:text-medical-primary dark:text-gray-400 dark:hover:text-medical-accent"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-9 w-9 p-0 focus-visible:ring-2 focus-visible:ring-medical-primary focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 border-2 border-transparent hover:border-medical-primary transition-colors">
                  <AvatarImage src="/lovable.svg" alt="User Avatar" />
                  <AvatarFallback className="bg-medical-primary/20 text-medical-primary font-semibold">KS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 p-2 shadow-xl rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
              <div className="flex items-center p-2 gap-3 mb-1">
                <Avatar className="h-11 w-11">
                  <AvatarImage src="/lovable.svg" alt="User Avatar"/>
                  <AvatarFallback className="bg-medical-primary/20 text-medical-primary font-semibold">KS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Dr. Kerim Sabic</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">kerim.sabic@horalix.com</p>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700"/>
              <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300 hover:!bg-medical-primary/10 dark:hover:!bg-medical-primary/20 focus:!bg-medical-primary/10 dark:focus:!bg-medical-primary/20 py-2 px-3 rounded-md" onClick={() => {
                sonnerToast.info("Profile page coming soon!", { description: "You'll be able to manage your details here."});
              }}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-700 dark:text-gray-300 hover:!bg-medical-primary/10 dark:hover:!bg-medical-primary/20 focus:!bg-medical-primary/10 dark:focus:!bg-medical-primary/20 py-2 px-3 rounded-md" onClick={() => setIsSettingsOpen(true)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700"/>
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-500 hover:!text-red-700 dark:hover:!text-red-400 hover:!bg-red-500/10 dark:hover:!bg-red-500/20 focus:!text-red-700 focus:!bg-red-500/10 py-2 px-3 rounded-md" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
