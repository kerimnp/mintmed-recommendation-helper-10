
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Edit, Save, Plus, Globe, Settings, Database, Building } from "lucide-react";

// Sample regional resistance data
const regionalResistanceData = [
  {
    region: "Balkan",
    mrsa: 24,
    vre: 18,
    esbl: 32,
    cre: 12,
    pseudomonas: 28,
    macrolideR: 45,
    penicillinR: 25,
    quinoloneR: 18
  },
  {
    region: "Central Europe",
    mrsa: 18,
    vre: 12,
    esbl: 24,
    cre: 8,
    pseudomonas: 22,
    macrolideR: 35,
    penicillinR: 20,
    quinoloneR: 15
  },
  {
    region: "Northern Europe",
    mrsa: 12,
    vre: 8,
    esbl: 16,
    cre: 5,
    pseudomonas: 18,
    macrolideR: 25,
    penicillinR: 15,
    quinoloneR: 10
  },
  {
    region: "Southern Europe",
    mrsa: 28,
    vre: 20,
    esbl: 36,
    cre: 16,
    pseudomonas: 32,
    macrolideR: 50,
    penicillinR: 30,
    quinoloneR: 22
  },
  {
    region: "Eastern Europe",
    mrsa: 22,
    vre: 16,
    esbl: 30,
    cre: 14,
    pseudomonas: 26,
    macrolideR: 40,
    penicillinR: 22,
    quinoloneR: 16
  }
];

// Sample hospital antibiograms
const hospitalAntibiogramData = [
  {
    id: "hosp-1",
    name: "University Medical Center",
    location: "Belgrade",
    lastUpdated: "2025-03-15",
    organisms: [
      { name: "S. aureus", samples: 245, mrsaRate: 28, resistance: { vancomycin: 0, linezolid: 0, daptomycin: 2 } },
      { name: "E. coli", samples: 312, esblRate: 35, resistance: { imipenem: 5, meropenem: 3, colistin: 0 } },
      { name: "K. pneumoniae", samples: 178, esblRate: 42, creRate: 15, resistance: { imipenem: 12, meropenem: 10, colistin: 5 } }
    ]
  },
  {
    id: "hosp-2",
    name: "Central Regional Hospital",
    location: "Zagreb",
    lastUpdated: "2025-02-28",
    organisms: [
      { name: "S. aureus", samples: 188, mrsaRate: 24, resistance: { vancomycin: 0, linezolid: 0, daptomycin: 1 } },
      { name: "E. coli", samples: 256, esblRate: 30, resistance: { imipenem: 4, meropenem: 2, colistin: 0 } },
      { name: "K. pneumoniae", samples: 142, esblRate: 38, creRate: 12, resistance: { imipenem: 10, meropenem: 8, colistin: 4 } }
    ]
  }
];

// Sample formulary restrictions data
const formularyRestrictionsData = [
  {
    antibiotic: "Vancomycin",
    category: "Restricted",
    approvalRequired: true,
    indications: ["Confirmed MRSA", "Severe infections with suspected MRSA"],
    notes: "ID consult recommended for courses >72 hours"
  },
  {
    antibiotic: "Meropenem",
    category: "Restricted",
    approvalRequired: true,
    indications: ["Confirmed ESBL/CRE infections", "Severe nosocomial infections"],
    notes: "ID approval required; 48-hour automatic stop"
  },
  {
    antibiotic: "Amoxicillin-Clavulanate",
    category: "Unrestricted",
    approvalRequired: false,
    indications: ["Community-acquired respiratory infections", "Skin infections"],
    notes: "First-line for community-acquired infections"
  },
  {
    antibiotic: "Azithromycin",
    category: "Unrestricted",
    approvalRequired: false,
    indications: ["Community-acquired pneumonia", "Atypical pathogens"],
    notes: "Use with caution due to increasing resistance rates"
  },
  {
    antibiotic: "Linezolid",
    category: "Restricted",
    approvalRequired: true,
    indications: ["VRE infections", "MRSA with vancomycin contraindication"],
    notes: "ID approval required; monitor for myelosuppression"
  }
];

