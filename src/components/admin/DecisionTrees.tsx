
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { GitBranch, Info, Download, ZoomIn, ZoomOut, Maximize2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DecisionTrees = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [selectedInfection, setSelectedInfection] = useState<string>('respiratory');
  
  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 20);
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 60) {
      setZoomLevel(zoomLevel - 20);
    }
  };
  
  const handleReset = () => {
    setZoomLevel(100);
  };
  
  // Full list of infection types with their decision trees
  const infectionTypes = [
    { id: 'respiratory', name: 'Respiratory Tract Infections', image: '/placeholder.svg' },
    { id: 'urinary', name: 'Urinary Tract Infections', image: '/placeholder.svg' },
    { id: 'skin', name: 'Skin and Soft Tissue Infections', image: '/placeholder.svg' },
    { id: 'abdominal', name: 'Abdominal Infections', image: '/placeholder.svg' },
    { id: 'cns', name: 'Central Nervous System Infections', image: '/placeholder.svg' },
    { id: 'bloodstream', name: 'Bloodstream Infections', image: '/placeholder.svg' },
    { id: 'bone', name: 'Bone and Joint Infections', image: '/placeholder.svg' },
    { id: 'eye', name: 'Eye Infections', image: '/placeholder.svg' },
    { id: 'ear', name: 'Ear Infections', image: '/placeholder.svg' },
    { id: 'dental', name: 'Dental Infections', image: '/placeholder.svg' },
    { id: 'gi', name: 'Gastrointestinal Infections', image: '/placeholder.svg' },
  ];

  const renderDecisionTree = (infectionId: string) => {
    const infectionName = infectionTypes.find(type => type.id === infectionId)?.name || 'Unknown Infection';
    
    return (
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg border p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{infectionName} Decision Tree</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{zoomLevel}%</span>
            <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 60}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoomLevel >= 200}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          className="overflow-auto border bg-white dark:bg-gray-800 rounded-lg shadow-inner p-4"
          style={{ height: '600px' }}
        >
          <div 
            style={{ 
              transform: `scale(${zoomLevel/100})`, 
              transformOrigin: 'top left',
              width: `${10000/zoomLevel}%`
            }}
            className="min-h-[500px] flex items-center justify-center"
          >
            {/* This is where we'd render the actual tree */}
            <div className="text-center">
              <img 
                src={infectionTypes.find(type => type.id === infectionId)?.image || '/placeholder.svg'} 
                alt={`${infectionName} Decision Tree`}
                className="max-w-full h-auto mx-auto mb-4"
                style={{maxHeight: '500px'}}
              />
              <div className="prose dark:prose-invert max-w-none">
                <h4>Decision Tree for {infectionName}</h4>
                <p>
                  This is a placeholder for the {infectionName.toLowerCase()} decision tree.
                  In a production environment, this would be replaced with an interactive decision tree
                  showing the recommended diagnostic and treatment steps.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <span className="text-xs text-muted-foreground">Last updated: April 3, 2025</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-medical-primary" /> Treatment Decision Trees
              </CardTitle>
              <CardDescription>Interactive decision trees for antimicrobial therapy selection</CardDescription>
            </div>
            <Select value={selectedInfection} onValueChange={setSelectedInfection}>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Select infection type" />
              </SelectTrigger>
              <SelectContent>
                {infectionTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/30">
            <Info className="h-4 w-4" />
            <AlertTitle>Decision Support Tool</AlertTitle>
            <AlertDescription>
              These decision trees are designed to assist clinical decision-making but should be used in conjunction with clinical judgment and local resistance patterns.
            </AlertDescription>
          </Alert>
          
          <Tabs value={selectedInfection} onValueChange={setSelectedInfection}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4">
              <TabsTrigger value="respiratory">Respiratory</TabsTrigger>
              <TabsTrigger value="urinary">Urinary</TabsTrigger>
              <TabsTrigger value="skin">Skin/Soft Tissue</TabsTrigger>
              <TabsTrigger value="abdominal">Abdominal</TabsTrigger>
              <TabsTrigger value="cns">CNS</TabsTrigger>
              <TabsTrigger value="bloodstream">Bloodstream</TabsTrigger>
              <TabsTrigger value="bone">Bone/Joint</TabsTrigger>
              <TabsTrigger value="eye">Eye</TabsTrigger>
              <TabsTrigger value="ear">Ear</TabsTrigger>
              <TabsTrigger value="dental">Dental</TabsTrigger>
              <TabsTrigger value="gi">GI</TabsTrigger>
            </TabsList>
            
            {infectionTypes.map(type => (
              <TabsContent key={type.id} value={type.id} className="mt-0">
                {renderDecisionTree(type.id)}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
