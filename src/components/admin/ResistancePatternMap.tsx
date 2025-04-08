
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Sample resistance data by region
const regionData = [
  { region: "Balkan", mrsa: 24, vre: 18, esbl: 32, cre: 12, pseudomonas: 28 },
  { region: "Southern Europe", mrsa: 35, vre: 22, esbl: 38, cre: 15, pseudomonas: 31 },
  { region: "Northern Europe", mrsa: 12, vre: 9, esbl: 18, cre: 6, pseudomonas: 16 },
  { region: "Eastern Europe", mrsa: 28, vre: 19, esbl: 35, cre: 14, pseudomonas: 25 },
  { region: "Western Europe", mrsa: 19, vre: 14, esbl: 25, cre: 8, pseudomonas: 21 },
];

// Sample detailed data for one region
const balkanDetailedData = [
  { country: "Serbia", mrsa: 24, vre: 18, esbl: 32, cre: 12, pseudomonas: 28 },
  { country: "Croatia", mrsa: 22, vre: 16, esbl: 30, cre: 10, pseudomonas: 26 },
  { country: "Bosnia", mrsa: 26, vre: 19, esbl: 34, cre: 13, pseudomonas: 29 },
  { country: "Montenegro", mrsa: 28, vre: 20, esbl: 35, cre: 14, pseudomonas: 30 },
  { country: "North Macedonia", mrsa: 25, vre: 18, esbl: 33, cre: 13, pseudomonas: 27 },
];

// Sample trend data over time
const resistanceTrendData = [
  { year: "2020", mrsa: 18, vre: 12, esbl: 24, cre: 8, pseudomonas: 22 },
  { year: "2021", mrsa: 20, vre: 14, esbl: 26, cre: 9, pseudomonas: 23 },
  { year: "2022", mrsa: 22, vre: 16, esbl: 28, cre: 10, pseudomonas: 25 },
  { year: "2023", mrsa: 23, vre: 17, esbl: 30, cre: 11, pseudomonas: 26 },
  { year: "2024", mrsa: 24, vre: 18, esbl: 32, cre: 12, pseudomonas: 28 },
  { year: "2025", mrsa: 25, vre: 18.5, esbl: 32.5, cre: 12.5, pseudomonas: 28.5 },
];

// Sample antibiotic effectiveness against resistant strains
const antibioticEffectivenessData = [
  { antibiotic: "Vancomycin", mrsa: 90, vre: 15, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Linezolid", mrsa: 95, vre: 92, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Daptomycin", mrsa: 92, vre: 88, esbl: 0, cre: 0, pseudomonas: 0 },
  { antibiotic: "Meropenem", mrsa: 0, vre: 0, esbl: 95, cre: 40, pseudomonas: 85 },
  { antibiotic: "Colistin", mrsa: 0, vre: 0, esbl: 0, cre: 85, pseudomonas: 90 },
];

