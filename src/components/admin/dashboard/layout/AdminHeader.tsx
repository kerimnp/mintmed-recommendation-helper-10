
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { RealTimeClock } from "./RealTimeClock";
import { SettingsDialog } from "./SettingsDialog";
import { ProfileDropdown } from "./ProfileDropdown";

interface AdminHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  theme?: string;
  setTheme?: (theme: string) => void;
  setIsMobileMenuOpen?: (open: boolean) => void;
  setIsSettingsOpen?: (open: boolean) => void;
  handleLogout?: () => void;
  handleSearch?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AdminHeader = ({ 
  searchTerm, 
  setSearchTerm,
  theme: externalTheme,
  setTheme: externalSetTheme,
  setIsSettingsOpen,
  handleLogout
}: AdminHeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [isSettingsOpen, setLocalSettingsOpen] = React.useState(false);

  // Use external theme controls if provided, otherwise use internal ones
  const currentTheme = externalTheme || theme;
  const currentSetTheme = externalSetTheme || setTheme;

  const toggleTheme = () => {
    currentSetTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const handleSettingsOpen = (open: boolean) => {
    if (setIsSettingsOpen) {
      setIsSettingsOpen(open);
    } else {
      setLocalSettingsOpen(open);
    }
  };

  const currentSettingsOpen = setIsSettingsOpen ? false : isSettingsOpen;

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search patients, prescriptions, or guidelines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-96"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <RealTimeClock />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {currentTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <SettingsDialog
            isOpen={currentSettingsOpen}
            onOpenChange={handleSettingsOpen}
            theme={currentTheme}
            setTheme={currentSetTheme}
            handleLogout={handleLogout || (() => {})}
          />

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};
