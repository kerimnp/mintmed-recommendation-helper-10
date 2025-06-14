import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, Settings, Search } from 'lucide-react';
interface PageHeaderSectionProps {
  activeTab: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
}
export const PageHeaderSection: React.FC<PageHeaderSectionProps> = ({
  activeTab,
  searchTerm,
  setSearchTerm,
  handleSearch,
  setIsSettingsOpen
}) => {
  return <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white capitalize text-left">
          {activeTab.replace('-', ' ')} Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Monitor key metrics and manage clinical data
        </p>
      </div>
      
      <form onSubmit={handleSearch} className="md:hidden w-full">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search..." className="pl-9 w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </form>
      
      <div className="flex items-center gap-3">
        <Link to="/">
          
        </Link>
      </div>
    </div>;
};