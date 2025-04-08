
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Download, BarChart2, FileText } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { globalResistanceData } from "@/utils/antibioticRecommendations/data/globalResistance";
import { toast } from "sonner";

// Sample data for regional guidelines
const regionalGuidelines = [
  {
    region: "North America",
    guidelines: [
      { 
        id: "NAM-CAP-2023", 
        title: "Community-Acquired Pneumonia in North America",
        organization: "North American Respiratory Society",
        lastUpdated: "2023-06-10",
        differences: "Higher emphasis on macrolide resistance patterns",
        pdfUrl: "/guidelines/NAM-CAP-2023.pdf"
      },
      { 
        id: "NAM-UTI-2022", 
        title: "Urinary Tract Infections - North American Protocol",
        organization: "American Urology Association",
        lastUpdated: "2022-09-15",
        differences: "Includes regional antibiogram data for fluoroquinolones",
        pdfUrl: "/guidelines/NAM-UTI-2022.pdf"
      }
    ]
  },
  {
    region: "Europe",
    guidelines: [
      { 
        id: "EUR-CAP-2023", 
        title: "European Guidelines for Community-Acquired Pneumonia",
        organization: "European Respiratory Society",
        lastUpdated: "2023-04-22",
        differences: "Lower threshold for considering resistant organisms",
        pdfUrl: "/guidelines/EUR-CAP-2023.pdf"
      },
      { 
        id: "EUR-MRSA-2022", 
        title: "MRSA Management in European Healthcare Settings",
        organization: "European Committee on Antimicrobial Susceptibility Testing",
        lastUpdated: "2022-11-30",
        differences: "Emphasis on different decolonization protocols",
        pdfUrl: "/guidelines/EUR-MRSA-2022.pdf"
      }
    ]
  },
  {
    region: "Asia Pacific",
    guidelines: [
      { 
        id: "APAC-TB-2023", 
        title: "Tuberculosis Management in Asia Pacific",
        organization: "Asia Pacific TB Consortium",
        lastUpdated: "2023-02-15",
        differences: "Extended treatment duration for MDR-TB",
        pdfUrl: "/guidelines/APAC-TB-2023.pdf"
      },
      { 
        id: "APAC-ESBL-2022", 
        title: "ESBL Infections in Asia Pacific Region",
        organization: "Asian Network for Surveillance of Resistant Pathogens",
        lastUpdated: "2022-08-05",
        differences: "Alternative carbapenem-sparing approaches based on local resistance",
        pdfUrl: "/guidelines/APAC-ESBL-2022.pdf"
      }
    ]
  }
];

// Sample data for regional antibiotic usage
const antibioticUsageData = {
  "North America": [
    { name: "Penicillins", standard: 35, regional: 28, difference: -7 },
    { name: "Cephalosporins", standard: 25, regional: 30, difference: 5 },
    { name: "Macrolides", standard: 15, regional: 20, difference: 5 },
    { name: "Fluoroquinolones", standard: 12, regional: 9, difference: -3 },
    { name: "Tetracyclines", standard: 8, regional: 7, difference: -1 },
    { name: "Others", standard: 5, regional: 6, difference: 1 }
  ],
  "Europe": [
    { name: "Penicillins", standard: 35, regional: 40, difference: 5 },
    { name: "Cephalosporins", standard: 25, regional: 22, difference: -3 },
    { name: "Macrolides", standard: 15, regional: 12, difference: -3 },
    { name: "Fluoroquinolones", standard: 12, regional: 6, difference: -6 },
    { name: "Tetracyclines", standard: 8, regional: 12, difference: 4 },
    { name: "Others", standard: 5, regional: 8, difference: 3 }
  ],
  "Asia Pacific": [
    { name: "Penicillins", standard: 35, regional: 32, difference: -3 },
    { name: "Cephalosporins", standard: 25, regional: 35, difference: 10 },
    { name: "Macrolides", standard: 15, regional: 15, difference: 0 },
    { name: "Fluoroquinolones", standard: 12, regional: 8, difference: -4 },
    { name: "Tetracyclines", standard: 8, regional: 5, difference: -3 },
    { name: "Others", standard: 5, regional: 5, difference: 0 }
  ],
  "Africa": [
    { name: "Penicillins", standard: 35, regional: 45, difference: 10 },
    { name: "Cephalosporins", standard: 25, regional: 20, difference: -5 },
    { name: "Macrolides", standard: 15, regional: 10, difference: -5 },
    { name: "Fluoroquinolones", standard: 12, regional: 8, difference: -4 },
    { name: "Tetracyclines", standard: 8, regional: 12, difference: 4 },
    { name: "Others", standard: 5, regional: 5, difference: 0 }
  ],
  "Middle East": [
    { name: "Penicillins", standard: 35, regional: 30, difference: -5 },
    { name: "Cephalosporins", standard: 25, regional: 28, difference: 3 },
    { name: "Macrolides", standard: 15, regional: 18, difference: 3 },
    { name: "Fluoroquinolones", standard: 12, regional: 14, difference: 2 },
    { name: "Tetracyclines", standard: 8, regional: 6, difference: -2 },
    { name: "Others", standard: 5, regional: 4, difference: -1 }
  ]
};

