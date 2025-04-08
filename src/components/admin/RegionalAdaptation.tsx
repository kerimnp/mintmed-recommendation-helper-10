
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Download, BarChart2 } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { globalResistanceData } from "@/utils/antibioticRecommendations/data/globalResistance";

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
        differences: "Higher emphasis on macrolide resistance patterns"
      },
      { 
        id: "NAM-UTI-2022", 
        title: "Urinary Tract Infections - North American Protocol",
        organization: "American Urology Association",
        lastUpdated: "2022-09-15",
        differences: "Includes regional antibiogram data for fluoroquinolones"
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
        differences: "Lower threshold for considering resistant organisms"
      },
      { 
        id: "EUR-MRSA-2022", 
        title: "MRSA Management in European Healthcare Settings",
        organization: "European Committee on Antimicrobial Susceptibility Testing",
        lastUpdated: "2022-11-30",
        differences: "Emphasis on different decolonization protocols"
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
        differences: "Extended treatment duration for MDR-TB"
      },
      { 
        id: "APAC-ESBL-2022", 
        title: "ESBL Infections in Asia Pacific Region",
        organization: "Asian Network for Surveillance of Resistant Pathogens",
        lastUpdated: "2022-08-05",
        differences: "Alternative carbapenem-sparing approaches based on local resistance"
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

// Sample coordinates for the regions - now with 3 values [x, y, scale] to fix the TypeScript errors
const regionCoordinates: Record<string, [number, number, number]> = {
  "North America": [190, 160, 1],
  "Europe": [480, 140, 1],
  "Asia Pacific": [650, 200, 1],
  "Africa": [490, 300, 1],
  "Middle East": [540, 220, 1],
  "Latin America": [300, 330, 1],
  "Australia": [740, 380, 1]
};

export const RegionalAdaptation = () => {
  const [activeTab, setActiveTab] = useState("guidelines");
  const [selectedRegion, setSelectedRegion] = useState("North America");

  // Find the selected region data
  const regionData = regionalGuidelines.find(region => region.region === selectedRegion);
  const usageData = antibioticUsageData[selectedRegion as keyof typeof antibioticUsageData] || [];

  // All available regions
  const availableRegions = Object.keys(regionCoordinates);

  const renderRegionalMap = () => {
    return (
      <div className="relative h-[400px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* World map background - simplified for example */}
        <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20">
          {/* This would be where an actual map component would go */}
          <svg
            viewBox="0 0 800 450"
            className="h-full w-full"
            style={{ filter: "drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1))" }}
          >
            {/* Simplified world map paths would be here */}
            <path
              d="M 100 150 Q 150 100 200 150 T 300 150 T 400 150 T 500 150 T 600 150 T 700 150 Q 750 200 700 250 Q 650 300 600 250 T 500 250 T 400 250 T 300 250 T 200 250 Q 150 200 100 150"
              fill="#e6e6e6"
              stroke="#cccccc"
              strokeWidth="1"
            />
            
            {/* Region markers */}
            {availableRegions.map(region => {
              const [x, y, scale] = regionCoordinates[region];
              const isSelected = region === selectedRegion;
              
              return (
                <g key={region} transform={`translate(${x}, ${y}) scale(${scale})`} className="cursor-pointer">
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? 12 : 8}
                    fill={isSelected ? "rgb(37, 99, 235)" : "rgb(107, 114, 128)"}
                    onClick={() => setSelectedRegion(region)}
                  />
                  <text
                    x="15"
                    y="5"
                    fontSize="12"
                    fontWeight={isSelected ? "bold" : "normal"}
                    fill={isSelected ? "rgb(37, 99, 235)" : "rgb(107, 114, 128)"}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
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
      
      {renderRegionalMap()}
      
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
                <div key={guideline.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{guideline.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{guideline.organization}</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm"><strong>Last Updated:</strong> {guideline.lastUpdated}</p>
                    <p className="text-sm mt-1"><strong>Regional Differences:</strong> {guideline.differences}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resistance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Resistance Patterns - {selectedRegion}</CardTitle>
              <CardDescription>
                Common antibiotics and their effectiveness in this region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={globalResistanceData.find(r => r.region === selectedRegion)?.pathogens || []}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Resistance Rate (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="resistanceRate" name="Resistance Rate (%)" fill="#8884d8" />
                    <Line type="monotone" dataKey="trendLine" name="5-Year Trend" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional vs. Standard Antibiotic Usage - {selectedRegion}</CardTitle>
              <CardDescription>
                Comparison of regional antibiotic prescribing patterns vs. global standard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={usageData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
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
                <Button className="flex items-center gap-2">
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
