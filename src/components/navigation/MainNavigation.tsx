
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { 
  Menu, 
  Home, 
  Stethoscope, 
  Shield, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Pill
} from 'lucide-react';

export const MainNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      href: '/',
      label: language === 'en' ? 'Home' : 'Početna',
      icon: Home,
    },
    {
      href: '/advisor',
      label: language === 'en' ? 'Antibiotic Advisor' : 'Antibiotski Savjetnik',
      icon: Pill,
    },
    ...(user ? [{
      href: '/admin',
      label: language === 'en' ? 'Dashboard' : 'Nadzorna Ploča',
      icon: Shield,
    }] : []),
  ];

  const userInitials = user?.user_metadata?.first_name && user?.user_metadata?.last_name
    ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
    : user?.email?.[0]?.toUpperCase() || 'U';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActivePath = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const MobileNavigation = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col space-y-4 py-4">
          <div className="px-2">
            <h2 className="text-lg font-semibold text-medical-primary">
              {language === 'en' ? 'Navigation' : 'Navigacija'}
            </h2>
          </div>
          <nav className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActivePath(item.href)
                    ? 'bg-medical-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          {user && (
            <div className="border-t pt-4 mt-4">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-900">
                  {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="space-y-2 mt-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate('/profile');
                    setIsOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Profile' : 'Profil'}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Sign Out' : 'Odjava'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-medical-primary" />
            <span className="font-bold text-xl text-medical-primary">
              MediAid
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActivePath(item.href)
                    ? 'text-medical-primary bg-medical-primary/10'
                    : 'text-gray-700 hover:text-medical-primary hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-medical-primary text-white text-sm">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium">
                      {user.user_metadata?.first_name || 'User'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Profile' : 'Profil'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/admin?tab=dashboard')}>
                    <Settings className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Dashboard' : 'Nadzorna Ploča'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'Sign Out' : 'Odjava'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth">
                    {language === 'en' ? 'Sign In' : 'Prijava'}
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">
                    {language === 'en' ? 'Sign Up' : 'Registracija'}
                  </Link>
                </Button>
              </div>
            )}

            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
};
