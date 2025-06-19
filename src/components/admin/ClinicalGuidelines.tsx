
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScrollText, BookOpen, Bookmark, Search, Download, ExternalLink, Star, Clock } from "lucide-react";
import { DrugInteractionChecker } from "./drug-interactions/DrugInteractionChecker";
import { GuidelineContent } from "./clinical-guidelines/GuidelineContent";

interface ClinicalGuidelinesProps {
  searchTerm?: string;
}

const mockGuidelines = [
  {
    id: 'idsa-cap',
    title: 'IDSA Guidelines for Community-Acquired Pneumonia',
    organization: 'IDSA',
    lastUpdated: '2023-10-15',
    category: 'Respiratory',
    summary: 'Comprehensive guidelines for diagnosis and treatment of community-acquired pneumonia in adults.',
    recommendations: [
      'Empirical therapy should be based on local resistance patterns',
      'Blood cultures recommended for hospitalized patients',
      'Duration of therapy typically 5-7 days for most patients'
    ],
    evidenceLevel: 'A',
    isFavorite: false
  },
  {
    id: 'cdc-uti',
    title: 'CDC Guidelines for Urinary Tract Infections',
    organization: 'CDC',
    lastUpdated: '2023-08-22',
    category: 'Urinary',
    summary: 'Evidence-based recommendations for uncomplicated and complicated UTI management.',
    recommendations: [
      'Nitrofurantoin or TMP-SMX for uncomplicated cystitis',
      'Fluoroquinolones reserved for complicated cases',
      'Consider local resistance patterns when selecting empirical therapy'
    ],
    evidenceLevel: 'A',
    isFavorite: true
  },
  {
    id: 'who-sepsis',
    title: 'WHO Guidelines for Sepsis Management',
    organization: 'WHO',
    lastUpdated: '2023-12-01',
    category: 'Critical Care',
    summary: 'Global recommendations for early recognition and management of sepsis.',
    recommendations: [
      'Hour-1 bundle implementation for sepsis care',
      'Broad-spectrum antibiotics within 1 hour',
      'Source control as soon as medically appropriate'
    ],
    evidenceLevel: 'A',
    isFavorite: false
  }
];

export const ClinicalGuidelines: React.FC<ClinicalGuidelinesProps> = ({ searchTerm: externalSearchTerm = "" }) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [filteredGuidelines, setFilteredGuidelines] = useState(mockGuidelines);
  const [favorites, setFavorites] = useState<string[]>(['cdc-uti']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  
  // Sync external search term to internal state
  useEffect(() => {
    if (externalSearchTerm) {
      setInternalSearchTerm(externalSearchTerm);
    }
  }, [externalSearchTerm]);

  const effectiveSearchTerm = externalSearchTerm || internalSearchTerm;

  // Filter guidelines based on search term and category
  useEffect(() => {
    let filtered = mockGuidelines;
    
    if (effectiveSearchTerm) {
      filtered = filtered.filter(guideline => 
        guideline.title.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
        guideline.organization.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
        guideline.category.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
        guideline.summary.toLowerCase().includes(effectiveSearchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(guideline => 
        guideline.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredGuidelines(filtered);
  }, [effectiveSearchTerm, selectedCategory]);

  const handleToggleFavorite = (guidelineId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(guidelineId)
        ? prev.filter(id => id !== guidelineId)
        : [...prev, guidelineId];
      
      toast({
        title: prev.includes(guidelineId) ? "Removed from Favorites" : "Added to Favorites",
        description: "Your favorites have been updated.",
      });
      
      return newFavorites;
    });
  };

  const handleDownloadGuideline = (guidelineId: string, title: string) => {
    toast({
      title: "Downloading Guideline",
      description: `Preparing download for "${title}"...`,
    });
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "The guideline has been downloaded to your device.",
      });
    }, 2000);
  };

  const handleOpenExternal = (guidelineId: string, title: string) => {
    toast({
      title: "Opening External Link",
      description: `Opening "${title}" in a new tab...`,
    });
    // In a real app, this would open the actual guideline URL
    window.open('#', '_blank');
  };

  const categories = ['all', 'respiratory', 'urinary', 'critical care', 'surgical', 'dermatology'];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Clinical Decision Support</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guidelines..."
            className="pl-9"
            value={internalSearchTerm}
            onChange={(e) => setInternalSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="guidelines">
        <TabsList>
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            Guidelines
          </TabsTrigger>
          <TabsTrigger value="interactions" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Drug Interactions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="guidelines" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Guidelines Grid */}
          <div className="grid gap-6">
            {filteredGuidelines.length === 0 ? (
              <Card className="p-8 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No Guidelines Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or category filter.
                </p>
              </Card>
            ) : (
              filteredGuidelines.map(guideline => (
                <Card key={guideline.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{guideline.title}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleFavorite(guideline.id)}
                            className="text-yellow-500 hover:text-yellow-600"
                          >
                            <Star className={`h-4 w-4 ${favorites.includes(guideline.id) ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{guideline.organization}</Badge>
                          <Badge variant="secondary">{guideline.category}</Badge>
                          <Badge 
                            variant={guideline.evidenceLevel === 'A' ? 'default' : 'outline'}
                            className={guideline.evidenceLevel === 'A' ? 'bg-green-600' : ''}
                          >
                            Level {guideline.evidenceLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          Updated: {new Date(guideline.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{guideline.summary}</p>
                    
                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-sm">Key Recommendations:</h4>
                      <ul className="space-y-1">
                        {guideline.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-medical-primary mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadGuideline(guideline.id, guideline.title)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenExternal(guideline.id, guideline.title)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Full
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Quick Access to Common Guidelines */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-semibold">Sepsis Hour-1 Bundle</div>
                    <div className="text-sm text-gray-600">Critical care protocols</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-semibold">Antibiotic Stewardship</div>
                    <div className="text-sm text-gray-600">Best practices guide</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-semibold">Resistance Prevention</div>
                    <div className="text-sm text-gray-600">CDC recommendations</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interactions">
          <Card className="border-0 shadow-sm">
            <DrugInteractionChecker searchTerm={effectiveSearchTerm} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