export const RegionalAdaptation = () => {
  const [activeTab, setActiveTab] = useState("guidelines");
  const [selectedRegion, setSelectedRegion] = useState("Europe");

  // Find the selected region data
  const regionData = regionalGuidelines.find(region => region.region === selectedRegion);
  const usageData = antibioticUsageData[selectedRegion as keyof typeof antibioticUsageData] || [];

  // All available regions
  const availableRegions = Object.keys(antibioticUsageData);

  // Prepare resistance data for the chart
  const getResistanceData = (region: string) => {
    const regionData = globalResistanceData.find(r => r.region === region) || 
                      globalResistanceData.find(r => r.region === "Balkan");
    
    if (!regionData || !regionData.countries) {
      return [];
    }
    
    // Transform the countries data to format needed for the chart
    return regionData.countries.map(country => ({
      name: country.country,
      mrsa: country.mrsa,
      vre: country.vre,
      esbl: country.esbl,
      cre: country.cre,
      pseudomonas: country.pseudomonas,
    }));
  };
  
  // Handle guideline download
  const handleDownloadGuideline = (guidelineId: string, title: string) => {
    // In a real application, this would trigger an actual file download
    toast.success(`Downloading ${title}`);
    console.log(`Downloading guideline: ${guidelineId}`);
  };
  
  // Handle data export
  const handleExportData = () => {
    toast.success("Data exported successfully");
  };

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/30">
        <Info className="h-4 w-4 mr-2" />
        <AlertDescription>
          Regional adaptation allows customization of the recommendation system based on local resistance patterns and clinical guidelines.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Regional Settings</h2>
          <p className="text-sm text-muted-foreground">Customize recommendations for specific geographic regions</p>
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {availableRegions.map((region) => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="resistance">Resistance Patterns</TabsTrigger>
          <TabsTrigger value="usage">Antibiotic Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="guidelines" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Clinical Guidelines - {selectedRegion}</CardTitle>
              <CardDescription>
                Region-specific adaptations to standard treatment protocols
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {regionData?.guidelines.map((guideline) => (
                <div key={guideline.id} className="border rounded-lg p-4 bg-card shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{guideline.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{guideline.organization}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleDownloadGuideline(guideline.id, guideline.title)}>
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm"><strong>Last Updated:</strong> {guideline.lastUpdated}</p>
                    <p className="text-sm"><strong>Regional Differences:</strong> {guideline.differences}</p>
                  </div>
                </div>
              ))}

              {(!regionData || regionData.guidelines.length === 0) && (
                <div className="py-8 text-center text-muted-foreground">
                  No guidelines available for this region.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resistance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Resistance Patterns - {selectedRegion}</CardTitle>
              <CardDescription>
                Common antibiotics and their effectiveness in this region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={getResistanceData(selectedRegion)}
                    margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Resistance Rate (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mrsa" name="MRSA" fill="#8884d8" />
                    <Bar dataKey="vre" name="VRE" fill="#82ca9d" />
                    <Bar dataKey="esbl" name="ESBL" fill="#ffc658" />
                    <Bar dataKey="cre" name="CRE" fill="#ff8042" />
                    <Bar dataKey="pseudomonas" name="Pseudomonas" fill="#0088fe" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <Button className="flex items-center gap-2" onClick={handleExportData}>
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional vs. Standard Antibiotic Usage - {selectedRegion}</CardTitle>
              <CardDescription>
                Comparison of regional antibiotic prescribing patterns vs. global standard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={usageData}
                    margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Usage (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="standard" name="Global Standard" fill="#8884d8" />
                    <Bar dataKey="regional" name="Regional Usage" fill="#82ca9d" />
                    <Line type="monotone" dataKey="difference" name="Difference" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <Button className="flex items-center gap-2" onClick={handleExportData}>
                  <BarChart2 className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
