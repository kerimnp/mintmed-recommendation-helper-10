
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
  Shield,
  Pill,
  Target,
  Users,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicalAntibioticCard } from './ClinicalAntibioticCard';
import { ClinicalDetailModal } from './ClinicalDetailModal';
import { clinicalAntibiotics, getAntibioticStatistics, ClinicalAntibioticData } from './ClinicalAntibioticData';

export const ClinicalIntelligenceHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedSpectrum, setSelectedSpectrum] = useState('all');
  const [sortBy, setSortBy] = useState('prescriptions');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAntibiotic, setSelectedAntibiotic] = useState<ClinicalAntibioticData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const stats = getAntibioticStatistics();

  const filteredAndSortedAntibiotics = useMemo(() => {
    let filtered = clinicalAntibiotics.filter(antibiotic => {
      const matchesSearch = antibiotic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           antibiotic.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           antibiotic.commonIndications.some(indication => 
                             indication.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesClass = selectedClass === 'all' || antibiotic.class === selectedClass;
      const matchesRisk = selectedRisk === 'all' || antibiotic.riskLevel === selectedRisk;
      const matchesSpectrum = selectedSpectrum === 'all' || 
                             antibiotic.spectrum.toLowerCase().includes(selectedSpectrum.toLowerCase());
      
      return matchesSearch && matchesClass && matchesRisk && matchesSpectrum;
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
        case 'safety':
          const safetyOrder = { excellent: 4, good: 3, moderate: 2, poor: 1 };
          return safetyOrder[b.safetyProfile] - safetyOrder[a.safetyProfile];
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedClass, selectedRisk, selectedSpectrum, sortBy]);

  const handleViewDetails = (antibiotic: ClinicalAntibioticData) => {
    setSelectedAntibiotic(antibiotic);
    setIsDetailModalOpen(true);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  const uniqueClasses = [...new Set(clinicalAntibiotics.map(a => a.class))];

  return (
    <div className="space-y-6">
      {/* Header with Key Clinical Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPrescriptions.toLocaleString()}</p>
              </div>
              <Pill className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Avg Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgSuccessRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">High Risk</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highRiskCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Antibiotics</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAntibiotics}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Avg Resistance</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgResistanceRate}%</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Clinical Antibiotic Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 flex-1 w-full">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search antibiotics, indications, organisms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Antibiotic Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {uniqueClasses.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSpectrum} onValueChange={setSelectedSpectrum}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Spectrum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Spectrum</SelectItem>
                    <SelectItem value="narrow">Narrow</SelectItem>
                    <SelectItem value="broad">Broad</SelectItem>
                    <SelectItem value="very broad">Very Broad</SelectItem>
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
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prescriptions">Most Prescribed</SelectItem>
                    <SelectItem value="success">Highest Success</SelectItem>
                    <SelectItem value="resistance">Lowest Resistance</SelectItem>
                    <SelectItem value="safety">Best Safety</SelectItem>
                    <SelectItem value="name">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Update Data
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedClass !== 'all' || selectedRisk !== 'all' || selectedSpectrum !== 'all') && (
              <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary">
                    Search: {searchTerm}
                  </Badge>
                )}
                {selectedClass !== 'all' && (
                  <Badge variant="secondary">
                    Class: {selectedClass}
                  </Badge>
                )}
                {selectedSpectrum !==

 'all' && (
                  <Badge variant="secondary">
                    Spectrum: {selectedSpectrum}
                  </Badge>
                )}
                {selectedRisk !== 'all' && (
                  <Badge variant="secondary">
                    Risk: {selectedRisk}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedClass('all');
                    setSelectedRisk('all');
                    setSelectedSpectrum('all');
                  }}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Clinical Results Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredAndSortedAntibiotics.length}</span> of <span className="font-semibold">{clinicalAntibiotics.length}</span> antibiotics
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Data updated every 2 hours • Real clinical data from Bosnia and Herzegovina
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Clinical Antibiotic Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedAntibiotics.map((antibiotic, index) => (
            <motion.div
              key={antibiotic.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ClinicalAntibioticCard
                antibiotic={antibiotic}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </div>

        {filteredAndSortedAntibiotics.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <Search className="h-12 w-12 text-gray-300" />
                <div>
                  <p className="text-lg font-medium text-gray-900">No antibiotics found</p>
                  <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedClass('all');
                    setSelectedRisk('all');
                    setSelectedSpectrum('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Clinical Detail Modal */}
      {selectedAntibiotic && (
        <ClinicalDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          antibiotic={selectedAntibiotic}
        />
      )}
    </div>
  );
};
