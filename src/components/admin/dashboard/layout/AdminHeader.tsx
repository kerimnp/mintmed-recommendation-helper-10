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
          {/* Removed SheetTrigger wrapper. Button now directly handles click and visibility. */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden rounded-full" // Added lg:hidden from SheetTrigger
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
            <span className="font-semibold text-lg hidden sm:inline-block">Horalix</span>
          </Link>
        </div>
        
        <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-md w-full relative mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search dashboard, guidelines, drugs..."
              className="pl-9 border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 h-9 rounded-full w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => {
            sonnerToast.success("No new notifications");
          }}>
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/lovable.svg" />
                  <AvatarFallback>KS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <div className="flex items-center p-2 gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/lovable.svg" />
                  <AvatarFallback>KS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Dr. Kerim Sabic</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">kerim.sabic@horalix.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => {
                sonnerToast.success("Profile view will be implemented soon");
              }}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-700" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
