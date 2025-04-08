
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { antibioticEffectivenessData } from "./data";
import { Download } from "lucide-react";

interface AntibioticEffectivenessProps {
  selectedRegion?: string;
  selectedResistance?: string;
}

// Update the interface for effectiveness data items
interface EffectivenessDataItem {
  antibiotic: string;
  mrsa: number;
  vre: number;
  esbl: number;
  cre: number;
  pseudomonas: number;
  [key: string]: string | number;
}

export const AntibioticEffectiveness = ({ selectedRegion = "Balkan", selectedResistance = "mrsa" }: AntibioticEffectivenessProps) => {
  // Color scheme for different resistance types
  const colors: Record<string, string> = {
    mrsa: "#FF8042",
    vre: "#FFBB28", 
    esbl: "#0088FE",
    cre: "#8884d8",
    pseudomonas: "#00C49F"
  };

  // Apply regional modifiers to effectiveness data
  const getRegionModifiedData = () => {
    const regionModifiers: Record<string, number> = {
      "Balkan": 1,
      "Southern Europe": 0.9,  // Slightly lower effectiveness
      "Northern Europe": 1.1,  // Slightly higher effectiveness
      "Eastern Europe": 0.95,
      "Western Europe": 1.05,
      "Global": 1
    };
    
    const modifier = regionModifiers[selectedRegion] || 1;
    
    // Create region-specific data
    return antibioticEffectivenessData.map(item => {
      const result: EffectivenessDataItem = {...item} as EffectivenessDataItem;
      
      for (const key of Object.keys(item)) {
        if (key !== 'antibiotic' && typeof item[key as keyof typeof item] === 'number') {
          const value = item[key as keyof typeof item] as number;
          const adjustedValue = Math.min(100, value * modifier); // Cap at 100%
          result[key] = Number(adjustedValue.toFixed(1));
        }
      }
      
      return result;
    });
  };
  
  const modifiedData = getRegionModifiedData();
  
  // Define which antibiotics are effective against which pathogens
  const getEffectiveAgainst = (antibiotic: string) => {
    const effective = [];
    const item = modifiedData.find(a => a.antibiotic === antibiotic);
    if (!item) return "";
    
    if (item.mrsa > 50) effective.push("MRSA");
    if (item.vre > 50) effective.push("VRE");
    if (item.esbl > 50) effective.push("ESBL");
    if (item.cre > 50) effective.push("CRE");
    if (item.pseudomonas > 50) effective.push("Pseudomonas");
    
    return effective.join(", ");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Antibiotic Effectiveness Against Resistant Strains - {selectedRegion}</CardTitle>
        <CardDescription>
          Comparative effectiveness based on clinical studies and regional resistance patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ChartContainer config={{
            effectiveness: { theme: { light: '#0088FE', dark: '#60a5fa' } },
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
                data={modifiedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                <XAxis dataKey="antibiotic" />
                <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name.replace("vs ", "")]}
                  labelFormatter={(label) => `${label} (${getEffectiveAgainst(label)})`}
                />
                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                <Bar dataKey="mrsa" name="vs MRSA" fill={colors.mrsa}>
                  {modifiedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.mrsa > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="vre" name="vs VRE" fill={colors.vre}>
                  {modifiedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.vre > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="esbl" name="vs ESBL" fill={colors.esbl}>
                  {modifiedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.esbl > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="cre" name="vs CRE" fill={colors.cre}>
                  {modifiedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.cre > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="pseudomonas" name="vs Pseudomonas" fill={colors.pseudomonas}>
                  {modifiedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.pseudomonas > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
          {Object.entries(colors).map(([key, color]) => (
            <div 
              key={key}
              className="flex items-center justify-center p-2 rounded-lg font-medium text-sm"
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
