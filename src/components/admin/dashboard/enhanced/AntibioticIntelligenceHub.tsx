
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Activity,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AntibioticSmartCard } from './AntibioticSmartCard';
import { AntibioticDetailModal } from './AntibioticDetailModal';

// Enhanced mock data with real-world patterns
const mockAntibioticData = [
  {
    name: 'Amoxicillin',
    class: 'Penicillin',
    category: 'Beta-lactam',
    prescriptions: 2847,
    successRate: 87,
    resistanceRate: 14,
    trend: 'up' as const,
    riskLevel: 'low' as const,
    lastUpdated: '2 hours ago'
  },
  {
    name: 'Ceftriaxone',
    class: 'Cephalosporin',
    category: 'Beta-lactam',
    prescriptions: 1923,
    successRate: 92,
    resistanceRate: 8,
    trend: 'stable' as const,
    riskLevel: 'low' as const,
    lastUpdated: '4 hours ago'
  },
  {
    name: 'Ciprofloxacin',
    class: 'Fluoroquinolone',
    category: 'Quinolone',
    prescriptions: 1456,
    successRate: 78,
    resistanceRate: 28,
    trend: 'down' as const,
    riskLevel: 'high' as const,
    lastUpdated: '1 hour ago'
  },
  {
    name: 'Azithromycin',
    class: 'Macrolide',
    category: 'Macrolide',
    prescriptions: 1234,
    successRate: 84,
    resistanceRate: 35,
    trend: 'down' as const,
    riskLevel: 'high' as const,
    lastUpdated: '3 hours ago'
  },
  {
    name: 'Vancomycin',
    class: 'Glycopeptide',
    category: 'Glycopeptide',
    prescriptions: 892,
    successRate: 95,
    resistanceRate: 2,
    trend: 'stable' as const,
    riskLevel: 'low' as const,
    lastUpdated: '6 hours ago'
  },
  {
    name: 'Meropenem',
    class: 'Carbapenem',
    category: 'Beta-lactam',
    prescriptions: 634,
    successRate: 94,
    resistanceRate: 12,
    trend: 'up' as const,
    riskLevel: 'medium' as const,
    lastUpdated: '5 hours ago'
  },
  {
    name: 'Linezolid',
    class: 'Oxazolidinone',
    category: 'Oxazolidinone',
    prescriptions: 456,
    successRate: 91,
    resistanceRate: 3,
    trend: 'stable' as const,
    riskLevel: 'low' as const,
    lastUpdated: '8 hours ago'
  },
  {
    name: 'Doxycycline',
    class: 'Tetracycline',
    category: 'Tetracycline',
    prescriptions: 1123,
    successRate: 82,
    resistanceRate: 18,
    trend: 'stable' as const,
    riskLevel: 'medium' as const,
    lastUpdated: '2 hours ago'
  }
];

export const AntibioticIntelligenceHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [sortBy, setSortBy] = useState('prescriptions');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAntibiotic, setSelectedAntibiotic] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredAndSortedAntibiotics = useMemo(() => {
    let filtered = mockAntibioticData.filter(antibiotic => {
      const matchesSearch = antibiotic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           antibiotic.class.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || antibiotic.category === selectedCategory;
      const matchesRisk = selectedRisk === 'all' || antibiotic.riskLevel === selectedRisk;
      
      return matchesSearch && matchesCategory && matchesRisk;
    });

    // Sort antibiotics
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'prescriptions':
          return b.prescriptions - a.prescriptions;
        case 'success':
          return b.successRate - a.successRate;
        case 'resistance':
          return a.resistanceRate - b.resistanceRate;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedRisk, sortBy]);

  const handleViewDetails = (antibiotic: any) => {
    setSelectedAntibiotic(antibiotic);
    setIsDetailModalOpen(true);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const totalPrescriptions = mockAntibioticData.reduce((sum, a) => sum + a.prescriptions, 0);
  const avgSuccessRate = Math.round(mockAntibioticData.reduce((sum, a) => sum + a.successRate, 0) / mockAntibioticData.length);
  const highRiskCount = mockAntibioticData.filter(a => a.riskLevel === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header with Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Prescriptions</p>
                <p className="text-2xl font-bold">{totalPrescriptions.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Success Rate</p>
                <p className="text-2xl font-bold">{avgSuccessRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk Antibiotics</p>
                <p className="text-2xl font-bold">{highRiskCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monitored Classes</p>
                <p className="text-2xl font-bold">{new Set(mockAntibioticData.map(a => a.class)).size}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Antibiotic Intelligence Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search antibiotics, classes, or indications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Beta-lactam">Beta-lactam</SelectItem>
                    <SelectItem value="Quinolone">Quinolone</SelectItem>
                    <SelectItem value="Macrolide">Macrolide</SelectItem>
                    <SelectItem value="Glycopeptide">Glycopeptide</SelectItem>
                    <SelectItem value="Tetracycline">Tetracycline</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prescriptions">Most Prescribed</SelectItem>
                    <SelectItem value="success">Highest Success</SelectItem>
                    <SelectItem value="resistance">Lowest Resistance</SelectItem>
                    <SelectItem value="name">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedCategory !== 'all' || selectedRisk !== 'all') && (
              <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchTerm}
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Category: {selectedCategory}
                  </Badge>
                )}
                {selectedRisk !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    Risk: {selectedRisk}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Antibiotic Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedAntibiotics.map((antibiotic, index) => (
            <motion.div
              key={antibiotic.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AntibioticSmartCard
                antibiotic={antibiotic}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </div>

        {filteredAndSortedAntibiotics.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No antibiotics match your current filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedRisk('all');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AntibioticDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        antibiotic={selectedAntibiotic || mockAntibioticData[0]}
      />
    </div>
  );
};