// Sample resistance trend data
const resistanceTrendData = [
  { year: 2020, mrsa: 18, esbl: 26, cre: 8, macrolideR: 35 },
  { year: 2021, mrsa: 20, esbl: 28, cre: 9, macrolideR: 38 },
  { year: 2022, mrsa: 21, esbl: 30, cre: 10, macrolideR: 40 },
  { year: 2023, mrsa: 22, esbl: 31, cre: 11, macrolideR: 42 },
  { year: 2024, mrsa: 23, esbl: 32, cre: 12, macrolideR: 44 },
  { year: 2025, mrsa: 24, esbl: 32, cre: 12, macrolideR: 45 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const RegionalAdaptation = () => {
  const [selectedRegion, setSelectedRegion] = useState("Balkan");
  const [selectedHospital, setSelectedHospital] = useState("hosp-1");
  const [isEditingResistance, setIsEditingResistance] = useState(false);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="resistance">
        <TabsList>
          <TabsTrigger value="resistance" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Regional Resistance
          </TabsTrigger>
          <TabsTrigger value="antibiograms" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Hospital Antibiograms
          </TabsTrigger>
          <TabsTrigger value="formulary" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Formulary Guidelines
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resistance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Regional Resistance Patterns</CardTitle>
                <CardDescription>
                  Resistance data used to tailor recommendations to local patterns
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regionalResistanceData.map(region => (
                      <SelectItem key={region.region} value={region.region}>{region.region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setIsEditingResistance(!isEditingResistance)}
                >
                  {isEditingResistance ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-80">
                  <ChartContainer config={{
                    resistance: { theme: { light: '#0088FE', dark: '#60a5fa' } }
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[regionalResistanceData.find(r => r.region === selectedRegion)]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis domain={[0, 100]} label={{ value: 'Resistance (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="mrsa" name="MRSA" fill="#0088FE" />
                        <Bar dataKey="vre" name="VRE" fill="#00C49F" />
                        <Bar dataKey="esbl" name="ESBL" fill="#FFBB28" />
                        <Bar dataKey="cre" name="CRE" fill="#FF8042" />
                        <Bar dataKey="pseudomonas" name="Pseudomonas" fill="#8884d8" />
                        <Bar dataKey="macrolideR" name="Macrolide Resistance" fill="#82ca9d" />
                        <Bar dataKey="penicillinR" name="Penicillin Resistance" fill="#ffc658" />
                        <Bar dataKey="quinoloneR" name="Fluoroquinolone Resistance" fill="#8dd1e1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resistance Pattern</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Impact on Recommendations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(regionalResistanceData.find(r => r.region === selectedRegion) || {})
                      .filter(([key]) => key !== "region")
                      .map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium">
                            {key === "mrsa" ? "MRSA" : 
                             key === "vre" ? "VRE" : 
                             key === "esbl" ? "ESBL" : 
                             key === "cre" ? "CRE" :
                             key === "pseudomonas" ? "Pseudomonas" :
                             key === "macrolideR" ? "Macrolide Resistance" :
                             key === "penicillinR" ? "Penicillin Resistance" :
                             key === "quinoloneR" ? "Fluoroquinolone Resistance" : key}
                          </TableCell>
                          <TableCell>
                            {isEditingResistance ? (
                              <Input 
                                type="number" 
                                defaultValue={value as number} 
                                min="0" 
                                max="100"
                                className="w-20"
                              />
                            ) : (
                              `${value}%`
                            )}
                          </TableCell>
                          <TableCell>
                            {(value as number) > 20 ? (
                              <Badge variant="destructive">Consider alternatives</Badge>
                            ) : (value as number) > 10 ? (
                              <Badge variant="default">Monitor closely</Badge>
                            ) : (
                              <Badge variant="outline">Standard recommendations</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                
                <div className="h-80">
                  <h3 className="font-medium mb-2">Resistance Trends Over Time</h3>
                  <ChartContainer config={{
                    mrsa: { theme: { light: '#0088FE', dark: '#60a5fa' } },
                    esbl: { theme: { light: '#FFBB28', dark: '#fbbf24' } },
                    cre: { theme: { light: '#FF8042', dark: '#f97316' } },
                    macrolideR: { theme: { light: '#82ca9d', dark: '#34d399' } }
                  }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={resistanceTrendData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis domain={[0, 50]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="mrsa" stroke="#0088FE" name="MRSA" />
                        <Line type="monotone" dataKey="esbl" stroke="#FFBB28" name="ESBL" />
                        <Line type="monotone" dataKey="cre" stroke="#FF8042" name="CRE" />
                        <Line type="monotone" dataKey="macrolideR" stroke="#82ca9d" name="Macrolide Resistance" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                {isEditingResistance && (
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditingResistance(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsEditingResistance(false)}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommendation Adjustments</CardTitle>
              <CardDescription>
                How regional resistance patterns influence antibiotic recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-medium">Macrolide Resistance Adjustment</h4>
                  <p className="text-sm text-muted-foreground">
                    When local macrolide resistance exceeds 25%, azithromycin is no longer recommended as monotherapy
                    for community-acquired pneumonia. The system will suggest combination therapy or alternative agents.
                  </p>
                </div>
                
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h4 className="font-medium">ESBL Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground">
                    In regions with ESBL prevalence {'>'}20%, empiric therapy for severe UTIs and intra-abdominal infections
                    is adjusted to include carbapenem coverage, especially in patients with healthcare exposure.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-medium">MRSA Thresholds</h4>
                  <p className="text-sm text-muted-foreground">
                    Empiric MRSA coverage is automatically recommended for severe skin infections in regions where
                    MRSA prevalence exceeds 20% in community-acquired infections.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="antibiograms">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hospital Antibiograms</CardTitle>
                <CardDescription>
                  Institution-specific resistance patterns
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select Hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitalAntibiogramData.map(hospital => (
                      <SelectItem key={hospital.id} value={hospital.id}>{hospital.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {hospitalAntibiogramData
                .filter(h => h.id === selectedHospital)
                .map(hospital => (
                  <div key={hospital.id} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{hospital.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {hospital.location} • Last updated: {hospital.lastUpdated}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Update Antibiogram
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {hospital.organisms.map((organism, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle>{organism.name}</CardTitle>
                            <CardDescription>
                              Based on {organism.samples} clinical isolates
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64">
                              <ChartContainer config={{
                                resistance: { theme: { light: '#0088FE', dark: '#60a5fa' } }
                              }}>
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={[
                                        { name: 'MRSA', value: organism.mrsaRate },
                                        { name: 'MSSA', value: 100 - (organism.mrsaRate || 0) }
                                      ]}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={false}
                                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                      outerRadius={80}
                                      fill="#8884d8"
                                      dataKey="value"
                                    >
                                      {[0, 1].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip />
                                  </PieChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </div>
                            
                            <Table className="mt-4">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Antibiotic</TableHead>
                                  <TableHead>Resistance (%)</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {Object.entries(organism.resistance || {}).map(([antibiotic, resistance]) => (
                                  <TableRow key={antibiotic}>
                                    <TableCell className="font-medium">{antibiotic}</TableCell>
                                    <TableCell>{resistance}%</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Recommendation Impact</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        The antibiogram data from {hospital.name} is integrated into the recommendation engine
                        and affects the following recommendations:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li className="text-sm">
                          <span className="font-medium">Empiric MRSA coverage:</span> Automatically recommended for severe infections
                        </li>
                        <li className="text-sm">
                          <span className="font-medium">Carbapenem usage:</span> Reserved for confirmed ESBL infections or sepsis
                        </li>
                        <li className="text-sm">
                          <span className="font-medium">Fluoroquinolone restrictions:</span> Not recommended as first-line due to rising resistance rates
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="formulary">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Formulary Restrictions</CardTitle>
                <CardDescription>
                  Hospital-specific formulary guidelines and restrictions
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Restriction
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Antibiotic</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Approval Required</TableHead>
                    <TableHead>Indications</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formularyRestrictionsData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.antibiotic}</TableCell>
                      <TableCell>
                        <Badge variant={item.category === "Restricted" ? "destructive" : "outline"}>
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.approvalRequired ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          {item.indications.map((indication, i) => (
                            <li key={i} className="text-xs">{indication}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.notes}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Formulary Integration</h3>
                <p className="text-sm text-muted-foreground">
                  The antibiotic recommendation system automatically applies these formulary restrictions to recommendations,
                  prioritizing unrestricted antibiotics when clinically appropriate, and providing guidance on approval processes
                  when restricted antibiotics are necessary.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">
                      {formularyRestrictionsData.filter(x => x.category === "Unrestricted").length}
                    </div>
                    <div className="text-sm font-medium">Unrestricted Antibiotics</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="text-3xl font-bold text-amber-500 mb-2">
                      {formularyRestrictionsData.filter(x => x.category === "Restricted").length}
                    </div>
                    <div className="text-sm font-medium">Restricted Antibiotics</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">
                      85%
                    </div>
                    <div className="text-sm font-medium">Compliance Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
