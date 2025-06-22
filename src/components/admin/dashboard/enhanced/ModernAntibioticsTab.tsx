
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Pill,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  Search,
  Star,
  Shield,
  Beaker,
  DollarSign,
  BookOpen,
  Eye,
  ChevronRight
} from 'lucide-react';
import { getAllAntibiotics, getCategories, getAntibioticStats, searchAntibiotics, getAntibioticsByCategory } from '@/services/antibioticService';
import { AntibioticCard } from './components/AntibioticCard';
import { AntibioticDetailModal } from './components/AntibioticDetailModal';
import { ResistanceChart } from './components/ResistanceChart';
import { EffectivenessChart } from './components/EffectivenessChart';
import { type EnhancedAntibioticData } from '@/services/antibioticService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const ModernAntibioticsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const [sortBy, setSortBy] = useState<'effectiveness' | 'resistance' | 'cost' | 'name'>('effectiveness');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedAntibiotic, setSelectedAntibiotic] = useState<EnhancedAntibioticData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Get all data
  const allAntibiotics = getAllAntibiotics();
  const categories = getCategories();
  const stats = getAntibioticStats();

  // Filter and sort antibiotics
  const filteredAntibiotics = useMemo(() => {
    let filtered = searchTerm 
      ? searchAntibiotics(searchTerm)
      : getAntibioticsByCategory(selectedCategory);
    
    // Sort
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;
      
      switch (sortBy) {
        case 'effectiveness':
          aValue = a.effectiveness;
          bValue = b.effectiveness;
          break;
        case 'resistance':
          aValue = a.resistance;
          bValue = b.resistance;
          break;
        case 'cost':
          aValue = a.cost;
          bValue = b.cost;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        default:
          aValue = a.effectiveness;
          bValue = b.effectiveness;
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'desc' 
          ? bValue.toString().localeCompare(aValue.toString())
          : aValue.toString().localeCompare(bValue.toString());
      }
      
      return sortOrder === 'desc' ? (bValue as number) - (aValue as number) : (aValue as number) - (bValue as number);
    });
    
    return filtered;
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  // Prepare chart data
  const categoryData = useMemo(() => {
    const categoryCounts = allAntibiotics.reduce((acc, antibiotic) => {
      acc[antibiotic.category] = (acc[antibiotic.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  }, [allAntibiotics]);

  const resistanceData = useMemo(() => {
    return allAntibiotics
      .filter(a => a.resistance > 15)
      .sort((a, b) => b.resistance - a.resistance)
      .slice(0, 10)
      .map(a => ({
        name: a.name,
        resistance: a.resistance,
        effectiveness: a.effectiveness
      }));
  }, [allAntibiotics]);

  const handleRefresh = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleExport = () => {
    const data = filteredAntibiotics.map(a => ({
      name: a.name,
      category: a.category,
      effectiveness: a.effectiveness,
      resistance: a.resistance,
      cost: a.cost,
      availability: a.availability
    }));
    
    const csv = [
      ['Name', 'Category', 'Effectiveness', 'Resistance', 'Cost', 'Availability'],
      ...data.map(d => [d.name, d.category, d.effectiveness, d.resistance, d.cost, d.availability])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'antibiotics-data.csv';
    a.click();
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Enhanced Antibiotic Database
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive clinical insights with {allAntibiotics.length} antibiotics and resistance data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Antibiotics</p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-blue-100 text-xs mt-1">Across all categories</p>
              </div>
              <Pill className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Avg Effectiveness</p>
                <p className="text-3xl font-bold">{stats.avgEffectiveness}%</p>
                <p className="text-green-100 text-xs mt-1">Clinical success rate</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Resistance Alerts</p>
                <p className="text-3xl font-bold">{stats.resistanceAlerts}</p>
                <p className="text-amber-100 text-xs mt-1">High resistance rates</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Research Studies</p>
                <p className="text-3xl font-bold">{Math.floor(stats.totalStudies / 1000)}K+</p>
                <p className="text-purple-100 text-xs mt-1">Evidence base</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search antibiotics by name, mechanism, or indication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-lg"
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="effectiveness">Effectiveness</SelectItem>
                  <SelectItem value="resistance">Resistance</SelectItem>
                  <SelectItem value="cost">Cost</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'desc' ? '↓' : '↑'}
              </Button>
              
              <div className="flex items-center border border-gray-200 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              High Resistance Antibiotics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resistanceData} margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="resistance" fill="#ef4444" name="Resistance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Antibiotic Grid/Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Antibiotic Database ({filteredAntibiotics.length} results)</span>
            {searchTerm && (
              <Badge variant="secondary">
                Filtered by: {searchTerm}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAntibiotics.map((antibiotic) => (
                <AntibioticCard
                  key={antibiotic.id}
                  antibiotic={antibiotic}
                  onClick={() => setSelectedAntibiotic(antibiotic)}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Category</th>
                    <th className="text-left p-3 font-medium">Effectiveness</th>
                    <th className="text-left p-3 font-medium">Resistance</th>
                    <th className="text-left p-3 font-medium">Cost</th>
                    <th className="text-left p-3 font-medium">Availability</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAntibiotics.map((antibiotic) => (
                    <tr key={antibiotic.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{antibiotic.name}</span>
                          {antibiotic.featured && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                          {antibiotic.trending && <TrendingUp className="h-3 w-3 text-blue-500" />}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{antibiotic.category}</Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${antibiotic.effectiveness}%` }}
                            />
                          </div>
                          <span className="text-xs">{antibiotic.effectiveness}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant={antibiotic.resistance > 20 ? "destructive" : antibiotic.resistance > 10 ? "default" : "secondary"}
                        >
                          {antibiotic.resistance}%
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm">${antibiotic.cost}</span>
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant={antibiotic.availability === 'high' ? "default" : antibiotic.availability === 'medium' ? "secondary" : "outline"}
                        >
                          {antibiotic.availability}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedAntibiotic(antibiotic)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedAntibiotic && (
        <AntibioticDetailModal
          antibiotic={selectedAntibiotic}
          isOpen={!!selectedAntibiotic}
          onClose={() => setSelectedAntibiotic(null)}
        />
      )}
    </div>
  );
};
