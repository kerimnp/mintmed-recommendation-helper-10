
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { Stethoscope } from 'lucide-react'; // Medical icon for branding
import LanguageToggle from './LanguageToggle'; // Assuming you have this component

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl">MediScript</span>
        </Link>
        <div className="flex items-center space-x-3">
          <LanguageToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
