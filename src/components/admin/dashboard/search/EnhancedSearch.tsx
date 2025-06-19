
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Clock, 
  Star, 
  FileText, 
  Pill, 
  Users, 
  TrendingUp,
  Filter,
  X,
  ArrowRight
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'guideline' | 'drug' | 'patient' | 'article' | 'simulation';
  category: string;
  relevanceScore: number;
  lastAccessed?: string;
  isFavorite?: boolean;
  url: string;
}

interface SearchFilters {
  type: string[];
  category: string[];
  timeRange: string;
  sortBy: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'IDSA Guidelines for Community-Acquired Pneumonia',
    description: 'Comprehensive treatment guidelines for CAP in adults',
    type: 'guideline',
    category: 'Respiratory',
    relevanceScore: 0.95,
    lastAccessed: '2024-01-15T10:30:00Z',
    isFavorite: true,
    url: '/admin?tab=guidelines'
  },
  {
    id: '2',
    title: 'Amoxicillin Drug Information',
    description: 'Dosing, interactions, and clinical considerations',
    type: 'drug',
    category: 'Antibiotics',
    relevanceScore: 0.89,
    lastAccessed: '2024-01-14T15:20:00Z',
    isFavorite: false,
    url: '/admin?tab=antibiotics'
  },
  {
    id: '3',
    title: 'Pneumonia Case Simulation',
    description: 'Interactive clinical case for pneumonia management',
    type: 'simulation',
    category: 'Education',
    relevanceScore: 0.85,
    lastAccessed: '2024-01-13T09:45:00Z',
    isFavorite: false,
    url: '/admin?tab=education'
  },
  {
    id: '4',
    title: 'Patient History: John Doe',
    description: 'Recent pneumonia treatment case',
    type: 'patient',
    category: 'Clinical Records',
    relevanceScore: 0.78,
    lastAccessed: '2024-01-12T14:15:00Z',
    isFavorite: false,
    url: '/admin?tab=history'
  }
];

const recentSearches = [
  'pneumonia treatment',
  'drug interactions vancomycin',
  'sepsis guidelines',
  'pediatric dosing',
  'resistance patterns'
];

interface EnhancedSearchProps {
  onNavigate?: (url: string) => void;
}

export const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: [],
    category: [],
    timeRange: 'all',
    sortBy: 'relevance'
  });
  const [recentQueries, setRecentQueries] = useState<string[]>(recentSearches);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filter and sort results based on query and filters
    let filteredResults = mockSearchResults.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase()) ||
      result.category.toLowerCase().includes(query.toLowerCase())
    );

    // Apply type filters
    if (filters.type.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.type.includes(result.type)
      );
    }

    // Apply category filters
    if (filters.category.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.category.includes(result.category)
      );
    }

    // Sort results
    switch (filters.sortBy) {
      case 'relevance':
        filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
        break;
      case 'recent':
        filteredResults.sort((a, b) => 
          new Date(b.lastAccessed || 0).getTime() - new Date(a.lastAccessed || 0).getTime()
        );
        break;
      case 'alphabetical':
        filteredResults.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setResults(filteredResults);
    setIsSearching(false);

    // Add to recent searches
    if (!recentQueries.includes(query)) {
      setRecentQueries(prev => [query, ...prev.slice(0, 4)]);
    }

    toast({
      title: "Search Complete",
      description: `Found ${filteredResults.length} results for "${query}"`,
    });
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        performSearch(searchTerm);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, filters]);

  const handleResultClick = (result: SearchResult) => {
    toast({
      title: "Opening Result",
      description: `Navigating to ${result.title}`,
    });
    
    if (onNavigate) {
      onNavigate(result.url);
    }
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchTerm(query);
    searchInputRef.current?.focus();
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      category: [],
      timeRange: 'all',
      sortBy: 'relevance'
    });
  };

  const toggleFilter = (filterType: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType])
        ? (prev[filterType] as string[]).includes(value)
          ? (prev[filterType] as string[]).filter(v => v !== value)
          : [...(prev[filterType] as string[]), value]
        : value
    }));
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'guideline': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'drug': return <Pill className="h-4 w-4 text-green-500" />;
      case 'patient': return <Users className="h-4 w-4 text-purple-500" />;
      case 'article': return <FileText className="h-4 w-4 text-orange-500" />;
      case 'simulation': return <TrendingUp className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder="Search guidelines, drugs, patients, articles..."
                className="pl-9 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-6 w-6 p-0"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Filters Toggle */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(filters.type.length > 0 || filters.category.length > 0) && (
                  <Badge variant="secondary" className="ml-2">
                    {filters.type.length + filters.category.length}
                  </Badge>
                )}
              </Button>
              
              {isSearching && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-500">Searching...</span>
                </div>
              )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <Card className="border">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Search Filters</h4>
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content Type</label>
                      <div className="space-y-2">
                        {['guideline', 'drug', 'patient', 'article', 'simulation'].map(type => (
                          <label key={type} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.type.includes(type)}
                              onChange={() => toggleFilter('type', type)}
                            />
                            <span className="text-sm capitalize">{type}s</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <div className="space-y-2">
                        {['Respiratory', 'Antibiotics', 'Education', 'Clinical Records'].map(category => (
                          <label key={category} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={filters.category.includes(category)}
                              onChange={() => toggleFilter('category', category)}
                            />
                            <span className="text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Sort By</label>
                      <select
                        className="w-full p-2 border rounded text-sm"
                        value={filters.sortBy}
                        onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      >
                        <option value="relevance">Relevance</option>
                        <option value="recent">Recently Accessed</option>
                        <option value="alphabetical">Alphabetical</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Searches */}
            {!searchTerm && recentQueries.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentQueries.map((query, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleRecentSearchClick(query)}
                      className="text-xs"
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-4">
              Search Results ({results.length})
            </h4>
            <div className="space-y-3">
              {results.map(result => (
                <div
                  key={result.id}
                  className="p-3 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getTypeIcon(result.type)}
                        <h5 className="font-medium">{result.title}</h5>
                        {result.isFavorite && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {result.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Relevance: {Math.round(result.relevanceScore * 100)}%</span>
                        {result.lastAccessed && (
                          <span>
                            Last accessed: {new Date(result.lastAccessed).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {searchTerm && results.length === 0 && !isSearching && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
