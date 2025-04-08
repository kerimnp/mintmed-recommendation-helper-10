
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { antibioticEffectivenessData } from "./data";

export const AntibioticEffectiveness = () => {
  // Color scheme for different resistance types
  const colors = {
    mrsa: "#FF8042",
    vre: "#FFBB28", 
    esbl: "#0088FE",
    cre: "#8884d8",
    pseudomonas: "#00C49F"
  };
  
  // Define which antibiotics are effective against which pathogens
  const getEffectiveAgainst = (antibiotic: string) => {
    const effective = [];
    const item = antibioticEffectivenessData.find(a => a.antibiotic === antibiotic);
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
        <CardTitle>Antibiotic Effectiveness Against Resistant Strains</CardTitle>
        <CardDescription>
          Comparative effectiveness based on clinical studies and antimicrobial susceptibility data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
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
                <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                <XAxis dataKey="antibiotic" />
                <YAxis label={{ value: 'Effectiveness (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value}%`, name.replace("vs ", "")]}
                  labelFormatter={(label) => `${label} (${getEffectiveAgainst(label)})`}
                />
                <Legend wrapperStyle={{ paddingTop: "10px" }} />
                <Bar dataKey="mrsa" name="vs MRSA" fill={colors.mrsa}>
                  {antibioticEffectivenessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.mrsa > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="vre" name="vs VRE" fill={colors.vre}>
                  {antibioticEffectivenessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.vre > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="esbl" name="vs ESBL" fill={colors.esbl}>
                  {antibioticEffectivenessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.esbl > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="cre" name="vs CRE" fill={colors.cre}>
                  {antibioticEffectivenessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={entry.cre > 0 ? 1 : 0.3} />
                  ))}
                </Bar>
                <Bar dataKey="pseudomonas" name="vs Pseudomonas" fill={colors.pseudomonas}>
                  {antibioticEffectivenessData.map((entry, index) => (
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
      </CardContent>
    </Card>
  );
};
