import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScrollText, BookOpen, Bookmark, Search, ExternalLink, Star, Clock, FileText, Info, Download, Printer, AlertTriangle, CheckCircle } from "lucide-react";
import { DrugInteractionChecker } from "./drug-interactions/DrugInteractionChecker";

interface ClinicalGuidelinesProps {
  searchTerm?: string;
}

const mockGuidelines = [
  {
    id: 'idsa-cap',
    title: 'IDSA Guidelines for Community-Acquired Pneumonia',
    organization: 'IDSA/ATS',
    lastUpdated: '2019-10-01',
    category: 'Respiratory',
    summary: 'Diagnosis and treatment of adults with community-acquired pneumonia. Updated guidelines focusing on severity assessment, pathogen identification, and antimicrobial selection.',
    recommendations: [
      'Use severity assessment tools (CURB-65, PSI) for treatment decisions',
      'Obtain blood cultures and sputum for hospitalized patients',
      'Standard therapy duration is 5 days for uncomplicated cases',
      'Consider local resistance patterns when selecting empirical therapy'
    ],
    evidenceLevel: 'A',
    isFavorite: false,
    externalUrl: 'https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults/',
    keyPoints: [
      'CURB-65 score helps determine outpatient vs inpatient treatment',
      'Procalcitonin can guide antibiotic duration',
      'Macrolide resistance is increasing in many regions'
    ],
    pdfUrl: '#',
    isImplemented: false,
    implementationNotes: ''
  },
  {
    id: 'idsa-uti',
    title: 'IDSA Guidelines for Urinary Tract Infections',
    organization: 'IDSA',
    lastUpdated: '2010-03-01',
    category: 'Urinary',
    summary: 'Evidence-based approach to diagnosis and treatment of uncomplicated urinary tract infections in women.',
    recommendations: [
      'Nitrofurantoin or TMP-SMX for uncomplicated cystitis (if local resistance <20%)',
      'Avoid fluoroquinolones for uncomplicated infections',
      'Three-day therapy sufficient for uncomplicated cystitis',
      'Urine culture not routinely needed for uncomplicated cases'
    ],
    evidenceLevel: 'A',
    isFavorite: true,
    externalUrl: 'https://www.idsociety.org/practice-guideline/urinary-tract-infection/',
    keyPoints: [
      'Local resistance patterns should guide empirical therapy',
      'Fosfomycin is an alternative for resistant organisms',
      'Cranberry products have limited evidence for prevention'
    ],
    pdfUrl: '#',
    isImplemented: true,
    implementationNotes: 'Fully integrated into EMR protocols'
  },
  {
    id: 'surviving-sepsis',
    title: 'Surviving Sepsis Campaign Guidelines',
    organization: 'SSC/SCCM',
    lastUpdated: '2021-10-01',
    category: 'Critical Care',
    summary: 'International guidelines for management of sepsis and septic shock, emphasizing early recognition and intervention.',
    recommendations: [
      'Implement the Hour-1 Bundle for sepsis management',
      'Administer broad-spectrum antibiotics within 1 hour',
      'Obtain blood cultures before antibiotics when feasible',
      'Reassess antibiotic therapy daily for de-escalation'
    ],
    evidenceLevel: 'A',
    isFavorite: false,
    externalUrl: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines',
    keyPoints: [
      'Early recognition saves lives - use qSOFA or SOFA scores',
      'Source control should be achieved as soon as possible',
      'Vasopressors preferred over inotropes for shock'
    ],
    pdfUrl: '#',
    isImplemented: false,
    implementationNotes: ''
  },
  {
    id: 'cdc-surgical-prophylaxis',
    title: 'CDC Guidelines for Surgical Site Infection Prevention',
    organization: 'CDC/HICPAC',
    lastUpdated: '2017-05-01',
    category: 'Surgical',
    summary: 'Comprehensive recommendations for preventing surgical site infections through perioperative care optimization.',
    recommendations: [
      'Administer prophylactic antibiotics within 60 minutes before incision',
      'Discontinue prophylaxis within 24 hours of surgery',
      'Use cefazolin for most procedures (clindamycin or vancomycin for allergies)',
      'Maintain normothermia and appropriate glucose control'
    ],
    evidenceLevel: 'B',
    isFavorite: false,
    externalUrl: 'https://www.cdc.gov/hai/ssi/ssi.html',
    keyPoints: [
      'Hair removal should be done with clippers, not razors',
      'Antiseptic prophylaxis reduces infection risk',
      'Weight-based dosing ensures adequate tissue levels'
    ],
    pdfUrl: '#',
    isImplemented: false,
    implementationNotes: ''
  }
];