// This is a simplified world map example
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export const ResistancePatternMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedResistance, setSelectedResistance] = useState("mrsa");
  const [selectedRegion, setSelectedRegion] = useState("Balkan");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Antibiotic Resistance Patterns</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={selectedResistance} onValueChange={setSelectedResistance}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Select Resistance Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mrsa">MRSA</SelectItem>
              <SelectItem value="vre">VRE</SelectItem>
              <SelectItem value="esbl">ESBL</SelectItem>
              <SelectItem value="cre">CRE</SelectItem>
              <SelectItem value="pseudomonas">Pseudomonas</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Balkan">Balkan</SelectItem>
              <SelectItem value="Southern Europe">Southern Europe</SelectItem>
              <SelectItem value="Northern Europe">Northern Europe</SelectItem>
              <SelectItem value="Eastern Europe">Eastern Europe</SelectItem>
              <SelectItem value="Western Europe">Western Europe</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="map">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="trends">Resistance Trends</TabsTrigger>
          <TabsTrigger value="effectiveness">Antibiotic Effectiveness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Regional Resistance Map</CardTitle>
              <CardDescription>
                Geographic distribution of {selectedResistance.toUpperCase()} resistance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] relative">
                <ComposableMap data-tip="" projectionConfig={{ scale: 147 }}>
                  <ZoomableGroup zoom={1}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map(geo => {
                          // This is a simplified example - in a real app, you would match countries to your resistance data
                          const regionName = geo.properties.name;
                          const intensity = Math.random(); // Mock data - would be real resistance rates
                          
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onMouseEnter={() => {
                                setTooltipContent(`${regionName}: ${(intensity * 100).toFixed(1)}% resistance`);
                              }}
                              onMouseLeave={() => {
                                setTooltipContent("");
                              }}
                              style={{
                                default: {
                                  fill: `rgba(255, 0, 0, ${intensity})`,
                                  outline: "none"
                                },
                                hover: {
                                  fill: `rgba(255, 0, 0, ${intensity + 0.2})`,
                                  outline: "none"
                                },
                                pressed: {
                                  fill: `rgba(255, 0, 0, ${intensity})`,
                                  outline: "none"
                                }
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
                {tooltipContent && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      padding: "10px",
                      background: "rgba(0, 0, 0, 0.7)",
                      color: "#fff",
                      borderRadius: "5px",
                      pointerEvents: "none"
                    }}
                  >
                    {tooltipContent}
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Regional Resistance Data for {selectedRegion}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>MRSA (%)</TableHead>
                      <TableHead>VRE (%)</TableHead>
                      <TableHead>ESBL (%)</TableHead>
                      <TableHead>CRE (%)</TableHead>
                      <TableHead>Pseudomonas (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {balkanDetailedData.map((country) => (
                      <TableRow key={country.country}>
                        <TableCell className="font-medium">{country.country}</TableCell>
                        <TableCell>{country.mrsa}%</TableCell>
                        <TableCell>{country.vre}%</TableCell>
                        <TableCell>{country.esbl}%</TableCell>
                        <TableCell>{country.cre}%</TableCell>
                        <TableCell>{country.pseudomonas}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Resistance Trends Over Time</CardTitle>
              <CardDescription>
                Tracking resistance patterns from 2020 to 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ChartContainer config={{
                mrsa: { theme: { light: '#FF8042', dark: '#f97316' } },
                vre: { theme: { light: '#FFBB28', dark: '#fbbf24' } },
                esbl: { theme: { light: '#0088FE', dark: '#60a5fa' } },
                cre: { theme: { light: '#8884d8', dark: '#a78bfa' } },
                pseudomonas: { theme: { light: '#00C49F', dark: '#34d399' } }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={resistanceTrendData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Resistance (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mrsa" name="MRSA" fill="#FF8042" />
                    <Bar dataKey="vre" name="VRE" fill="#FFBB28" />
                    <Bar dataKey="esbl" name="ESBL" fill="#0088FE" />
                    <Bar dataKey="cre" name="CRE" fill="#8884d8" />
                    <Bar dataKey="pseudomonas" name="Pseudomonas" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="effectiveness">
          <Card>
            <CardHeader>
              <CardTitle>Antibiotic Effectiveness Against Resistant Strains</CardTitle>
              <CardDescription>
                Comparative effectiveness of various antibiotics against resistant bacteria
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ChartContainer config={{
                effectiveness: { theme: { light: '#0088FE', dark: '#60a5fa' } }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={antibioticEffectivenessData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="antibiotic" />
                    <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mrsa" name="vs MRSA" fill="#FF8042" />
                    <Bar dataKey="vre" name="vs VRE" fill="#FFBB28" />
                    <Bar dataKey="esbl" name="vs ESBL" fill="#0088FE" />
                    <Bar dataKey="cre" name="vs CRE" fill="#8884d8" />
                    <Bar dataKey="pseudomonas" name="vs Pseudomonas" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