export const ClinicalGuidelines: React.FC<ClinicalGuidelinesProps> = ({ searchTerm: externalSearchTerm = "" }) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [filteredGuidelines, setFilteredGuidelines] = useState(mockGuidelines);
  const [favorites, setFavorites] = useState<string[]>(['idsa-uti']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuideline, setSelectedGuideline] = useState<string | null>(null);
  const [implementationStatus, setImplementationStatus] = useState<{[key: string]: boolean}>({
    'idsa-uti': true
  });
  const [implementationNotes, setImplementationNotes] = useState<{[key: string]: string}>({
    'idsa-uti': 'Fully integrated into EMR protocols'
  });
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

  const handleLearnMore = (guidelineId: string, title: string, url: string) => {
    toast({
      title: "Opening External Guideline",
      description: `Opening "${title}" in a new tab. Please ensure your popup blocker allows this.`,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadPDF = (guidelineId: string, title: string) => {
    toast({
      title: "PDF Download Started",
      description: `Downloading "${title}" guideline PDF...`,
    });
    // Simulate PDF download
    console.log(`Downloading PDF for guideline: ${guidelineId}`);
  };

  const handlePrintGuideline = (guidelineId: string, title: string) => {
    toast({
      title: "Preparing Print",
      description: `Preparing "${title}" for printing...`,
    });
    // Simulate print functionality
    window.print();
  };

  const handleImplementationGuide = (guidelineId: string) => {
    setSelectedGuideline(selectedGuideline === guidelineId ? null : guidelineId);
    if (selectedGuideline !== guidelineId) {
      toast({
        title: "Implementation Guide",
        description: "Showing key implementation points and recommendations.",
      });
    }
  };

  const handleMarkImplemented = (guidelineId: string) => {
    setImplementationStatus(prev => ({
      ...prev,
      [guidelineId]: !prev[guidelineId]
    }));
    
    const isNowImplemented = !implementationStatus[guidelineId];
    toast({
      title: isNowImplemented ? "Marked as Implemented" : "Marked as Not Implemented",
      description: isNowImplemented 
        ? "This guideline has been marked as implemented in your facility."
        : "This guideline has been marked as not yet implemented.",
    });
  };

  const handleUpdateNotes = (guidelineId: string, notes: string) => {
    setImplementationNotes(prev => ({
      ...prev,
      [guidelineId]: notes
    }));
    
    toast({
      title: "Implementation Notes Updated",
      description: "Your implementation notes have been saved.",
    });
  };

  const categories = ['all', 'respiratory', 'urinary', 'critical care', 'surgical', 'dermatology'];
  
  const quickAccessItems = [
    {
      title: 'Antibiotic Stewardship Principles',
      description: 'Core principles for responsible antibiotic use',
      action: () => {
        toast({
          title: "Stewardship Principles",
          description: "Key principles: Right drug, right dose, right duration, right patient.",
        });
      }
    },
    {
      title: 'Sepsis Recognition & Management',
      description: 'Hour-1 bundle and early intervention strategies',
      action: () => {
        toast({
          title: "Sepsis Management",
          description: "Remember the Hour-1 Bundle: cultures, antibiotics, lactate, fluids.",
        });
      }
    },
    {
      title: 'Resistance Prevention Strategies',
      description: 'Evidence-based approaches to combat resistance',
      action: () => {
        toast({
          title: "Resistance Prevention",
          description: "Focus on appropriate use, infection control, and surveillance.",
        });
      }
    }
  ];
  
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
                          {implementationStatus[guideline.id] ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
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
                          <Badge 
                            variant={implementationStatus[guideline.id] ? 'default' : 'destructive'}
                            className={implementationStatus[guideline.id] ? 'bg-green-600' : ''}
                          >
                            {implementationStatus[guideline.id] ? 'Implemented' : 'Not Implemented'}
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
                        {guideline.recommendations.slice(0, 3).map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-medical-primary mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {selectedGuideline === guideline.id && (
                      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border">
                        <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          Implementation Key Points:
                        </h5>
                        <ul className="space-y-1 mb-4">
                          {guideline.keyPoints.map((point, index) => (
                            <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                              <span className="text-blue-500 mt-1">→</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">Implementation Notes:</label>
                            <textarea
                              className="w-full mt-1 p-2 border rounded text-sm"
                              placeholder="Add implementation notes for your facility..."
                              value={implementationNotes[guideline.id] || ''}
                              onChange={(e) => handleUpdateNotes(guideline.id, e.target.value)}
                              rows={3}
                            />
                          </div>
                          
                          <Button
                            onClick={() => handleMarkImplemented(guideline.id)}
                            variant={implementationStatus[guideline.id] ? "destructive" : "default"}
                            size="sm"
                          >
                            {implementationStatus[guideline.id] ? "Mark as Not Implemented" : "Mark as Implemented"}
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleLearnMore(guideline.id, guideline.title, guideline.externalUrl)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Learn More
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedGuideline === guideline.id ? "default" : "outline"}
                        onClick={() => handleImplementationGuide(guideline.id)}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        {selectedGuideline === guideline.id ? "Hide Guide" : "Implementation Guide"}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadPDF(guideline.id, guideline.title)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePrintGuideline(guideline.id, guideline.title)}
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        Print
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
                Quick Access - Essential Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickAccessItems.map((item, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="justify-start h-auto p-4"
                    onClick={item.action}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </Button>
                ))}
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
